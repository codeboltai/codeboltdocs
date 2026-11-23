---
sidebar_position: 2
title: Debate
description: Two (or more) agents argue opposing positions on the same question. A judge agent — or a human — decides the winner.
---

# Debate

Two (or more) agents argue opposing positions on the same question. A judge agent — or a human — decides the winner.

## When to use

- **Decisions with a clear right/wrong answer** where a single agent tends to be overconfident. ("Is this fix correct?" "Does this PR introduce a regression?" "Which of these two designs better meets the spec?")
- **You want to surface reasoning**, not just an answer. Debate produces transcripts that show *why* one side was more convincing, which is useful for reviewing agent behaviour later.
- **Counterfactual pressure.** If an agent is good at rationalising whatever it already said, forcing another agent to attack that rationalisation exposes weak arguments.

## When NOT to use

- **Subjective questions.** "Which is prettier?" → you'll get a coin flip with extra steps.
- **Coordination problems.** Debate produces a winner, not a shared plan. If you need agents to agree on *how to work together*, use a manager-worker pattern instead.
- **Cheap correctness checks.** If a unit test or type checker can decide the question, run the test — don't pay for two LLM calls + a judge.

## Shape

```
        ┌──────────┐
        │ Question │
        └────┬─────┘
             │
     ┌───────┴───────┐
     ▼               ▼
 ┌──────┐         ┌──────┐
 │ Pro  │◀───────▶│ Con  │    (N rounds of rebuttal)
 └──────┘         └──────┘
     │               │
     └───────┬───────┘
             ▼
       ┌──────────┐
       │  Judge   │  ← human or LLM
       └────┬─────┘
            ▼
         verdict
```

## Roles

| Role | What it does | Tool access |
|---|---|---|
| **Pro** | Argues the affirmative position | Read-only access to relevant code/specs |
| **Con** | Argues the negative position | Same read-only access |
| **Judge** | Reads the transcript, issues verdict with reasoning | Read-only; cannot be persuaded by further argument |

Pro and Con should be **independent** — same prompt structure, same tools, but separate processes with separate context so they can't cross-contaminate. In Codebolt, that's just two agent processes spawned by `AgentProcessManager` with different initial positions.

## How rounds work

1. **Opening.** Each side states its position and top-3 reasons.
2. **Rebuttal.** Each side reads the other's opening and attacks the weakest claim.
3. **Counter-rebuttal.** Each side responds to the attack. Repeat for N-1 rounds.
4. **Closing.** Each side summarises.
5. **Judge.** The judge reads the full transcript and rules.

N is usually 2 or 3. More rounds rarely add information; they just restate.

## Implementation notes

- Spawn Pro and Con with `agentService.startRun` in parallel, with the same parent run ID (the orchestrator).
- Each round is a separate message exchange via the inbox channel. Don't put both agents in the same thread — they'll see each other's reasoning too early.
- The judge should be a **different model family** from Pro and Con if possible. Same-family judges tend to agree with whichever side used the most similar reasoning style.
- Record the full transcript in the event log with causal links, so the verdict can be audited later. This is what `eventLogDataService` is for.

## Variations

### Panel
Three or more agents, each with a different position. The judge picks the best or synthesises. Use for multi-way decisions ("which of these 4 approaches is best?").

### Human-judged debate
No LLM judge — the transcript is surfaced to a human for review. Pairs well with [Review & merge design](../07_review-and-merge-design.md).

### Self-debate
A single agent is asked to argue both sides sequentially, then decide. Cheaper but loses independence. Use only when you can't afford two agents.

## Pitfalls

- **Winner by verbosity.** Longer arguments often win regardless of merit. Cap each round to a fixed token budget.
- **Judge agreeing with itself.** If the judge shares the Pro model's prompt style, it will side with Pro. Use a different family.
- **Debate theatre.** Sometimes the agents perform a debate without actually disagreeing. Seed each side with a concrete opposing claim (not "you argue for X" but "your position is: this change is safe to merge").
- **Infinite rounds.** Hard-cap rounds. Don't rely on "until one side concedes" — neither side will.

## See also

- [Plan-execute-review](./plan-execute-review.md) — a more common review pattern
- [Review & merge design](../07_review-and-merge-design.md)
- [Guide: build a debate pattern](../../../03_guides/06_multi-agent/design-a-debate-pattern.md)
