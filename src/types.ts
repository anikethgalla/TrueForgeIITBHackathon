/**
 * Shared types for the TrueForge Coding Agent VS Code Extension.
 */

export interface ContextItem {
  /** Relative workspace path (e.g. "src/flask/cli.py") */
  relativePath: string;
  /** Absolute filesystem path */
  absolutePath: string;
  /** Source of inclusion: explicit @file, explicit @symbol, or automatic hybrid retrieval */
  source: "explicit_file" | "explicit_symbol" | "auto_retrieval" | "active_selection";
  /** Relevance score from AST + BM25 + Import-Graph ranker */
  score: number;
  /** Human-readable explanation of why this file/chunk was chosen (Criterion B1) */
  reason: string;
  /** Extracted AST symbols or matched identifiers */
  matchedSymbols: string[];
  /** Estimated token count (~4 chars/token) */
  estimatedTokens: number;
  /** Line range included (1-based) */
  startLine: number;
  endLine: number;
  /** Snippet or full text included within the token budget */
  content: string;
}

export interface ContextAssemblyReport {
  query: string;
  explicitFiles: string[];
  explicitSymbols: string[];
  tokenBudget: number;
  tokensUsed: number;
  totalFilesScanned: number;
  selectedItems: ContextItem[];
  droppedCount: number;
  timestamp: string;
}

export interface DiffHunk {
  /** Unique ID for the hunk (e.g. "src/flask/helpers.py#hunk-0") */
  id: string;
  /** Relative workspace path */
  relativePath: string;
  /** Absolute file path */
  absolutePath: string;
  /** 1-based start line in the current file */
  oldStart: number;
  /** Number of lines in the original block */
  oldLines: number;
  /** 1-based start line in the proposed file */
  newStart: number;
  /** Number of lines in the new block */
  newLines: number;
  /** Original lines removed */
  removedLines: string[];
  /** Proposed lines added */
  addedLines: string[];
  /** Context lines around the hunk for display */
  header: string;
  /** Unified diff string for this single hunk */
  unifiedPreview: string;
  /** Current review status */
  status: "pending" | "accepted" | "rejected";
  /** Associated TrueForge toolCallId if gated by tool.approval_required */
  toolCallId?: string;
  /** Associated TrueForge threadId */
  threadId?: string;
  /** Associated TrueForge sessionId */
  sessionId?: string;
  /** Associated TrueForge turnId */
  turnId?: string;
}

export interface FileDiffProposal {
  relativePath: string;
  absolutePath: string;
  originalContent: string;
  proposedContent: string;
  description: string;
  hunks: DiffHunk[];
  toolCallId?: string;
  threadId?: string;
  sessionId?: string;
  turnId?: string;
  createdAt: string;
}

export interface UndoEntry {
  id: string;
  description: string;
  timestamp: string;
  files: Array<{
    relativePath: string;
    absolutePath: string;
    previousContent: string;
    existedBefore: boolean;
  }>;
}

export interface TrueForgeEventLog {
  id: string;
  timestamp: string;
  type:
    | "turn.created"
    | "model.delta"
    | "model.message"
    | "tool.call"
    | "tool.approval_required"
    | "tool.response"
    | "thread.created"
    | "thread.done"
    | "turn.done"
    | "resilience.retry"
    | "resilience.fallback"
    | "context.assembled"
    | "error";
  threadId?: string | null;
  title: string;
  detail?: string;
  status?: "running" | "success" | "warning" | "error" | "paused";
  metadata?: Record<string, unknown>;
}

