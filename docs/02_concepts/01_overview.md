---
sidebar_position: 1
title: Core Concepts
description: Follow a Codebolt request from the first message through tool use, approvals, and recovery.
---

# Core Concepts

When you ask about a project in Chat, Codebolt sends your message to an agent in a thread. Follow that request through the five concepts below.

## Where to start

1. [How Codebolt Works](../01_get-started/04_core-concepts/01_how-it-works.md) — Follow a question from Chat to an agent and back.
2. [Threads, Agents, Models and Tools](../01_get-started/04_core-concepts/02_start-simple.md) — See what carries over to a follow-up message and how the agent uses a model and tools to answer.
3. [Context and Memory](./04_runtime/02_context-and-memory.md) — Understand what the model sees in a turn and how the agent can retrieve earlier information.
4. [Guardrails and Approvals](./06_quality/01_guardrails.md) — Learn why a tool request can proceed, require approval, or be denied.
5. [Checkpoints and Restore](./05_persistence/01_shadow-git-and-checkpoints.md) — See which project files you can recover from a message checkpoint.

## Building agents

- [Architecture](./02_foundation/01_architecture.md) and [Agents](./03_the-agent/01_agents.md) explain how the runtime and the agent share responsibility for a request.
- [Tools and MCP](./03_the-agent/02_tools-and-mcp.md) and [Capabilities](./03_the-agent/03_capabilities.md) describe the operations and reusable behaviors an agent can invoke.
- [Execution Phase](./03_the-agent/04_execution-phase.md) explains how an agent labels its current work. [Hooks and Processors](./04_runtime/01_hooks-and-processors.md) explains where you can intervene.
- To adapt a recurring workflow, see [Customize Process](../01_get-started/04_core-concepts/04_customize-process.md). To integrate Codebolt into another application, see [Extend to Your Process](../01_get-started/04_core-concepts/05_extend-to-your-process.md).

## Planning and coordination

- [The Planning System](./08_planning/01_planning-system.md) helps you choose a note, canvas, roadmap, plan, or task. [Run It Longer](../01_get-started/04_core-concepts/03_run-it-longer.md) covers delegation and preserving work across turns.
- [Multi-Agent Patterns](./07_multi-agent/01_multi-agent-patterns.md) compares ways to divide work. [Orchestration Flows](./07_multi-agent/02_orchestration-flows.md) shows how nodes exchange data in a visual agent.
- [Stigmergy Swarm](./07_multi-agent/04_stigmergy-swarm.md) covers shared jobs and signals. [Dispute Resolution](./07_multi-agent/03_dispute-resolution.md) covers overlapping edits and competing proposals.
- For execution on your machine, see [Local Scaling](../01_get-started/04_core-concepts/06_local-scaling.md). For runner nodes and hosted environments, see [Cloud Scaling](../01_get-started/04_core-concepts/07_cloud-scaling.md).

## Evaluating runs

Use the [Event Log](./05_persistence/02_event-log.md) to inspect events a workflow recorded. Use [Evals and Optimization](./06_quality/02_evals-and-optimization.md) to score responses to a repeatable task and compare changes to an agent.

## How concepts relate to the rest of the docs

| What you want to do | Where to go |
|---|---|
| Use a feature in Desktop or the CLI | [Using Codebolt](../02_using-codebolt/01_features-overview.md) |
| Follow a task walkthrough | [Guides](../03_guides/01_overview.md) |
| Build an agent, tool, or provider | [Build on Codebolt](../04_build-on-codebolt/01_overview.md) |
| Look up an API or command | [Reference](../05_reference/01_overview.md) |
