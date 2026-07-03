---
sidebar_position: 1
title:  Overview
description: When multiple agents work on the same project, they need ways to divide work, communicate, reach decisions, and stay aware of what others are doing
---

# Multi-Agent Coordination

When multiple agents work on the same project, they need ways to divide work, communicate, reach decisions, and stay aware of what others are doing. Codebolt provides a set of dedicated coordination tools for exactly this.

These tools are designed to be used together — an orchestrator assigns jobs, agents bid on them, they deliberate on shared decisions via the deliberation panel, and they message each other through the mail inbox.

## Coordination tools

| Tool | Purpose |
|---|---|
| [Jobs](./02_jobs.md) | Distribute and track work items; agents bid on, split, and coordinate around jobs |
| [Mail & Inbox](./03_mail-inbox.md) | Threaded messaging between agents and users |
| [Agent Deliberation](./04_agent-deliberation.md) | Voting and consensus mechanisms for shared decisions |
| [Swarm Management](./05_swarm-management.md) | Create and manage groups of agents working toward a shared goal |
| [Orchestrator Management](./06_orchestrator-management.md) | Route tasks across agents via an orchestrator layer |

## How the tools relate

```
Orchestrator
    │  assigns tasks
    ▼
  Jobs  ◀──── Agents bid, lock, split, deposit pheromones
    │
    ├── Agents communicate via Mail
    ├── Agents vote on decisions via Deliberation
    └── Agents are grouped into Swarms
```

The **Jobs** panel is the central coordination point — it holds the work queue. **Orchestrators** create and assign jobs. **Swarms** define which agents work together. **Deliberation** is used when agents need to reach a shared decision before proceeding. **Mail** handles asynchronous communication that doesn't fit into a single chat thread.

Underneath all of these sits a set of shared primitives — **pheromones** and **locks** — that let agents signal intent and claim exclusive access on any coordinated entity. See [Stigmergic Coordination](../07d_stigmergic-coordination/01_overview.md) for the primitives themselves.

## Opening coordination panels

All panels are accessible from the **Agents** dropdown in the bottom bar. Each panel connects to the server over WebSocket and updates in real time as agents act.
