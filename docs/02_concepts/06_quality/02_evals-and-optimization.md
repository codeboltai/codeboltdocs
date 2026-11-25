---
sidebar_position: 2
title: Evals and Optimization
description: Agents don't stay good on their own. A prompt tweak that wins one task silently breaks another
---

import EvalAnatomy from '@site/src/components/diagrams/EvalAnatomy';
import OptimizationLoop from '@site/src/components/diagrams/OptimizationLoop';

# Evals and Optimization

Agents don't stay good on their own. A prompt tweak that wins one task silently breaks another. A model upgrade that's better on average is worse on your specific workload. A capability added last month now degrades runs it used to help.

**Evals** measure that. **Optimization** closes the loop — using what evals find to iteratively improve the subject.

Codebolt's eval system is built as a **pluggable execution engine**, not a hard-coded pipeline. The engine doesn't care *what* you're evaluating, *how* the task input is produced, *where* it runs, or *how* it's scored — each of those dimensions is a registry you extend.

## The anatomy of an eval task

An **eval task** has four pluggable dimensions plus an optional optimization goal:

<EvalAnatomy />

| Dimension | What it decides | Built-in strategies |
|---|---|---|
| **Subject** | *What* is being evaluated | `agent`, `action-block` (future: `skill`, `capability`, `mcp`) |
| **Instruction** | *How* the task input is produced | `text`, `script`, `hybrid` |
| **Environment** | *Where* it runs | `local`, `remote`, `provider` |
| **Evaluator** | *How* the output is scored | `expected-output`, `script`, `agent-judge`, `deliberation` |
| **Optimizer** (optional) | *How* the subject is improved when scores disappoint | `agent` (future: `deliberation`, `self`) |

Each dimension is a registry of strategies. You pick one per task, or register your own.

## Subjects: what gets evaluated

The **subject executor** knows how to run the thing under test and capture its output.

- **`agent`** — starts a full agent thread, sends the instruction as the user message, waits for the run to complete, captures the final output.
- **`action-block`** — invokes a single action block with typed inputs, captures its output.
- **Future:** skill, capability, and MCP evaluators (the registry is already set up for them).

You're not limited to evaluating whole agents. Targeting a single action block in isolation is faster and more focused when you're iterating on one component.

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
Create a **multi-agent deliberation** where a panel of agents debate the quality of the output and vote on a score bucket (0-25 poor, 26-50 below average, 51-75 good, 76-100 excellent). The winning bucket's midpoint becomes the score.

Deliberation is the most expensive evaluator (N agents × multiple rounds) but the most robust against single-judge bias. It's also how eval ties into the [Dispute Resolution](../07_multi-agent/03_dispute-resolution.md) framework — the same deliberation primitive, applied to a scoring decision.

A single task can run **multiple evaluators** against the same output, scoring it from several angles at once.

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

## Why this shape

Most eval systems lock you into one opinionated pipeline: a fixed record/replay loop, a single judge, a single optimization strategy. That works until your task doesn't fit the pipeline, at which point you're stuck forking it.

Codebolt's registry-based design treats every dimension — subject, instruction, environment, evaluator, optimizer — as independently extensible. New subject type? Register a subject executor. New scoring strategy? Register an evaluator. New optimization algorithm? Register an optimizer. The rest of the engine doesn't know or care.

## See also

- [Dispute Resolution](../07_multi-agent/03_dispute-resolution.md) — the deliberation primitive reused by the deliberation evaluator
- [Guardrails](./01_guardrails.md) — runtime guardrails (complementary to offline evals)
- [Event Log](../05_persistence/02_event-log.md) — inspect events explicitly recorded by a workflow
- [Replay an agent run (guide)](../../03_guides/08_advanced/replay-an-agent-run.md)
