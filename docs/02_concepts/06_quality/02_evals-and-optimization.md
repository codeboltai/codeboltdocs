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
- **`provider`** — the eval runs against a specific LLM provider configuration, useful for comparing providers head-to-head.

Environment is orthogonal to subject: the same agent can be evaluated locally *and* remotely from the same task definition.

## Evaluators: how the output is scored

This is where most of the flexibility lives. Four built-in evaluators:

### `expected-output`
The classic. Compare the subject's output to a stored expected value — exact match, substring, or fuzzy. Best for deterministic tasks where "right" has one shape.

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

The built-in optimizer is an **agent optimizer**. Given a subject (e.g. a coding agent), the latest eval score, the task, and the history of previous iterations, the optimizer agent:

1. Reads the subject's current code / prompt / configuration from disk.
2. Decides *what* to change, targeting a specific component (e.g. `instructions`, `system prompt`, tool allowlist).
3. Proposes a structured modification: `{target, description, diff, reasoning}`.
4. The engine applies the modification and re-runs the eval.
5. **Kept or reverted:** if the new score is better, the iteration is kept. If worse, it's reverted and its failure recorded so the optimizer can avoid the same dead end next iteration.

Each iteration is logged with: the modification, the before/after scores, the evaluator results, whether it was kept, and the optimizer's reasoning. Over time you get a directed walk through the solution space, guided by the eval signal.

### Why an agent optimizer (and not gradient descent)

The modification space for an agent isn't differentiable. You can't take a derivative of "this system prompt" with respect to "task success rate". But you *can* hand the current state, the score, and the history to another agent and ask "what would you change?" — and that agent can reason about it.

The optimizer agent is itself configurable. You pick which agent plays the optimizer role; it reads the target's code path directly, decides the change, and outputs structured JSON that the engine applies. Previous iterations — including failed ones — are in its prompt so the optimizer doesn't repeat mistakes.

## Putting it together

A typical eval task looks like:

```yaml
name: coding-agent-qa
subject:
  type: agent
  referenceId: my-coding-agent
instruction:
  type: text
  textPrompt: "Implement a rate limiter for the Express API in src/api/"
environment:
  type: local
evaluators:
  - type: expected-output
    expectedOutput: "passes tests in tests/rate-limiter.test.ts"
  - type: agent-judge
    judgeAgentId: code-review-judge
  - type: deliberation
    deliberationAgentIds: [senior-dev-1, senior-dev-2, security-reviewer]
    deliberationRounds: 2
optimization:
  optimizerAgentId: prompt-optimizer
  targets: [instructions]
  maxIterations: 5
```

Three evaluators scoring the same run from three angles. An optimizer that runs up to 5 iterations, keeping the best. All pluggable, all registered — no code changes to the engine itself.

## Why this shape

Most eval systems lock you into one opinionated pipeline: a fixed record/replay loop, a single judge, a single optimization strategy. That works until your task doesn't fit the pipeline, at which point you're stuck forking it.

Codebolt's registry-based design treats every dimension — subject, instruction, environment, evaluator, optimizer — as independently extensible. New subject type? Register a subject executor. New scoring strategy? Register an evaluator. New optimization algorithm? Register an optimizer. The rest of the engine doesn't know or care.

## See also

- [Dispute Resolution](../07_multi-agent/03_dispute-resolution.md) — the deliberation primitive reused by the deliberation evaluator
- [Guardrails](./01_guardrails.md) — runtime guardrails (complementary to offline evals)
- [Event Log](../05_persistence/02_event-log.md) — where every eval run and iteration is recorded
- [Replay an agent run (guide)](../../03_guides/08_advanced/replay-an-agent-run.md)
