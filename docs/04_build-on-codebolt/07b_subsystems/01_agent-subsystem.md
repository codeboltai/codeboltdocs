---
sidebar_position: 1
title: Agent Subsystem
description: "Source code: packages/server/src/controllers/agent, services/agent, services/swarm*, managers/AgentProcessManager, managers/HeartbeatManager,."
---

# Agent Subsystem

The agent subsystem is the executive core of Codebolt: it spawns agent processes, runs their think→act loop, coordinates multi-agent work, and tracks every step for audit and replay.

> **Source code:** `packages/server/src/controllers/agent*`, `services/agent*`, `services/swarm*`, `managers/AgentProcessManager`, `managers/HeartbeatManager`, `managers/SideExecutionManager`.

## Responsibilities

1. **Lifecycle** — spawn, supervise, restart, and tear down agent processes.
2. **The agent loop** — drive deliberation → tool calls → reflection in well-defined phases.
3. **Multi-agent coordination** — swarms, roles, teams, portfolios, flows.
4. **Queueing & heartbeats** — keep long-running and side-task work alive.
5. **Auditability** — every phase is recorded so a run can be replayed or reviewed.

## Components

### AgentProcessManager
Owns the OS processes that run agents. Each agent runs isolated so a crash, hang, or runaway loop in one agent never takes down the server. Backed by `HeartbeatManager` for liveness detection and `SideExecutionManager` for spawning short-lived helper processes from inside an agent.

### Deliberation loop (`agentDeliberationService`)
The "think" half of an agent step: assembles context, calls the LLM, parses tool calls. Phases are persisted via `agentExecutionPhaseDataService` so every reasoning step is queryable later.

### Agent flows (`agentFlowService`, `agentFlowRuntimeService`, `agentFlowPluginService`)
A graph runtime: nodes are agents or tools, edges are message channels. Used when you want a fixed pipeline (e.g. plan → code → review → test) instead of one agent improvising the whole job. See [Agent Flows](../08_multi-agent-orchestration/04_agent-flows.md).

### Swarms (`swarmManager`, `swarmDataService`, `swarmValidation`)
Dynamic groups of cooperating agents — used for emergent multi-agent patterns (debate, map-reduce, exploration). Swarm membership and communication topology can change at runtime. See [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md).

### Roles & teams (`roleManager`, `teamManager`, `coordinationService`)
A higher-level vocabulary on top of swarms: assign agents to roles ("planner", "coder", "reviewer"), group them into teams, and let `coordinationService` pick who handles a given message. See [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md).

### Portfolios (`agentPortfolioService`)
Groups of agents that an organisation has installed and curated for its workflows. The marketplace is the *catalog*; a portfolio is the *selection*.

### Background & remix agents (`backgroundAgent`, `remixAgentFileService`)
Background agents run on triggers (cron, file change, hook) instead of chat. Remix agents are a special form: customise an existing agent's prompt/tools without forking its code.

### Event queueing (`agentEventQueueDataService`, `agentEventQueueInternal`)
Durable queue for agent-bound events: incoming user turns, tool results, peer-agent messages. Survives server restarts.

## Data this subsystem owns

| Table / store | Purpose |
|---|---|
| `agent_runs` | One row per agent execution, with status, start/end, parent run. |
| `agent_execution_phases` | One row per phase inside a run (deliberate, tool call, reflect). |
| `agent_event_queue` | Durable inbox per agent. |
| `swarms` / `swarm_members` | Swarm topology + membership history. |
| `agent_portfolios` | Per-workspace agent selection. |

## How other subsystems plug in

- **MCP / Tools** — `toolService` is called from inside the deliberation loop whenever the LLM emits a tool call.
- **LLM** — `llmService` is the only thing the loop calls for inference; provider routing happens there.
- **Memory** — every phase reads from `contextAssembly` and writes to `episodicMemory` + the event log.
- **Guardrails** — `guardrailEngine` is invoked between "LLM said X" and "we actually do X". A failed guardrail aborts the phase and is itself recorded.
- **Communication** — incoming chat / inbox / mail messages land in `agentEventQueue` via the channel layer.

## See also

- [Build a custom agent](../02_creating-agents/01_overview.md) — the developer-facing how‑to.
- [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md) — when you need more than one agent.
- [Agent run end-to-end](../02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md) — annotated trace of a full run.
