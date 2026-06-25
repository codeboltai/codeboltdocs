---
sidebar_position: 1
title: Single Agent Loop
description: Run one agent through a focused plan, act, verify, and refine loop
---

# Single Agent Loop

A single agent loop is the simplest reliable way to use Codebolt for iterative work. One agent owns the task, gathers context, makes changes, verifies the result, and refines until the goal is met.

**Use case:** you want one agent to complete a scoped task without coordinating with other agents or environments.

## The loop

1. **Define the goal.** State the outcome, constraints, and files or areas that matter.
2. **Gather context.** Let the agent inspect the codebase before changing anything.
3. **Plan the work.** Ask for a short sequence of implementation steps.
4. **Act.** Let the agent make one coherent set of edits.
5. **Verify.** Run the relevant build, typecheck, lint, and tests.
6. **Refine.** Fix any issues found during verification.

## When to use it

Use a single agent loop when:

- The task has one clear owner.
- The codebase area is small or well understood.
- Verification can be done in one project environment.
- The risk of conflicting edits is low.

Avoid it when the work requires parallel exploration, independent review, or multiple runtime environments.

## Example prompt

```text
Update the billing settings page so team admins can change invoice email recipients. First inspect the existing billing UI and API conventions. Then implement the change, run the relevant checks, and summarize what changed.
```

## Practical tips

- **Keep the goal concrete.** A precise target produces a tighter loop.
- **Ask for verification.** The loop is incomplete until checks pass.
- **Limit the scope.** Split broad product changes into multiple single-agent loops.
- **Review the final diff.** The agent should explain the impact, but the code remains the source of truth.

## See also

- [Build your first agent](../02_first-steps/build-your-first-agent.md)
- [Debug a hung agent](../04_everyday-workflows/debug-a-hung-agent.md)
