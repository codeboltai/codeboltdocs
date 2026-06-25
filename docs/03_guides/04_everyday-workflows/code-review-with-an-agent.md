---
sidebar_position: 1
title: Code review with an agent
description: "A practical workflow: before you send a PR out, run an agent review on the diff and address what it catches"
---

# Code review with an agent

A practical workflow: before you send a PR out, run an agent review on the diff and address what it catches. 10-20 minute end-to-end; catches 60-80% of the things a human reviewer would.

**You'll need:** Codebolt with a provider configured, a project with staged changes or an open branch.

## The setup in 3 minutes

Use the built-in `reviewer` agent if you haven't customised it. If you want a project-specific reviewer, follow [Build your first agent](../02_first-steps/build-your-first-agent.md) first — the rest of this guide works with either.

## Workflow 1 — review staged changes

Before `git push`:

```bash
git add -p               # stage what you want reviewed
codebolt --prompt "review the staged changes against this project's conventions" --agent reviewer
```

Or in the UI: open a chat tab, pick `reviewer` from the agent picker, and send `Review my staged changes.`

The agent will:
1. Run `codebolt_git.git_diff` to see what changed.
2. Read the touched files in context.
3. Check for bugs, convention violations, missing error handling, etc.
4. Produce a list of comments.

Read the comments in the chat. Each should have file:line, severity, and an explanation.

## Workflow 2 — review a branch against main

For larger changes spanning many commits:

```bash
codebolt --prompt "review all changes on the current branch against origin/main" --agent reviewer
```

The agent runs `codebolt_git.git_diff origin/main..HEAD` to see the full branch diff. Same review output, broader scope.

**Tip:** branch reviews are more token-heavy. Set a tight token budget or split into multiple focused reviews by path.

## Workflow 3 — review a specific file

Sometimes you want attention on one file, not the whole diff:

```
@src/auth/session.ts review this file for security issues, especially session fixation and CSRF.
```

The `@` mention pins that file into the agent's context even if the diff doesn't include it. Specific questions give better answers than "review this".

## Workflow 4 — review with a pre-check

For mechanical rules (no `any` in new TypeScript, no `console.log` in production code, etc.), put them in the agent's custom instructions. The LLM handles the judgment calls; explicit rules in the instructions handle the things that shouldn't be LLM-decided. See [Build your first agent](../02_first-steps/build-your-first-agent.md) for how.

## Workflow 5 — CI integration

Run the agent as part of CI on every PR:

```bash
#!/bin/bash
set -euo pipefail

# Run codebolt in headless mode for CI
codebolt --prompt "review the diff against origin/main" --agent reviewer
```

This gives you: every PR gets an automated review. For more advanced CI integration, see the CI/CD documentation.

## Handling the comments

Agent reviews are suggestions, not decrees. Triage:

### Blocker comments
These should block the PR. Real bugs, real violations, real security issues. Fix before merging.

### Issue comments
Worth addressing, but judgment call. A "consider extracting this" comment might be right or might be over-engineering. You decide.

### Nit comments
Optional. If you have time, take them. If not, ignore. The reviewer should be configured to only emit nits when explicitly asked — see "Tuning" below.

### False positives
Happens. The reviewer flags something that isn't actually a problem because it lacks context the review prompt didn't provide. Options:
- **Explain to the reviewer in a follow-up turn** — "that's fine because X". The reviewer learns it via episodic memory.
- **Update the system prompt** — if the false positive will recur, embed the rule in the reviewer's config.
- **Add a context rule** — "when reviewing files under legacy/, always include docs/legacy-conventions.md".

## Tuning your reviewer

The default `reviewer` is a generalist. Over time you'll want to tune it:

### Remove noise
If it flags style issues you have a formatter for, tell it not to:

```yaml
customInstructions: |
  ...
  Do NOT comment on:
  - Formatting, whitespace, or style (we have prettier).
  - Variable naming preferences.
  - Performance unless algorithmic.
```

### Add rules
Project conventions:

```yaml
customInstructions: |
  ...
  Always verify:
  - Public API types live in src/types/api.ts.
  - Database access goes through src/db/repos/ (not direct knex).
  - Every async function has explicit error handling.
```

### Steer severity
If the reviewer is too harsh or too lenient:

```yaml
customInstructions: |
  ...
  Severity guide:
  - BLOCKER: definite runtime bug, security issue, or data corruption risk.
  - ISSUE: likely wrong but debatable.
  - NIT: only emit nits if explicitly asked "nitpick this".
```

## Common pitfalls

### Reviewing your own reviewer's output
The reviewer is an LLM. It's sometimes wrong. Don't rubber-stamp its comments — read them with skepticism.

### Reviewing without the plan
A reviewer that only sees a diff doesn't know what the diff was *supposed* to do. If you wrote the code yourself, include context: "I'm trying to add rate limiting; review whether I did it correctly". Or use [plan-execute-review](../05_multi-agent/build-a-plan-execute-review-flow.md) so the plan is available.

### Reviewing with the same model as the coder
If you used Claude to write the code, use GPT (or Gemini) to review. Same-family models agree too much.

### Reviewing with too much context
If you dump the whole codebase into the reviewer's context, it'll miss things because attention is diluted. Focused review on a specific diff is better than broad review on everything.

### Trusting the reviewer on subjective calls
"Is this abstraction worth it?" is a judgment call the reviewer can opine on but shouldn't decide. Use it for facts, not taste.

## Measuring if the reviewer is helping

After a month of using an agent reviewer, check:

- **How often are its blocker comments correct?** If less than 70%, it's too aggressive — tune it.
- **How often does it catch real bugs before CI?** If less than 20%, it's not pulling its weight — tune it or switch models.
- **How often do humans add review comments the agent missed?** If frequently on the same category, add that category to the reviewer's rules.

Treat the reviewer as a tool you iterate on. The first version won't be great; the tenth will.

## See also

- [Build your first agent](../02_first-steps/build-your-first-agent.md)
- [Build a plan-execute-review flow](../05_multi-agent/build-a-plan-execute-review-flow.md)
- [Running agents](../../02_using-codebolt/04_agents/03_running-agents.md)
- [Review and merge design](../../04_build-on-codebolt/08_multi-agent-orchestration/07_review-and-merge-design.md)
