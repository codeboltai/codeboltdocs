---
sidebar_position: 9
title: Guardrails & Eval
description: Every meaningful step an agent takes passes through this subsystem before it commits
---

# Guardrails & Eval Subsystem

Every meaningful step an agent takes passes through this subsystem before it commits. It's the reason you can leave an agent running on a real codebase without it destroying things.

> **Source code:** `controllers/{guardrail,eval,autoTesting,diagnostic,reviewMergeRequest}`, `services/{guardrailEngine,guardrailDataService,guardrailLLMEvaluator,guardrailRuleEvaluator,evalService,eval,autoTestingService,diagnosticService,reviewMergeRequestService,reviewModeService,problemMatchService,problemMatcherSeederService}`.

## Two kinds of guardrail, one engine

Guardrails come in two flavours, evaluated by different services but unified under one engine:

| Kind | Evaluator | Good at | Fast? |
|---|---|---|---|
| **Rule-based** | `guardrailRuleEvaluator` | Deterministic checks: "don't write to `/etc`", "never commit to main", "no secrets in code". | Yes — microseconds. |
| **LLM-based** | `guardrailLLMEvaluator` | Judgment calls: "is this actually addressing the user's request?", "is this change safe to merge?" | No — a full LLM call. |

`guardrailEngine` runs the rule layer first (cheap, fail fast) and only consults the LLM evaluator if rules pass but policy requires a judgment pass.

## Where the engine runs

```
agent loop proposes action
      │
      ▼
guardrailEngine.check(action, context)
      │
      ├── rule evaluator       ← cheap, deterministic, may deny
      │
      └── LLM evaluator        ← expensive, judgmental, may deny or request revision
      │
      ▼
allow → action executes
deny  → recorded, agent replans
```

The check runs at well-defined points — most importantly **before every tool call** and **before committing writes to disk**. It also runs when a run completes, as a final pass.

## Components

### `guardrailEngine`
The orchestrator. Picks which rules apply to this action, runs them, aggregates verdicts.

### `guardrailRuleEvaluator`
Pure-function rule evaluation. Rules are declarative (YAML/JSON) and live in project config.

### `guardrailLLMEvaluator`
LLM-as-judge. Uses a separate model (often smaller and cheaper than the main agent model) with a dedicated system prompt.

### `guardrailDataService`
Persistence for rules, verdicts, and overrides (so a user can say "allow this once" and it's remembered).

## Eval: the other half

`evalService` + `eval/` are the flip side of guardrails. Where a guardrail blocks a *live* action, an eval scores *historical* behaviour. Evals are used for:

- **Regression checks** — "does this agent still pass the golden test suite after I changed its prompt?"
- **Agent quality scoring** — used by the agent portfolio to rank installed agents.
- **Tuning guardrails themselves** — you can eval whether a guardrail is too strict by replaying runs against it.

## `autoTestingService` + `diagnosticService`
Two adjacent services:
- **Auto testing** — runs a project's test suite when an agent says "done" and feeds the result back into the loop. A failure triggers replan at the task level (see [Planning Hierarchy](./08_planning-hierarchy.md)).
- **Diagnostic** — runs linters / LSP diagnostics continuously and surfaces them to the agent as structured problems. Backed by `problemMatchService` + `problemMatcherSeederService` (the same problem-matcher format used by editor ecosystems).

## `reviewMergeRequestService` + `reviewModeService`
The human-in-the-loop side. For agents that open merge requests instead of committing directly, this subsystem:
- Tracks review state per MR.
- Invokes LLM reviewers before humans touch it.
- Lets multiple agents review in a debate pattern (see [Review and Merge Design](../08_multi-agent-orchestration/07_review-and-merge-design.md)).

## See also

- [Agent Subsystem](./01_agent-subsystem.md)
- [Planning Hierarchy](./08_planning-hierarchy.md) — how guardrail denies cause replans
- [Review & Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md)
