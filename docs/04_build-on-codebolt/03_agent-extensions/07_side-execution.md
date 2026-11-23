---
sidebar_position: 7
title: Side Execution
description: Side execution runs background work alongside a main agent — spawning a separate process that communicates via WebSocket, without blocking the agent's main loop
---

# Side Execution

**Side execution** runs background work alongside a main agent — spawning a separate process that communicates via WebSocket, without blocking the agent's main loop.

Side executions are managed by the server's `SideExecutionManager` and exposed through the `codebolt.sideExecution` SDK module.

## When side execution fits

- **Running action blocks** — invoke a registered action block as a background operation.
- **Inline code execution** — run a snippet of JavaScript in an isolated process.
- **Parallel work** — kick off multiple operations that don't need to block the main agent.
- **Background processing** — long-running tasks like code analysis, plan generation, or task breakdown.

If the agent **needs the result before proceeding**, it can `await` the side execution's completion (the manager provides a `waitForCompletion` mechanism).

## Two execution modes

### 1. Action block execution

Run a registered action block by path:

```ts
import codebolt from '@codebolt/codeboltjs';

const result = await codebolt.sideExecution.startWithActionBlock(
  './action-blocks/break-task-into-jobs',  // path to action block
  { plan, task, existingJobs },             // parameters
  60000                                      // timeout in ms (optional)
);
```

### 2. Inline code execution

Run arbitrary JavaScript code in an isolated process:

```ts
const result = await codebolt.sideExecution.startWithCode(
  `
  const data = await fetch('https://api.example.com/data');
  return await data.json();
  `,
  { apiKey: 'xxx' },  // parameters available in execution context
  30000                // timeout in ms (optional)
);
```

## Management APIs

```ts
// List available action blocks
const blocks = await codebolt.sideExecution.listActionBlocks(projectPath);

// Get status of a running side execution
const status = await codebolt.sideExecution.getStatus(sideExecutionId);

// Stop a running side execution
await codebolt.sideExecution.stop(sideExecutionId);
```

## Lifecycle states

Side executions move through these states:

```
STARTING → RUNNING → COMPLETED
                   → FAILED
                   → TIMEOUT
         → STOPPING (when stop is requested)
```

| State | Description |
|---|---|
| `STARTING` | Process spawned, waiting for WebSocket connection (30s timeout) |
| `RUNNING` | WebSocket connected, execution in progress |
| `STOPPING` | Stop requested, waiting for graceful shutdown (5s before force kill) |
| `COMPLETED` | Execution finished successfully with a result |
| `FAILED` | Execution encountered an error |
| `TIMEOUT` | Execution exceeded the configured timeout |

## How it works internally

1. **Spawn** — the manager spawns a child process with environment variables (`SIDE_EXECUTION_ID`, `THREAD_ID`, `PARENT_AGENT_ID`, etc.)
2. **Connect** — the child process establishes a WebSocket connection back to the server (30s timeout)
3. **Context** — the server sends the thread context (messages, project path, agent metadata) over WebSocket
4. **Execute** — the side execution runs its logic (action block handler or inline code)
5. **Complete** — the execution sends an `actionBlockComplete` message with the result
6. **Cleanup** — temp files are removed and resources are released

## Available tools for LLM agents

Agents can use these tools to manage side executions during their reasoning loop:

| Tool | Description |
|---|---|
| `SideExecutionStartActionBlockTool` | Start a side execution with an action block path |
| `SideExecutionStartCodeTool` | Start a side execution with inline JavaScript |
| `SideExecutionStopTool` | Stop a running side execution by ID |
| `SideExecutionListActionBlocksTool` | List available action blocks |
| `SideExecutionGetStatusTool` | Get status of a side execution by ID |

## Side execution vs. subagent

| Axis | Side Execution | Subagent |
|---|---|---|
| **Process** | Separate child process | Full agent instance |
| **Communication** | WebSocket | Agent protocol |
| **Scope** | Single operation (action block or code) | Open-ended task with full reasoning loop |
| **Result** | Structured return value | Conversation output |
| **Good for** | Background operations, action blocks, parallel tasks | Decomposition of work requiring reasoning |

## API reference

For detailed method signatures, parameters, and return types, see the CodeboltJS API reference:

- [Side Execution API overview](../../05_reference/02_codeboltjs/10_api-access/sideExecution/index.md) — all methods at a glance
- [`startWithActionBlock`](/docs/reference/codeboltjs/api-access/sideExecution/startWithActionBlock) — run a registered action block
- [`startWithCode`](/docs/reference/codeboltjs/api-access/sideExecution/startWithCode) — run inline JavaScript
- [`stop`](/docs/reference/codeboltjs/api-access/sideExecution/stop) — stop a running side execution
- [`getStatus`](/docs/reference/codeboltjs/api-access/sideExecution/getStatus) — check execution status
- [`listActionBlocks`](/docs/reference/codeboltjs/api-access/sideExecution/listActionBlocks) — list available action blocks

For MCP-based access, see [Side Execution MCP tools](/docs/reference/codeboltjs/mcp-access/sideExecution).

## See also

- [Action Blocks](./05_action-blocks/01_overview.md) — the primary payload for side executions
- [Subagents](./08_subagents.md) — when you need a full agent loop
- [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md) — coordinating multiple agents and side executions
