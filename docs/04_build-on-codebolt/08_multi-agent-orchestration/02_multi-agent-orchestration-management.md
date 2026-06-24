---
sidebar_position: 2
title: Multi-Agent Orchestration Management
description: How do several agents cooperate, divide work, exchange state, and complete a task together?
---

# Multi-Agent Orchestration Management

This part is about coordinating **multiple agents inside one Codebolt system**.

The question here is:

> How do several agents cooperate, divide work, exchange state, and complete a task together?

This is different from **multi-environment orchestration** work, where one agent or run may execute outside the local machine through a provider.

## What lives here

Multi-agent orchestration in Codebolt is built from a small set of runtime primitives:

| Primitive | What it does | Where to read next |
|---|---|---|
| **Swarms** | Dynamic groups of agents coordinating on shared work | [Patterns](./03_patterns/manager-worker.md) |
| **Flows** | Fixed graph orchestration for explicit pipelines | [Agent Flows](./04_agent-flows.md) |
| **Roles and teams** | Structured responsibilities inside a swarm | [Patterns](./03_patterns/manager-worker.md) |
| **Subagents** | Synchronous delegated child agents | [Subagents](../03_agent-extensions/08_subagents.md) |
| **Side execution** | Background or helper work spawned beside a run | [Side Execution](../03_agent-extensions/07_side-execution.md) |
| **Action blocks** | Reusable workflow steps callable by agents | [Action Blocks](../03_agent-extensions/05_action-blocks/01_overview.md) |
| **Shared state** | KV, memory, files, event log, codemap, queues | [Stigmergy and Reputation](./05_stigmergy-and-reputation.md) |

These are the parts that make multi-agent behavior manageable instead of ad hoc.

## The important mental model

Multi-agent orchestration is not one feature. It is a composition of:

- coordination patterns
- runtime control surfaces
- shared state
- task boundaries
- review / merge checkpoints

The hard part is rarely "spawn more agents." The hard part is deciding:

- who owns the plan
- who owns execution
- what state is shared
- how agents hand work off
- when humans or reviewers intervene

That is why the rest of this section focuses on patterns and runtime components, not just on starting child agents.

## What tools and components are available

From the agent side, the main orchestration-facing surfaces live in `@codebolt/codeboltjs`.

Common ones include:

- `codebolt.swarm` for swarm and team coordination
- `codebolt.orchestrator` for orchestration state and runtime control
- `codebolt.sideExecution` for helper/background work
- `codebolt.actionBlock` for structured workflow steps
- `codebolt.agentEventQueue` for directed event delivery
- `codebolt.thread`, `codebolt.task`, and `codebolt.job` for execution state
- `codebolt.kvStore`, `codebolt.memory`, `codebolt.eventLog`, and `codebolt.codemap` for shared context

You do not need every one of these for every design. Most real systems use only a few:

- one coordination structure
- one shared-state mechanism
- one review or merge checkpoint

## How agents access orchestration features

There are three common shapes:

### 1. Agent-to-agent delegation

One agent delegates work to another child agent with a clear task boundary.

Use this when:

- the child needs its own loop
- the child should have different tools, prompt, or model
- you want clean isolation between planner and worker

This is usually the right shape for:

- planner -> executor
- coder -> reviewer
- dispatcher -> specialists

### 2. Flow-driven orchestration

The flow graph owns the order of execution, and each node is an agent or action step.

Use this when:

- the topology is stable
- the stages are explicit
- retries and branch conditions should be visible in one graph

This is the right shape for pipelines like:

- plan -> execute -> review
- collect -> summarize -> publish
- inspect -> patch -> test -> merge

### 3. Shared-state orchestration

Agents coordinate through shared state rather than direct message passing.

Use this when:

- work is parallel
- central coordination would bottleneck the system
- agents can discover tasks from a queue, board, or state store

This is the right shape for stigmergic swarms and opportunistic work pickup.

## How to choose the right orchestration surface

- Use **subagents** when you need direct delegation with strong ownership.
- Use **flows** when the pipeline shape is known ahead of time.
- Use **action blocks** when you want reusable steps inside a larger orchestration.
- Use **side execution** when the work is helper-style and does not need a full agent loop.
- Use **swarms / shared state** when coordination is dynamic and parallel.

If you are unsure, start with:

1. one planner
2. one executor
3. one reviewer

That covers most real systems.

## Read this section in this order

1. [When to use multi-agent](./02_when-multi-agent.md)
2. [Patterns](./03_patterns/manager-worker.md)
3. [Agent Flows](./04_agent-flows.md)
4. [Stigmergy and Reputation](./05_stigmergy-and-reputation.md)
5. [Drift Detection](./06_drift-detection.md)
6. [Review & Merge Design](./07_review-and-merge-design.md)

## See also

- [Multi-Environment Orchestration](../08a_multi-environment-orchestration/01_overview.md) — when execution crosses machine or sandbox boundaries
- [Subagents](../03_agent-extensions/08_subagents.md)
- [Side Execution](../03_agent-extensions/07_side-execution.md)
- [Action Blocks](../03_agent-extensions/05_action-blocks/01_overview.md)
- [Agent Subsystem](../07b_subsystems/01_agent-subsystem.md)
