---
sidebar_position: 3
title: Design a Debate Pattern
description: Two (or more) agents argue opposing positions on the same question, with a judge deciding the winner
---

# Design a Debate Pattern

Two (or more) agents argue opposing positions on the same question, with a judge deciding the winner. Useful for decisions where a single agent tends to be overconfident.

## When to use this

- **Security decisions** — "is this fix actually correct?"
- **Correctness review** — "does this edge case need handling?"
- **Design tradeoffs** — "is approach A or B better for this constraint?"

NOT for subjective calls, taste-based decisions, or anything a unit test could answer faster.

## The shape we'll build

```
  pro-agent   con-agent        (opening arguments)
      │           │
      ▼           ▼
  pro-agent   con-agent        (rebuttals — each sees the other's opening)
      │           │
      └─────┬─────┘
            ▼
         judge
            │
            ▼
         verdict
```

Two agents, two rounds, one judge.

## Step 1 — the question

Debate needs a concrete, binary-ish question. Examples:

- "Is the `validateInput` change in PR #123 sufficient to prevent SQL injection?"
- "Should we handle the case where the user's session expires mid-request, or is the current behaviour acceptable?"
- "Does this migration preserve data integrity for users with legacy records?"

Vague questions produce theatrical debates with no real disagreement. The question should be answerable.

## Step 2 — the pro and con agents

Two remix agents with opposing opening positions.

### pro-agent

```markdown
---
name: pro-agent
description: Argues the affirmative position in a debate.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_git.git_diff
remixedFromId: reviewer
customInstructions: |
  You are arguing the AFFIRMATIVE position in a debate.

  Your job: find the strongest arguments FOR the stated position.
  Read the provided context. State your opening with your top-3 reasons.
  In subsequent rounds, defend your position against the opposition's
  rebuttals. Be specific and cite evidence.

  Do NOT concede. Do NOT hedge. Your job is to make the strongest
  possible case for the affirmative.
---
```

### con-agent

```markdown
---
name: con-agent
description: Argues the negative position in a debate.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_git.git_diff
remixedFromId: reviewer
customInstructions: |
  You are arguing the NEGATIVE position in a debate.

  Your job: find the strongest arguments AGAINST the stated position.
  Read the provided context. State your opening with your top-3 reasons.
  In subsequent rounds, defend your position against the opposition's
  rebuttals. Be specific and cite evidence.

  Do NOT concede. Do NOT hedge. Your job is to make the strongest
  possible case for the negative.
---
```

Both read-only. Both use the same model family (the opposing side is the source of independence, not the model).

## Step 3 — the judge

```markdown
---
name: debate-judge
description: Judges a debate between two agents.
model: gpt-4
tools:
  - codebolt_fs.read_file
remixedFromId: reviewer
customInstructions: |
  You are a debate judge. You will read a full transcript of arguments
  from two sides on a specific question.

  Your job: decide which side made the stronger case. Explain your reasoning.

  Judging criteria:
  - Evidence quality (did the side cite specific facts?)
  - Logical strength (did the arguments follow?)
  - Rebuttals (did the side address the opposition's points?)
  - Concessions (did the side acknowledge opposing points or ignore them?)

  Output JSON: { verdict: "pro" | "con", reasoning: string, confidence: number }.
---
```

The judge uses a different model family — if pro/con are on Claude, the judge is on GPT (or vice versa). Same-family judging correlates with one side's reasoning style.

## Step 4 — run the debate

### Round 1: Opening arguments

Run each agent in a separate chat tab:

```bash
codebolt --prompt "Question: Is the validateInput change in PR #123 sufficient to prevent SQL injection? Context: [paste PR diff]. Round: opening. State your top-3 reasons." --agent pro-agent
```

```bash
codebolt --prompt "Question: Is the validateInput change in PR #123 sufficient to prevent SQL injection? Context: [paste PR diff]. Round: opening. State your top-3 reasons." --agent con-agent
```

### Round 2: Rebuttals

Feed each agent the other's opening:

```bash
codebolt --prompt "Question: [same]. Your previous argument: [pro's opening]. Opposition's argument: [con's opening]. Round: rebuttal. Attack the opposition's weakest claim." --agent pro-agent
```

```bash
codebolt --prompt "Question: [same]. Your previous argument: [con's opening]. Opposition's argument: [pro's opening]. Round: rebuttal. Attack the opposition's weakest claim." --agent con-agent
```

### Judgment

Feed the full transcript to the judge:

```bash
codebolt --prompt "Question: [same]. Pro opening: [...]. Con opening: [...]. Pro rebuttal: [...]. Con rebuttal: [...]. Judge this debate." --agent debate-judge
```

Total cost: 5 LLM calls (2 openings, 2 rebuttals, 1 judgment). At mid-tier pricing, ~$0.20-$1 per debate depending on context size.

## Reading the output

The judge's output tells you which side won and why. Use the full transcript to understand the reasoning.

## Variations

### Three rounds

Add a counter-rebuttal round. Usually not worth it — by round 3, arguments start repeating.

### Panel (more than two sides)

Three or more debaters, each with a different position. Judge picks the best. Use for multi-way decisions.

### Human judge

Skip the `debate-judge` agent and read the transcript yourself. Use when the question is too important to delegate.

## Pitfalls

- **Winner by verbosity.** Longer arguments win regardless of merit. Cap each agent's response by being specific in the prompt.
- **Judge agreeing with itself.** Same-family judge sides with the matching reasoning style. Use a different family.
- **Theatre debate.** Agents go through the motions without real disagreement. Seed each side with a concrete opposing claim.
- **Infinite rounds.** Hard-cap at 2 rounds. Don't rely on "until one side concedes".

## See also

- [Code review with an agent](../03_everyday-workflows/code-review-with-an-agent.md)
- [Build a code-review swarm](./build-a-code-review-swarm.md) — parallel specialists instead of debate
- [Custom Agents Overview](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
