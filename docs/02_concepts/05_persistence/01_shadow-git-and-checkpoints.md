---
sidebar_position: 8
title: Shadow Git and Checkpoints
description: How Codebolt makes agent edits safely reversible without touching your real git history.
---

import ShadowGitTimelines from '@site/src/components/diagrams/ShadowGitTimelines';

# Shadow Git and Checkpoints

How Codebolt makes agent edits safely reversible without touching your real git history.

<ShadowGitTimelines />

## The problem

Agents edit files. Sometimes those edits are wrong. You want:
- to roll back **just** the agent's changes,
- without losing your own uncommitted work,
- without polluting your real git log with hundreds of micro-commits.

Real git can't do this cleanly. Stashes get tangled, commits clutter history, reset throws away your own work.

## Shadow git

Codebolt maintains a **second git repository** in `.codebolt/shadow-git/` that mirrors your project's tracked state. After every agent action that mutates files, the shadow repo automatically commits the new state.

The shadow repo:
- **Is separate from your real git.** Nothing it does shows up in `git log` or `git status` of the real repo.
- **Auto-commits.** You don't run commands; checkpoints just appear.
- **Is rollback-able.** Any past checkpoint can be restored.
- **Is local.** Never pushed anywhere.

## Checkpoints

A **checkpoint** is one commit in the shadow repo. The agent (and you) can label checkpoints — "before refactor", "after tests pass" — to make them easier to find later.

When you "roll back" a chat turn, Codebolt:
1. Finds the shadow-git commit corresponding to that turn.
2. Restores the working directory to that state.
3. Truncates the conversation back to that point.

Your real git is untouched. Your uncommitted real-git changes are preserved.

## What this enables

- **Aggressive experimentation.** Try the bold refactor; revert in one click.
- **Mid-conversation backtracking.** Realized turn 7 was the wrong direction? Roll back to turn 5 and try again.
- **Independent of real-git state.** You can have a dirty real repo and still roll back shadow git cleanly.

## Caveats

- Shadow git only tracks files inside the project. External edits (a generated file in `/tmp`) are not captured.
- The shadow repo grows over time. There's a built-in pruning policy.
- Shadow git is **not a substitute for real git.** Push real commits as you would normally.

## See also

- [Checkpoints and rollback (using)](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md)
- [Git and Shadow Git (integrations)](../../02_using-codebolt/08_integrations/03_git-and-shadow-git.md)
