import EvalOptimizationOverview from '@site/src/components/diagrams/EvalOptimizationOverview';

# Eval & Optimization Overview

> Codebolt's Eval & Optimization system lets you scientifically measure agent quality and automatically improve it

# Eval & Optimization

Codebolt's Eval & Optimization system lets you scientifically measure agent quality and automatically improve it. You define what "good" looks like, run agents against test tasks, score their outputs, and optionally let an optimizer agent iterate on the agent's code, prompts, or config until the score improves.

Open via: **Bottom bar → Agents → Eval**

## How it works

<EvalOptimizationOverview />

## Core concepts

| Concept | What it is |
|---|---|
| **Task** | A test definition — instruction, evaluators, environment, and optional optimization config |
| **Suite** | A named folder grouping related tasks |
| **Subject** | What is being tested — currently agents and action blocks |
| **Run** | An execution that pairs subjects × tasks and produces scored results |
| **Evaluator** | A scoring mechanism that inspects the subject's output and returns a 0–100 score |
| **Optimization** | An automatic loop that modifies a subject between eval iterations to improve its score |

## What can be evaluated

| Subject type | Description |
|---|---|
| `agent` | A full agent run — the agent receives the task instruction and produces output |
| `action-block` | An action block execution |

Support for evaluating `skill`, `capability`, and `mcp` subjects is planned.

## Data storage

All eval data lives inside your project under `.codebolt/evals/`:

```
.codebolt/evals/
├── index.json          ← subjects, tasks, suites, runs metadata
├── subjects/           ← one file per subject
├── tasks/              ← one file per task
├── suites/             ← one file per suite
└── runs/               ← one file per run (includes all results)
```

Because it's plain files in your project, eval data can be committed, diffed, and shared with teammates.

## Pages in this section

| Page | What it covers |
|---|---|
| [Eval Tasks](./02_eval-tasks.md) | Defining tasks — instructions, environments, evaluators |
| [Evaluators](./03_evaluators.md) | All four evaluator types and how scoring works |
| [Running Evals](./04_running-evals.md) | Subjects, suites, runs, leaderboard, and results |
| [Optimization](./05_optimization.md) | The optimization loop, strategies, and output |
