---
sidebar_position: 4
title: Agent Flows
description: "Source code: services/agentFlowService, services/agentFlowRuntimeService, services/agentFlowPluginService."
---

# Agent Flows

The graph runtime for fixed, reusable orchestration patterns. When you've worked out a pattern ([pipeline](./03_patterns/pipeline.md), [plan-execute-review](./03_patterns/plan-execute-review.md), a specific map-reduce shape) and you want to run it repeatedly, you express it as a flow.

> **Source code:** `services/agentFlowService`, `services/agentFlowRuntimeService`, `services/agentFlowPluginService`.

## What a flow is

A **flow** is a graph:

- **Nodes** are agent steps, tool calls, or control operations (branch, loop, wait).
- **Edges** are messages — the output of a node becomes the input of the next.
- **The graph is declarative.** You write it once; the runtime executes it.

This is different from agents *dynamically* delegating to each other at runtime. Flows are for when you already know the shape.

## When to use a flow vs an orchestrator agent

| Use a flow when... | Use an orchestrator agent when... |
|---|---|
| The shape is known and stable | The shape depends on runtime information |
| You want to run the same pattern repeatedly | Each invocation is different |
| The shape should be visible to reviewers/auditors | Visibility matters less than flexibility |
| You want declarative debugging / replay | Decisions happen mid-run and need an LLM |

A flow can contain orchestrator agents as nodes (and often does). "Fixed pipeline containing a dynamic sub-step" is normal.

## Anatomy

A minimal flow definition:

```yaml
name: plan-execute-review
version: 1
inputs:
  task: string
nodes:
  - id: plan
    agent: planner
    input: { task: "{{inputs.task}}" }
    output: plan_doc
  - id: execute
    agent: coder
    input: { plan: "{{plan.output}}" }
    output: diff
  - id: review
    agent: reviewer
    input:
      plan: "{{plan.output}}"
      diff: "{{execute.output}}"
    output: verdict
edges:
  - from: plan
    to: execute
  - from: execute
    to: review
  - from: review
    to: execute
    when: "{{review.output.status == 'reject'}}"
    max_iterations: 3
outputs:
  plan: "{{plan.output}}"
  diff: "{{execute.output}}"
  verdict: "{{review.output}}"
```

Three nodes, one conditional back-edge, one iteration cap. This is the plan-execute-review pattern as a flow.

## What the runtime gives you

`agentFlowRuntimeService` is the interpreter. It handles:

- **Sequencing** — deciding which node runs next based on edges.
- **Input binding** — templating values from previous nodes.
- **Concurrency** — if two nodes have no dependency between them, they run in parallel.
- **Iteration caps** — enforced at the edge level; a loop without a cap is rejected at load time.
- **Error handling** — a node failure triggers the edge's error path or aborts the flow.
- **Replay** — the full flow execution is in the event log; you can replay a run step by step.
- **Pause / resume** — a long-running flow can be paused and resumed, including across server restarts.

## Nodes beyond "run an agent"

Flow nodes can also be:

| Node kind | Purpose |
|---|---|
| `tool` | Call a single tool directly (no agent) |
| `branch` | Conditional split to one of N next nodes |
| `join` | Wait for multiple parallel branches to complete |
| `human` | Pause for explicit human input via `reviewMergeRequestService` |
| `subflow` | Invoke another flow as a node |

Subflows are the composition primitive: a "feature development" flow can be built from a "understand" subflow + a "plan-execute-review" subflow + a "deploy" subflow.

## Flow plugins

`agentFlowPluginService` lets extensions register custom node types. An MCP server or a capability can declare "I provide a `stripe.charge` node" and flows in any project can use it. This is how domain-specific orchestrations get packaged and shared.

## Authoring a flow

1. Write the YAML (or use the flow editor UI, which produces the same YAML).
2. Validate with `codebolt flow validate <path>`. The runtime's validator checks for unreachable nodes, unbounded loops, type mismatches at input bindings.
3. Test with `codebolt flow run <path> --inputs ...`.
4. Commit the flow file to your project under `.codebolt/flows/`.
5. The flow is now invocable as an agent by any consumer.

## Debugging

- `codebolt flow trace <run_id>` shows the full execution tree.
- The UI's flow view renders the graph with per-node status, input/output, and timing — rebuilt from the event log.
- Any node can be re-run in isolation using its recorded input — fast feedback loop for iterating on a single stage.

## Pitfalls

- **Flows that should be agents.** If every run takes a different path through the graph, you don't have a flow — you have an orchestrator agent. Move the decisions into an LLM and simplify.
- **Agents that should be flows.** The inverse: if your orchestrator agent always takes the same path, freeze it as a flow and gain visibility, replay, and concurrency for free.
- **No iteration caps.** The runtime rejects these at load time, but people work around it with nested edges. Don't.
- **Too-fine-grained nodes.** Five-node flows are fine; 50-node flows become unmaintainable. Group related work into subflows.

## See also

- [Plan-Execute-Review](./03_patterns/plan-execute-review.md) — the canonical flow shape
- [Pipeline](./03_patterns/pipeline.md)
- [Agent Subsystem](../07b_subsystems/01_agent-subsystem.md)
- [Guide: build a plan-execute-review flow](../../03_guides/05_multi-agent/build-a-plan-execute-review-flow.md)
