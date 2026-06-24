---
sidebar_position: 2
title: Agent run end-to-end
description: How a full agent run — not just one message, but a multi-step task from spawn to termination — flows through the server.
---

# Agent run end-to-end

How a full agent *run* — not just one message, but a multi-step task from spawn to termination — flows through the server.

This complements [Chat message end-to-end](./chat-message-end-to-end.md), which zoomed in on a single turn. This page zooms out.

## What counts as a "run"

A run is everything between:
- **Start:** an agent process is spawned with a task (a user request, a cron trigger, a peer-agent delegation, or a webhook).
- **End:** the agent reports success, hits a terminal failure, or is killed.

Runs have IDs. Every event, memory write, and guardrail verdict is tagged with the run ID so the whole thing can be replayed or audited later as a unit.

## Step 1 — spawn

Something triggers a run:

| Trigger | Source |
|---|---|
| User sends chat message to a new thread | `chatService` → `agentService` |
| User runs `codebolt agent start X` | CLI → REST `routes/` → `agentService` |
| Cron / file change fires a background agent | `backgroundAgent` controller |
| A peer agent delegates via `codebolt_agent.start` | `toolService` → `agentService` |
| Webhook arrives | `routes/` → `agentService` |

All paths converge on `agentService.startRun(...)`, which:

1. Creates an `agent_runs` row via `agentExecutionPhaseDataService` (or its sibling service).
2. Resolves which agent to use (explicit, or default for the workspace).
3. Asks `AgentProcessManager` to spawn the process.
4. Registers a heartbeat watchdog with `HeartbeatManager`.
5. Emits a `run.started` event on the bus.

## Step 2 — initial context

Before the agent's first step, `contextAssemblyService` builds the bootstrap prompt. This first assembly is different from subsequent ones:

- No episodic memory yet (this is step 1).
- Heavier reliance on persistent memory and the codemap.
- Includes the agent's system prompt, the task description, and the assigned tools.

The narrative engine also gets a chance to say "this task is related to thread X, here's the current state of that thread".

## Step 3 — the loop

```
┌── phase: deliberate ─────────────┐
│  contextAssembly → llmService     │
│  LLM returns: either tool calls   │
│  or a final answer                │
└──────────────┬────────────────────┘
               │
      ┌────────┴────────┐
      │ tool call(s)?   │
      └────────┬────────┘
        yes    │    no → finalize
               ▼
┌── phase: execute ─────────────────┐
│  for each tool call:              │
│    guardrailEngine.check          │
│    toolService.call               │
│    record result                  │
└──────────────┬────────────────────┘
               │
               ▼
┌── phase: reflect ─────────────────┐
│  write tool results to memory     │
│  narrativeService updates threads │
│  replan if needed                 │
└──────────────┬────────────────────┘
               │
               └──► back to deliberate
```

Each **phase** is a row in `agent_execution_phases`. That's why the log is fine-grained enough for replay: a run is a sequence of phases, and each phase is a deterministic function of the phase before it.

## Step 4 — memory writes during the run

At the end of every phase, the agent writes:

| Destination | What |
|---|---|
| `episodicMemoryDataService` | The raw turn(s) and tool results |
| `applicationEventBus` | Phase-completed event |
| `eventLogDataService` | Persisted log entry with causal parents |
| `shadowGitService` | Any file writes, committed to shadow git |

Asynchronously, the memory ingestion pipeline picks up the new events and decides whether to promote any of them into persistent memory, vector DB, or the knowledge graph.

## Step 5 — delegation and side tasks

If the agent calls `codebolt_agent.start` to delegate work to a peer, the delegation looks like any other tool call from the agent's perspective — but under the hood:

1. `toolService` routes to `agentService.startRun(...)` with the parent run ID.
2. A child run begins with its own event stream, causally linked to the parent run.
3. The parent agent's step waits (via `SideExecutionManager` or `coordinationService` depending on the pattern) for a response event.
4. When the child finishes, the response flows back through the channel layer into the parent's event queue, which wakes the parent.

This is how swarms and agent flows are built — they're just nested runs with well-defined communication.

## Step 6 — termination

A run ends one of four ways:

| Outcome | Cause | What happens |
|---|---|---|
| **Success** | Agent reports done, auto-testing passes | `run.completed`, auto-test pass recorded, final assistant message emitted |
| **Failure** | Task failed, replan budget exhausted | `run.failed` with reason, narrative engine records pivot |
| **Rejected** | Guardrail or human review denied a critical step | `run.rejected` with verdict |
| **Killed** | Heartbeat timeout or user stop | `run.killed`, process terminated, partial state frozen |

In every case:
1. `AgentProcessManager` cleans up the process.
2. The event log gets a `run.ended` entry with the outcome.
3. The knowledge graph is updated with final decisions.
4. The shadow git state is tagged with the run ID for time-travel.

## Step 7 — what persists

After the run ends, the following are queryable forever (or until archived):

- Every phase (`agent_execution_phases`)
- Every event (`event_log`)
- Every file change (`shadowGit` commits)
- Every narrative beat written during the run
- Every knowledge graph edge caused by the run

This is what lets you ask, a month later: "Why did the reviewer agent reject this PR?" and get a real answer traced back to the exact LLM call and guardrail verdict.

## See also

- [Chat message end-to-end](./chat-message-end-to-end.md) — one turn in detail
- [Tool call end-to-end](./tool-call-end-to-end.md) — one tool call in detail
- [Agent Subsystem](../../09_internals/03_subsystems/01_agent-subsystem.md)
- [Planning Hierarchy](../../09_internals/03_subsystems/08_planning-hierarchy.md) — how replan works
- [Replay an agent run (guide)](../../../03_guides/07_advanced/replay-an-agent-run.md)
