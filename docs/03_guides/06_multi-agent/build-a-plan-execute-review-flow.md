---
sidebar_position: 2
title: Build a plan-execute-review flow
description: "Wire up the most useful multi-agent pattern as a manual workflow. End result: three specialised agents hand work between themselves with a fresh-context review."
---

# Build a plan-execute-review flow

Wire up the most useful multi-agent pattern as a manual workflow. End result: three specialised agents hand work between themselves with a fresh-context review.

**You'll need:** three agents (planner, coder, reviewer) configured as remix or framework agents.

## What we're building

A workflow with:

1. **Plan stage** — a big-model agent reads the task and produces a structured plan.
2. **Execute stage** — a fast coder agent implements the plan.
3. **Review stage** — a different-family reviewer checks the result against the plan.
4. **Loop** — review can send back to execute (up to a few times) if it rejects.

## Step 1 — the three agents

Create three remix agents in `.codebolt/agents/remix/`.

### planner

```markdown
---
name: planner
description: Produces structured plans from task descriptions.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_codebase.*
remixedFromId: generalist
customInstructions: |
  You are a software architect. Produce a structured plan to accomplish the given task.

  Read only — do not write or modify files.

  Your output must include:
  - goal: a one-sentence restatement of what success looks like
  - steps: an ordered list of concrete steps, each with an id, description, and files that will be touched
  - tests: how to verify each step worked
  - risks: things that could go wrong

  Be concrete. "Implement the feature" is not a step. "Add a rate limiter middleware in src/middleware/rate-limit.ts that uses the existing Redis client" is a step.
---
```

### coder

```markdown
---
name: plan-coder
description: Implements plans produced by the planner.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.*
  - codebolt_git.git_status
  - codebolt_git.git_diff
  - codebolt_code.*
remixedFromId: generalist
customInstructions: |
  You are a precise implementer. You have received a structured plan. Execute it step by step.

  Do NOT re-plan. If the plan is wrong, report it instead of improvising.
  Do NOT scope-creep. If step_3 says "add the middleware", add the middleware; don't also refactor nearby code.
  After each step, verify with a tool call that the change was made correctly.
  At the end, emit a diff_summary listing what changed.
---
```

### reviewer

```markdown
---
name: plan-reviewer
description: Reviews a diff against the plan it was supposed to implement.
model: gpt-4
tools:
  - codebolt_fs.read_file
  - codebolt_git.git_diff
remixedFromId: reviewer
customInstructions: |
  You review changes against a plan. Given the plan and the diff, determine:
  - Was each step implemented correctly?
  - Were any steps missed or partially implemented?
  - Were any unplanned changes introduced?

  Output: verdict (approved or rejected) with specific comments per step.
---
```

Why a different model family? Because a Claude reviewer will tend to agree with a Claude coder — they share training biases. GPT reviewing Claude (or vice versa) gives real independence.

## Step 2 — run the workflow

### Plan

```bash
codebolt --prompt "add a /health endpoint that returns 200 OK with uptime in seconds" --agent planner
```

Review the plan. If it looks good, proceed.

### Execute

Copy the plan into a new chat with the coder:

```bash
codebolt --prompt "[paste the plan here] Execute this plan step by step." --agent plan-coder
```

Watch the execution. If anything looks wrong, stop and adjust.

### Review

```bash
codebolt --prompt "[paste the plan here] Review the current changes against this plan." --agent plan-reviewer
```

The reviewer checks the diff against the plan and gives a verdict.

### Loop if needed

If the reviewer rejects, send the feedback back to the coder:

```bash
codebolt --prompt "[paste reviewer feedback] Fix these issues from the review." --agent plan-coder
```

Repeat up to 2-3 times. If it still doesn't pass, step in manually.

## Making it reusable

Commit the three agent markdown files to your project repo. Anyone who opens the project gets all three agents.

## When this workflow fits and when it doesn't

**Fits:**
- Non-trivial features where a plan is worth the overhead.
- Changes where review matters (security, APIs, data models).
- Repetitive work you want to standardize.

**Doesn't fit:**
- Trivial tweaks (typos, formatting, single-line fixes). Use a single generalist.
- Exploratory/research tasks where the "goal" is fuzzy. No plan to review against.
- Emergency fixes under time pressure. Skip review; run the coder alone and review yourself.

## Variations

- **Mechanical gate before review** — run tests between execute and review. Only proceed to review if tests pass.
- **Human review after LLM review** — review the LLM's verdict yourself for high-stakes changes.
- **Parallel review** — run two reviewers with different models and compare.

## See also

- [Build your first agent](../02_first-steps/build-your-first-agent.md)
- [Code review with an agent](../03_everyday-workflows/code-review-with-an-agent.md)
- [Custom Agents Overview](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
