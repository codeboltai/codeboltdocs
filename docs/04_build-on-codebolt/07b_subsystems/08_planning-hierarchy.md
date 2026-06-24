---
sidebar_position: 8
title: Planning Hierarchy
description: "Source code: controllers/{planner,requirementPlan,actionPlan,actionBlock,roadmap,todo,task,taskActivity,specs,skill}, and their corresponding *Service files."
---

# Planning Hierarchy

Codebolt doesn't have "a plan" — it has a five-level hierarchy that takes a fuzzy user request and grinds it down into concrete, reviewable units of work.

> **Source code:** `controllers/{planner,requirementPlan,actionPlan,actionBlock,roadmap,todo,task,taskActivity,specs,skill}`, and their corresponding `*Service` files plus `TaskManager`, `actionBlockRegistry`, `skillService`.

## The five levels

```
Requirement Plan          "build a billing system with Stripe"
       │
       ▼
Roadmap                   phases, milestones, success criteria
       │
       ▼
Action Plan               ordered steps within a phase
       │
       ▼
Action Block              a single reviewable unit (e.g. "add /webhook endpoint")
       │
       ▼
Todo / Task               the actual agent work items
```

Each level has its own controller + service because each is read and written by different consumers:

| Level | Who writes it | Who reads it |
|---|---|---|
| Requirement Plan | User or a planner agent | Roadmap generator |
| Roadmap | Planner agent, can be edited by user | Action plan generator, UI for progress |
| Action Plan | Planner agent | Action block generator |
| Action Block | Planner agent | Executor agents, reviewers |
| Todo / Task | Executor agents | Agent loop, `TaskManager` |

## Why five levels

You could in theory have one list of tasks and let the LLM do the rest. Two problems:

1. **Review granularity.** A human wants to review at the "phase" level, not at every shell command. Without intermediate levels, review is impossible — it's either rubber-stamp or overwhelm.
2. **Replan cost.** When reality diverges from the plan (and it always does), you want to replan at the smallest level that was wrong. A five-level hierarchy means you can throw away one action block and keep the rest; a flat list means you replan from scratch.

## Components

### `plannerService`
The top-level planner. Takes a requirement and emits a roadmap. Delegates to `taskPlannerService` for finer-grained planning.

### `requirementPlanService`
Stores the high-level requirement plan, tracks changes over time, supports forking ("what if we did this other way?").

### `roadmapService`
Roadmaps with phases, dependencies between phases, and progress tracking.

### `actionPlanService`
Inside each phase, an ordered action plan. Supports inserting / reordering without invalidating downstream blocks where possible.

### `actionBlockRegistry`
A catalog of reusable action blocks (e.g. "scaffold a REST endpoint", "set up a github action"). New blocks can be registered by extensions.

### `todoService` + `taskSevices` + `taskActivityService` + `TaskManager`
The execution level. Todos are lightweight, tasks are structured, task activity is the append-only log of what's happening to each task.

### `specsService` + `skillService`
Orthogonal but related: specs define the expected outcome of a block, skills describe what an agent *can do* so the planner can match work to agents.

## Replanning

When an agent fails (tool error, guardrail block, review rejection) the planner is re-invoked at the **smallest level that was invalidated**:

```
failure in a task       → replan the task only
failure in a block      → replan the block's tasks
failure in a plan step  → replan the action plan
phase invalidated       → replan the phase inside the roadmap
requirement changed     → full replan from the top
```

This is what keeps long-running multi-agent work from collapsing every time one step fails.

## See also

- [Agent Subsystem](./01_agent-subsystem.md)
- [Guardrails & Eval](./09_guardrails-and-eval.md) — a guardrail failure often triggers replan
- [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md)
