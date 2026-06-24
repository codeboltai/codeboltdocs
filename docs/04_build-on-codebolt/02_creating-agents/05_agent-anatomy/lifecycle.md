---
sidebar_position: 2
title: Lifecycle
description: From "something triggered this agent" to "the run row is in the database with status=completed"
---

# Agent Lifecycle

From "something triggered this agent" to "the run row is in the database with status=completed". Every framework-level agent goes through the same lifecycle; understanding it is how you debug agents that "just stop working".

This page is the *author's* view. For the server-side trace of the same lifecycle, see [Agent run end-to-end](../../02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md).

## The stages

```
trigger
   │
   ▼
spawn              ← AgentProcessManager
   │
   ▼
boot               ← your agent's handler starts
   │
   ▼
┌──── loop ────┐
│   deliberate │
│      ↓       │
│   execute    │
│      ↓       │
│   reflect    │
└──────┬───────┘
       │
       ▼
terminate          ← done / failed / killed / rejected
   │
   ▼
cleanup
```

## Stage 1 — Trigger

Something causes a run to start:

| Trigger | Source |
|---|---|
| User chat message | `chatService` → `agentService.startRun` |
| CLI `codebolt agent start` | REST route → `agentService` |
| Cron / file change | `backgroundAgent` controller |
| Another agent calls `codebolt_agent.start` | `toolService` → `agentService` |
| Flow node execution | `agentFlowRuntimeService` |
| Webhook | REST route |

All paths converge on `agentService.startRun(...)`. Your agent doesn't care which — the input looks the same.

## Stage 2 — Spawn

`AgentProcessManager` does the work:

1. Loads the validated `agent.yaml`.
2. Resolves the entrypoint and runtime.
3. Forks a new process with environment: `RUN_ID`, `CODEBOLT_SERVER_URL`, any declared env vars.
4. Registers with `HeartbeatManager` — a watchdog timer starts.
5. Emits `run.started` on the event bus.

From the author's point of view, this stage is opaque. You never see it directly.

## Stage 3 — Boot

This is the first code of yours that runs.

**Level 1 (framework):** your handler is imported; the framework calls your `run` or `turn` function. The framework has already opened the connection and loaded the input.

**Level 2:** your entrypoint runs. You call `client.connect()` and `client.input.get()`.

**Level 3:** your process starts. You open the WebSocket, handshake, and request the input.

In all cases, **boot is where bad things are cheapest to catch**. Failing fast in boot — "required env var missing", "tool X not available", "model Y not configured" — is better than failing mid-loop. Your handler should validate its prerequisites before doing any real work.

## Stage 4 — The loop

The core of agent life. Three sub-phases, repeated until done:

### Deliberate
Assemble context, call the LLM, parse the response.

- Call `ctx.context.assemble` (or let the framework do it).
- Call `ctx.llm.chat` with the assembled messages and available tools.
- Receive the response. It's either a final answer or a list of tool calls.

### Execute
Run whatever the LLM asked for.

- For each tool call: validate args, run through [guardrails](../../09_internals/03_subsystems/09_guardrails-and-eval.md) (server-side, you don't do anything), call via `ctx.tools.call`, collect the result.
- Run in parallel if the tool calls are independent. `Promise.all` is fine for tools, but not for things with side effects that must be ordered.

### Reflect
Write state and decide whether to loop.

- Append results to working state.
- Write to memory as appropriate (framework does a lot of this automatically).
- If the LLM gave a final answer, break out. Otherwise, loop back to deliberate.

**Heartbeats:** at level 1 the framework emits these for you. At level 2/3 you must emit one at least every N seconds (default 30) or `HeartbeatManager` will kill your run. Do it between phases, not inside tool calls that might take a long time.

## Stage 5 — Terminate

The run ends one of four ways:

| Terminal state | Cause | Semantic |
|---|---|---|
| **`completed`** | You returned a final result | Normal success |
| **`failed`** | You threw, or explicitly set a failure | Runtime error, bad input, unrecoverable state |
| **`rejected`** | A critical guardrail denied something essential | Policy violation, not a bug |
| **`killed`** | Heartbeat timeout, user stop, budget exceeded | External intervention |

For each terminal state, emit `run.completed` / `run.failed` / etc. and disconnect cleanly. The framework does this at level 1; you must do it at level 2/3.

**Don't `process.exit` abruptly.** The server needs a clean disconnect to flush the event log and finalize the run row.

## Stage 6 — Cleanup

After your process exits:

1. `AgentProcessManager` reaps the process and removes it from its registry.
2. `HeartbeatManager` cancels the watchdog.
3. The `run_ended` event is written to the event log.
4. Memory ingestion picks up the last events for long-term indexing.
5. Any child runs that your run spawned and that are still alive are checked — orphans are either adopted by a parent (if the flow runtime knows where) or killed.

Your agent is no longer running. The run row is queryable forever.

## Things that go wrong at each stage

Some common failures, by stage:

### Boot failures
- Missing env var → boot fails, `run.failed` with `boot_error`.
- Bad entry point → process exits immediately, `run.failed` with `spawn_error`.
- Dependency not installed → import fails, your handler never runs.

### Loop failures
- LLM provider error → `llm.chat` throws. Catch and decide: retry, fail, or return partial.
- Tool call denied by guardrail → `tools.call` returns a structured denial (not an exception). Your handler must handle this.
- Budget exceeded → framework kills the run mid-loop. Terminal state is `killed` with reason `budget`.
- Heartbeat miss → run killed. Usually means a tool call blocked for too long without emitting progress. Fix: break long calls into chunks.

### Termination failures
- Process exited without cleanup → run marked as `killed` with `abnormal_exit`. Memory, event log, and partial results are salvaged where possible.
- Output validation failed → if you declared `outputs` in the manifest and returned something that doesn't match, the framework rejects the output and the run fails.

## Debugging lifecycle issues

Every stage emits events. Use the trace:

```bash
codebolt agent trace <run_id>
```

You'll see exactly which stage the run reached, which phase it was in when it failed, and what the last tool / LLM / context call was. This is the fastest way to diagnose "my agent just stops".

## See also

- [agent.yaml](./agent-yaml.md) — what gets loaded in stage 2
- [Context](./context.md) — the working state during the loop
- [Agent run end-to-end](../../02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md) — the server-side view of the same stages
- [Testing and debugging](../09_testing-and-debugging.md)
