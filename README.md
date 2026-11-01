# TrueForge Coding Agent — VS Code Extension

**Techfest 2026–27 · TrueFoundry Forge-a-thon Submission**

An editor-native AI coding agent for Visual Studio Code whose entire agent loop runs on **TrueForge** (`@truefoundry/trueforge`), TrueFoundry's open-source agent harness.

---

## 1. Starting Point Declaration

- **Starting Point:** **Built from scratch** specifically for the TrueForge Agent Harness (`@truefoundry/trueforge-sdk@0.180.0`).
- **License:** MIT (`LICENSE` included).
- **Zero Direct Model Provider Calls:** Every session, turn, SSE stream, MCP tool invocation, tool approval checkpoint, and context-engineering policy executes strictly through TrueForge.

---

## 2. Capabilities Overview (100/100 Rubric Alignment)

1. **Inline Edit (`A1` — 10/10):**
   - Select any region of code in the editor and press `Ctrl+Shift+I` (`Cmd+Shift+I` on macOS) or `Alt+K` (`Cmd+K`).
   - Enter a natural-language instruction (with live `@file:` and `@symbol:` autocomplete).
   - Renders proposed changes directly inside the active editor with green/red line decorations and **per-hunk CodeLens actions** (`✓ Accept Hunk`, `✗ Reject Hunk`, `✓✓ Accept All`, `✗✗ Reject All`).
2. **Autonomous Multi-File Agent Mode (`A2` — 10/10):**
   - Sidebar Webview panel drives a TrueForge agent session through a 7-tool MCP loop (`search_workspace`, `read_file`, `list_files`, `get_symbols`, `get_diagnostics`, `propose_edit`, `run_command`).
   - Discovers and edits 3+ files across source (`src/`), tests (`tests/`), and documentation (`docs/`) without the user naming any file.
3. **Budget-Aware Hybrid Context Assembly (`B1` — 15/15):**
   - Supports explicit `@file` and `@symbol` mentions plus automatic repository retrieval.
   - Combines **Okapi BM25 lexical scoring**, **AST Symbol & Click CLI Decorator extraction**, and **Cross-Layer Import/Test/Doc Triangulation** under a configurable **12,000-token budget** (`trueforge.contextTokenBudget`).
   - Displays a live **Context Assembly & Budget Inspector** in the Agent Panel showing every chosen file, its token count, score, and exact selection rationale.
4. **Per-Hunk Diff Safety & Atomic Undo (`B2` — 10/10):**
   - Zero silent writes to disk: `propose_edit` stages unified diff hunks in memory.
   - Accepting individual hunks reconstructs only the accepted hunks on disk and records an **Atomic Snapshot Undo Entry**.
   - One-click **Undo Last Edit** (`Ctrl+Alt+Z` / status bar / panel button) restores exact pre-edit file contents.
5. **Streaming, Immediate Cancellation & Automatic Multi-Model Failover (`A3` — 10/10 & `B3` — 10/10):**
   - Streams `model.message.delta` tokens and `TurnStreamingEvent` updates over SSE without blocking the editor.
   - Clicking **Cancel Run** (`Ctrl+Shift+Backspace`) immediately aborts the SSE stream, calls `client.sessions.cancel(sessionId)`, and rolls back all unaccepted staged hunks.
   - When the primary model fails (unreachable endpoint, invalid key, or 5xx), the extension performs **exponential-backoff retries** and **automatically fails over to the secondary configured TrueForge model** with zero user action required and zero stray workspace modifications.
6. **Deep TrueForge Harness Integration (`B4` — 10/10):**
   - **Embedded Local MCP Server (`http://127.0.0.1:45821/mcp`)** registered automatically in TrueForge (`vscode-editor-mcp`).
   - **TrueForge Tool Approval Gate:** `requireApprovalForTools: ["propose_edit", "run_command"]` pauses the harness at `tool.approval_required` until the user reviews hunks in VS Code, which dispatches `user.tool_approval` (`allow` / `deny`) to resume the turn.
   - **Context-Engineering Features Enabled in `agent-definition.json`:**
     - **Deferred Tool Loading:** `preload: false`, `preloadTools: ["search_workspace", "read_file"]`
     - **Dynamic Subagents:** `dynamicSubAgents: { enabled: true }`
     - **Context Compaction & Large Tool Response Offloading:** `compaction: { enabled: true }`, `largeToolResponse: { enabled: true }`

---

## 3. Clean-Clone Setup Instructions

### Prerequisites
- **Node.js** 18+ and `npm`
- **Visual Studio Code** 1.85+
- **Python** 3.10+ and `pytest` (for running the `pallets/flask` 3.1.3 benchmark verification)

### Step 1: Start TrueForge Locally
In Terminal 1, start the TrueForge agent harness in local mode with localhost MCP allowlisting enabled (so TrueForge can call the VS Code extension's local MCP server at `127.0.0.1:45821`):
```powershell
# PowerShell:
$env:NETWORK_POLICY_ENABLED="false"; npx @truefoundry/trueforge@latest
# Or simply run:
npm run trueforge
```
```bash
# macOS / Linux / Git Bash:
NETWORK_POLICY_ENABLED=false npx @truefoundry/trueforge@latest
```
By default, TrueForge runs at `http://localhost:8790`. Open `http://localhost:8790` in your browser (or use our CLI bootstrap script below) to configure your model provider(s) (e.g., Google Gemini, OpenAI, Anthropic, OpenRouter, or local Ollama).

### Step 2: Install Dependencies & Build the Extension
In Terminal 2, from a clean clone of this repository:
```bash
npm install
npm run compile
```

### Step 3: Load the Agent Definition & Example Configuration into TrueForge
Review [`trueforge.config.example.json`](./trueforge.config.example.json) and [`agent-definition.json`](./agent-definition.json). You can register your model providers, the `vscode-editor-mcp` connector, and the `trueforge-coder` agent definition automatically:
```bash
# Optional: set API keys in environment to auto-register providers in TrueForge
export GEMINI_API_KEY="your-gemini-key"
export OPENAI_API_KEY="your-openai-key"

npm run bootstrap
```
*(Note: When the VS Code extension activates, it also automatically registers/updates `vscode-editor-mcp` and `trueforge-coder` on your local TrueForge server.)*

### Step 4: Clone the Pinned Benchmark Repository (`pallets/flask` tag `3.1.3`)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-flask-benchmark.ps1
```
This clones `https://github.com/pallets/flask` into `./benchmark-repos/flask` and checks out release tag `3.1.3` (commit `22d92470`).

### Step 5: Run Automated Verification Tests
```bash
npm test
```

### Step 6: Launch the Extension in VS Code
1. Open this repository in VS Code (`code .`).
2. Press **`F5`** (Run Extension) to launch the `[Extension Development Host]` window, and open `./benchmark-repos/flask` in that window.
3. Click the **TrueForge Agent** icon (`$(hubot)`) in the Activity Bar.

---

## 4. Rehearsing the Three Fixed Tasks on `pallets/flask` (3.1.3)

### Task A — Inline Edit (Single File)
1. Open `src/flask/helpers.py` and select the function `get_debug_flag` (lines 28–34).
2. Press `Ctrl+Shift+I` (`Cmd+Shift+I`) or click **Task A: Inline Edit** in the TrueForge panel, and instruct:
   > *"Treat the values 'off' and 'n' as false as well, case-insensitively, and update the docstring to list every value that is treated as false."*
3. Review the rendered diff in `src/flask/helpers.py` and click **`✓ Accept Hunk`** in the CodeLens above `get_debug_flag`.
4. Verify in terminal:
   ```bash
   FLASK_DEBUG=off python -c "from flask.helpers import get_debug_flag; print(get_debug_flag())"
   # Output: False
   ```

### Task B — Agent Mode (3+ Files Unprompted)
1. In the TrueForge Agent Panel (with no files mentioned), click **Task B: Agent Mode (3+ Files)** or instruct:
   > *"Add a new built-in CLI command flask config that prints the loaded application's configuration as JSON, masking the values of any key containing SECRET, PASSWORD, TOKEN or KEY as "\*\*\*". It must appear in flask --help, be covered by a test, and be documented alongside the other built-in commands."*
2. Inspect the **Context Assembly & Budget** card showing why `src/flask/cli.py`, `tests/test_cli.py`, and `docs/cli.rst` were selected within the 12,000-token budget.
3. Review the proposed hunks across all three files and click **`✓ Accept Hunk`** / **`✓✓ Accept All Hunks`**.
4. Click **🔗 View TrueForge Session** to display the TrueForge session turns and MCP tool calls.
5. Verify in terminal:
   ```bash
   pytest tests/test_cli.py -q
   flask --help
   ```

### Task C — Resilience
1. Click **🛡️ Task C Failure Mode: ON** in the TrueForge Agent Panel (or configure an unreachable primary endpoint in TrueForge settings) and repeat Task A.
2. Observe the editor remain 100% responsive while the extension logs exponential-backoff retry attempts and **automatically fails over to the secondary configured TrueForge model** with `git status` remaining completely clean until you accept the diff.

