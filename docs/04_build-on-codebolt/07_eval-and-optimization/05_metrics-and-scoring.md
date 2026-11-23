---
sidebar_position: 5
title: Running Evals and Results
description: Create runs to execute subjects against experiments, view results in real time, and compare subjects on a leaderboard.
---

# Running Evals and Results

Create runs to execute subjects against experiments, view results in real time, and compare subjects on a leaderboard.

## Creating a Run

1. Open the **Eval Panel** and switch to the **Runs** tab.
2. Click **New Run**.
3. Select the **subject type** (agent, skill, action-block, capability, MCP).
4. Pick one or more **subjects** from the available list.
5. Choose a **task** (single experiment) or **suite** (all tasks in the suite).
6. Click **Create** — the run is created in `pending` state.

## Starting a Run

Click **Start** on a pending run. The server:

1. Transitions the run to `running`.
2. For each (subject, task) pair:
   - Resolves the environment (local, remote, or provider).
   - Resolves the instruction (text, script, or hybrid).
   - Executes the subject — creates a thread, sends the instruction, waits for completion.
   - Extracts the subject's output (last agent message).
   - Runs all evaluators against the output.
   - Computes the weighted score.
   - If optimization is enabled and the score is below target, enters the optimization loop.
3. Computes aggregate scores per subject.
4. Marks the run as `completed`.

## Real-Time Updates

Results update in real time via WebSocket events:

| Event | When |
|---|---|
| `eval.run.result.updated` | After each result completes or changes |
| `eval.run.optimization.updated` | After each optimization iteration |
| `eval.run.completed` | When the entire run finishes |

The UI merges these updates live — you can watch scores and optimization progress as they happen.

## Run Results

Each (subject, task) result contains:

| Field | Description |
|---|---|
| `status` | pending, running, completed, failed, skipped |
| `output` | The subject's output text |
| `score` | Weighted average of evaluator scores (0-100) |
| `evaluatorResults` | Individual evaluator scores and reasoning |
| `durationMs` | How long execution took |
| `threadId` | Link to the chat thread |
| `optimization` | Iteration history (if optimization was enabled) |

## Leaderboard

After a run completes, the leaderboard ranks subjects by their average score across all tasks:

| Rank | Subject | Score |
|---|---|---|
| 1 | Agent A | 92 |
| 2 | Agent C | 85 |
| 3 | Agent B | 71 |

Access via the UI or API: `GET /evals/runs/:id/leaderboard`.

## Subject Profile

View a single subject's scores across all tasks in a run:

| Task | Score | Status |
|---|---|---|
| Sort array | 100 | completed |
| Parse JSON | 75 | completed |
| Write tests | 60 | completed |

Access via: `GET /evals/runs/:id/profile/:subjectId`.

## Run States

| State | Meaning |
|---|---|
| `pending` | Created but not started |
| `running` | Execution in progress |
| `completed` | All results finished |
| `failed` | Run failed with an error |
| `cancelled` | User cancelled the run |

## REST API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/evals/runs` | List runs (filter by suiteId, taskId, status) |
| `POST` | `/evals/runs` | Create a run |
| `GET` | `/evals/runs/:id` | Get run with full results |
| `POST` | `/evals/runs/:id/start` | Start a pending run |
| `POST` | `/evals/runs/:id/cancel` | Cancel a running run |
| `GET` | `/evals/runs/:id/leaderboard` | Ranked subjects by score |
| `GET` | `/evals/runs/:id/profile/:subjectId` | Subject's scores per task |

## See Also

- [Overview](./01_overview.md) — eval and optimization concepts
- [Eval Tasks](../../02_using-codebolt/05e_eval-and-optimization/02_eval-tasks.md) — define what to test
- [Evaluators](../../02_using-codebolt/05e_eval-and-optimization/03_evaluators.md) — how scoring works
- [Optimization Loop](./04_optimization-loop.md) — automatic improvement
