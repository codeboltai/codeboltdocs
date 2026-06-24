---
sidebar_position: 1
title: Chat message end-to-end
description: An annotated trace of what happens when a user types a message in the desktop app and an agent responds.
---

# Chat message end-to-end

An annotated trace of what happens when a user types a message in the desktop app and an agent responds.

## Step 1 — the user types

The desktop app has an open WebSocket connection to the server. When the user hits send, the app emits on the `chat` channel:

```json
{
  "channel": "chat",
  "type": "user_message",
  "thread": "t_abc",
  "content": "Rename `getUser` to `fetchUser` everywhere"
}
```

## Step 2 — gateway → sockets → channel

The message arrives at `gateway/`, which has already authenticated this connection. `sockets/` routes it to the `chat` channel handler. The channel handler validates the payload shape and emits a `chat.user_message` event onto the `applicationEventBus`.

**Services involved:** `gateway`, `sockets`, `channels/chat`, `chatService`, `applicationEventBus`.

## Step 3 — chat service persists and fans out

`chatService` listens for `chat.user_message` and:

1. Persists the turn via `historyService` + `eventLogDataService`.
2. Decides which agent(s) should handle it (the thread's bound agent, or the workspace default).
3. Drops the message into the bound agent's `agentEventQueue` via `agentEventQueueDataService`.

The memory ingestion pipeline also sees this event (via `memoryIngestionEventBridge`) and starts the async process of embedding/indexing it.

## Step 4 — agent process wakes up

The target agent's process is being supervised by `AgentProcessManager`. It receives a "new message in queue" notification, pops the message, and starts a new step.

**Heartbeat note:** `HeartbeatManager` starts a watchdog for this step. If the agent doesn't emit a heartbeat in time, it gets killed and the run is marked failed.

## Step 5 — context assembly

Before calling the LLM, the agent invokes `contextAssemblyService.build(...)`. The assembler:

1. Fires the rule engine (`contextRuleEngineService`) with the current task.
2. Pulls recent turns from `episodicMemoryDataService`.
3. Queries `persistentMemoryDataService` for long-term hits filtered by the task.
4. Does a vector search (`vectordbService`) for semantic neighbours — for "rename getUser", this returns the files where `getUser` is defined and used.
5. Walks the knowledge graph (`kgDataService`) from those entities.
6. Asks `narrativeService` for active threads.
7. Pulls the codemap (`codemapDataService`).
8. Budget-caps everything and merges.

Returns an assembled message list and tool schemas.

## Step 6 — LLM call

The agent hands the assembled messages to `llmService.chat(...)`. `llmService`:

1. Runs `tokenizerService.count` for budget enforcement.
2. Resolves the provider.
3. Dispatches to `inference/<provider>.call` (or `localModelInferenceService` if local).
4. Streams the response back.

The LLM returns a plan: "read file X, search for `getUser`, rewrite each occurrence".

## Step 7 — guardrail check (pre-tool)

Before the first tool call, `guardrailEngine.check(...)` runs:

1. Rule evaluator — is `codebolt_fs.search` allowed in this workspace? (Yes.)
2. If policy requires it, the LLM evaluator inspects the intent. For a simple search it's skipped.

Verdict: allow.

## Step 8 — tool execution

The agent calls `toolService.call({ tool: "codebolt_fs.search", args: { query: "getUser" } })`. `toolService`:

1. Resolves `codebolt_fs.search` to the built-in `fileReadService`-backed implementation.
2. Validates parameters against the tool schema.
3. Runs the search.
4. Returns structured results.

A `tool_call` event is emitted to the bus and persisted in the event log with a causal link to the user's original message.

## Step 9 — loop repeats, writes happen

The agent now has the list of files containing `getUser`. Each rewrite goes through:

1. `fileUpdateIntentService` — declare the intent.
2. `guardrailEngine.check` — rule evaluator confirms the path is writable, not in `generated/**`, etc.
3. `fileReadService` / filesystem-service — apply the write.
4. `shadowGitService` — commit the write to shadow git for checkpoint support.
5. Event log entry with causal parents (this write is caused by the plan, which is caused by the user message).

## Step 10 — completion and response

When the agent decides it's done, `autoTestingService` kicks off the project's test suite (if configured). If tests pass, the agent emits a final assistant message on the `chat` channel. If they fail, the agent gets the failure back and replans at the task level (see [Planning Hierarchy](../../07b_subsystems/08_planning-hierarchy.md)).

The assistant message flows back through `channels/chat` → the WS connection → the desktop app, which renders it.

## Step 11 — async aftermath

After the user sees the response, several things are still happening:

- **Memory ingestion** is chunking and embedding the turn for long-term retrieval.
- **Narrative engine** is deciding whether this constitutes a new beat in an existing thread.
- **Knowledge graph** is being updated with the rename edges.
- **Event log** has the full causal trace ready for replay.

All of this is what makes the *next* chat message in the same thread cheaper and smarter.

## See also

- [Agent run end-to-end](./agent-run-end-to-end.md)
- [Tool call end-to-end](./tool-call-end-to-end.md)
- [Checkpoint and rollback](./checkpoint-and-rollback.md)
