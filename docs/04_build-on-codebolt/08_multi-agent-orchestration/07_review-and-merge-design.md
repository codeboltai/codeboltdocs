---
sidebar_position: 7
title: Review & Merge Design
description: "Source code: controllers/reviewMergeRequest, services/reviewMergeRequestService, services/reviewModeService."
---

# Review & Merge Design

Human-in-the-loop orchestration. The patterns here are about deciding *when* humans get pulled in, *what* they see, and *how* LLM reviewers cooperate with human reviewers to scale oversight without making humans the bottleneck.

> **Source code:** `controllers/reviewMergeRequest`, `services/reviewMergeRequestService`, `services/reviewModeService`.

## The core question

For every agent-produced change, you face one tradeoff:

```
fully autonomous                       fully manual
        │                                   │
        ▼                                   ▼
  fast, cheap,              slow, expensive,
  high error blast          high trust
  radius
```

Good review design puts each class of change at the right point on this line. Not everything needs human review; not everything can safely skip it.

## Classes of change

A useful taxonomy:

| Class | Examples | Review strategy |
|---|---|---|
| **Trivially safe** | Formatting, typo fixes, comment edits, generated-file updates | Auto-merge after deterministic checks |
| **Low-risk** | Isolated bug fixes, small refactors in non-critical paths | LLM reviewer only; human optional |
| **Medium-risk** | New features, non-trivial refactors, API changes | LLM reviewer + async human review |
| **High-risk** | Security code, payment code, auth changes, schema migrations, infra | LLM reviewer + mandatory human review before merge |
| **Irreversible** | Production deploys, DB writes outside workspace, external API calls with side effects | Human approval gate per action, not per change |

Classification is itself something you can automate — a `classify` step runs before review and tags the change. The classifier should err on the side of higher risk.

## Roles

### LLM reviewer

Reads the plan, the diff, and the execution report. Outputs an approve/reject with structured comments. Runs automatically; cheap and fast.

What it's good at:
- "Does this change match the plan?"
- "Does this introduce obvious smells?"
- "Are the tests exercising the new behaviour?"
- "Are there comments suggesting unfinished work?"

What it's bad at:
- Genuinely novel design decisions.
- Subtle security issues (false negatives are common).
- Anything requiring organisational context the model doesn't have.

Use the LLM reviewer as a **filter**, not as the final word. It catches obvious things so humans can focus on the rest.

### Human reviewer

Reads whatever the LLM reviewer flagged plus the summary. Ideally reviews a small number of high-signal changes per day.

Goals for human review UX:
- **Never ask twice.** Don't make the human re-answer a question an LLM could have answered from context.
- **Show the plan, not just the diff.** Reviewing a change against its plan is much faster than reverse-engineering intent from code.
- **Surface the risk class explicitly.** Humans triage faster when they know whether this is a schema migration or a typo fix.
- **Allow partial approval.** "Approve this part, reject that part." Don't force all-or-nothing on multi-file changes.

### The orchestrator

The agent (or flow) that decides when to pause for review, which reviewers to consult, and what to do with the verdict. Often a node in a [pipeline](./03_patterns/pipeline.md) or [plan-execute-review](./03_patterns/plan-execute-review.md) flow.

## Components in Codebolt

### `reviewMergeRequestService`
Models a merge request: state, comments, reviewers, verdicts, history. Like a PR, but not necessarily tied to git — a "merge request" in Codebolt can also be for non-code changes (config updates, memory writes, etc.).

### `reviewModeService`
Per-workspace review policy: which change classes require which reviewers, iteration caps, escalation rules.

### Integration with `guardrailEngine`
Guardrails that require LLM judgment (the `guardrailLLMEvaluator` path) can be thought of as tiny review passes. A "review & merge" operation is the large-grained version: instead of judging a single tool call, the reviewer judges a whole change.

## Review flow shape

```
execute produces a change
         │
         ▼
    classify risk
         │
    ┌────┴────┐
    ▼         ▼
 trivial?    no
    │         │
    ▼         ▼
auto-merge  LLM reviewer
              │
       ┌──────┴──────┐
       ▼             ▼
   approved      rejected
       │             │
       ▼             ▼
  need human?   back to execute
       │
   ┌───┴───┐
   ▼       ▼
  yes     no
   │       │
   ▼       ▼
async    merge
human
review
```

## Async human review

Human review should almost always be **async**. Blocking an agent run on a human's attention is how you get abandoned half-done work. Better:

1. The agent produces a change.
2. The change is committed to a working branch via shadow git + real git.
3. A merge request is created and a human is notified via their preferred channel.
4. The agent's run **completes successfully** ("change is in review"). It does not wait.
5. When the human approves later, a follow-up agent (or just the merge automation) merges the change.

The agent's success criterion is "produced a reviewable change", not "got it merged". This lets agents keep working while review queues up.

## Pitfalls

- **Human review as the default.** Every change gets a human gate → humans become the bottleneck → people start rubber-stamping → review is theatre. Reserve human review for classes where it matters.
- **LLM review with no skin in the game.** An LLM reviewer that approves everything is worse than no reviewer — it provides false assurance. Calibrate with known-bad test cases periodically.
- **Blocking agents on human review.** See above.
- **No audit trail.** If you can't answer "who approved this and why" three months later, your review system is broken. `reviewMergeRequestService` + the event log should make this trivial.
- **Merging without running tests.** The merge step should still run `autoTestingService` even after approval. Reviewers aren't a substitute for tests.

## See also

- [Plan-Execute-Review](./03_patterns/plan-execute-review.md)
- [Debate](./03_patterns/debate.md) — when reviewers disagree
- [Guardrails & Eval](../07b_subsystems/09_guardrails-and-eval.md)
- [Multi-Agent Usage: Review & Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md) — the user-facing side
