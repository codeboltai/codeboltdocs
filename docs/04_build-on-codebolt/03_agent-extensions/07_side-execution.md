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

Both start methods return a promise. The server sends its response after the child finishes. Await the promise when you need the result, or keep it while the parent agent does other work.

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

The server writes the supplied JavaScript to a temporary entry file and starts it as a child process. The child must connect to Codebolt. To try this with a working entry point, use a built, self-contained action block bundle that registers `onActionBlockInvocation`. Pass the parameters its handler expects.

```ts
import { readFile } from 'node:fs/promises';
import codebolt from '@codebolt/codeboltjs';

const source = await readFile(bundlePath, 'utf8');
const response = await codebolt.sideExecution.startWithCode(source, params);
if (!response.success) throw new Error(response.error);
console.log(response.result);
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
| `STARTING` | The manager is preparing the execution |
| `RUNNING` | The child process has started |
| `STOPPING` | Stop requested. The manager waits up to five seconds for the process to close. |
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
| `side_execution_start_action_block` | Start a side execution with an action block path |
| `side_execution_start_code` | Start a side execution with inline JavaScript |
| `side_execution_stop` | Stop a running side execution by ID |
| `side_execution_list_action_blocks` | List available action blocks |
| `side_execution_get_status` | Get status of a side execution by ID |

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
