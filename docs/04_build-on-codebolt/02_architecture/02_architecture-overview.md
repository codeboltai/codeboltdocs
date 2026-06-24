---
sidebar_position: 1
title: Architecture Overview
description: Codebolt is built as a set of cooperating subsystems that run inside packages/server (the long-lived process), with packages/electron + packages/ui providing.
---

# Architecture Overview

Codebolt is built as a set of cooperating subsystems that run inside `packages/server` (the long-lived process), with `packages/electron` + `packages/ui` providing the desktop client and `packages/cli` + `packages/gotui` providing terminal access. This page gives the 30-second mental model; each subsystem has its own page under [Subsystems](../07b_subsystems/01_agent-subsystem.md).

## The five planes

Every request inside Codebolt — whether it comes from the chat UI, the CLI, or a remote agent run — flows through the same five planes:

| Plane | What it does | Key code |
|---|---|---|
| **Control Plane** | Accepts external requests (WS, REST, CLI), routes them to the right subsystem, enforces auth/capability checks. | `routes/`, `gateway/`, `sockets/`, `channels/`, `capabilityController` |
| **Executive Plane** | Actually runs work: spawns agent processes, drives the agent loop, executes tools. | `AgentProcessManager`, `agentFlowRuntimeService`, `toolService`, `mcpService` |
| **Wait & Delegation** | Holds work that's queued, sleeping, or waiting on a peer agent. | `agentEventQueue`, `HeartbeatManager`, `SideExecutionManager`, `coordinationService` |
| **Guardrails Sidecar** | Inspects every step against rules + LLM judges before it commits. | `guardrailEngine`, `guardrailLLMEvaluator`, `evalService` |
| **Bus & Storage** | Event log, KV, vector DB, knowledge graph, persistent + episodic memory. | `applicationEventBus`, `eventLog*`, `kvStore`, `vectordb`, `kuzuDbService`, `persistentMemory`, `episodicMemory` |

## Process model

- **Server** (`packages/server`) — single Node process; owns sockets, DB, all subsystems listed above. Hosts the `applicationEventBus` that ties everything together.
- **Agent processes** — spawned and supervised by `AgentProcessManager`. Each agent runs in its own process and talks back to the server over a local channel. This isolates crashes and lets agents use different runtimes.
- **Plugin processes** — supervised by `PluginProcessManager`; same isolation idea but for MCP servers and capability providers.
- **Desktop app** (`packages/electron`) — connects to the server over WebSocket. The UI itself (`packages/ui`, `packages/simpleui`, `packages/web`) is a renderer; it does not own state.
- **CLI / TUI** (`packages/cli`, `packages/gotui`) — alternative clients to the same server. Same protocol as the desktop app.

## How a chat message flows

```
User types in chat
   │
   ▼
[gateway/sockets]  ──▶  [chat channel]  ──▶  [agentService]
                                                 │
                                                 ▼
                                    [AgentProcessManager spawns agent]
                                                 │
                                                 ▼
                            ┌──────── agent loop ─────────┐
                            │  contextAssembly → planner  │
                            │     ↓                       │
                            │  llmService (inference)     │
                            │     ↓                       │
                            │  toolService / mcpService   │
                            │     ↓                       │
                            │  guardrailEngine (sidecar)  │
                            └────────────┬────────────────┘
                                         │ writes
                                         ▼
                  memory + eventLog + knowledge + vectordb
                                         │
                                         ▼
                       response streamed back to UI
```

A full annotated walkthrough lives at [Chat message end-to-end](./04_data-flow-walkthroughs/chat-message-end-to-end.md).

## Where to go next

- **Just want to use Codebolt?** Skip this section — head to the [What is Codebolt](../../01_get-started/02_what-is-codebolt.md) docs.
- **Want to understand a specific subsystem?** Jump into [Subsystems](../07b_subsystems/01_agent-subsystem.md).
- **Building a custom agent?** Read [Agent Subsystem](../07b_subsystems/01_agent-subsystem.md), then go to [Creating Agents](../02_creating-agents/01_overview.md).
- **Self-hosting?** Read this page + [The Server](./03_process-model.md), then [Self-Hosting](../11_agent-infrastructure/01_overview.md).
