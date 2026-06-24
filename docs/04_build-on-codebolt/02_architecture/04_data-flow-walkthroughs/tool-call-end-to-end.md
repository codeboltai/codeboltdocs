---
sidebar_position: 3
title: Tool call end-to-end
description: What actually happens between "the LLM emitted a tool call" and "the tool result is in the next prompt"
---

# Tool call end-to-end

What actually happens between "the LLM emitted a tool call" and "the tool result is in the next prompt". This is the shortest of the walkthroughs, but it's the one that happens most often.

## Step 0 — the LLM emits intent

During [`llmService.chat(...)`](../../07b_subsystems/03_llm-and-inference.md), the provider returns a response that includes a tool call:

```json
{
  "tool_calls": [
    {
      "id": "call_xyz",
      "name": "codebolt_fs.read_file",
      "arguments": { "path": "src/auth/session.ts" }
    }
  ]
}
```

This is *intent*, not action. Nothing has been touched.

## Step 1 — the agent loop hands it to toolService

The agent's deliberate phase finishes. The loop sees `tool_calls` in the response and enters the **execute** phase. For each tool call it invokes:

```ts
toolService.call({
  runId,
  phaseId,
  tool: "codebolt_fs.read_file",
  args: { path: "src/auth/session.ts" },
});
```

## Step 2 — name resolution

`toolService` resolves the tool name against three registries in order:

1. **Built-in tools** — direct lookup in the server's own tool table.
2. **Capability-provided tools** — `capabilityRegistry` lookup.
3. **MCP server tools** — `providerRegistryService` lookup across connected MCP servers.

A miss in all three is a hard error emitted back as a structured tool failure (the agent can recover from this — a tool not existing is a recoverable mistake).

For `codebolt_fs.read_file`, it's a built-in, so resolution is step 1.

## Step 3 — parameter validation

`toolService` validates `args` against the tool's declared schema. Validation failures are *also* emitted as structured failures rather than crashes, so the agent can fix its arguments and retry on the next step.

## Step 4 — guardrail: before_tool_call

`guardrailEngine.check(...)` fires with `phase = "before_tool_call"`. It runs:

1. **Rule evaluator** — is `codebolt_fs.read_file` allowed in this workspace? Is the path inside the workspace? Is it in the ignore list (`.gitignore`, `node_modules`)? Is it over the size cap? Any active hook saying no?
2. **LLM evaluator** — skipped for reads by default. Would fire for writes, shell commands, or anything declared as "judgment-required" in the policy.

Verdicts:
- **Allow** → proceed.
- **Allow with modification** → guardrail rewrote args (e.g. trimmed a glob). The agent is told what was changed.
- **Deny** → tool call never runs. A structured denial is returned to the agent with the reason.

All verdicts are written to the event log with the tool call they gated.

## Step 5 — execution

Assuming allow: `toolService` invokes the actual implementation.

| Tool family | Where it runs |
|---|---|
| Built-in | In-process, in the server |
| Capability | In the capability's plugin process (via `PluginProcessManager`) |
| MCP | In the MCP server's process (via `mcpService`) |

For built-ins, it's a direct service call — here, `fileReadService.read("src/auth/session.ts")`. For externals, it's an IPC / MCP protocol round-trip.

Streaming tools (long shell commands, browser actions) emit partial results on a dedicated bus channel so the UI can render progress live.

## Step 6 — hooks: after_tool_call

Before the result goes back to the agent, `after_tool_call` hooks fire. Hooks can:

- **Observe** the result (e.g. for auditing, metrics).
- **Transform** it (e.g. redact secrets, truncate long outputs).
- **Reject** it (rare — usually used for "this file contains secrets, don't let the LLM see it").

See [Hooks](../../05_plugins/01_overview.md) for the full hook lifecycle.

## Step 7 — result shape

The result is normalised into a structured `ToolResult`:

```json
{
  "id": "call_xyz",
  "status": "ok",
  "content": "...file contents...",
  "metadata": {
    "bytes": 4821,
    "truncated": false,
    "mime": "text/typescript"
  }
}
```

Failures have the same shape with `status: "error"` and a `reason`. The LLM gets a consistent format regardless of tool family.

## Step 8 — what gets written

Every tool call produces:

| Destination | What |
|---|---|
| `event_log` | `tool_call` entry with args (normalized) + result (possibly redacted) + causal parent |
| `agent_execution_phases` | The current phase row gets the tool call appended to its "calls" list |
| `episodicMemory` | Condensed form of the call + result, so later steps can see it |
| `applicationEventBus` | `tool.completed` event for anyone listening (UI, other subsystems, hooks) |

For writes, additionally:
- `shadowGitService` commits the change.
- `projectStructureService` and `codebaseIndexService` mark the file dirty for re-indexing.
- `memoryIngestionEventBridge` hears about the change and may update the vector DB / knowledge graph.

## Step 9 — back to the agent loop

The `ToolResult` is handed back to the agent loop. The loop appends it to the working context and starts the next **deliberate** phase. The LLM sees the tool result in its next message and decides what to do next.

## A few things this walkthrough makes obvious

- **The agent never calls a tool directly.** Every call goes through `toolService` → guardrail → hooks → implementation → hooks. That's why you can audit, redact, rate-limit, or deny *anything* without touching agent code.
- **Tool failures are data, not crashes.** A denied tool, a validation error, a network timeout — all come back as structured `ToolResult` with `status: "error"`. The LLM is expected to handle them.
- **The same result shape comes back whether the tool ran in-process, in a capability plugin, or on a remote MCP server.** That's the point of the registry + normalization layer.

## See also

- [Chat message end-to-end](./chat-message-end-to-end.md)
- [Agent run end-to-end](./agent-run-end-to-end.md)
- [MCP & Tools Subsystem](../../07b_subsystems/02_mcp-and-tools.md)
- [Guardrails & Eval](../../07b_subsystems/09_guardrails-and-eval.md)
- [Hooks](../../05_plugins/01_overview.md)
