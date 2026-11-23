---
sidebar_position: 1
title: Overview
description: Codebolt lets you run multiple agents at the same time — on the same project, on different tasks, or coordinated in a pipeline
---

# Parallel Agents

Codebolt lets you run multiple agents at the same time — on the same project, on different tasks, or coordinated in a pipeline. This section covers the patterns for doing that and the tools for monitoring and managing concurrent runs.

## Why run agents in parallel

Running agents sequentially — one finishes, then the next starts — works fine for simple linear tasks. Parallel execution becomes valuable when:

- **Tasks are independent** — writing tests while docs are being generated; refactoring two separate modules simultaneously
- **You want to compare approaches** — run the same prompt against two different agents or models side by side
- **A parent agent delegates subtasks** — an orchestrator breaks a large task into pieces and hands each to a specialist agent
- **Background work shouldn't block foreground work** — a scheduled audit runs while you continue working interactively

## Patterns

| Pattern | How it works | When to use |
|---|---|---|
| **Tabs** | Open multiple chat tabs; each runs its own agent independently | Ad-hoc parallel work, comparing outputs |
| **Subagents and child threads** | In Chat, ask an agent that supports delegation to hand off part of the work | Delegate a focused check or give the work a linked conversation |
| **Virtual Workers** | Route messages to an agent identity with configured thread and environment policies | Reuse a worker for incoming work |
| **Swarms** | A dynamic group of cooperating agents sharing memory and tasks | Large, exploratory, or open-ended work |

## In this section

- [Running Parallel Agents](./02_running-parallel-agents.md) — how to start and manage concurrent runs
- [Background Agent](./04_background-agent.md) — how the Background Agents panel starts, tracks, and surfaces background runs
- [Sub Agent](./05_sub-agent.md) — how delegated child runs work and where to follow them
- [Virtual Workers](./06_virtual-workers.md) — route incoming work to a persistent agent identity
