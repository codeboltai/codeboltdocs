---
sidebar_position: 2
title: Architecture
description: Codebolt's five cooperating planes — the foundation that makes everything else fall into place.
---

import FivePlanes from '@site/src/components/diagrams/FivePlanes';

# Architecture

Codebolt is organized as **five cooperating planes**, each with a clear responsibility. Understanding the planes makes everything else — agents, tools, hooks, memory — fall into place.

<FivePlanes />

## The five planes

| Plane | Responsibility | In plain terms |
|---|---|---|
| **Control** | Config, identity, permissions, project metadata | The "who" and "what's allowed" |
| **Executive** | The agent runtime — deliberation, tool calls, LLM requests, the per-turn loop | The brain doing the work |
| **Wait & delegation** | Long-running work, sub-agent spawning, human checkpoints, async tasks | Hands work off and waits |
| **Guardrails** | Hooks, evals, loop detection, budget enforcement | Anything that says "stop" or "rewrite this" |
| **Bus & storage** | The event log, memory layers, vector/KG stores, shadow git | The persistent substrate |

## How a request flows

Every action an agent takes flows through the planes **in order**: the executive plane proposes a tool call, the guardrails plane vets it, the bus records it, and the storage plane materializes any side effects.

## Why the separation matters

- **Each plane is replaceable.** Swap the LLM provider (executive), add a guardrail (guardrails), or change the storage backend (bus & storage) without touching the others.
- **Failures are localized.** A bad hook can't corrupt the event log; a crashed tool can't bypass guardrails.
- **The model maps to the codebase.** `packages/server/src/services/` is organized by plane.

Inside the server, the planes are implemented by 12 subsystems — context assembly, memory ingestion, guardrails & eval, the deliberation loop, the tool runtime, and more.

→ **Read the full concept page: [Architecture](../../02_concepts/02_foundation/01_architecture.md)**

## See also

- [Agents](./03_agents.md)
- [Guardrails](./08_guardrails.md)
