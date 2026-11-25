---
displayed_sidebar: getStartedSidebar
sidebar_position: 2
title: Evals and Optimization
description: Compare agent responses and action-block runs using repeatable tasks and scoring criteria
---

import EvalAnatomy from '@site/src/components/diagrams/EvalAnatomy';
import OptimizationLoop from '@site/src/components/diagrams/OptimizationLoop';

# Evals and Optimization

Use an eval to check how a change to an agent affects its answers. Give the agent a task and choose how to score the response. You can repeat the task after changing its instructions, tools or model.

## The anatomy of an eval task

An **eval task** has four pluggable dimensions plus an optional optimization goal:

<EvalAnatomy />

| Dimension | What it decides | Built-in strategies |
|---|---|---|
| **Subject** | *What* is being evaluated | `agent`, `action-block` |
| **Instruction** | *How* the task input is produced | `text`, `script`, `hybrid` |
| **Environment** | *Where* it runs | `local`, `remote`, `provider` |
| **Evaluator** | *How* the output is scored | `expected-output`, `script`, `agent-judge`, `deliberation` |
| **Optimizer** (optional) | *How* the subject is improved when scores disappoint | `agent` |

Choose one subject type, instruction and environment for a task. You can apply several evaluators to the same output.

## Subjects: what gets evaluated

The **subject executor** knows how to run the thing under test and capture its output.

- **`agent`** starts a thread with the selected agent, sends the task instruction and reads the thread for the agent’s reply.
- **`action-block`** starts an `actionblockoptimizer` agent thread and asks that agent to use the named action block. Evaluators receive the last agent reply from the thread, so the score reflects how the agent reports the result.

## Instructions: how the task input is produced

Rarely is an eval task just one static prompt. Sometimes the prompt is fixed text; sometimes it depends on a fixture file; sometimes it's the output of a setup script.

- **`text`** — literal prompt string. The simplest case.
- **`script`** — a script that runs before each eval and produces the prompt dynamically. Use for randomized fuzz inputs, golden files, or context-dependent prompts.
- **`hybrid`** — combines a base text prompt with script-generated additions.

This is what lets evals work across the spectrum from deterministic ("given exactly this input…") to fuzz-style ("given any input from this generator…").

## Environments: where it runs

- **`local`** — the eval runs on the same machine as the Codebolt server. Fastest, easiest, default.
- **`remote`** — the eval runs on a remote executor.
- **`provider`** — the resolver accepts an environment provider ID and passes it to execution. An optional provider setup script runs in the active project directory.

Environment is orthogonal to subject: the same agent can be evaluated locally *and* remotely from the same task definition.

## Evaluators: how the output is scored

This is where most of the flexibility lives. Four built-in evaluators:

### `expected-output`
The classic. Compare the subject's output to a stored expected value — exact match, substring, regular expression, or case-insensitive substring (`semantic` mode). Best for deterministic tasks where "right" has one shape.

### `script`
Run a custom scoring script against the subject's output. The script returns a numeric score and a reasoning string. Use when correctness is computable but not a simple string comparison — e.g. "does this JSON parse and satisfy this schema?"

### `agent-judge`
Start a **judge agent** whose job is to read the subject's output and return a JSON `{score, reasoning}`. Use when correctness is subjective or nuanced and a single human-quality judgement is needed but a human isn't scalable.

### `deliberation`
The evaluator opens a deliberation with the configured agent IDs and four score ranges. It immediately queries the winner. If a winning range is available, it uses the rounded midpoint. If the query returns no winning range, the score defaults to **50**. A score of 50 alone does not establish that the participants voted. See [Dispute Resolution](../07_multi-agent/03_dispute-resolution.md) for how votes are counted.

## Optimization: closing the loop

An eval by itself just tells you a score. **Optimization** uses that score to *improve* the subject — iteratively, automatically.

<OptimizationLoop />

The agent optimizer works on a copy of the subject. Each iteration records the changes, evaluator scores and whether the copy was kept. With the greedy strategy, improvement or a successful change with an unchanged score can be kept. Best-of-N compares independent variants. Annealing can also keep a lower-scoring iteration.

## Example: create an eval task

Run this inside a connected code agent. It creates a task with a text instruction and one evaluator. Choose the agent to evaluate when you run the task.

```ts
import { evalService } from '@codebolt/codeboltjs';

await evalService.createTask({
  name: 'Single-word reply',
  subjectType: 'agent',
  instruction: { type: 'text', textPrompt: 'Reply with only the word ready.' },
  environment: { type: 'local' },
  evaluators: [{
    id: 'reply-check',
    name: 'Exact reply',
    type: 'expected-output',
    weight: 1,
    matchMode: 'exact',
    expectedOutput: 'ready',
  }],
});
```

To compare results, run the same task against another agent. To evaluate several criteria together, add evaluators with their own IDs and weights.

## See also

- [Dispute Resolution](../07_multi-agent/03_dispute-resolution.md) — the deliberation primitive reused by the deliberation evaluator
- [Guardrails](./01_guardrails.md) — runtime guardrails (complementary to offline evals)
- [Event Log](../05_persistence/02_event-log.md) — inspect events explicitly recorded by a workflow
- [Replay an agent run (guide)](../../03_guides/08_advanced/replay-an-agent-run.md)
