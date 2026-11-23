---
sidebar_position: 1
title: Overview
description: Evaluate how well your agents, skills, and action blocks perform on specific tasks — then automatically optimize them using an agent-driven improvement loop.
---

import EvalOptimizationOverview from '@site/src/components/diagrams/EvalOptimizationOverview';

# Evaluation & Optimization

Evaluate how well your agents, skills, and action blocks perform on specific tasks — then automatically optimize them using an agent-driven improvement loop.

## What It Does

1. **Define experiments** — tasks with instructions, environments, and evaluators.
2. **Run subjects** (agents, skills, MCPs, action blocks) against those experiments.
3. **Score results** using weighted evaluators (string matching, script, agent-judge, deliberation).
4. **Optimize automatically** — an optimizer agent reads the subject's code, makes targeted changes, re-evaluates, and keeps improvements.

## Architecture


<EvalOptimizationOverview />

## Key Concepts

| Concept | What it is |
|---|---|
| **Task (Experiment)** | Defines what to test: instruction, environment, evaluators, optional optimization |
| **Subject** | The thing being evaluated: agent, skill, action-block, capability, or MCP |
| **Suite** | A folder grouping related tasks |
| **Run** | Executes subjects against tasks, produces scored results |
| **Evaluator** | Scores the subject's output (expected-output, script, agent-judge, deliberation) |
| **Optimization** | Agent-driven iterative improvement of the subject |

## Subject Types

| Type | What it is |
|---|---|
| `agent` | An installed agent |
| `skill` | A skill |
| `action-block` | An action block |
| `capability` | A capability |
| `mcp` | An MCP server |

## Data Storage

All eval data is stored as JSON files in `.codebolt/evals/`:

```
.codebolt/evals/
├── index.json
├── tasks/
├── suites/
└── runs/
```

## Workflow

1. Open the **Eval Panel** in Codebolt (Experiments tab).
2. Create an **experiment** — define instruction, environment, evaluators.
3. Switch to **Runs** tab, create a run — select subjects.
4. Click **Start** — subjects execute, evaluators score, results update in real time.
5. Optionally enable **optimization** — optimizer agent iterates to improve scores.
6. Review the **leaderboard** — ranked subjects by score.

## See Also

- [Eval Tasks](../../02_using-codebolt/05e_eval-and-optimization/02_eval-tasks.md) — define tasks, instructions, environments
- [Evaluators](../../02_using-codebolt/05e_eval-and-optimization/03_evaluators.md) — configure scoring methods
- [Optimization Loop](./04_optimization-loop.md) — agent-driven iterative improvement
- [Running Evals](../../02_using-codebolt/05e_eval-and-optimization/04_running-evals.md) — execute runs, view results
