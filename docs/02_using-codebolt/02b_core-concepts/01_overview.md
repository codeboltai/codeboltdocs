---
sidebar_position: 1
title: Core Concepts Overview
description: The mental model behind Codebolt — architecture, agents, tools, runtime, persistence, quality, multi-agent, and planning.
---

# Core Concepts

Core Concepts is your shortcut to the mental model behind Codebolt. Before diving into a specific client (Desktop, CLI, TUI), it helps to understand the handful of ideas that are the same everywhere.

Each page below is a **detailed summary with diagrams and screenshots**, plus a link to the full concept page for the deep dive.

## Explore the concepts

| Concept | Summary | Read the summary |
|---|---|---|
| **Architecture** | The five cooperating planes — control, executive, delegation, guardrails, storage | [Architecture →](./02_architecture.md) |
| **Agents** | A configured loop: take a task, call an LLM, call tools, observe, repeat | [Agents →](./03_agents.md) |
| **Tools and MCP** | How agents act on the world — built-in tools, MCP servers, capabilities | [Tools and MCP →](./04_tools-and-mcp.md) |
| **Hooks and Processors** | Intercept events (hooks) and transform context on every call (processors) | [Hooks and Processors →](./05_hooks-and-processors.md) |
| **Context and Memory** | The memory layers and how context is assembled each turn | [Context and Memory →](./06_context-and-memory.md) |
| **Multi-Agent Patterns** | Five shapes for getting agents to work together — swarm, plan-execute-review, debate, stigmergy, reputation | [Multi-Agent →](./10_multi-agent.md) |
| **The Planning System** | A stack of artifacts — Roadmap, Specs, UI Flow, Requirement Plan, Action Plan, Tasks | [Planning →](./11_planning.md) |

## A one-paragraph mental model

An **[agent](./03_agents.md)** is a loop that calls an LLM and **[tools](./04_tools-and-mcp.md)** until a task is done. Each turn it assembles **[context and memory](./06_context-and-memory.md)**, then **[guardrails](../../02_concepts/06_quality/01_guardrails.md)** vet every proposed action. Every action is recorded in the **[event log](../../02_concepts/05_persistence/02_event-log.md)**, and every file edit is checkpointed in **[shadow git](../../02_concepts/05_persistence/01_shadow-git-and-checkpoints.md)** so it can be rolled back. When one agent isn't enough, you compose **[multi-agent patterns](./10_multi-agent.md)**; when the work is non-trivial, agents plan against the **[planning system](./11_planning.md)**. All of this sits on the five-plane **[architecture](./02_architecture.md)**.

## Where to go next

- For the full concept deep-dives (no images, pure explanation), see **[Concepts](../../02_concepts/01_overview.md)**.
- To start using Codebolt, pick a client: **[Desktop App](../02f_platforms/01_desktop.md)** · **[CLI](../02f_platforms/02_cli.md)** · **[TUI](../02f_platforms/03_tui.md)**.
