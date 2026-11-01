import * as readline from "readline";
import { TrueForge } from "@truefoundry/trueforge-sdk";

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

interface CliConfig {
  serverUrl: string;
  mcpUrl: string;
  primaryModel: string;
  fallbackModel: string;
  workspaceRoot: string;
}

const config: CliConfig = {
  serverUrl: process.env.TRUEFORGE_SERVER_URL || "http://localhost:8790",
  mcpUrl: process.env.TRUEFORGE_MCP_URL || "http://127.0.0.1:45821/mcp",
  primaryModel: process.env.TRUEFORGE_PRIMARY_MODEL || "google-gemini/gemini-3-5-flash",
  fallbackModel: process.env.TRUEFORGE_FALLBACK_MODEL || "google-gemini/gemini-3-5-flash-lite",
  workspaceRoot: process.cwd(),
};

let activeSessionId: string | null = null;
let simulateTaskCFailure = false;

function printBanner(): void {
  console.log("");
  console.log(`${C.cyan}${C.bold}  ╭──────────────────────────────────────────────────────────────────────╮${C.reset}`);
  console.log(`${C.cyan}${C.bold}  │  ⚡ TrueForge Coding Agent CLI  ·  Editor-Native MCP REPL           │${C.reset}`);
  console.log(`${C.cyan}${C.bold}  ╰──────────────────────────────────────────────────────────────────────╯${C.reset}`);
  console.log(`  ${C.gray}Harness Server:${C.reset}  ${C.green}${config.serverUrl}${C.reset}`);
  console.log(`  ${C.gray}VS Code MCP:${C.reset}     ${C.cyan}${config.mcpUrl}${C.reset}`);
  console.log(`  ${C.gray}Primary Model:${C.reset}   ${C.bold}${config.primaryModel}${C.reset}`);
  console.log(`  ${C.gray}Fallback Model:${C.reset}  ${C.yellow}${config.fallbackModel}${C.reset}`);
  console.log(`  ${C.gray}Workspace:${C.reset}       ${config.workspaceRoot}`);
  console.log("");
  console.log(`  ${C.dim}Commands: /status  /models  /task-a  /task-b  /task-c  /sessions  /clear  /help  /exit${C.reset}`);
  console.log(`  ${C.dim}Or type any coding prompt to stream a live TrueForge turn with VS Code MCP tools.${C.reset}`);
  console.log("");
}

async function checkStatus(): Promise<void> {
  process.stdout.write(`  ${C.gray}Checking TrueForge harness (${config.serverUrl})...${C.reset} `);
  try {
    const res = await fetch(`${config.serverUrl}/api/v1/sessions`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: unknown[] };
      console.log(`${C.green}● Connected${C.reset} (${(json.data || []).length} recent sessions)`);
    } else {
      console.log(`${C.yellow}● HTTP ${res.status}${C.reset}`);
    }
  } catch (err) {
    console.log(
      `${C.red}● Offline${C.reset} (${err instanceof Error ? err.message : String(err)}) — run 'npm run trueforge' to start`
    );
  }

  process.stdout.write(`  ${C.gray}Checking VS Code Editor MCP (${config.mcpUrl.replace(/\/mcp$/, "/health")})...${C.reset} `);
  try {
    const res = await fetch(config.mcpUrl.replace(/\/mcp$/, "/health"), {
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) {
      const data = (await res.json()) as { tools?: string[] };
      console.log(
        `${C.green}● Active${C.reset} (${(data.tools || []).length} tools: ${(data.tools || []).join(", ")})`
      );
    } else {
      console.log(`${C.yellow}● HTTP ${res.status}${C.reset}`);
    }
  } catch {
    console.log(`${C.yellow}● Not detected on ${config.mcpUrl}${C.reset}`);
  }
  console.log("");
}

async function listModels(): Promise<void> {
  try {
    const res = await fetch(`${config.serverUrl}/api/v1/settings/model-providers`, {
      signal: AbortSignal.timeout(4000),
    });
    const json = (await res.json()) as {
      data?: Array<{ name?: string; manifest?: { name?: string; models?: Array<{ name: string }> } }>;
    };
    const models: string[] = [];
    for (const p of json.data || []) {
      const prov = p.name || p.manifest?.name;
      for (const m of p.manifest?.models || []) {
        if (prov && m.name) {
          models.push(`${prov}/${m.name}`);
        }
      }
    }
    console.log(`\n  ${C.bold}Configured TrueForge Models (${models.length}):${C.reset}`);
    for (const m of models) {
      const tag =
        m === config.primaryModel
          ? ` ${C.green}[PRIMARY]${C.reset}`
          : m === config.fallbackModel
          ? ` ${C.yellow}[FALLBACK]${C.reset}`
          : "";
      console.log(`    • ${m}${tag}`);
    }
    console.log("");
  } catch (err) {
    console.log(`  ${C.red}Failed to query models:${C.reset} ${err instanceof Error ? err.message : String(err)}\n`);
  }
}

async function listSessions(): Promise<void> {
  try {
    const res = await fetch(`${config.serverUrl}/api/v1/sessions`, {
      signal: AbortSignal.timeout(4000),
    });
    const json = (await res.json()) as {
      data?: Array<{
        id: string;
        title?: string;
        agent?: { spec?: { model?: { name?: string } } };
      }>;
    };
    const sessions = (json.data || []).slice(0, 8);
    console.log(`\n  ${C.bold}Recent TrueForge Sessions:${C.reset}`);
    for (const s of sessions) {
      const model = s.agent?.spec?.model?.name || "default";
      const title = (s.title || "Untitled").replace(/\s+/g, " ").slice(0, 52);
      console.log(`    ${C.cyan}${s.id}${C.reset}  ${C.gray}[${model}]${C.reset}  ${title}`);
    }
    console.log("");
  } catch (err) {
    console.log(`  ${C.red}Failed to list sessions:${C.reset} ${err instanceof Error ? err.message : String(err)}\n`);
  }
}

async function executePromptWithFailover(prompt: string): Promise<void> {
  const primaryToTry = simulateTaskCFailure
    ? "unreachable-provider/invalid-model-endpoint"
    : config.primaryModel;

  const maxRetries = 2;
  let lastError = "";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await runSingleTurn(primaryToTry, prompt, attempt === 1 && !simulateTaskCFailure);
      return;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt < maxRetries) {
        const delayMs = 600 * Math.pow(2, attempt - 1);
        console.log(
          `\n  ${C.yellow}● Retry (${attempt}/${maxRetries}, backoff ${delayMs}ms):${C.reset} Primary model '${primaryToTry}' failed: ${lastError}`
        );
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }

  console.log(
    `\n  ${C.yellow}⚡ Automatic Failover:${C.reset} Switching '${primaryToTry}' → '${config.fallbackModel}' (Workspace unchanged)`
  );
  activeSessionId = null;
  try {
    await runSingleTurn(config.fallbackModel, prompt, false);
  } catch (fbErr) {
    console.log(
      `\n  ${C.red}✗ Both primary and fallback models failed:${C.reset} ${
        fbErr instanceof Error ? fbErr.message : String(fbErr)
      }\n`
    );
  }
}

async function runSingleTurn(modelName: string, prompt: string, reuseSession: boolean): Promise<void> {
  const client = new TrueForge({
    baseUrl: config.serverUrl,
    token: "local-trueforge-token",
  });

  if (!reuseSession || !activeSessionId) {
    const sessionResp = await client.sessions.create({
      agent: {
        spec: {
          model: {
            name: modelName,
            params: { temperature: 0.1 },
          },
          instructions:
            "You are TrueForge Coding Agent running in the VS Code CLI. Use your MCP tools (search_workspace, read_file, list_files, get_symbols, get_diagnostics, propose_edit, run_command) to inspect and edit files cleanly.",
          mcpServers: [
            {
              name: "vscode-editor-mcp",
              enableTools: ["@all"],
              preload: false,
              preloadTools: ["search_workspace", "read_file"],
              requireApprovalForTools: ["propose_edit", "run_command"],
            },
          ],
          config: {
            iterationLimit: 24,
            sandbox: { enabled: false },
            dynamicSubAgents: { enabled: true },
            contextManagement: {
              compaction: { enabled: true },
              largeToolResponse: { enabled: true },
            },
            generativeUi: { enabled: false },
            askUserQuestions: { enabled: false },
            webSearch: { enabled: false },
          },
        },
      },
      metadata: {
        source: "trueforge-vscode-cli",
        model: modelName,
      },
    });
    activeSessionId = sessionResp.data.id;
    console.log(`  ${C.gray}Session: ${activeSessionId} (${modelName})${C.reset}`);
  }

  const stream = await client.sessions.createTurnStream(activeSessionId, {
    input: [{ type: "user.message", content: prompt }],
  });

  let currentTurnId = "";
  let printedHeader = false;
  for await (const event of stream) {
    if (event.type === "turn.created") {
      currentTurnId = event.turnId;
    } else if (event.type === "model.message.delta" && event.content) {
      if (!printedHeader) {
        process.stdout.write(`\n  ${C.gray}●${C.reset} `);
        printedHeader = true;
      }
      process.stdout.write(event.content);
    } else if (event.type === "model.message" && event.toolCalls?.length) {
      if (printedHeader) {
        process.stdout.write("\n");
        printedHeader = false;
      }
      for (const tc of event.toolCalls) {
        const name = tc.function?.name || "tool";
        const args = tc.function?.arguments || "{}";
        console.log(`  ${C.green}● ${C.bold}${name}${C.reset} ${C.gray}${args.slice(0, 120)}${C.reset}`);
      }
    } else if (event.type === "tool.approval_required") {
      if (printedHeader) {
        process.stdout.write("\n");
        printedHeader = false;
      }
      for (const ref of event.toolCalls) {
        console.log(
          `  ${C.yellow}● Approval Checkpoint (${ref.id}):${C.reset} Auto-approving in CLI & staging diff in VS Code editor...`
        );
        await client.sessions.createTurnEvent(activeSessionId, currentTurnId, {
          events: [
            {
              type: "user.tool_approval",
              threadId: event.threadId,
              toolCallId: ref.id,
              approval: { status: "allow" },
            },
          ],
        });
      }
    } else if (event.type === "turn.done") {
      if (printedHeader) {
        process.stdout.write("\n");
      }
      if (event.state.status === "error") {
        throw new Error(event.state.message || "Turn ended in error state");
      }
      console.log(`  ${C.green}✓ Turn complete${C.reset}\n`);
    }
  }
}

async function main(): Promise<void> {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printBanner();
    process.exit(0);
  }

  printBanner();
  await checkStatus();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${C.cyan}${C.bold}trueforge>${C.reset} `,
  });

  rl.prompt();

  rl.on("line", async (rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      rl.prompt();
      return;
    }

    if (line === "/exit" || line === "/quit" || line === "exit") {
      console.log(`  ${C.gray}Closing TrueForge CLI.${C.reset}`);
      process.exit(0);
    } else if (line === "/help") {
      console.log(`\n  ${C.bold}Available Slash Commands:${C.reset}`);
      console.log(`    ${C.cyan}/status${C.reset}    Check TrueForge server & VS Code MCP connector health`);
      console.log(`    ${C.cyan}/models${C.reset}    List configured models on TrueForge`);
      console.log(`    ${C.cyan}/sessions${C.reset}  Show recent TrueForge sessions`);
      console.log(`    ${C.cyan}/task-a${C.reset}    Run Round 1 Task A (Inline Edit on get_debug_flag)`);
      console.log(`    ${C.cyan}/task-b${C.reset}    Run Round 1 Task B (Multi-file flask config CLI command)`);
      console.log(`    ${C.cyan}/task-c${C.reset}    Toggle Task C Resilience Failure Simulation (currently ${simulateTaskCFailure ? "ON" : "OFF"})`);
      console.log(`    ${C.cyan}/clear${C.reset}     Reset active session and clear terminal`);
      console.log(`    ${C.cyan}/exit${C.reset}      Close the CLI\n`);
    } else if (line === "/status") {
      await checkStatus();
    } else if (line === "/models") {
      await listModels();
    } else if (line === "/sessions") {
      await listSessions();
    } else if (line === "/clear") {
      activeSessionId = null;
      console.clear();
      printBanner();
    } else if (line === "/task-c") {
      simulateTaskCFailure = !simulateTaskCFailure;
      console.log(
        `\n  ${C.yellow}🛡️ Task C Primary Failure Simulation is now ${
          simulateTaskCFailure ? "ENABLED" : "DISABLED"
        }${C.reset}\n`
      );
    } else if (line === "/task-a") {
      const prompt =
        "In src/flask/helpers.py function get_debug_flag, treat the values 'off' and 'n' as false as well, case-insensitively, and update the docstring to list every value that is treated as false. Call propose_edit.";
      await executePromptWithFailover(prompt);
    } else if (line === "/task-b") {
      const prompt =
        'Add a new built-in CLI command flask config that prints the loaded application\'s configuration as JSON, masking the values of any key containing SECRET, PASSWORD, TOKEN or KEY as "***". It must appear in flask --help, be covered by a test, and be documented alongside the other built-in commands.';
      await executePromptWithFailover(prompt);
    } else {
      await executePromptWithFailover(line);
    }

    rl.prompt();
  });
}

void main();
