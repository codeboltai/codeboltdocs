---
sidebar_position: 2
title: Creating Experiments
description: An experiment (task) defines what to test, where to run it, and how to score the output. Create experiments in the Eval Panel's Experiments tab.
---

# Creating Experiments

An experiment (task) defines what to test, where to run it, and how to score the output. Create experiments in the Eval Panel's **Experiments** tab.

## Task Structure

Every task has three parts:

1. **Instruction** — what to tell the subject.
2. **Environment** — where to execute.
3. **Evaluators** — how to score the output.

Plus an optional **optimization** config for automatic improvement.

## Instruction

The instruction tells the subject what to do. Three types:

| Type | Description |
|---|---|
| `text` | A text prompt sent to the subject |
| `script` | A setup script that runs before the subject starts |
| `hybrid` | Both a setup script and a text prompt |

### Text instruction

A plain text prompt:

```
Write a function that sorts an array of numbers in ascending order.
```

### Script instruction

A script that sets up the environment before the subject runs (e.g., create files, seed data).

### Hybrid

Combines both — the script runs first to set up context, then the text prompt is sent to the subject.

## Environment

Choose where the subject runs:

| Type | Description |
|---|---|
| `local` | Run on the local machine |
| `remote` | Run in a specific remote environment (by ID) |
| `provider` | Run using an execution provider (E2B, Docker, etc.) |

For `remote` and `provider`, you specify the environment or provider ID.

## Evaluators

Each task has one or more evaluators that score the subject's output. Evaluators are **weighted** — the final score is a weighted average.

See [Evaluators](../../02_using-codebolt/05e_eval-and-optimization/03_evaluators.md) for details on each type.

## Optimization (Optional)

Enable optimization to have an agent automatically improve the subject. When enabled, the system:

1. Runs the initial eval.
2. Passes the score and output to an optimizer agent.
3. The optimizer makes one targeted change to the subject's code.
4. Re-evaluates the modified subject.
5. Repeats until the target score is reached or max iterations hit.

See [Optimization Loop](./04_optimization-loop.md) for details.

## Suites

Group related tasks into a **suite** (folder). When you create a run from a suite, all tasks in the suite are executed.

Use suites to:
- Test different aspects of an agent (accuracy, speed, tool usage).
- Compare subjects across a standardized benchmark.
- Run regression tests after changes.

## REST API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/evals/tasks` | List all tasks |
| `POST` | `/evals/tasks` | Create a task |
| `GET` | `/evals/tasks/:id` | Get a task |
| `PUT` | `/evals/tasks/:id` | Update a task |
| `DELETE` | `/evals/tasks/:id` | Delete a task |
| `GET` | `/evals/suites` | List all suites |
| `POST` | `/evals/suites` | Create a suite |
| `GET` | `/evals/suites/:id` | Get a suite with its tasks |
| `PUT` | `/evals/suites/:id` | Update a suite |
| `DELETE` | `/evals/suites/:id` | Delete a suite |

## See Also

- [Evaluators](../../02_using-codebolt/05e_eval-and-optimization/03_evaluators.md) — configure scoring methods
- [Optimization Loop](./04_optimization-loop.md) — agent-driven improvement
- [Running Evals](../../02_using-codebolt/05e_eval-and-optimization/04_running-evals.md) — execute and view results
