---
sidebar_position: 5
title: Plan-Execute-Review
description: "Three agents in a short pipeline: one plans, one executes, one reviews"
---

# Plan-Execute-Review

Three agents in a short pipeline: one plans, one executes, one reviews. The most useful multi-agent pattern in practice — it covers ~70% of real use cases where more than one agent is genuinely warranted.

## When to use

- **Any non-trivial change where review matters.** Refactors, migrations, new features, bug fixes.
- **Tasks where "did this actually solve the problem?" is a real question**, not just "does it compile?".
- **When the executor would benefit from a fresh-eyes check** that a second pass from the same agent can't provide.

If you only adopt one multi-agent pattern, adopt this one.

## Shape

```
     ┌────────────┐
     │   Plan     │  big model, reads a lot, writes a plan doc
     └─────┬──────┘
           │
           ▼
     ┌────────────┐
     │  Execute   │  fast model, writes code, follows the plan
     └─────┬──────┘
           │
           ▼
     ┌────────────┐
     │   Review   │  different-family model, reads diff + plan
     └─────┬──────┘
           │
           ├── approve → done
           └── reject  → back to Execute (or back to Plan for major issues)
```

## Each agent's job

### Plan agent

- **Input:** user request + codebase context.
- **Output:** a structured plan document — files to touch, approach, test strategy, risks.
- **Tools:** read-only. Codemap, file reads, search, knowledge graph queries. **No write tools.**
- **Model:** the biggest one you can afford. Planning is where you want maximum capability.

The plan is not chat. It's a structured document the executor will consume directly. Put it in `jsonMemoryService` or pass as the next agent's input.

### Execute agent

- **Input:** the plan document (only — not the full conversation with the user).
- **Output:** file changes + an execution report (what it did, what it skipped, what surprised it).
- **Tools:** file write, code edit, test running. **No planning tools** — if the plan is wrong, the executor reports it; it doesn't replan.
- **Model:** fast and cheap. Execution is mostly mechanical once the plan is good.

The executor's constrained context is the whole point. It doesn't re-debate decisions; it executes.

### Review agent

- **Input:** the original plan + the diff + the execution report.
- **Output:** approve / reject with structured comments.
- **Tools:** read-only. Can run tests, read diffs, query the knowledge graph. **No writes.**
- **Model:** a **different family** from the executor. If the executor used Claude, use GPT for review (or vice versa). Same-family models correlate their mistakes.

The review agent should be given the plan, not just the diff. "Does this change match the plan?" is a better question than "is this change good?".

## Why this works

Three forces aligned:

1. **Fresh context at each stage** — each agent has just the information it needs, not the full history. Smaller context, sharper focus.
2. **Specialisation** — different models, different prompts, different tool allowlists. Each agent is good at its one job.
3. **Independence at review** — the reviewer's opinion is not correlated with the executor's because they're different processes with different contexts.

## The reject loop

When review rejects, you have three options:

| Rejection kind | Action |
|---|---|
| Small fix-up | Back to Execute with the review comments appended to the input |
| Plan was wrong | Back to Plan with the rejection reason |
| Unclear/irreconcilable | Escalate to a human |

**Always cap iterations.** A hard limit of 2-3 Execute↔Review rounds prevents runaway cost when the two agents disagree persistently. On hitting the cap, escalate.

## Implementation in Codebolt

Have the parent request a plan, pass the approved plan to an executor, and send the plan and the resulting changes to a reviewer. For a same-thread handoff, call `codebolt.agent.startAgent(agentId, task)` with the installed agent’s ID. If the reviewer asks for changes, pass that feedback to the executor. Set a limit on revision attempts in the parent’s workflow.

For a user-reviewed change, open the [Review and Merge](../../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md) request to inspect feedback, check conflicts, and merge an eligible request.

## Pitfalls

- **Executor ignoring the plan.** If the executor has more context than it needs, it will re-decide. Keep its input tight.
- **Reviewer not seeing the plan.** If the reviewer only sees the diff, it's reviewing code quality, not whether the change solves the task. Pass the plan.
- **Same-family reviewer.** Correlated mistakes. Use a different model family.
- **Infinite reject loops.** See cap above.
- **Review rubber-stamping.** If the reviewer always approves, the reviewer is useless. Add one or two intentional failure tests to tune the reviewer's strictness.

## See also

- [When to use multi-agent](../02_when-multi-agent.md)
- [Pipeline](./pipeline.md) — the general pattern this is a case of
- [Debate](./debate.md) — when the review question is genuinely contested
- [Review & merge design](../07_review-and-merge-design.md) — human-in-the-loop extension
