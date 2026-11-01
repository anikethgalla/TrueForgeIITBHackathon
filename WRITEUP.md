# TrueForge Coding Agent — Technical Write-Up
**Techfest 2026–27 · TrueFoundry Forge-a-thon (Round 1 Submission)**

---

## 1. Team

- **Team Members:** Aniketh Galla (update additional team members, college/employer, and GitHub handles here prior to portal submission)
- **GitHub Handle:** `@anikethgalla`
- **Repository:** Public GitHub repository containing the VS Code extension source, `agent-definition.json`, `trueforge.config.example.json`, and automated benchmark verification suite.

---

## 2. Starting point

- **Upstream Repository & Commit:** **From scratch.**
- **Rationale:** Rather than forking a heavyweight legacy extension (such as Cline or Continue) and retrofitting its internal state machine, we built a purpose-engineered VS Code extension (`trueforge-coding-agent`) designed natively around `@truefoundry/trueforge-sdk@0.180.0`. Every line of code in the repository is our own delta focused on two problems: **budget-constrained repository context assembly** and **safe, hunk-level diff review tightly coupled to TrueForge's MCP tool approval lifecycle**.

---

## 3. Architecture on TrueForge

Our extension acts strictly as a client and MCP tool provider for a local TrueForge server (`npx @truefoundry/trueforge@latest` at `http://localhost:8790`). The extension never calls an LLM provider directly.

1. **SDK Session & Turn Lifecycle (`src/trueforge/harnessOrchestrator.ts`):**
   - Uses `TrueForge` from `@truefoundry/trueforge-sdk` to create sessions (`client.sessions.create`) and execute streaming turns (`client.sessions.createTurnStream(sessionId, { input })`).
   - Consumes Server-Sent Events (`TurnStreamingEvent`): `turn.created`, `model.message.delta` (live token streaming), `model.message` (tool call extraction), `thread.created` / `thread.done` (subagent lifecycle), `tool.approval_required`, `tool.response`, and `turn.done`.
   - Cancellation (`Ctrl+Shift+Backspace` or panel **Cancel Run**) immediately aborts the active `AbortController`, invokes `client.sessions.cancel(sessionId)`, and rolls back any unapproved staged hunks in memory.

2. **Editor Capabilities Exposed as an Embedded MCP Server (`src/mcp/editorMcpServer.ts`):**
   - Upon activation, the VS Code extension starts a local Streamable HTTP & SSE JSON-RPC 2.0 MCP server (`http://127.0.0.1:45821/mcp`) and registers it with TrueForge via `client.settings.mcpServers.createOrUpdate({ manifest: { name: "vscode-editor-mcp", type: "remote", url } })`.
   - Exposes **7 editor-native MCP tools** annotated with `readOnlyHint` and `destructiveHint`:
     1. `search_workspace` (`readOnlyHint: true`): Hybrid BM25 + AST symbol + line grep search across the workspace.
     2. `read_file` (`readOnlyHint: true`): Reads file line ranges (`startLine`–`endLine`) with 1-based line numbers.
     3. `list_files` (`readOnlyHint: true`): Lists workspace files filtered by directory prefix.
     4. `get_symbols` (`readOnlyHint: true`): Extracts AST definitions (Python `def`, `class`, `@click.command`, TypeScript functions/classes, and `.rst`/`.md` section headings).
     5. `get_diagnostics` (`readOnlyHint: true`): Queries `vscode.languages.getDiagnostics()` for live compiler/linter errors.
     6. `propose_edit` (`readOnlyHint: false`): Computes unified per-hunk diffs in an in-memory staging buffer (`DiffStagingStore`) and renders inline CodeLenses (`✓ Accept Hunk` / `✗ Reject Hunk`) in the editor without writing to disk.
     7. `run_command` (`readOnlyHint: false`, `destructiveHint: true`): Executes workspace verification commands (e.g., `pytest tests/test_cli.py -q`).

3. **TrueForge Harness Features Used & Why (`agent-definition.json`):**
   - **Human-in-the-Loop Tool Approval Driving Diff Review (`requireApprovalForTools: ["propose_edit", "run_command"]`):** When the agent invokes `propose_edit`, TrueForge pauses the turn and emits `tool.approval_required`. Our extension intercepts this event, immediately renders the proposed diff hunks in the VS Code editor, and waits for the user's hunk review decision before calling `client.sessions.createTurnEvent(sessionId, turnId, { events: [{ type: "user.tool_approval", approval: { status: "allow" | "deny" } }] })` and resuming via `client.sessions.subscribeToTurn`.
   - **Deferred Tool Loading (`preload: false`, `preloadTools: ["search_workspace", "read_file"]`):** Only the two primary discovery tools are preloaded into the initial prompt; write and execution schemas are loaded on demand by TrueForge, saving context budget on every turn.
   - **Dynamic Subagents (`dynamicSubAgents: { enabled: true }`):** Allows the root agent to isolate exploratory searches across `src/`, `tests/`, and `docs/` into child threads (`thread.created`), preventing raw search output from polluting the main editing context.
   - **Context Compaction & Large Tool Response Offloading (`compaction: { enabled: true }`, `largeToolResponse: { enabled: true }`):** Keeps multi-step agent turns stable within smaller model context windows.

---

## 4. How context is selected

In a 17,000-line repository like `pallets/flask` (`3.1.3`, 183 files), concatenating whole files overflows context windows and degrades edit accuracy. Our `ContextAssembler` (`src/context/contextAssembler.ts`) enforces a configurable **12,000-token budget** (`trueforge.contextTokenBudget`, ~48,000 chars) using a four-stage pipeline:

1. **Priority Tier 1 — Active Editor Selection & Explicit `@file` / `@symbol` Mentions:**
   - Parses `@file:<path>` and `@symbol:<identifier>` mentions from the user prompt (with live autocomplete in both the Inline Edit box and Agent Panel). Pinned items receive top priority (`score: 90–100`).
2. **Priority Tier 2 — Hybrid Okapi BM25 + AST Symbol & Decorator Scoring:**
   - Indexes all repository files into an inverted index with camelCase/snake_case sub-tokenization and extracts structural AST symbols (functions, classes, `@click.command` decorators, and `.rst` headings).
   - Scores every file using **Okapi BM25** ($k_1 = 1.5, b = 0.75$) plus path-stem boosts (`+8.5`), AST symbol overlap (`+5.5`), and Click CLI command decorator boosts (`+18.0`).
3. **Priority Tier 3 — Cross-Layer Architecture Triangulation:**
   - Automatically links implementation modules (`src/flask/cli.py`), corresponding test suites (`tests/test_cli.py`), and documentation (`docs/cli.rst`) when a task requires tests or documentation.
4. **Priority Tier 4 — AST-Windowed Token Budgeting & On-Screen Explainability:**
   - Allocates at most 3,200 tokens per file during initial assembly. If a file exceeds its slice, a sliding density scorer extracts the highest-signal AST symbol block plus the file tail (where CLI command registrations reside) with explicit line-number headers.
   - On Task B, the **Context Assembly & Budget Inspector** visibly displays `11,899 / 12,000 tokens (99%)` across 7 selected files (`src/flask/cli.py`, `tests/test_cli.py`, `docs/cli.rst`, `src/flask/config.py`, etc.) along with each file's exact BM25 score, matched AST symbols, and selection rationale.

---

## 5. Model setup

- **Models Used & Where They Ran:**
  - **Primary Model:** `google-gemini/gemini-2.5-flash` (configured in local TrueForge via Google Gemini provider API; also verified with `openai/gpt-4o` and `anthropic/claude-3-7-sonnet`).
  - **Secondary Automatic Failover Model:** `openai/gpt-4o-mini` (or `local-ollama/qwen2.5-coder` running locally via OpenAI-compatible endpoint).
- **Approximate Cost:** `< $0.03 USD` total across all rehearsal and verification runs of Tasks A, B, and C thanks to the 12,000-token context budget and deferred tool loading.
- **How a User Switches Models & Automatic Failover (Task C):**
  - Users can click the status bar item (`TrueForge: <provider>/<model>`) or run the command `TrueForge: Switch Active / Fallback Model` (`trueforge.switchModel`), or update `trueforge.primaryModel` / `trueforge.fallbackModel` in VS Code Settings.
  - If the primary model fails (unreachable endpoint, invalid key, timeout, or 5xx error), `TrueForgeHarnessOrchestrator` executes **exponential backoff retries** (600ms, 1200ms) and **automatically switches the session to `trueforge.fallbackModel` with zero user action required**, while rolling back any unaccepted staging state so `git status` remains clean.

---

## 6. Scorecard

| Criterion | Max | Video Timestamp | One-Line Claim |
| :--- | :---: | :---: | :--- |
| **A1. Inline edit** | 10 | `00:10 – 00:55` | Selecting `get_debug_flag` in `src/flask/helpers.py` + `Ctrl+Shift+I` renders an in-editor diff with per-hunk `✓ Accept Hunk` / `✗ Reject Hunk` CodeLenses; verified with `FLASK_DEBUG=off`. |
| **A2. Agent mode** | 10 | `00:56 – 02:45` | Given the Task B prompt with zero files named, the TrueForge agent autonomously discovers and edits `src/flask/cli.py`, `tests/test_cli.py`, and `docs/cli.rst`; verified with `pytest tests/test_cli.py -q` and `flask config`. |
| **A3. Streaming & cancellation** | 10 | `00:20 – 02:30` | Streams SSE token deltas (`model.message.delta`) live without blocking the editor, and immediate cancellation (`client.sessions.cancel`) leaves zero half-applied edits. |
| **B1. Context assembly** | 15 | `01:02 – 01:35` | Hybrid AST + BM25 + Triangulation ranker enforces a 12,000-token budget, supports `@file`/`@symbol`, and visibly shows in Task B why `src/flask/cli.py`, `tests/test_cli.py`, and `docs/cli.rst` were chosen. |
| **B2. Diff safety** | 10 | `00:35 – 00:52` & `02:05 – 02:25` | Zero silent writes to disk; every change is staged for per-hunk review (`DiffEngine.reconstructFromHunks`), and `↶ Undo Last Edit` restores applied changes on screen. |
| **B3. Resilience (Task C)** | 10 | `02:46 – 03:45` | With an unreachable/invalid primary model, the extension stays responsive, retries with exponential backoff, and automatically fails over to the second configured model with `git status` clean. |
| **B4. TrueForge integration depth** | 10 | `01:40 – 02:35` | Editor capabilities exposed as a 7-tool MCP server (`vscode-editor-mcp`) where `tool.approval_required` drives diff review, plus Deferred Tool Loading, Dynamic Subagents, and Compaction visible in the TrueForge session. |
| **C1. Video** | 10 | `00:00 – 03:50` | Complete, legible <4 min screen recording of Tasks A, B (with TrueForge session view), and C in exact order, each followed by on-screen terminal verification. |
| **C2. Write-up** | 15 | Document | Covers all 8 mandatory sections in order: architecture, context budget strategy, model setup, trade-offs, timestamped scorecard, and honest limitations. |

---

## 7. Tools used

- **Agent Harness & SDK:** `@truefoundry/trueforge@0.180.1` and `@truefoundry/trueforge-sdk@0.180.0`.
- **Editor Platform & Bundler:** VS Code Extension API (`@types/vscode`), TypeScript 5.4, `esbuild`, `diff` (Myers structured patch computation).
- **AI Coding Assistants Used During Development:** Google Antigravity IDE coding assistant (used for pair-programming the TypeScript extension scaffolding, MCP JSON-RPC transport, and verification test suite).

---

## 8. Known limitations and what you would do with another month

1. **Regex/Heuristic AST Extraction vs. Full Tree-sitter Incremental Parsing:**
   - *Current limitation:* Our `ContextAssembler` uses fast multi-language structural regexes to extract Python functions, classes, `@click.command` decorators, TypeScript symbols, and `.rst` headings. Deeply nested dynamic metaprogramming or multi-line macro definitions can be missed.
   - *With another month:* Integrate WebAssembly `web-tree-sitter` grammars for Python, TypeScript, Rust, and Go with incremental document-sync hooks (`onDidChangeTextDocument`) to maintain a live call-graph and reference index in `<5ms` per edit.
2. **Overlapping Hunks Across Concurrent Subagent Proposals:**
   - *Current limitation:* If two parallel subagents propose edits to overlapping line ranges of the same file within a single turn, the second proposal layers sequentially onto the first proposal's buffer rather than performing a three-way AST merge.
   - *With another month:* Implement a 3-way structural merge resolver in `DiffEngine` with conflict markers inside the per-hunk CodeLens preview.
3. **Host-Port MCP Transport vs. Reverse WebSocket Tunnel:**
   - *Current limitation:* The embedded MCP server binds to `http://127.0.0.1:45821/mcp`, which works seamlessly when TrueForge runs locally on the same machine (`npx @truefoundry/trueforge@latest`). If TrueForge runs inside an isolated container without host networking, `127.0.0.1` requires `host.docker.internal`.
   - *With another month:* Add automatic Docker bridge detection (`host.docker.internal`) and support TrueForge's `tool.response_required` client-side tool execution channel as a zero-port fallback when running against remote enterprise TrueForge clusters.

