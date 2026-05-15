---
sidebar_position: 1
title: Multi-Agent Usage Overview
description: This section covers running multi-agent work as a user, with the current product surface centered on the desktop UI rather than the older flow/swarm CLI commands.
---

# Multi-Agent Usage

This section covers **running** multi-agent work such as swarms, flows, and review/merge patterns. If you want to *design* multi-agent orchestration, see [Build on Codebolt → Multi-Agent Orchestration](../../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md).

## What counts as multi-agent

Any of:

- **An agent flow** — a declared graph of agent stages run as one unit
- **A swarm** — a group of cooperating agents running concurrently
- **Plan-execute-review** — a common multi-stage pattern with specialized agents
- **Delegation** — one agent spawning or coordinating work done by others

## How multi-agent work shows up

### Flow runs

When you run a flow in the desktop product, you get a dedicated view with node status, timing, and drill-down into the work done at each stage.

### Swarm runs

Dynamic groups of agents appear as coordinated runs in the desktop execution and agent-monitoring surfaces.

### Chat-style invocation

Some multi-agent work can still be started from normal chat surfaces, but the important point for users is that the runtime remains visible through the desktop execution views.

## Running a multi-agent task

### From the desktop UI

The current user-facing multi-agent experience is primarily desktop-driven. Use the product surfaces that expose flows, orchestration, running agents, background agents, and related monitoring.

### From the CLI

The current `packages/cli` implementation does not expose the older dedicated multi-agent flow, swarm, or event-query command families from previous drafts.

What the current CLI *does* expose is limited server-backed inspection such as:

```bash
codebolt command agents running
codebolt command threads list
codebolt command threads steps <threadId>
codebolt command jobs list
codebolt command todos list
```

That makes the CLI useful for supporting inspection, but not as a full replacement for the older flow and swarm control docs.

## Observing a multi-agent run

Start with the desktop execution surfaces. That is where the current product exposes the most complete user-facing monitoring for orchestration, nested work, and run state.

The current CLI can still help with adjacent inspection:

```bash
codebolt command agents running
codebolt command threads messages <threadId>
codebolt command threads steps <threadId>
codebolt command jobs get <id>
```

## Stopping multi-agent work

Use the desktop execution surfaces that your build exposes for flow or swarm stop controls.

The current CLI only documents `codebolt command agents stop --id <agentId>` for stopping a running agent process. It does not expose the older recursive flow or swarm stop commands.

## When multi-agent is hurting more than helping

- **Flows that always take the same path.** Simplify them.
- **Agents disagreeing in circles.** Tighten the review loop or the task framing.
- **Cost exploding.** Multi-agent multiplies LLM usage quickly.
- **Observability getting fuzzy.** If you cannot explain which stage is doing what, the orchestration is too opaque.

## See also

- [Running a Swarm](./02_running-a-swarm.md)
- [Reading a Flow](./03_reading-a-flow.md)
- [Review and merge](./04_review-and-merge.md)
- [Observability and tracing](./05_observability-and-tracing.md)
