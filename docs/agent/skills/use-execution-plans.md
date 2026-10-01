---
title: Use execution plans
id: codebolt.skill.use-execution-plans
summary: Break complex Codebolt work into explicit tasks with lifecycle, delegation, and verification.
kind: skill
audience:
  - agent
  - developer
tags:
  - execution-plan
  - planning
  - tasks
  - delegation
triggers:
  - execution plan
  - task plan
  - plan execute review
  - delegate task
required_docs:
  - /llms/concepts/planning/planning-system.md
  - /llms/concepts/multi-agent/multi-agent-patterns.md
relatedApiSymbols:
  - ExecutionPlan
  - Task
---

# Use execution plans

Use this skill when work is multi-step, risky, parallelizable, or needs visible lifecycle tracking.

## When to use

- The task has separable implementation and verification steps.
- Multiple agents or environments may own different parts.
- The user needs progress visibility.
- Failure should be resumable or retryable.

## Procedure

1. Restate the outcome and split it into concrete tasks.
2. Mark dependencies and ownership for each task.
3. Start only tasks that have enough context to proceed safely.
4. Keep task outputs reviewable: changed files, commands run, and evidence.
5. Release, retry, or reassign blocked tasks instead of silently stalling.
6. Verify integrated behavior after all tasks complete.
7. Summarize the plan result with remaining risks.

## Common failure modes

- Tasks are too broad to verify.
- Dependencies are implicit and cause conflicting edits.
- Agents return unreviewed changes.
- Completion is marked before integration checks pass.

## Verification

- Every task has an owner, status, and acceptance signal.
- Final checks cover the combined result, not just individual tasks.
- Any skipped task has a reason and a follow-up.
