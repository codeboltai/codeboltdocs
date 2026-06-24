---
sidebar_position: 2
title: When to use multi-agent
description: Most tasks are single-agent tasks. Before designing a swarm, make sure you actually need one.
---

# When to use multi-agent

Most tasks are single-agent tasks. Before designing a swarm, make sure you actually need one.

## The single-agent baseline

A well-prompted single agent with good tools can usually:

- Read and understand a codebase via the codemap + vector search.
- Plan work itself using the [planning hierarchy](../07b_subsystems/08_planning-hierarchy.md).
- Execute, test, and report.
- Self-correct when tests or guardrails fail.

If your current problem is "my single agent keeps getting the wrong answer", the fix is almost always better prompting, better tools, or better context rules — *not* adding a second agent to check its work. A second agent with the same context will usually agree with the first.

## When multi-agent genuinely helps

Four situations where a swarm beats a single agent:

### 1. Independent work that can run in parallel

If you have N tasks that don't depend on each other — refactor 20 files, write tests for 10 modules, translate 50 docs — running them sequentially in one agent wastes wall-clock time. Spawn N worker agents, have a manager collect results.

**Pattern:** [Manager-worker](./03_patterns/manager-worker.md) or [Map-reduce](./03_patterns/map-reduce.md).

### 2. Review that needs fresh eyes

Asking an agent to review its own output mostly doesn't work: it just reaffirms its previous decisions. A separate reviewer with its own context window, its own system prompt, and often its own model catches things the author missed.

**Pattern:** [Plan-execute-review](./03_patterns/plan-execute-review.md).

### 3. Specialization across the loop

You can make one agent good at everything, or you can make several agents each excellent at one thing:

- A **planner** that uses a big model and has access to the codemap but no write tools.
- A **coder** that uses a fast/cheap model and has write tools but no planning tools.
- A **reviewer** that uses a different model family (for independence) and only reads.

This is cheaper *and* better than a single generalist in non-trivial cases.

**Pattern:** [Pipeline](./03_patterns/pipeline.md) or [Plan-execute-review](./03_patterns/plan-execute-review.md).

### 4. Safety boundaries

When an agent is allowed to do something dangerous (push code, call payment APIs, modify production config), a separate agent with different authority reviewing the proposal is a real security control — not just prompt tuning. The reviewer runs in its own process, with its own tool allowlist, and the committer can't bypass it.

**Pattern:** [Plan-execute-review](./03_patterns/plan-execute-review.md) + [Review & merge design](./07_review-and-merge-design.md).

## When multi-agent is a trap

Signs you're about to over-engineer:

- **You want more "opinions"** on a subjective decision. Multi-agent isn't a voting system; it's work division. If you want diverse perspectives, use a single agent with better prompting, or explicitly use a [debate pattern](./03_patterns/debate.md) and know what you're getting into.
- **You want "reliability" by having agents double-check each other.** Two LLMs making the same mistake is not more reliable than one. Reliability comes from deterministic checks — [guardrails](../07b_subsystems/09_guardrails-and-eval.md) — not from more LLMs.
- **You're trying to work around a context window limit.** Sharding state across agents is rarely the right answer. Better memory, better context assembly, and compression usually solve this.
- **You think a swarm "feels more advanced".** It isn't. A single well-designed agent is better engineering than a sprawling swarm.

## A simple decision flow

```
Is the work embarrassingly parallel?
   yes → manager-worker or map-reduce
   no ↓

Does the task have a natural plan / execute / review split
where review needs independence?
   yes → plan-execute-review (or pipeline)
   no ↓

Does a step need different authority/tools than another step
for safety reasons?
   yes → pipeline with role separation
   no ↓

Do you need emergent coordination where agents react
to each other's intermediate state?
   yes → swarm with stigmergy
   no ↓

Use a single agent.
```

## See also

- [Overview](./01_overview.md)
- [Patterns](./03_patterns/manager-worker.md)
- [Planning Hierarchy](../07b_subsystems/08_planning-hierarchy.md)
