---
sidebar_position: 7
title: Auto-Optimize Agents
description: Once your agent basically works, the next question is not "does it run?" but "does it reliably perform well?"
---

# Auto-Optimize Agents

Once your agent basically works, the next question is not "does it run?" but "does it reliably perform well?"

That is where Codebolt's eval and optimization system fits.

Keep the full [Evaluation & Optimization](../07_eval-and-optimization/01_overview.md) section separate in the docs, because the same system is used for more than agents:

- agents
- skills
- capabilities
- tools and MCP integrations
- prompt and context strategies

But for agent authors, this is the natural next step after [Testing and Debugging](./09_testing-and-debugging.md).

## When to use optimization

Reach for optimization when:

- your agent works, but quality is inconsistent
- you want to compare prompt or model variants
- you added tools or capabilities and want evidence they help
- you want to reduce cost or latency without harming quality
- you are preparing an agent for publishing or wider internal use

Do not start here. First make the agent correct enough to be worth measuring.

## The practical sequence

For custom agents, the workflow is usually:

1. Build the agent.
2. Run it manually on real tasks.
3. Add tests and replay coverage.
4. Create an eval set from the kinds of tasks the agent should handle well.
5. Run optimization loops to compare variants.
6. Promote the winning version.

In short:

```text
build -> test -> replay -> eval -> optimize -> publish
```

## What you can optimize

For agents, common optimization targets are:

- system prompt wording
- model choice
- decoding settings
- tool allowlists
- capability activation
- context assembly choices

The goal is not "make it smarter" in the abstract. The goal is to improve a measurable outcome on a known task set.

## Why this stays outside Creating Agents

The eval system is broader than agent authoring.

It is also the right place to measure:

- whether a skill improves a task class
- whether an MCP tool is called correctly
- whether a capability helps or harms
- whether a provider or model swap changes cost, latency, or quality

So the top-level [Evaluation & Optimization](../07_eval-and-optimization/01_overview.md) section should stay separate. This page is just the bridge for agent builders.

## Start here next

- [Evaluation & Optimization Overview](../07_eval-and-optimization/01_overview.md) — the full system
- [Replay and Traces](../07_eval-and-optimization/02_replay-and-traces.md) — use real runs as eval material
- [Writing Evals](../07_eval-and-optimization/03_writing-evals.md) — build a useful eval set
- [Optimization Loop](../07_eval-and-optimization/04_optimization-loop.md) — generate and compare variants
- [Metrics & Scoring](../07_eval-and-optimization/05_metrics-and-scoring.md) — decide what "better" means

## See also

- [Testing and Debugging](./09_testing-and-debugging.md)
- [Publishing](./99_publishing.md)
