---
sidebar_position: 2
title: Architecture
description: Codebolt is organized as five cooperating planes, each with a clear responsibility
---

import FivePlanes from '@site/src/components/diagrams/FivePlanes';

# Architecture

Codebolt is organized as five cooperating **planes**, each with a clear responsibility. Understanding the planes makes everything else — agents, tools, hooks, memory — fall into place.

<FivePlanes />

## The five planes

1. **Control plane** — config, identity, permissions, project metadata. The "who" and "what's allowed".
2. **Executive plane** — the agent runtime: deliberation, tool calls, LLM requests, the per-turn loop.
3. **Wait & delegation plane** — long-running work, sub-agent spawning, human checkpoints, async tasks.
4. **Guardrails plane** — hooks, evals, loop detection, budget enforcement. Anything that says "stop" or "rewrite this".
5. **Bus & storage plane** — the event log, memory layers, vector/KG stores, shadow git. The persistent substrate.

Every action an agent takes flows through these planes in order: the executive plane proposes a tool call, the guardrails plane vets it, the bus records it, the storage plane materializes any side effects.

## Why this matters

- **Each plane is replaceable.** You can swap the LLM provider (executive), add a new guardrail (guardrails), or change the storage backend (bus & storage) without touching the others.
- **Failures are localized.** A bad hook can't corrupt the event log. A crashed tool can't bypass guardrails.
- **The model maps to the codebase.** `packages/server/src/services/` is organized by plane.

## Server subsystems

Inside the server, the planes are implemented by 12 subsystems — context assembly, memory ingestion, guardrails & eval, the deliberation loop, the tool runtime, etc. Each is documented under [Build on Codebolt → Internals → Subsystems](../../04_build-on-codebolt/07b_subsystems/01_agent-subsystem.md).

## See also

- [Process model](../../04_build-on-codebolt/02_architecture/03_process-model.md) — what runs where (server, plugins, agents)
- [Agent run end-to-end](../../04_build-on-codebolt/02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md) — a full request traced through every plane
