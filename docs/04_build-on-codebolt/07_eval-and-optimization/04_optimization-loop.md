---
sidebar_position: 4
title: Optimization Loop
description: The optimization loop automatically improves a subject (agent, skill, etc
---

import OptimizationLoop from '@site/src/components/diagrams/OptimizationLoop';

# Optimization Loop

The optimization loop automatically improves a subject (agent, skill, etc.) by having an optimizer agent read the source code, make targeted changes, and re-evaluate until the target score is reached.

## How It Works

<OptimizationLoop />

### Per Iteration

1. **Duplicate** — the subject's folder is copied to an isolated path.
2. **Modify** — the optimizer agent receives the current score, eval output, evaluator reasoning, and previous iteration history. It reads the source code, decides what to change, and makes one modification.
3. **Evaluate** — the modified copy is re-run against the same task and evaluators.
4. **Decide** — the strategy determines whether to keep or discard the change.
5. **Cleanup** — discarded copies are deleted immediately to save disk.

## Optimizer Types

Currently, only the **agent** optimizer is implemented:

### Agent Optimizer

An optimizer agent (which you select) receives:
- The subject's source code path
- The task definition and instruction
- Current score vs target score
- Previous iteration history (what was tried, what worked)
- Most recent eval output (first 2000 characters)
- Evaluator scores and reasoning

The optimizer uses file tools to read and modify the subject's source, then outputs a JSON summary describing what it changed and why.

## Optimization Targets

The optimizer can modify different aspects of the subject:

| Target | What it changes |
|---|---|
| `instructions` | The agent's system instructions/prompt |
| `prompts` | Prompt templates |
| `tools` | Tool configurations |
| `config` | Agent configuration |
| `code` | Source code logic |

You select which targets are allowed when configuring optimization on a task.

## Strategies

The strategy determines whether to keep each iteration's changes:

### Greedy

Keep the change if:
- Score improved over the baseline, OR
- The optimizer successfully made a change and the score didn't decrease.

This is the most common strategy. It always moves forward.

### Best-of-N

Each iteration starts from the **original** source (not the previous iteration). The system tracks the best score globally and applies the best iteration at the end.

Use this when you want to explore diverse changes without sequential dependency.

### Annealing

Probabilistic acceptance: worse scores can be accepted early (when "temperature" is high), but acceptance becomes stricter as iterations progress.

Use this to escape local optima — it allows temporary regressions to find better solutions.

## Configuration

When enabling optimization on a task:

| Field | Description |
|---|---|
| `optimizerType` | `agent` (select an optimizer agent) |
| `optimizerAgentId` | The agent that performs optimization |
| `targets` | What the optimizer can modify |
| `maxIterations` | Maximum optimization iterations |
| `targetScore` | Stop when this score is reached |
| `improvementThreshold` | Minimum improvement to consider meaningful |
| `strategy` | `greedy`, `best-of-n`, or `annealing` |

## Optimization Results

Each iteration produces:
- **Modification** — what target was changed, description, optional diff, files modified
- **Score** — eval score after the change
- **Improvement** — score delta from previous iteration
- **Kept** — whether the strategy accepted this iteration
- **Optimizer reasoning** — why the optimizer chose this change

The UI shows a timeline of all iterations with scores and decisions.

## Output

When optimization completes, the best modified copy is saved at:

```
.codebolt/agents/{name}-opt-{tag}/
```

The subject's config is updated with the `optimizedAgentPath` pointing to this copy.

## See Also

- [Evaluators](../../02_using-codebolt/05e_eval-and-optimization/03_evaluators.md) — evaluator scores drive the optimization loop
- [Eval Tasks](../../02_using-codebolt/05e_eval-and-optimization/02_eval-tasks.md) — enable optimization on tasks
- [Running Evals](../../02_using-codebolt/05e_eval-and-optimization/04_running-evals.md) — view optimization timeline
