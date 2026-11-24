---
sidebar_position: 1
title: Manager-Worker
description: One agent decides what to do and hands pieces of work to others. The manager never does the work itself; the workers never decide what to work on.
---

# Manager-Worker

One agent decides what to do and hands pieces of work to others. The manager never does the work itself; the workers never decide what to work on.

## When to use

- **Parallelism.** N independent tasks, you want them running at once.
- **Centralised coordination.** You want one authoritative view of "what's done and what isn't".
- **Heterogeneous workers.** Different workers may use different models, different tool allowlists, or different skills.

## Shape

```
        ┌───────────┐
        │  Manager  │
        └─────┬─────┘
              │ delegates tasks
     ┌────────┼────────┐
     ▼        ▼        ▼
  Worker   Worker   Worker
     │        │        │
     └────────┴────────┘
              │ results
              ▼
        ┌───────────┐
        │  Manager  │  aggregates + decides next steps
        └───────────┘
```

## What each agent owns

| Agent | Reads | Writes | Tools |
|---|---|---|---|
| Manager | Full task, codemap, planning hierarchy | The task graph, final result | Delegation and planning tools selected for the manager |
| Worker | Its one assigned task + scoped context | Its assigned outputs | File + domain tools; **no delegation** |

The "no delegation" rule on workers is important: it prevents runaway recursion, where a worker spawns more workers and suddenly you have hundreds of agents with no clear parent.

## How it works in Codebolt

Give the parent a task it can split into independent assignments. For a focused handoff in the same conversation, call `await codebolt.agent.startAgent(workerAgentId, task)` from the parent agent. Use the ID of an installed agent and supply the task as text. The call waits for a completion response.

For workers that need separate conversations, start linked child threads. The [Map–Reduce example](./map-reduce.md#implementation) shows how to start two child threads concurrently, wait for both outputs, and keep each result associated with its assignment.

## Variations

### Fan-out, fan-in (blocking)
Manager spawns N workers, blocks until all return, aggregates. Simplest. Use when the aggregation needs all results.

### Streaming aggregation
Manager spawns N workers and starts processing results as they arrive instead of waiting for all of them. Use when partial progress is useful (e.g. showing the user live results).

### Dynamic spawning
Manager starts with K workers, spawns more as new tasks are discovered during execution. Use for exploration problems (crawling, search).

### Work-stealing queue
Manager populates a shared task queue. Workers pull from the queue when they're free. Use when tasks are heterogeneous in size and you want load balancing. For a shared job group managed through the desktop application, see [Running a Swarm](../../../02_using-codebolt/07_multi-agent-usage/02_running-a-swarm.md).

## Pitfalls

- **Manager bottleneck.** If the manager is doing real thinking between each delegation, it becomes the slowest thing. Keep manager work trivial; push decisions into planning done once at the start.
- **Unbounded spawn.** Dynamic spawning without a cap is how you wake up to a huge token bill. Always cap total concurrent workers.
- **Lost results.** If a worker crashes and the manager isn't explicitly waiting, the manager will claim "done" with missing work. Check each completion response before combining results and report any missing assignment.
- **Manager doing work.** The biggest anti-pattern: the manager stops delegating and starts doing the work itself because "it's easier this way". If you see this, collapse to a single agent — you already have one.

## Example use cases

- Refactoring N independent files in parallel.
- Generating test cases for N modules.
- Running a spec against N backend implementations in a bake-off.
- Crawling a large codebase with per-subtree workers.

## See also

- [Map-Reduce](./map-reduce.md) — a specialisation of manager-worker
- [Pipeline](./pipeline.md) — when work is sequential, not parallel
- [Agent Subsystem](../../07b_subsystems/01_agent-subsystem.md)
