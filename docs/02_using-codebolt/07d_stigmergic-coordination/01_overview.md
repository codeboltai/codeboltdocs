---
sidebar_position: 1
title:  Overview
description: When several agents work on the same project — jobs, review requests, file edits — they need a way to stay out of each other's way and signal intent to each.
---

# Stigmergic Coordination

When several agents work on the same project in parallel — jobs, review requests, file edits — they need a way to stay out of each other's way and signal intent to each other *without* requiring a central orchestrator or direct agent-to-agent messages. Codebolt's answer is a set of **stigmergic primitives**: signals and reservations that live on the shared entity itself.

The name comes from biology: ants coordinate through pheromones deposited in the environment, not by talking to each other. In Codebolt, agents deposit **pheromones** on jobs and review requests, acquire **locks** on entities they are actively working on, and raise **unlock requests** when they need an entity that someone else holds. Any agent reading the entity sees the current signals and decides what to do.

## Primitives in this section

| Primitive | Purpose |
|---|---|
| [Pheromones](./02_pheromones.md) | Typed signals (importance, saturation, interest, blocked, …) deposited on an entity with an intensity and an optional decay rate |
| [Locks & Unlock Requests](./03_locks-and-unlock-requests.md) | Exclusive claim on an entity while an agent works on it, plus a structured way to ask the holder to release it |
| [File Update Intents](./04_file-update-intents.md) | File-level declarations of planned edits, graded L1–L4 (advisory → hard lock), with overlap detection across agents |

## Where stigmergic coordination is used

Stigmergic primitives are shared infrastructure (`coordinationService` and `fileUpdateIntentService` on the server) and attach to any entity that opts in. Today that includes:

| Entity | Shows pheromones | Supports locks |
|---|---|---|
| [Jobs](../07c_agent-coordination/02_jobs.md) | ✓ | ✓ |
| Review Merge Requests | ✓ | ✓ |

File update intents live at the file layer (inside an environment) rather than on a specific entity, so they apply across all work happening in the environment. The `files_blocked` pheromone bridges the two layers: a hard-locked file surfaces as a pheromone on the parent entity.

Any future coordinated entity (specs, epics, etc.) plugs into the same primitives.

## How it works in practice

1. Agent A starts working on job `COD2-5`. It deposits a `workingonit` pheromone and acquires a **lock**.
2. Agent B sees the lock on `COD2-5` and picks a different open job. It sees a `saturation` pheromone on job `COD2-7` (another agent has already signalled heavy activity) and skips that too.
3. Agent A hits a blocker in a file Agent C holds. A files an **unlock request** with a reason; C sees the request, finishes its current step, and releases the lock.
4. A meanwhile deposits `task_not_ready` on the blocked sub-job so other agents know it is waiting on something.

No one sent a direct message. All coordination flowed through signals on the entities themselves.

## Why prefer stigmergic coordination

- **No orchestrator bottleneck.** Every agent reads the same state and decides locally.
- **Resilient.** An agent that crashes leaves its traces behind; another agent can reclaim the work based on those traces.
- **Composable.** The same pheromone and lock primitives work across jobs, review requests, and anything else that exposes them.

## When to use what

- **Soft, advisory signal** (priority, interest, readiness, "I'm on it") → [Pheromones](./02_pheromones.md)
- **Hard, exclusive claim on an entity** ("no one else touch this job until I'm done") → [Locks](./03_locks-and-unlock-requests.md)
- **Planning file edits** ("I'm going to touch these files; coordinate at the file level") → [File Update Intents](./04_file-update-intents.md)
- **Need the holder to release something** → file an [unlock request](./03_locks-and-unlock-requests.md#unlock-requests)

## Related

- [Multi-Agent Coordination Tools](../07c_agent-coordination/01_overview.md) — the higher-level tools (jobs, swarm, deliberation) that these primitives underpin
- [Stigmergy Swarm (concepts)](../../02_concepts/07_multi-agent/04_stigmergy-swarm.md) — the theory, scaling model, and four-layer architecture
- [Stigmergy and Reputation (for builders)](../../04_build-on-codebolt/08_multi-agent-orchestration/05_stigmergy-and-reputation.md) — how to design a swarm around these primitives
