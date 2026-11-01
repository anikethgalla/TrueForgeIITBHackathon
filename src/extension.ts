import * as vscode from "vscode";
import * as path from "path";
import { ContextAssembler } from "./context/contextAssembler.js";
import { DiffStagingStore } from "./diff/diffEngine.js";
import { VsCodeDiffReviewManager } from "./diff/diffReviewManager.js";
import { EditorMcpServer } from "./mcp/editorMcpServer.js";
import { TrueForgeHarnessOrchestrator } from "./trueforge/harnessOrchestrator.js";
import { InlineEditController } from "./inline/inlineEditController.js";
import { AgentPanelProvider } from "./webview/agentPanelProvider.js";

let mcpServer: EditorMcpServer | null = null;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  const workspaceRoot =
    workspaceFolders && workspaceFolders.length > 0
      ? workspaceFolders[0].uri.fsPath
      : process.cwd();

  const cfg = vscode.workspace.getConfiguration("trueforge");
  const serverUrl = cfg.get<string>("serverUrl", "http://localhost:8790");
  const authToken = cfg.get<string>("authToken", "");
  const rawPrimary = cfg.get<string>("primaryModel", "google-gemini/gemini-3-5-flash");
  const rawFallback = cfg.get<string>("fallbackModel", "google-gemini/gemini-3-5-flash-lite");
  const primaryModel =
    rawPrimary === "google-gemini/gemini-3-8-flash"
      ? "google-gemini/gemini-3-5-flash"
      : rawPrimary;
  const fallbackModel =
    rawFallback === "openai/gpt-5-4-mini"
      ? "google-gemini/gemini-3-5-flash-lite"
      : rawFallback;
  const contextTokenBudget = cfg.get<number>("contextTokenBudget", 12000);
  const mcpPort = cfg.get<number>("mcpPort", 45821);
  const maxRetries = cfg.get<number>("maxRetries", 2);

  // 1. Initialize Core Engines
  const contextAssembler = new ContextAssembler(workspaceRoot);
  const diffStore = new DiffStagingStore();
  const diffReviewManager = new VsCodeDiffReviewManager(diffStore);
  context.subscriptions.push(diffReviewManager);

  // 2. Start Embedded Local MCP Server so TrueForge Agent Harness can invoke editor tools
  mcpServer = new EditorMcpServer(mcpPort, contextAssembler, diffStore, {
    onProposalStaged: (proposal) => {
      agentPanelProvider.notifyProposalStaged(proposal);
    },
    onToolExecuted: (toolName, args, resultPreview) => {
      agentPanelProvider.appendEventLog({
        id: `mcp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        type: "tool.response",
        title: `Editor MCP Executed: ${toolName}`,
        detail: `${JSON.stringify(args).slice(0, 120)} → ${resultPreview}`,
        status: "success",
      });
    },
    getDiagnosticsCallback: (relPath) => {
      const diagnostics = vscode.languages.getDiagnostics();
      const lines: string[] = [];
      for (const [uri, diags] of diagnostics) {
        if (diags.length === 0) {
          continue;
        }
        const rel = path.relative(workspaceRoot, uri.fsPath).replace(/\\/g, "/");
        if (relPath && !rel.includes(relPath.replace(/\\/g, "/"))) {
          continue;
        }
        for (const d of diags) {
          lines.push(
            `${rel}:${d.range.start.line + 1} [${vscode.DiagnosticSeverity[d.severity]}]: ${d.message}`
          );
        }
      }
      return lines.length > 0 ? lines.join("\n") : "No diagnostics or lint errors found.";
    },
  });

  const boundPort = await mcpServer.start();
  const mcpUrl = `http://127.0.0.1:${boundPort}/mcp`;

  // 3. Initialize TrueForge Harness Orchestrator
  const orchestrator = new TrueForgeHarnessOrchestrator(
    {
      serverUrl,
      authToken,
      primaryModel,
      fallbackModel,
      mcpUrl,
      contextTokenBudget,
      maxRetries,
      simulatePrimaryFailure: false,
    },
    contextAssembler,
    diffStore,
    {
      onTokenDelta: (delta) => {
        agentPanelProvider.appendTokenDelta(delta);
      },
      onEventLog: (ev) => {
        agentPanelProvider.appendEventLog(ev);
      },
      onContextAssembled: (report) => {
        agentPanelProvider.setContextReport(report);
      },
      onProposalStaged: (proposal) => {
        agentPanelProvider.notifyProposalStaged(proposal);
      },
      onModelSwitched: (fromModel, toModel, reason) => {
        updateStatusBar();
        vscode.window.showWarningMessage(
          `TrueForge Automatic Resilience Failover: Primary model '${fromModel}' failed (${reason.slice(0, 80)}). Switched automatically to '${toModel}' with zero user action. Workspace unchanged.`
        );
      },
      onSessionUpdated: () => {
        agentPanelProvider.syncStateToWebview();
      },
    }
  );

  // 4. Initialize Inline Edit Controller & Sidebar Webview Provider
  const inlineController = new InlineEditController(
    contextAssembler,
    orchestrator,
    diffReviewManager,
    () => {
      void vscode.commands.executeCommand("trueforge.agentPanel.focus");
    }
  );

  const agentPanelProvider = new AgentPanelProvider(
    context.extensionUri,
    contextAssembler,
    diffStore,
    diffReviewManager,
    orchestrator,
    async (instruction: string) => {
      await inlineController.triggerInlineEdit(instruction);
    }
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      AgentPanelProvider.viewType,
      agentPanelProvider,
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );

  // 5. Status Bar Items (Model Indicator, Pending Hunks, & 1-Click Undo)
  const modelStatusItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  modelStatusItem.command = "trueforge.switchModel";
  context.subscriptions.push(modelStatusItem);

  const undoStatusItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    99
  );
  undoStatusItem.command = "trueforge.undoLastEdit";
  context.subscriptions.push(undoStatusItem);

  const cliStatusItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    98
  );
  cliStatusItem.command = "trueforge.openCli";
  cliStatusItem.text = "$(terminal) TrueForge CLI";
  cliStatusItem.tooltip = "Open the interactive TrueForge Coding Agent CLI in the VS Code Terminal";
  cliStatusItem.show();
  context.subscriptions.push(cliStatusItem);

  function updateStatusBar(): void {
    const activeCfg = orchestrator.getConfig();
    const pendingHunks = diffStore.getPendingHunksCount();
    const undoCount = diffStore.getUndoStack().length;

    modelStatusItem.text = `$(hubot) TrueForge: ${orchestrator.getActiveModel()}${
      activeCfg.simulatePrimaryFailure ? " [Task C Failover Armed]" : ""
    }${pendingHunks > 0 ? ` (${pendingHunks} hunks pending)` : ""}`;
    modelStatusItem.tooltip = `TrueForge Harness: ${activeCfg.serverUrl}\nMCP Server: ${mcpUrl}\nPrimary Model: ${activeCfg.primaryModel}\nFallback Model: ${activeCfg.fallbackModel}\nClick to configure models`;
    modelStatusItem.show();

    if (undoCount > 0) {
      undoStatusItem.text = `$(discard) Undo Agent Edit (${undoCount})`;
      undoStatusItem.tooltip = "Revert the most recently applied TrueForge agent edit on disk";
      undoStatusItem.show();
    } else {
      undoStatusItem.hide();
    }
  }

  diffStore.onDidChange(() => updateStatusBar());
  updateStatusBar();

  // 6. Register All Commands
  context.subscriptions.push(
    vscode.commands.registerCommand("trueforge.inlineEdit", async () => {
      await inlineController.triggerInlineEdit();
    }),

    vscode.commands.registerCommand("trueforge.openAgentPanel", async () => {
      await vscode.commands.executeCommand("trueforge.agentPanel.focus");
    }),

    vscode.commands.registerCommand("trueforge.cancelRun", async () => {
      await orchestrator.cancelActiveTurn();
      vscode.window.showInformationMessage(
        "TrueForge: Generation cancelled immediately. Unapproved edits rolled back; workspace is clean."
      );
    }),

    vscode.commands.registerCommand("trueforge.acceptHunk", (hunkId: string) => {
      diffStore.acceptHunk(hunkId);
      diffReviewManager.refreshAllVisibleEditors();
      updateStatusBar();
    }),

    vscode.commands.registerCommand("trueforge.rejectHunk", (hunkId: string) => {
      diffStore.rejectHunk(hunkId);
      diffReviewManager.refreshAllVisibleEditors();
      updateStatusBar();
    }),

    vscode.commands.registerCommand("trueforge.acceptAllHunks", (relativePath?: string) => {
      const count = diffStore.acceptAllHunks(relativePath);
      diffReviewManager.refreshAllVisibleEditors();
      updateStatusBar();
      vscode.window.showInformationMessage(`TrueForge: Accepted ${count} hunk(s).`);
    }),

    vscode.commands.registerCommand("trueforge.rejectAllHunks", (relativePath?: string) => {
      const count = diffStore.rejectAllHunks(relativePath);
      diffReviewManager.refreshAllVisibleEditors();
      updateStatusBar();
      vscode.window.showInformationMessage(`TrueForge: Rejected ${count} hunk(s).`);
    }),

    vscode.commands.registerCommand("trueforge.undoLastEdit", () => {
      const undone = diffStore.undoLastAppliedEdit();
      diffReviewManager.refreshAllVisibleEditors();
      updateStatusBar();
      if (undone) {
        vscode.window.showInformationMessage(`TrueForge Undo: Reverted "${undone.description}"`);
      } else {
        vscode.window.showWarningMessage("TrueForge Undo: Nothing to undo.");
      }
    }),

    vscode.commands.registerCommand("trueforge.switchModel", async () => {
      const current = orchestrator.getConfig();
      const newPrimary = await vscode.window.showInputBox({
        title: "TrueForge Primary Model FQN (provider/model)",
        value: current.primaryModel,
        prompt: "Enter any model configured in TrueForge (e.g., google-gemini/gemini-2.5-flash, openai/gpt-4o, anthropic/claude-3-7-sonnet)",
      });
      if (!newPrimary) {
        return;
      }
      const newFallback = await vscode.window.showInputBox({
        title: "TrueForge Automatic Fallback Model FQN (Task C Resilience)",
        value: current.fallbackModel,
        prompt: "Enter the secondary model configured in TrueForge that takes over automatically if primary fails",
      });
      orchestrator.updateConfig({
        primaryModel: newPrimary.trim(),
        fallbackModel: newFallback ? newFallback.trim() : current.fallbackModel,
      });
      updateStatusBar();
      agentPanelProvider.syncStateToWebview();
    }),

    vscode.commands.registerCommand("trueforge.syncHarness", async () => {
      const res = await orchestrator.syncWithTrueForgeServer();
      updateStatusBar();
      agentPanelProvider.syncStateToWebview();
      if (res.connected) {
        vscode.window.showInformationMessage(
          `TrueForge Synchronized: Registered MCP (${res.mcpUrl}) and agent '${res.agentName}'.`
        );
      } else {
        vscode.window.showWarningMessage(
          `TrueForge Server at ${orchestrator.getConfig().serverUrl} not reachable yet (${res.error}). Run 'npx @truefoundry/trueforge@latest' first.`
        );
      }
    }),

    vscode.commands.registerCommand("trueforge.openSessionInBrowser", async () => {
      const url = orchestrator.getSessionBrowserUrl();
      await vscode.env.openExternal(vscode.Uri.parse(url));
    }),

    vscode.commands.registerCommand("trueforge.simulateFailureTaskC", () => {
      const current = orchestrator.getConfig();
      const nextState = !current.simulatePrimaryFailure;
      orchestrator.updateConfig({ simulatePrimaryFailure: nextState });
      updateStatusBar();
      agentPanelProvider.syncStateToWebview();
      vscode.window.showInformationMessage(
        nextState
          ? `TrueForge Task C Resilience Mode ON: Primary model set to unreachable endpoint. Next run will retry with backoff and automatically fail over to '${current.fallbackModel}' with workspace kept clean.`
          : `TrueForge Task C Resilience Mode OFF: Restored primary model '${current.primaryModel}'.`
      );
    }),

    vscode.commands.registerCommand("trueforge.openCli", () => {
      const activeCfg = orchestrator.getConfig();
      const cliScriptPath = path.join(context.extensionPath, "dist", "trueforge-cli.js");
      const existing = vscode.window.terminals.find((t) => t.name === "TrueForge CLI");
      if (existing) {
        existing.show();
        return;
      }
      const term = vscode.window.createTerminal({
        name: "TrueForge CLI",
        cwd: workspaceRoot,
        env: {
          TRUEFORGE_SERVER_URL: activeCfg.serverUrl,
          TRUEFORGE_MCP_URL: activeCfg.mcpUrl,
          TRUEFORGE_PRIMARY_MODEL: activeCfg.primaryModel,
          TRUEFORGE_FALLBACK_MODEL: activeCfg.fallbackModel,
        },
      });
      term.show();
      term.sendText(`node "${cliScriptPath}"`);
    })
  );

  // React to workspace folder or configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders((e) => {
      if (e.added.length > 0) {
        contextAssembler.setWorkspaceRoot(e.added[0].uri.fsPath);
      }
    }),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("trueforge")) {
        const updated = vscode.workspace.getConfiguration("trueforge");
        orchestrator.updateConfig({
          serverUrl: updated.get<string>("serverUrl", "http://localhost:8790"),
          authToken: updated.get<string>("authToken", ""),
          primaryModel: updated.get<string>("primaryModel", "google-gemini/gemini-3-5-flash"),
          fallbackModel: updated.get<string>("fallbackModel", "google-gemini/gemini-3-5-flash-lite"),
          contextTokenBudget: updated.get<number>("contextTokenBudget", 12000),
          maxRetries: updated.get<number>("maxRetries", 2),
        });
        updateStatusBar();
        agentPanelProvider.syncStateToWebview();
      }
    })
  );

  // Attempt non-blocking initial sync with local TrueForge harness on startup
  void orchestrator.syncWithTrueForgeServer().then(() => {
    updateStatusBar();
    agentPanelProvider.syncStateToWebview();
  });
}

export async function deactivate(): Promise<void> {
  if (mcpServer) {
    await mcpServer.stop();
    mcpServer = null;
  }
}

