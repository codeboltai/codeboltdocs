---
sidebar_position: 2
title: Process Model
description: Codebolt is not a monolith. At runtime it's a tree of cooperating OS processes, each with a clear owner and restart policy.
---

# Process Model

Codebolt is not a monolith. At runtime it's a tree of cooperating OS processes, each with a clear owner and restart policy.

## The tree

```
codebolt-server  (packages/server)
   │
   ├── agent process           ← one per running agent (AgentProcessManager)
   ├── agent process
   │
   ├── plugin process          ← one per MCP server / capability (PluginProcessManager)
   ├── plugin process
   │
   ├── language server         ← one per language (languageServerService)
   │
   └── side executions         ← short-lived helpers spawned from inside an agent
                                  (SideExecutionManager)
```

External clients — the desktop app (`packages/electron`), the CLI (`packages/cli`), the TUI (`packages/gotui`) — connect to the server over WebSocket. They are **not** children of the server; they are peers that speak the same protocol.

## Why isolation matters

- **Agent crashes don't take down the server.** A runaway loop or OOM in one agent is contained.
- **Plugins can be third-party code.** Isolating them lets us enforce resource limits, capture logs independently, and restart on failure without affecting anything else.
- **Language servers are heavy.** One per language, shared across all agents working in that language.
- **Side executions are cheap.** When an agent wants to shell out to run a linter or a test, `SideExecutionManager` spawns a throwaway process — the agent itself keeps running.

## Who owns what

| Manager | Owns | Restart policy |
|---|---|---|
| `AgentProcessManager` | Agent processes | Restart on crash; kill on heartbeat timeout (`HeartbeatManager`). |
| `PluginProcessManager` | MCP servers, capability providers | Exponential backoff restart; circuit-break after repeated failures. |
| `SideExecutionManager` | Short-lived helpers | No restart — fire and forget with timeout. |
| `applicationEventBus` | In-process pub/sub fanout | N/A — in-process. |

## Heartbeats

Every long-lived child process sends heartbeats to `HeartbeatManager`. A missed heartbeat is treated as a hang — the manager sends SIGTERM, then SIGKILL if needed, and marks the parent run as failed with a clear reason. This is what prevents "my agent has been spinning for 20 minutes" situations.

## The application event bus

All subsystems communicate through `applicationEventBus` inside the server process. It's how:

- Tool results flow back to the agent loop.
- Memory ingestion hears about chat turns, tool calls, and file edits.
- The event log captures everything.
- Hooks fire at well-defined moments.

A single bus makes the system replayable: if you record every bus event, you can reconstruct exactly what happened in a run. That's what `eventLogDataService` does, and it's what powers [replay](../../03_guides/07_advanced/replay-an-agent-run.md).

## See also

- [Architecture Overview](./02_architecture-overview.md)
- [Agent Subsystem](../09_internals/03_subsystems/01_agent-subsystem.md)
- [Persistence & Event Log](../09_internals/03_subsystems/12_persistence-and-eventlog.md)
