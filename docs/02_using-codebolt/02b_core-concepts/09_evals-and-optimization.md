---
sidebar_position: 9
title: Evals and Optimization
description: Measuring and improving agent quality across many runs — the offline counterpart to guardrails.
---

import EvalAnatomy from '@site/src/components/diagrams/EvalAnatomy';
import OptimizationLoop from '@site/src/components/diagrams/OptimizationLoop';

# Evals and Optimization

Where [guardrails](./08_guardrails.md) catch individual bad actions at runtime, **evals** measure and improve agent quality *across many runs*. Together they form the two halves of agent quality.

<EvalAnatomy />

## What an eval is

An **eval** scores a completed run (or a batch of runs) against one or more **evaluators** — checks that assert whether the agent behaved correctly. Evaluators can be deterministic (does the test pass? did the agent edit only allowed files?) or LLM-as-judge (is this response accurate and helpful?).

## The optimization loop

Evals produce scores; the optimization loop turns those scores into improvements — better prompts, tighter guardrails, refined tool descriptions.

<OptimizationLoop />

![Running an eval](/productImages/evalandoptimization/running_eval.png)

![Evaluators](/productImages/evalandoptimization/evaluators.png)

![Optimization](/productImages/evalandoptimization/optimization.png)

→ **Read the full concept page: [Evals and Optimization](../../02_concepts/06_quality/02_evals-and-optimization.md)**

## See also

- [Guardrails](./08_guardrails.md)
- [Event Log](./07_persistence.md)
