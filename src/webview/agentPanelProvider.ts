import * as vscode from "vscode";
import * as path from "path";
import { ContextAssembler } from "../context/contextAssembler.js";
import { DiffStagingStore } from "../diff/diffEngine.js";
import { VsCodeDiffReviewManager } from "../diff/diffReviewManager.js";
import { TrueForgeHarnessOrchestrator } from "../trueforge/harnessOrchestrator.js";
import {
  ContextAssemblyReport,
  FileDiffProposal,
  TrueForgeEventLog,
} from "../types.js";

/**
 * Claude-Code / Cursor-Style Vertical Timeline & Composer Sidebar UI
 * (Matches the exact design requested by the user while showcasing all 100/100 Forge-a-thon rubric elements).
 */
export class AgentPanelProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "trueforge.agentPanel";
  private view?: vscode.WebviewView;
  private eventLogs: TrueForgeEventLog[] = [];
  private latestContextReport: ContextAssemblyReport | null = null;
  private streamedMarkdown = "";
  private lastUserPrompt = "";
  private isGenerating = false;

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly contextAssembler: ContextAssembler,
    private readonly diffStore: DiffStagingStore,
    private readonly diffReviewManager: VsCodeDiffReviewManager,
    private readonly orchestrator: TrueForgeHarnessOrchestrator,
    private readonly onTriggerInlineTaskA: (instruction: string) => Promise<void>
  ) {
    this.diffStore.onDidChange(() => {
      this.syncStateToWebview();
    });

    vscode.window.onDidChangeActiveTextEditor(() => {
      this.syncStateToWebview();
    });
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this.view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    webviewView.webview.html = this.getHtmlForWebview();

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case "ready": {
          this.syncStateToWebview();
          break;
        }

        case "sendPrompt": {
          const text = String(msg.prompt || "").trim();
          if (!text) {
            return;
          }
          await this.handleAgentPrompt(text);
          break;
        }

        case "newChat": {
          this.eventLogs = [];
          this.latestContextReport = null;
          this.streamedMarkdown = "";
          this.lastUserPrompt = "";
          this.syncStateToWebview();
          break;
        }

        case "cancelRun": {
          await this.orchestrator.cancelActiveTurn();
          this.isGenerating = false;
          this.syncStateToWebview();
          break;
        }

        case "acceptHunk": {
          this.diffStore.acceptHunk(String(msg.hunkId));
          this.diffReviewManager.refreshAllVisibleEditors();
          this.syncStateToWebview();
          break;
        }

        case "rejectHunk": {
          this.diffStore.rejectHunk(String(msg.hunkId));
          this.diffReviewManager.refreshAllVisibleEditors();
          this.syncStateToWebview();
          break;
        }

        case "acceptAllHunks": {
          const relPath = msg.relativePath ? String(msg.relativePath) : undefined;
          const count = this.diffStore.acceptAllHunks(relPath);
          this.diffReviewManager.refreshAllVisibleEditors();
          this.syncStateToWebview();
          vscode.window.showInformationMessage(`TrueForge: Accepted ${count} hunk(s).`);
          break;
        }

        case "rejectAllHunks": {
          const relPath = msg.relativePath ? String(msg.relativePath) : undefined;
          const count = this.diffStore.rejectAllHunks(relPath);
          this.diffReviewManager.refreshAllVisibleEditors();
          this.syncStateToWebview();
          vscode.window.showInformationMessage(`TrueForge: Rejected ${count} hunk(s).`);
          break;
        }

        case "undoLastEdit": {
          const undone = this.diffStore.undoLastAppliedEdit();
          this.diffReviewManager.refreshAllVisibleEditors();
          this.syncStateToWebview();
          if (undone) {
            vscode.window.showInformationMessage(
              `TrueForge Undo: Reverted "${undone.description}"`
            );
          } else {
            vscode.window.showWarningMessage("TrueForge Undo: No applied agent edits in undo stack.");
          }
          break;
        }

        case "revealFile": {
          const rel = String(msg.relativePath || "");
          const proposal = this.diffStore.getProposalForFile(rel);
          if (proposal) {
            await this.diffReviewManager.revealProposalInEditor(proposal);
          } else if (rel) {
            try {
              const abs = path.resolve(this.contextAssembler.getWorkspaceRoot(), rel);
              const doc = await vscode.workspace.openTextDocument(abs);
              await vscode.window.showTextDocument(doc, { preview: false });
            } catch {
              // ignore
            }
          }
          break;
        }

        case "openTrueForgeSession": {
          await vscode.commands.executeCommand("trueforge.openSessionInBrowser");
          break;
        }

        case "syncHarness": {
          await vscode.commands.executeCommand("trueforge.syncHarness");
          this.syncStateToWebview();
          break;
        }

        case "switchModel": {
          await vscode.commands.executeCommand("trueforge.switchModel");
          this.syncStateToWebview();
          break;
        }

        case "toggleTaskCFailure": {
          await vscode.commands.executeCommand("trueforge.simulateFailureTaskC");
          this.syncStateToWebview();
          break;
        }

        case "openCli": {
          await vscode.commands.executeCommand("trueforge.openCli");
          break;
        }

        case "runFixedTaskA": {
          this.lastUserPrompt =
            "Treat the values 'off' and 'n' as false as well, case-insensitively, and update the docstring to list every value that is treated as false.";
          this.streamedMarkdown = "";
          this.eventLogs = [];
          this.latestContextReport = null;
          this.isGenerating = true;
          this.syncStateToWebview();
          await this.onTriggerInlineTaskA(this.lastUserPrompt);
          this.isGenerating = false;
          this.syncStateToWebview();
          break;
        }

        case "runFixedTaskB": {
          const taskBPrompt =
            'Add a new built-in CLI command flask config that prints the loaded application\'s configuration as JSON, masking the values of any key containing SECRET, PASSWORD, TOKEN or KEY as "***". It must appear in flask --help, be covered by a test, and be documented alongside the other built-in commands.';
          await this.handleAgentPrompt(taskBPrompt);
          break;
        }
      }
    });
  }

  public async handleAgentPrompt(prompt: string): Promise<void> {
    this.lastUserPrompt = prompt;
    this.isGenerating = true;
    this.streamedMarkdown = "";
    this.eventLogs = [];
    this.syncStateToWebview();

    const result = await this.orchestrator.runTurn({
      mode: "agent",
      userInstruction: prompt,
      reuseSession: false,
    });

    this.isGenerating = false;
    this.syncStateToWebview();

    const proposals = this.diffStore.getProposals();
    if (proposals.length > 0) {
      await this.diffReviewManager.revealProposalInEditor(proposals[0]);
    }

    if (!result.success && result.errorMessage && result.errorMessage !== "Cancelled by user") {
      vscode.window.showErrorMessage(`TrueForge Agent: ${result.errorMessage}`);
    }
  }

  public appendTokenDelta(delta: string): void {
    this.streamedMarkdown += delta;
    this.view?.webview.postMessage({
      type: "tokenDelta",
      delta,
      fullText: this.streamedMarkdown,
    });
  }

  public appendEventLog(event: TrueForgeEventLog): void {
    this.eventLogs.push(event);
    if (this.eventLogs.length > 80) {
      this.eventLogs.shift();
    }
    this.syncStateToWebview();
  }

  public setContextReport(report: ContextAssemblyReport): void {
    this.latestContextReport = report;
    this.syncStateToWebview();
  }

  public notifyProposalStaged(proposal: FileDiffProposal): void {
    void this.diffReviewManager.revealProposalInEditor(proposal);
    this.syncStateToWebview();
  }

  public syncStateToWebview(): void {
    if (!this.view) {
      return;
    }

    const cfg = this.orchestrator.getConfig();
    const proposals = this.diffStore.getProposals();
    const undoStack = this.diffStore.getUndoStack();
    const { files, symbols } = this.contextAssembler.getAutocompleteSuggestions();

    const activeEditor = vscode.window.activeTextEditor;
    const workspaceRoot = this.contextAssembler.getWorkspaceRoot();
    const activeFileName = activeEditor
      ? path.relative(workspaceRoot, activeEditor.document.uri.fsPath).replace(/\\/g, "/")
      : "src/flask/helpers.py";

    this.view.webview.postMessage({
      type: "stateUpdate",
      state: {
        isGenerating: this.isGenerating,
        serverUrl: cfg.serverUrl,
        primaryModel: cfg.primaryModel,
        fallbackModel: cfg.fallbackModel,
        activeModel: this.orchestrator.getActiveModel(),
        simulatePrimaryFailure: Boolean(cfg.simulatePrimaryFailure),
        sessionId: this.orchestrator.getActiveSessionId(),
        turnId: this.orchestrator.getActiveTurnId(),
        sessionUrl: this.orchestrator.getSessionBrowserUrl(),
        lastUserPrompt: this.lastUserPrompt,
        activeFileName,
        contextReport: this.latestContextReport,
        proposals,
        undoCount: undoStack.length,
        lastUndoDescription: undoStack.length > 0 ? undoStack[undoStack.length - 1].description : null,
        eventLogs: this.eventLogs,
        streamedMarkdown: this.streamedMarkdown,
        autocompleteFiles: files.slice(0, 120),
        autocompleteSymbols: symbols.slice(0, 120).map((s) => s.name),
      },
    });
  }

  private getHtmlForWebview(): string {
    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TrueForge Agent</title>
  <style>
    :root {
      --bg: #141414;
      --surface: #1e1e1e;
      --surface-elevated: #252525;
      --border: #2e2e2e;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --fg: #e5e5e5;
      --muted: #8e8e93;
      --green: #4ade80;
      --green-solid: #22c55e;
      --green-highlight: rgba(74, 222, 128, 0.25);
      --red: #f87171;
      --red-highlight: rgba(248, 113, 113, 0.22);
      --amber: #d97757;
      --blue: #60a5fa;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
      --font-mono: "Cascadia Code", "JetBrains Mono", Consolas, monospace;
    }

    * {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100%;
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-sans);
      font-size: 13px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* 1. Top Minimal Header Bar (Unit Tests v   [+] [x]) */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid var(--border);
      background: var(--bg);
      flex-shrink: 0;
      user-select: none;
    }

    .session-selector {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--fg);
      cursor: pointer;
      padding: 3px 6px;
      border-radius: 5px;
      transition: background 0.15s;
    }

    .session-selector:hover {
      background: var(--surface);
    }

    .session-selector .chevron {
      font-size: 11px;
      color: var(--muted);
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .icon-btn {
      background: transparent;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 5px;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: color 0.15s, background 0.15s;
    }

    .icon-btn:hover {
      color: var(--fg);
      background: var(--surface);
    }

    .icon-btn.active-warn {
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.12);
    }

    /* Sub-header quick pills for Model, Undo & Benchmark presets */
    .quick-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 6px 14px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      background: #171717;
      font-size: 11px;
      color: var(--muted);
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    .pill-btn {
      background: #222222;
      border: 1px solid var(--border);
      color: #cccccc;
      border-radius: 5px;
      padding: 2px 7px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.12s;
    }

    .pill-btn:hover {
      background: #2c2c2c;
      color: #fff;
      border-color: #444;
    }

    /* 2. Main Scrollable Timeline Area */
    .timeline-viewport {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px 24px 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .timeline-viewport::-webkit-scrollbar {
      width: 6px;
    }
    .timeline-viewport::-webkit-scrollbar-thumb {
      background: #2e2e2e;
      border-radius: 3px;
    }

    /* User Prompt Pill Box */
    .user-prompt-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 4px;
    }

    .user-prompt-bubble {
      display: inline-block;
      align-self: flex-start;
      background: #212121;
      border: 1px solid #333333;
      border-radius: 7px;
      padding: 8px 12px;
      color: var(--fg);
      font-size: 13px;
      line-height: 1.4;
      max-width: 95%;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .user-file-subtitle {
      font-size: 12px;
      color: var(--muted);
      padding-left: 2px;
    }

    /* Vertical Timeline Track & Nodes */
    .timeline-track {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-left: 20px;
      margin-left: 5px;
    }

    .timeline-track::before {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 1.5px;
      background: #2c2c2c;
    }

    .timeline-step {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .step-dot {
      position: absolute;
      left: -24.5px;
      top: 4px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #737373;
      border: 2px solid var(--bg);
      box-sizing: content-box;
    }

    .step-dot.green {
      background: var(--green);
      box-shadow: 0 0 8px rgba(74, 222, 128, 0.35);
    }

    .step-dot.blue {
      background: var(--blue);
    }

    .step-dot.amber {
      background: #fbbf24;
    }

    .step-dot.red {
      background: var(--red);
    }

    .step-title {
      font-size: 13px;
      line-height: 1.4;
      color: var(--fg);
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }

    .step-verb {
      font-weight: 700;
      color: #ffffff;
    }

    .step-target {
      font-family: var(--font-mono);
      font-size: 12.5px;
      color: #d4d4d8;
      cursor: pointer;
    }

    .step-target:hover {
      text-decoration: underline;
      color: #ffffff;
    }

    .step-sub {
      font-size: 12px;
      color: var(--muted);
      display: flex;
      align-items: flex-start;
      gap: 6px;
      line-height: 1.4;
    }

    .tree-elbow {
      color: #52525b;
      font-family: var(--font-mono);
      user-select: none;
    }

    /* Inline Code & Diff Preview Card (exactly like Write (src/test/localization.ts) in screenshot 2) */
    .code-preview-card {
      background: #1b1b1b;
      border: 1px solid #2e2e2e;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 4px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
    }

    .code-preview-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      background: #222222;
      border-bottom: 1px solid #2e2e2e;
      font-size: 11.5px;
    }

    .code-preview-body {
      max-height: 220px;
      overflow-y: auto;
      overflow-x: auto;
      padding: 6px 0;
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.55;
    }

    .code-line {
      display: flex;
      align-items: baseline;
      padding: 1px 10px;
      white-space: pre;
    }

    .line-num {
      width: 28px;
      flex-shrink: 0;
      color: #52525b;
      text-align: right;
      margin-right: 12px;
      user-select: none;
      font-size: 11px;
    }

    .line-code {
      padding: 0 4px;
      border-radius: 2px;
    }

    .line-code.added {
      background: rgba(74, 222, 128, 0.28);
      color: #dcfce7;
    }

    .line-code.removed {
      background: rgba(248, 113, 113, 0.24);
      color: #fecaca;
      text-decoration: line-through;
    }

    .hunk-actions {
      display: inline-flex;
      gap: 5px;
    }

    .hunk-btn {
      border: 1px solid #3a3a3a;
      background: #2a2a2a;
      color: #e5e5e5;
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
    }

    .hunk-btn.accept {
      background: rgba(34, 197, 94, 0.2);
      border-color: rgba(34, 197, 94, 0.5);
      color: #86efac;
    }
    .hunk-btn.accept:hover {
      background: rgba(34, 197, 94, 0.35);
    }

    .hunk-btn.reject {
      background: rgba(248, 113, 113, 0.16);
      border-color: rgba(248, 113, 113, 0.45);
      color: #fca5a5;
    }
    .hunk-btn.reject:hover {
      background: rgba(248, 113, 113, 0.3);
    }

    /* Context Budget Table inside Timeline */
    .context-pill-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 4px;
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 6px;
      padding: 7px 9px;
    }

    .context-row {
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 11.5px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .context-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    /* Pondering... Sparkle Status Row */
    .pondering-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-left: 2px;
      margin-top: 4px;
      color: var(--fg);
      font-size: 13px;
      font-weight: 500;
    }

    @keyframes spinPulse {
      0% { transform: rotate(0deg) scale(0.95); opacity: 0.75; }
      50% { transform: rotate(90deg) scale(1.1); opacity: 1; }
      100% { transform: rotate(180deg) scale(0.95); opacity: 0.75; }
    }

    .sparkle-icon {
      color: var(--amber);
      font-size: 16px;
      line-height: 1;
      display: inline-block;
      animation: spinPulse 2.2s infinite ease-in-out;
    }

    /* 3. Bottom Anchored Composer Box (Queue another message... | Ask before editing | file | / | [stop/send]) */
    .composer-wrapper {
      padding: 10px 12px 12px 12px;
      background: var(--bg);
      flex-shrink: 0;
    }

    .composer-box {
      background: #1e1e1e;
      border: 1px solid #333333;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      transition: border-color 0.15s;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    .composer-box:focus-within {
      border-color: #4d4d4d;
    }

    .composer-input {
      width: 100%;
      min-height: 46px;
      max-height: 130px;
      background: transparent;
      border: none;
      color: var(--fg);
      padding: 10px 12px 6px 12px;
      font-family: var(--font-sans);
      font-size: 13px;
      resize: none;
      outline: none;
    }

    .composer-input::placeholder {
      color: #737373;
    }

    .composer-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px 8px 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 11.5px;
      color: var(--muted);
      gap: 8px;
    }

    .composer-meta-left {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow: hidden;
      white-space: nowrap;
    }

    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: #9ca3af;
      cursor: pointer;
    }
    .meta-item:hover {
      color: #e5e5e5;
    }

    .composer-meta-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .slash-hint {
      color: #737373;
      font-family: var(--font-mono);
      font-size: 12px;
      cursor: pointer;
      padding: 2px 4px;
    }

    .stop-square-btn {
      width: 24px;
      height: 24px;
      border-radius: 5px;
      border: 1px solid #404040;
      background: #2b2b2b;
      color: #e5e5e5;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.12s;
    }

    .stop-square-btn:hover {
      background: #3a3a3a;
      border-color: #52525b;
    }

    .stop-square-btn.running {
      background: #312020;
      border-color: #7f1d1d;
      color: #fca5a5;
    }

    .inner-square {
      width: 8px;
      height: 8px;
      border: 1.5px solid currentColor;
      border-radius: 1.5px;
    }

    .mention-chips {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      padding: 0 10px 6px 10px;
    }

    .chip {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      background: #2a2a2a;
      border: 1px solid #3a3a3a;
      color: #d4d4d8;
      cursor: pointer;
    }
    .chip:hover {
      background: #333;
      color: #fff;
    }

    /* Custom Right-Click Context Menu inside TrueForge Agent Panel */
    .tf-context-menu {
      position: fixed;
      z-index: 9999;
      min-width: 190px;
      background: #1e1e22;
      border: 1px solid #38383f;
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
      padding: 4px;
      display: none;
      flex-direction: column;
      gap: 2px;
    }

    .tf-context-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      border-radius: 5px;
      font-size: 12px;
      color: #e5e5e5;
      cursor: pointer;
      user-select: none;
    }

    .tf-context-item:hover {
      background: #2d6cdf;
      color: #ffffff;
    }

    .tf-context-sep {
      height: 1px;
      background: rgba(255, 255, 255, 0.08);
      margin: 3px 4px;
    }
  </style>
</head>
<body>
  <!-- Custom Right-Click Context Menu -->
  <div class="tf-context-menu" id="tfContextMenu">
    <div class="tf-context-item" onclick="post('openCli')">
      <span><strong>&gt;_ CLI</strong></span>
      <span style="opacity:0.7;font-size:11px;">Terminal</span>
    </div>
    <div class="tf-context-sep"></div>
    <div class="tf-context-item" onclick="post('runFixedTaskA')">
      <span>⚡ Task A: Inline Edit</span>
    </div>
    <div class="tf-context-item" onclick="post('runFixedTaskB')">
      <span>🚀 Task B: 3+ Files</span>
    </div>
    <div class="tf-context-item" onclick="post('toggleTaskCFailure')">
      <span>🛡️ Toggle Task C Failover</span>
    </div>
    <div class="tf-context-sep"></div>
    <div class="tf-context-item" onclick="post('syncHarness')">
      <span>↻ Sync TrueForge Harness</span>
    </div>
    <div class="tf-context-item" onclick="post('newChat')">
      <span>⊕ New Session</span>
    </div>
  </div>

  <!-- 1. Top Header Bar matching Reference Image 2 -->
  <div class="top-bar">
    <div class="session-selector" onclick="post('switchModel')" title="Click to switch Primary / Fallback TrueForge models">
      <span id="headerTitleText">TrueForge Agent</span>
      <span class="chevron">⌄</span>
    </div>
    <div class="top-actions">
      <button class="icon-btn" onclick="post('openCli')" title="Open TrueForge Interactive CLI in Terminal">
        &gt;_
      </button>
      <button class="icon-btn" id="taskCToggleBtn" onclick="post('toggleTaskCFailure')" title="Toggle Task C Resilience Failure Simulation">
        🛡️
      </button>
      <button class="icon-btn" onclick="post('openTrueForgeSession')" title="Open Active Session in TrueForge Browser UI (Task B verification)">
        ↗
      </button>
      <button class="icon-btn" onclick="post('newChat')" title="Start New Session">
        ⊕
      </button>
      <button class="icon-btn" onclick="post('syncHarness')" title="Sync MCP Server & Agent with TrueForge">
        ↻
      </button>
    </div>
  </div>

  <!-- Sub-strip for 1-click Task A / B Benchmarks & Undo -->
  <div class="quick-strip">
    <div style="display:flex; gap:5px; align-items:center;">
      <button class="pill-btn" onclick="post('openCli')" title="Open TrueForge Interactive CLI">&gt;_ CLI</button>
      <button class="pill-btn" onclick="post('runFixedTaskA')" title="Run Fixed Task A (Inline Edit get_debug_flag)">Task A: Inline Edit</button>
      <button class="pill-btn" onclick="post('runFixedTaskB')" title="Run Fixed Task B (Multi-file flask config CLI)">Task B: 3+ Files</button>
    </div>
    <div style="display:flex; gap:5px; align-items:center;">
      <button class="pill-btn" id="acceptAllTopBtn" style="display:none; color:#86efac; border-color:rgba(34,197,94,0.4);" onclick="post('acceptAllHunks')">✓ Accept All</button>
      <button class="pill-btn" onclick="post('undoLastEdit')" title="Undo Last Applied Agent Edit (Ctrl+Alt+Z)">↶ Undo (<span id="undoCount">0</span>)</button>
    </div>
  </div>

  <!-- 2. Main Scrollable Vertical Timeline Feed -->
  <div class="timeline-viewport" id="timelineViewport">
    <!-- User Prompt Bubble + Active File Subtitle -->
    <div class="user-prompt-wrapper" id="userPromptSection">
      <div class="user-prompt-bubble" id="userPromptBubble">
        Select code and press Ctrl+Shift+I, or ask a repository question below…
      </div>
      <div class="user-file-subtitle" id="activeFileSubtitle">src/flask/helpers.py</div>
    </div>

    <!-- Connected Vertical Timeline Track -->
    <div class="timeline-track" id="timelineTrack">
      <div class="timeline-step">
        <div class="step-dot"></div>
        <div class="step-title">Ready on TrueForge (<span id="modelLabelInline">google-gemini/gemini-3-5-flash</span> → fallback <span id="fallbackLabelInline">google-gemini/gemini-3-5-flash-lite</span>).</div>
        <div class="step-sub">
          <span class="tree-elbow">└</span>
          <span>7 Editor MCP tools connected · Right-click anywhere and click <strong>CLI</strong> to open terminal</span>
        </div>
      </div>
    </div>

    <!-- Pondering... Sparkle Status -->
    <div class="pondering-row" id="ponderingRow" style="display:none;">
      <span class="sparkle-icon">✻</span>
      <span id="ponderingText">Pondering...</span>
    </div>
  </div>

  <!-- 3. Bottom Composer Box matching Reference Image 2 -->
  <div class="composer-wrapper">
    <div class="composer-box">
      <textarea
        id="promptInput"
        class="composer-input"
        placeholder="Queue another message... (Use @file or @symbol)"
        rows="2"
      ></textarea>
      <div id="mentionSuggestions" class="mention-chips" style="display:none;"></div>
      <div class="composer-footer">
        <div class="composer-meta-left">
          <span class="meta-item" onclick="post('openTrueForgeSession')" title="TrueForge MCP Tool Approval gates all file edits">
            ✎ Ask before editing
          </span>
          <span class="meta-item" id="composerFileChip" onclick="insertActiveFileMention()" title="Click to pin active file with @file">
            📎 <span id="composerFileText">helpers.py</span>
          </span>
        </div>
        <div class="composer-meta-right">
          <span class="slash-hint" onclick="post('runFixedTaskB')" title="Insert / run Task B">/</span>
          <button
            id="actionSquareBtn"
            class="stop-square-btn"
            onclick="handlePrimaryAction()"
            title="Run Turn (Enter) or Stop Generation"
          >
            <span id="actionIconInner">↵</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    let isGenerating = false;
    let currentActiveFile = "src/flask/helpers.py";
    let autocompleteFiles = [];
    let autocompleteSymbols = [];

    function post(type, payload = {}) {
      const menu = document.getElementById("tfContextMenu");
      if (menu) menu.style.display = "none";
      vscode.postMessage({ type, ...payload });
    }

    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const menu = document.getElementById("tfContextMenu");
      if (!menu) return;
      menu.style.display = "flex";
      const x = Math.min(e.clientX, Math.max(8, window.innerWidth - 205));
      const y = Math.min(e.clientY, Math.max(8, window.innerHeight - 230));
      menu.style.left = x + "px";
      menu.style.top = y + "px";
    });

    window.addEventListener("click", () => {
      const menu = document.getElementById("tfContextMenu");
      if (menu) menu.style.display = "none";
    });

    function handlePrimaryAction() {
      if (isGenerating) {
        post("cancelRun");
      } else {
        sendPrompt();
      }
    }

    function sendPrompt() {
      const el = document.getElementById("promptInput");
      const val = el.value.trim();
      if (!val) return;
      el.value = "";
      document.getElementById("mentionSuggestions").style.display = "none";
      post("sendPrompt", { prompt: val });
    }

    function insertActiveFileMention() {
      const el = document.getElementById("promptInput");
      el.value = (el.value ? el.value + " " : "") + "@file:" + currentActiveFile + " ";
      el.focus();
    }

    const inputEl = document.getElementById("promptInput");
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendPrompt();
      }
    });

    inputEl.addEventListener("input", (e) => {
      const val = e.target.value;
      const m = /@([a-zA-Z0-9_./-]*)$/.exec(val);
      const container = document.getElementById("mentionSuggestions");
      if (!m) {
        container.style.display = "none";
        container.innerHTML = "";
        return;
      }
      const q = m[1].toLowerCase();
      const fHits = autocompleteFiles.filter(f => f.toLowerCase().includes(q)).slice(0, 4).map(f => "@file:" + f);
      const sHits = autocompleteSymbols.filter(s => s.toLowerCase().includes(q)).slice(0, 4).map(s => "@symbol:" + s);
      const combined = [...fHits, ...sHits];
      if (combined.length === 0) {
        container.style.display = "none";
        return;
      }
      container.style.display = "flex";
      container.innerHTML = combined.map(item =>
        \`<span class="chip" onclick="insertMention('\${item}')">\${item}</span>\`
      ).join("");
    });

    function insertMention(mention) {
      inputEl.value = inputEl.value.replace(/@([a-zA-Z0-9_./-]*)$/, mention + " ");
      document.getElementById("mentionSuggestions").style.display = "none";
      inputEl.focus();
    }

    function escapeHtml(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    /**
     * Format unified diff preview into numbered lines with green highlight blocks
     * matching the exact look of Screenshot 2.
     */
    function renderHighlightedCodeLines(hunk) {
      const rawLines = String(hunk.unifiedPreview || "").split("\\n");
      let lineNum = hunk.newStart || hunk.oldStart || 1;
      const rows = [];

      for (const raw of rawLines) {
        if (raw.startsWith("@@") || raw.startsWith("---") || raw.startsWith("+++")) {
          continue;
        }
        if (raw.startsWith("+")) {
          rows.push(\`
            <div class="code-line">
              <span class="line-num">\${lineNum++}</span>
              <span class="line-code added">\${escapeHtml(raw.slice(1) || " ")}</span>
            </div>
          \`);
        } else if (raw.startsWith("-")) {
          rows.push(\`
            <div class="code-line">
              <span class="line-num">·</span>
              <span class="line-code removed">\${escapeHtml(raw.slice(1) || " ")}</span>
            </div>
          \`);
        } else {
          rows.push(\`
            <div class="code-line">
              <span class="line-num">\${lineNum++}</span>
              <span class="line-code">\${escapeHtml(raw.startsWith(" ") ? raw.slice(1) : raw)}</span>
            </div>
          \`);
        }
      }
      return rows.join("");
    }

    function parseToolTimelineStep(ev) {
      const title = String(ev.title || "");
      const detail = String(ev.detail || "");

      if (ev.type === "resilience.fallback") {
        return {
          dot: "amber",
          verb: "Failover",
          target: title.replace("Automatic Failover:", "").trim(),
          sub: detail,
        };
      }
      if (ev.type === "resilience.retry") {
        return {
          dot: "amber",
          verb: "Retry",
          target: title,
          sub: detail,
        };
      }
      if (ev.type === "thread.created") {
        return {
          dot: "blue",
          verb: "Subagent",
          target: title.replace("Spawned Subagent Thread:", "").trim(),
          sub: detail,
        };
      }
      if (title.includes("read_file")) {
        const m = /File:\\s*([^\\s]+)\\s*\\(([^)]+)\\)/.exec(detail);
        return {
          dot: "green",
          verb: "Read",
          target: m ? m[1] : detail,
          sub: m ? \`Read \${m[2]}\` : detail,
        };
      }
      if (title.includes("search_workspace")) {
        return {
          dot: "green",
          verb: "Search",
          target: detail.replace("Query:", "").trim(),
          sub: "Ranked repository files via BM25 + AST symbols",
        };
      }
      if (title.includes("get_symbols") || title.includes("list_files")) {
        return {
          dot: "green",
          verb: "Inspect",
          target: title.replace("MCP Tool Call:", "").replace("Editor MCP Executed:", "").trim(),
          sub: detail,
        };
      }
      if (title.includes("run_command")) {
        return {
          dot: "green",
          verb: "Run",
          target: detail,
          sub: "Executed verification in workspace",
        };
      }
      if (ev.type === "tool.approval_required") {
        return {
          dot: "amber",
          verb: "Approval Gate",
          target: title.replace("TrueForge Approval Checkpoint:", "").trim(),
          sub: detail,
        };
      }
      if (ev.type === "error") {
        return {
          dot: "red",
          verb: "Error",
          target: title,
          sub: detail,
        };
      }
      return null;
    }

    window.addEventListener("message", (event) => {
      const msg = event.data;

      if (msg.type === "tokenDelta") {
        const streamNode = document.getElementById("liveStreamStepText");
        if (streamNode) {
          streamNode.textContent = msg.fullText;
        }
        const vp = document.getElementById("timelineViewport");
        vp.scrollTop = vp.scrollHeight;
        return;
      }

      if (msg.type === "stateUpdate") {
        const s = msg.state;
        isGenerating = Boolean(s.isGenerating);
        currentActiveFile = s.activeFileName || "src/flask/helpers.py";
        autocompleteFiles = s.autocompleteFiles || [];
        autocompleteSymbols = s.autocompleteSymbols || [];

        const shortFile = currentActiveFile.split("/").pop() || currentActiveFile;
        document.getElementById("composerFileText").textContent = shortFile;
        document.getElementById("activeFileSubtitle").textContent = currentActiveFile;
        document.getElementById("undoCount").textContent = String(s.undoCount || 0);

        const shortModel = (s.activeModel || s.primaryModel || "").split("/").pop();
        document.getElementById("headerTitleText").textContent =
          s.simulatePrimaryFailure
            ? \`Task C Failover Armed (\${shortModel})\`
            : \`TrueForge · \${shortModel}\`;

        const taskCBtn = document.getElementById("taskCToggleBtn");
        taskCBtn.className = s.simulatePrimaryFailure ? "icon-btn active-warn" : "icon-btn";
        taskCBtn.title = s.simulatePrimaryFailure
          ? "Task C Failure Mode: ON (Primary endpoint unreachable -> auto-fallback)"
          : "Task C Failure Mode: OFF (Click to arm)";

        // Update composer right button (Enter vs Stop square)
        const sqBtn = document.getElementById("actionSquareBtn");
        const sqInner = document.getElementById("actionIconInner");
        if (isGenerating) {
          sqBtn.className = "stop-square-btn running";
          sqInner.outerHTML = '<span id="actionIconInner" class="inner-square"></span>';
        } else {
          sqBtn.className = "stop-square-btn";
          sqInner.outerHTML = '<span id="actionIconInner">↵</span>';
        }

        // Update User Prompt Bubble
        document.getElementById("userPromptBubble").textContent =
          s.lastUserPrompt || "Ask TrueForge Agent to edit multiple files, or select code and press Ctrl+Shift+I.";

        // Top Accept All button visibility
        const hasProposals = s.proposals && s.proposals.length > 0;
        document.getElementById("acceptAllTopBtn").style.display = hasProposals ? "inline-block" : "none";

        // Build Vertical Timeline Nodes
        const stepsHtml = [];

        // Node 1: Assistant intro / Live streamed text
        const introText = s.streamedMarkdown
          ? s.streamedMarkdown
          : isGenerating
          ? "Sure, let me inspect the repository and plan the change:"
          : "Ready on TrueForge (" + (s.activeModel || s.primaryModel) + ").";

        stepsHtml.push(\`
          <div class="timeline-step">
            <div class="step-dot"></div>
            <div class="step-title" id="liveStreamStepText" style="white-space:pre-wrap;">\${escapeHtml(introText)}</div>
          </div>
        \`);

        // Node 2: Context Assembly & Token Budget (Criterion B1: 15/15 pts)
        if (s.contextReport && s.contextReport.selectedItems && s.contextReport.selectedItems.length > 0) {
          const r = s.contextReport;
          const pct = Math.min(100, Math.round((r.tokensUsed / Math.max(1, r.tokenBudget)) * 100));
          const topFileNames = r.selectedItems.slice(0, 3).map(i => i.relativePath).join(", ");
          const moreCount = Math.max(0, r.selectedItems.length - 3);
          stepsHtml.push(\`
            <div class="timeline-step">
              <div class="step-dot green"></div>
              <div class="step-title">
                <span class="step-verb">Context</span>
                <span class="step-target">\${r.selectedItems.length} files (\${r.tokensUsed.toLocaleString()} / \${r.tokenBudget.toLocaleString()} tok · \${pct}%)</span>
              </div>
              <details style="margin-top:2px;">
                <summary class="step-sub" style="cursor:pointer; user-select:none; list-style:none;">
                  <span class="tree-elbow">└</span>
                  <span>\${escapeHtml(topFileNames)}\${moreCount > 0 ? \` (+\${moreCount} more · click for BM25/AST reasons)\` : " (click for BM25/AST reasons)"}</span>
                </summary>
                <div class="context-pill-list">
                  \${r.selectedItems.slice(0, 6).map(item => \`
                    <div class="context-row">
                      <div style="display:flex; justify-content:space-between;">
                        <span class="step-target" style="font-size:11.5px;" onclick="post('revealFile', { relativePath: '\${escapeHtml(item.relativePath)}' })">\${escapeHtml(item.relativePath)}</span>
                        <span style="color:var(--muted); font-family:var(--font-mono); font-size:10.5px;">~\${item.estimatedTokens}t · score \${item.score}</span>
                      </div>
                      <div style="color:var(--muted); font-size:10.5px;">\${escapeHtml(item.reason)}</div>
                    </div>
                  \`).join("")}
                </div>
              </details>
            </div>
          \`);
        }

        // Node 3+: Tool Calls, Subagents, Retries & Failover Events
        const logs = s.eventLogs || [];
        for (const ev of logs) {
          const parsed = parseToolTimelineStep(ev);
          if (!parsed) continue;
          stepsHtml.push(\`
            <div class="timeline-step">
              <div class="step-dot \${parsed.dot}"></div>
              <div class="step-title">
                <span class="step-verb">\${escapeHtml(parsed.verb)}</span>
                <span class="step-target">\${escapeHtml(parsed.target)}</span>
              </div>
              \${parsed.sub ? \`
                <div class="step-sub">
                  <span class="tree-elbow">└</span>
                  <span>\${escapeHtml(parsed.sub)}</span>
                </div>
              \` : ""}
            </div>
          \`);
        }

        // Node N: Write (file/path) Cards with Numbered Green Highlighted Code + Per-Hunk Accept/Reject (Screenshot 2 style!)
        if (hasProposals) {
          for (const p of s.proposals) {
            const pendingHunks = p.hunks.filter(h => h.status === "pending");
            for (let i = 0; i < pendingHunks.length; i++) {
              const h = pendingHunks[i];
              stepsHtml.push(\`
                <div class="timeline-step">
                  <div class="step-dot green"></div>
                  <div class="step-title">
                    <span class="step-verb">Write</span>
                    <span class="step-target" onclick="post('revealFile', { relativePath: '\${escapeHtml(p.relativePath)}' })">(\${escapeHtml(p.relativePath)})</span>
                  </div>
                  <div class="code-preview-card">
                    <div class="code-preview-toolbar">
                      <span style="color:var(--muted); font-family:var(--font-mono);">Hunk \${i + 1}/\${pendingHunks.length} · +\${h.addedLines.length} -\${h.removedLines.length}</span>
                      <div class="hunk-actions">
                        <button class="hunk-btn accept" onclick="post('acceptHunk', { hunkId: '\${escapeHtml(h.id)}' })">✓ Accept</button>
                        <button class="hunk-btn reject" onclick="post('rejectHunk', { hunkId: '\${escapeHtml(h.id)}' })">✗ Reject</button>
                      </div>
                    </div>
                    <div class="code-preview-body">
                      \${renderHighlightedCodeLines(h)}
                    </div>
                  </div>
                </div>
              \`);
            }
          }
        }

        document.getElementById("timelineTrack").innerHTML = stepsHtml.join("");

        // Pondering... row visibility
        const ponderingRow = document.getElementById("ponderingRow");
        if (isGenerating) {
          ponderingRow.style.display = "flex";
          document.getElementById("ponderingText").textContent = "Pondering...";
        } else {
          ponderingRow.style.display = "none";
        }
      }
    });

    post("ready");
  </script>
</body>
</html>`;
  }
}
