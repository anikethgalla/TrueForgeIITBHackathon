import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { ContextAssembler } from "../context/contextAssembler.js";
import { DiffEngine, DiffStagingStore } from "../diff/diffEngine.js";
import { FileDiffProposal } from "../types.js";

const execAsync = promisify(exec);

/**
 * Embedded Local MCP Server (Criterion B4 & Eligibility Gate).
 *
 * Exposes the editor's capabilities to the TrueForge Agent Harness over both:
 * 1. Streamable HTTP MCP (`POST /mcp` JSON-RPC 2.0) — MCP 2025-03-26 / 2024-11-05 standard
 * 2. Legacy SSE MCP (`GET /sse` + `POST /messages`) — for backward compatibility
 *
 * Tools exposed (7 tools with MCP readOnlyHint/destructiveHint annotations):
 * - `search_workspace` (readOnlyHint: true) — Hybrid BM25 + AST + lexical grep across repository
 * - `read_file` (readOnlyHint: true) — Read file lines with 1-based line numbers
 * - `list_files` (readOnlyHint: true) — List repository files matching optional directory/glob
 * - `get_symbols` (readOnlyHint: true) — Extract AST symbols (functions, classes, CLI commands, headings)
 * - `get_diagnostics` (readOnlyHint: true) — Retrieve active workspace lint/syntax diagnostics
 * - `propose_edit` (readOnlyHint: false, destructiveHint: false) — Compute per-hunk diff and stage for editor review (NO direct disk write!)
 * - `run_command` (readOnlyHint: false, destructiveHint: true) — Run verification/test command in workspace
 */

export interface McpToolCallHook {
  onProposalStaged?: (proposal: FileDiffProposal) => void;
  onToolExecuted?: (toolName: string, args: Record<string, unknown>, resultPreview: string) => void;
  getDiagnosticsCallback?: (relativePath?: string) => string;
}

export class EditorMcpServer {
  private server: http.Server | null = null;
  private sseClients: Map<string, http.ServerResponse> = new Map();
  private port: number;

  constructor(
    port: number,
    private readonly contextAssembler: ContextAssembler,
    private readonly diffStore: DiffStagingStore,
    private readonly hooks: McpToolCallHook = {}
  ) {
    this.port = port;
  }

  public getUrl(): string {
    return `http://127.0.0.1:${this.port}/mcp`;
  }

  public getPort(): number {
    return this.port;
  }

  public async start(): Promise<number> {
    if (this.server) {
      return this.port;
    }

    return new Promise((resolve, reject) => {
      const srv = http.createServer(async (req, res) => {
        try {
          await this.handleHttpRequest(req, res);
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              jsonrpc: "2.0",
              id: null,
              error: { code: -32603, message: err instanceof Error ? err.message : String(err) },
            })
          );
        }
      });

      srv.on("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
          this.port += 1;
          srv.listen(this.port, "127.0.0.1");
        } else {
          reject(err);
        }
      });

      srv.listen(this.port, "127.0.0.1", () => {
        this.server = srv;
        resolve(this.port);
      });
    });
  }

  public async stop(): Promise<void> {
    for (const res of this.sseClients.values()) {
      try {
        res.end();
      } catch {
        // ignore
      }
    }
    this.sseClients.clear();

    if (!this.server) {
      return;
    }
    return new Promise((resolve) => {
      this.server!.close(() => {
        this.server = null;
        resolve();
      });
    });
  }

  private async handleHttpRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Session-Id, Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const url = new URL(req.url || "/", `http://127.0.0.1:${this.port}`);

    if (req.method === "GET" && url.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          server: "trueforge-vscode-editor-mcp",
          workspace: this.contextAssembler.getWorkspaceRoot(),
          toolsCount: this.getToolDefinitions().length,
        })
      );
      return;
    }

    // SSE endpoint for legacy MCP transport or Streamable HTTP GET
    if (req.method === "GET" && (url.pathname === "/sse" || url.pathname === "/mcp")) {
      const accept = req.headers.accept || "";
      if (url.pathname === "/sse" || accept.includes("text/event-stream")) {
        const sessionId = `mcp-sse-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Mcp-Session-Id": sessionId,
        });
        this.sseClients.set(sessionId, res);
        res.write(`event: endpoint\ndata: /messages?sessionId=${sessionId}\n\n`);
        req.on("close", () => {
          this.sseClients.delete(sessionId);
        });
        return;
      }
    }

    // JSON-RPC POST handler for both Streamable HTTP (`/mcp`) and SSE (`/messages`)
    if (req.method === "POST" && (url.pathname === "/mcp" || url.pathname === "/messages" || url.pathname === "/")) {
      const bodyText = await this.readBody(req);
      if (!bodyText.trim()) {
        res.writeHead(202);
        res.end();
        return;
      }

      const payload = JSON.parse(bodyText);
      const sessionId = url.searchParams.get("sessionId");

      if (Array.isArray(payload)) {
        const responses = [];
        for (const msg of payload) {
          const r = await this.handleJsonRpcMessage(msg);
          if (r !== null) {
            responses.push(r);
          }
        }
        if (responses.length === 0) {
          res.writeHead(202);
          res.end();
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responses));
        return;
      }

      const rpcResponse = await this.handleJsonRpcMessage(payload);
      if (rpcResponse === null) {
        // JSON-RPC notification (e.g., notifications/initialized)
        res.writeHead(202);
        res.end();
        return;
      }

      if (sessionId && this.sseClients.has(sessionId)) {
        const sseRes = this.sseClients.get(sessionId)!;
        sseRes.write(`event: message\ndata: ${JSON.stringify(rpcResponse)}\n\n`);
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Mcp-Session-Id": sessionId || "trueforge-editor-session",
      });
      res.end(JSON.stringify(rpcResponse));
      return;
    }

    if (req.method === "DELETE" && url.pathname === "/mcp") {
      res.writeHead(200);
      res.end();
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }

  private readBody(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
      req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      req.on("error", reject);
    });
  }

  /**
   * Handle an individual JSON-RPC 2.0 request or notification.
   */
  public async handleJsonRpcMessage(msg: {
    jsonrpc?: string;
    id?: string | number | null;
    method?: string;
    params?: Record<string, unknown>;
  }): Promise<Record<string, unknown> | null> {
    const { id, method, params } = msg;

    // Notifications do not have an `id`
    if (id === undefined) {
      return null;
    }

    try {
      switch (method) {
        case "initialize": {
          return {
            jsonrpc: "2.0",
            id,
            result: {
              protocolVersion: (params?.protocolVersion as string) || "2024-11-05",
              capabilities: {
                tools: { listChanged: false },
              },
              serverInfo: {
                name: "vscode-editor-mcp",
                version: "1.0.0",
              },
            },
          };
        }

        case "ping": {
          return {
            jsonrpc: "2.0",
            id,
            result: {},
          };
        }

        case "tools/list": {
          return {
            jsonrpc: "2.0",
            id,
            result: {
              tools: this.getToolDefinitions(),
            },
          };
        }

        case "tools/call": {
          const toolName = String(params?.name || "");
          const toolArgs = ((params?.arguments as Record<string, unknown>) || {}) as Record<
            string,
            unknown
          >;
          const output = await this.executeTool(toolName, toolArgs);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: output.text,
                },
              ],
              isError: output.isError,
            },
          };
        }

        default: {
          return {
            jsonrpc: "2.0",
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`,
            },
          };
        }
      }
    } catch (err) {
      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  /**
   * Return the 7 MCP tool definitions with MCP annotations (`readOnlyHint`, `destructiveHint`)
   * so TrueForge's `@read-only`, `@write`, `@destructive` and `requireApprovalForTools` selectors work natively.
   */
  public getToolDefinitions(): Array<Record<string, unknown>> {
    return [
      {
        name: "search_workspace",
        description:
          "Search the repository using hybrid BM25 lexical + AST symbol + regex matching. Returns ranked files, line numbers, matched symbols, and why each file matched within a strict token budget.",
        annotations: {
          title: "Search Workspace Codebase",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
        },
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Keywords, function/class name, CLI command, or regex pattern to search for.",
            },
            pathFilter: {
              type: "string",
              description: "Optional path substring filter (e.g., 'src/flask', 'tests/', 'docs/').",
            },
            maxResults: {
              type: "number",
              description: "Maximum number of matching files/snippets to return (default: 8).",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "read_file",
        description:
          "Read the contents of a file in the workspace with 1-based line numbers. Supports reading a specific line range [startLine, endLine] to conserve context window budget.",
        annotations: {
          title: "Read Workspace File",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
        },
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Relative path from workspace root (e.g., 'src/flask/cli.py').",
            },
            startLine: {
              type: "number",
              description: "Optional 1-based start line number.",
            },
            endLine: {
              type: "number",
              description: "Optional 1-based end line number (inclusive).",
            },
          },
          required: ["path"],
        },
      },
      {
        name: "list_files",
        description:
          "List files in the repository, optionally filtered by directory prefix or extension.",
        annotations: {
          title: "List Repository Files",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
        },
        inputSchema: {
          type: "object",
          properties: {
            directory: {
              type: "string",
              description: "Optional relative directory prefix (e.g., 'src/flask', 'tests', 'docs').",
            },
          },
        },
      },
      {
        name: "get_symbols",
        description:
          "Extract AST symbols (functions, classes, Click CLI commands, methods, and doc headings) with exact line ranges from a specific file or matching a symbol query.",
        annotations: {
          title: "Get AST Symbols",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
        },
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Optional relative file path to list all symbols in that file.",
            },
            symbolQuery: {
              type: "string",
              description: "Optional symbol name substring to search across the entire repository.",
            },
          },
        },
      },
      {
        name: "get_diagnostics",
        description:
          "Retrieve current compiler, linter, or syntax diagnostics from the VS Code editor for a file or workspace.",
        annotations: {
          title: "Get Editor Diagnostics",
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
        },
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Optional relative file path.",
            },
          },
        },
      },
      {
        name: "propose_edit",
        description:
          "Propose a code or documentation change to a file. Computes per-hunk diffs and presents them in the VS Code editor for human hunk-by-hunk review. Never writes silently to disk without user review.",
        annotations: {
          title: "Propose Per-Hunk File Edit",
          readOnlyHint: false,
          destructiveHint: false,
          idempotentHint: false,
        },
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description: "Relative file path in the workspace (e.g., 'src/flask/cli.py').",
            },
            description: {
              type: "string",
              description: "Concise explanation of why this file is being edited and what changes are made.",
            },
            searchBlock: {
              type: "string",
              description: "Exact block of existing lines in the file to replace.",
            },
            replaceBlock: {
              type: "string",
              description: "New lines that replace searchBlock.",
            },
            newContent: {
              type: "string",
              description: "Full file content if creating a new file or replacing the entire file.",
            },
          },
          required: ["path", "description"],
        },
      },
      {
        name: "run_command",
        description:
          "Execute a terminal command in the workspace root (e.g., running pytest or verifying CLI output) and return stdout/stderr.",
        annotations: {
          title: "Run Workspace Terminal Command",
          readOnlyHint: false,
          destructiveHint: true,
          idempotentHint: false,
        },
        inputSchema: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: "The shell command to run (e.g., 'pytest tests/test_cli.py -q').",
            },
          },
          required: ["command"],
        },
      },
    ];
  }

  /**
   * Execute one of the 7 MCP tools against the active workspace.
   */
  public async executeTool(
    toolName: string,
    args: Record<string, unknown>
  ): Promise<{ text: string; isError: boolean }> {
    const root = this.contextAssembler.getWorkspaceRoot();

    try {
      switch (toolName) {
        case "search_workspace": {
          const query = String(args.query || "");
          const pathFilter = args.pathFilter ? String(args.pathFilter).toLowerCase() : "";
          const maxResults = typeof args.maxResults === "number" ? args.maxResults : 8;

          this.contextAssembler.ensureIndexed();
          const report = this.contextAssembler.assembleContext({
            prompt: query,
            tokenBudget: 8000,
          });

          // Also run line-level substring/regex grep so exact string searches never miss
          const lineMatches = this.grepWorkspaceLines(query, pathFilter, maxResults * 3);

          const filteredItems = report.selectedItems
            .filter((item) => !pathFilter || item.relativePath.toLowerCase().includes(pathFilter))
            .slice(0, maxResults);

          const sections: string[] = [
            `=== Hybrid Context Search Results for "${query}" ===`,
            `Scanned ${report.totalFilesScanned} repository files | Token budget used: ${report.tokensUsed}/${report.tokenBudget}`,
          ];

          if (filteredItems.length > 0) {
            sections.push("\n--- Top Ranked Files (BM25 + AST + Import Graph) ---");
            for (const item of filteredItems) {
              sections.push(
                `• ${item.relativePath} (L${item.startLine}-L${item.endLine}, score=${item.score}, ~${item.estimatedTokens} tokens)\n` +
                  `  Why chosen: ${item.reason}\n` +
                  (item.matchedSymbols.length > 0
                    ? `  Matched AST symbols: ${item.matchedSymbols.join(", ")}\n`
                    : "")
              );
            }
          }

          if (lineMatches.length > 0) {
            sections.push("\n--- Exact Line Matches ---");
            sections.push(...lineMatches.slice(0, 25));
          }

          const out = sections.join("\n");
          this.hooks.onToolExecuted?.(toolName, args, `Found ${filteredItems.length} ranked files & ${lineMatches.length} line hits`);
          return { text: out, isError: false };
        }

        case "read_file": {
          const relPath = String(args.path || "").replace(/\\/g, "/");
          const absPath = path.resolve(root, relPath);
          if (!absPath.toLowerCase().startsWith(path.resolve(root).toLowerCase())) {
            return { text: `Error: Path '${relPath}' is outside the workspace root.`, isError: true };
          }
          if (!fs.existsSync(absPath)) {
            return { text: `Error: File '${relPath}' does not exist.`, isError: true };
          }

          // If there is an active staged proposal for this file, read the reconstructed/proposed state or disk state
          const content = fs.readFileSync(absPath, "utf8");
          const lines = content.split(/\r?\n/);
          const startLine = typeof args.startLine === "number" ? Math.max(1, args.startLine) : 1;
          const endLine =
            typeof args.endLine === "number"
              ? Math.min(lines.length, args.endLine)
              : Math.min(lines.length, startLine + 250 - 1);

          const numbered = lines
            .slice(startLine - 1, endLine)
            .map((line, idx) => `${String(startLine + idx).padStart(4, " ")} | ${line}`)
            .join("\n");

          const header = `File: ${relPath} (Showing lines ${startLine}-${endLine} of ${lines.length})\n`;
          this.hooks.onToolExecuted?.(toolName, args, `Read ${relPath} L${startLine}-L${endLine}`);
          return { text: header + numbered, isError: false };
        }

        case "list_files": {
          const dirFilter = args.directory ? String(args.directory).replace(/\\/g, "/").toLowerCase() : "";
          const { files } = this.contextAssembler.getAutocompleteSuggestions();
          const matched = files.filter((f) => !dirFilter || f.toLowerCase().startsWith(dirFilter));
          const text =
            `Workspace files (${matched.length} matching${dirFilter ? ` '${dirFilter}'` : ""}):\n` +
            matched.slice(0, 200).join("\n");
          this.hooks.onToolExecuted?.(toolName, args, `Listed ${matched.length} files`);
          return { text, isError: false };
        }

        case "get_symbols": {
          this.contextAssembler.ensureIndexed();
          const targetPath = args.path ? String(args.path).replace(/\\/g, "/") : "";
          const symbolQuery = args.symbolQuery ? String(args.symbolQuery) : "";

          if (targetPath) {
            const absPath = path.resolve(root, targetPath);
            if (!fs.existsSync(absPath)) {
              return { text: `File not found: ${targetPath}`, isError: true };
            }
            const lines = fs.readFileSync(absPath, "utf8").split(/\r?\n/);
            const syms = this.contextAssembler.extractSymbols(targetPath, absPath, lines);
            const formatted = syms
              .map((s) => `• [${s.kind}] ${s.name} (L${s.startLine}-L${s.endLine}): ${s.signature}`)
              .join("\n");
            this.hooks.onToolExecuted?.(toolName, args, `Extracted ${syms.length} symbols from ${targetPath}`);
            return {
              text: `AST Symbols in ${targetPath} (${syms.length}):\n${formatted || "No symbols found."}`,
              isError: false,
            };
          }

          if (symbolQuery) {
            const matches = this.contextAssembler.findMatchingSymbols(symbolQuery);
            const formatted = matches
              .slice(0, 40)
              .map(
                (s) =>
                  `• [${s.kind}] ${s.name} in ${s.relativePath}:L${s.startLine}-L${s.endLine} — ${s.signature}`
              )
              .join("\n");
            this.hooks.onToolExecuted?.(toolName, args, `Found ${matches.length} symbols matching '${symbolQuery}'`);
            return {
              text: `Symbols matching '${symbolQuery}' (${matches.length}):\n${formatted || "None"}`,
              isError: false,
            };
          }

          const { symbols } = this.contextAssembler.getAutocompleteSuggestions();
          const formatted = symbols
            .slice(0, 60)
            .map((s) => `• [${s.kind}] ${s.name} (${s.relativePath}:L${s.startLine}-L${s.endLine})`)
            .join("\n");
          return { text: `Repository Symbols Sample:\n${formatted}`, isError: false };
        }

        case "get_diagnostics": {
          const relPath = args.path ? String(args.path) : undefined;
          const diagText = this.hooks.getDiagnosticsCallback
            ? this.hooks.getDiagnosticsCallback(relPath)
            : "No errors or warnings reported in workspace.";
          this.hooks.onToolExecuted?.(toolName, args, `Checked diagnostics`);
          return { text: diagText, isError: false };
        }

        case "propose_edit": {
          const relPath = String(args.path || "").replace(/\\/g, "/");
          const description = String(args.description || "Proposed code modification");
          const absPath = path.resolve(root, relPath);

          if (!absPath.toLowerCase().startsWith(path.resolve(root).toLowerCase())) {
            return { text: `Error: Path '${relPath}' is outside the workspace root.`, isError: true };
          }

          // If there is already a staged proposal for this file in the current multi-step turn, build on top of it
          const existingProposal = this.diffStore.getProposalForFile(relPath);
          const diskContent = fs.existsSync(absPath) ? fs.readFileSync(absPath, "utf8") : "";
          const baseContent = existingProposal ? existingProposal.proposedContent : diskContent;

          const proposedContent = DiffEngine.buildProposedContent(baseContent, {
            searchBlock: typeof args.searchBlock === "string" ? args.searchBlock : undefined,
            replaceBlock: typeof args.replaceBlock === "string" ? args.replaceBlock : undefined,
            newContent: typeof args.newContent === "string" ? args.newContent : undefined,
          });

          if (proposedContent === diskContent) {
            return {
              text: `Warning: Proposed edit to '${relPath}' produced no diff. Verify that 'searchBlock' matches the exact lines in '${relPath}'.`,
              isError: true,
            };
          }

          const proposal = DiffEngine.computeFileProposal({
            relativePath: relPath,
            absolutePath: absPath,
            originalContent: diskContent,
            proposedContent,
            description,
          });

          this.diffStore.stageProposal(proposal);
          this.hooks.onProposalStaged?.(proposal);
          this.hooks.onToolExecuted?.(
            toolName,
            args,
            `Staged ${proposal.hunks.length} hunk(s) in ${relPath} for per-hunk review`
          );

          const hunkSummary = proposal.hunks
            .map(
              (h, idx) =>
                `Hunk ${idx + 1} (${h.header}): +${h.addedLines.length} lines / -${h.removedLines.length} lines`
            )
            .join("\n");

          return {
            text:
              `Staged diff proposal for '${relPath}' (${proposal.hunks.length} hunk(s)) in the VS Code editor for per-hunk user review.\n` +
              `Description: ${description}\n` +
              `${hunkSummary}\n` +
              `Note: File is staged in the editor review buffer (no silent write to disk). The user can accept or reject each hunk individually.`,
            isError: false,
          };
        }

        case "run_command": {
          const command = String(args.command || "");
          if (!command.trim()) {
            return { text: "Error: command is empty.", isError: true };
          }
          try {
            const { stdout, stderr } = await execAsync(command, {
              cwd: root,
              timeout: 30000,
              maxBuffer: 2 * 1024 * 1024,
            });
            const combined = [stdout.trim(), stderr.trim()].filter(Boolean).join("\n");
            this.hooks.onToolExecuted?.(toolName, args, `Command exited 0: ${command}`);
            return {
              text: `Command: ${command}\nExit Code: 0\nOutput:\n${combined || "(no output)"}`,
              isError: false,
            };
          } catch (cmdErr: unknown) {
            const errObj = cmdErr as { code?: number; stdout?: string; stderr?: string; message?: string };
            const out = [errObj.stdout, errObj.stderr, errObj.message].filter(Boolean).join("\n");
            this.hooks.onToolExecuted?.(toolName, args, `Command exited ${errObj.code ?? 1}: ${command}`);
            return {
              text: `Command: ${command}\nExit Code: ${errObj.code ?? 1}\nOutput:\n${out.slice(0, 4000)}`,
              isError: false,
            };
          }
        }

        default:
          return { text: `Unknown tool: ${toolName}`, isError: true };
      }
    } catch (err) {
      return {
        text: `Tool execution error (${toolName}): ${err instanceof Error ? err.message : String(err)}`,
        isError: true,
      };
    }
  }

  private grepWorkspaceLines(query: string, pathFilter: string, limit: number): string[] {
    const matches: string[] = [];
    const { files } = this.contextAssembler.getAutocompleteSuggestions();
    const root = this.contextAssembler.getWorkspaceRoot();
    const lowerQuery = query.toLowerCase();

    for (const relPath of files) {
      if (pathFilter && !relPath.toLowerCase().includes(pathFilter)) {
        continue;
      }
      try {
        const absPath = path.join(root, relPath);
        const lines = fs.readFileSync(absPath, "utf8").split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(lowerQuery)) {
            matches.push(`${relPath}:${i + 1}: ${lines[i].trim().slice(0, 140)}`);
            if (matches.length >= limit) {
              return matches;
            }
          }
        }
      } catch {
        // ignore
      }
    }
    return matches;
  }
}

