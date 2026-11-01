import * as fs from "fs";
import * as path from "path";
import { TrueForge } from "@truefoundry/trueforge-sdk";
import { ContextAssembler } from "../src/context/contextAssembler.js";
import { DiffStagingStore } from "../src/diff/diffEngine.js";
import { EditorMcpServer } from "../src/mcp/editorMcpServer.js";

/**
 * Bootstrap script to register model providers (if env vars are set), the VS Code MCP server,
 * and the `trueforge-coder` agent definition (`agent-definition.json`) on a local TrueForge server.
 *
 * Usage:
 *   npm run bootstrap
 */
async function main() {
  const serverUrl = process.env.TRUEFORGE_URL || "http://localhost:8790";
  const token = process.env.TRUEFORGE_TOKEN || undefined;
  const mcpPort = 45821;
  const mcpUrl = process.env.TRUEFORGE_MCP_URL || `http://127.0.0.1:${mcpPort}/mcp`;

  console.log(`[TrueForge Bootstrap] Connecting to TrueForge server at ${serverUrl}...`);
  const client = new TrueForge({ baseUrl: serverUrl, token });

  // Start temporary MCP listener if VS Code extension isn't currently listening on 45821 so TrueForge's live MCP handshake succeeds
  const asm = new ContextAssembler(path.resolve(process.cwd(), "benchmark-repos", "flask"));
  const store = new DiffStagingStore();
  const tempMcp = new EditorMcpServer(mcpPort, asm, store);
  await tempMcp.start();

  try {
    console.log(`[TrueForge Bootstrap] Registering MCP server 'vscode-editor-mcp' (${mcpUrl})...`);
    await client.settings.mcpServers.createOrUpdate({
      manifest: {
        name: "vscode-editor-mcp",
        type: "remote",
        url: mcpUrl,
        description:
          "VS Code Editor Native MCP Tools (search_workspace, read_file, list_files, get_symbols, get_diagnostics, propose_edit, run_command)",
      },
    });
    console.log(`[TrueForge Bootstrap] MCP server 'vscode-editor-mcp' registered and verified!`);

    // Load and register `agent-definition.json`
    const agentDefPath = path.resolve(process.cwd(), "agent-definition.json");
    const agentDef = JSON.parse(fs.readFileSync(agentDefPath, "utf8"));

    console.log(`[TrueForge Bootstrap] Registering agent '${agentDef.name}'...`);
    let existingId: string | null = null;
    const page = await client.agents.list({ agentName: agentDef.name });
    for await (const item of page) {
      if (item.name === agentDef.name) {
        existingId = item.id;
        break;
      }
    }

    if (existingId) {
      await client.agents.update(existingId, {
        description: agentDef.description,
        manifest: agentDef.manifest,
      });
      console.log(`[TrueForge Bootstrap] Updated existing agent '${agentDef.name}' (id: ${existingId}).`);
    } else {
      const created = await client.agents.create(agentDef);
      console.log(`[TrueForge Bootstrap] Created agent '${agentDef.name}' (id: ${created.data.id}).`);
    }

    console.log(`[TrueForge Bootstrap] Done! Ready to run Tasks A, B, and C.`);
  } finally {
    await tempMcp.stop();
  }
}

main().catch((err) => {
  console.error(`[TrueForge Bootstrap] Error:`, err instanceof Error ? err.message : err);
  process.exit(1);
});
