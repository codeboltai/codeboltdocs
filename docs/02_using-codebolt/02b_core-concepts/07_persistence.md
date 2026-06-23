---
sidebar_position: 7
title: Shadow Git, Checkpoints & Event Log
description: How Codebolt makes agent edits safely reversible and records the source of truth.
---

import ShadowGitTimelines from '@site/src/components/diagrams/ShadowGitTimelines';
import EventStream from '@site/src/components/diagrams/EventStream';

# Persistence

Two mechanisms make agent work safe and observable: **shadow git** for reversible edits, and the **event log** as the source of truth.

## Shadow git and checkpoints

Codebolt maintains a **second git repository** in `.codebolt/shadow-git/` that mirrors your project's tracked state. After every file-mutating agent action it auto-commits a **checkpoint**.

<ShadowGitTimelines />

When you roll back a chat turn, Codebolt:

1. Finds the shadow-git commit for that turn
2. Restores the working directory to that state
3. Truncates the conversation back to that point

Your **real git history and uncommitted work are untouched**.

### What this enables

- **Aggressive experimentation** — try the bold refactor, revert in one click
- **Mid-conversation backtracking** — roll back to turn 5 and try again
- **Independent of real-git state** — a dirty real repo still rolls back cleanly

### Caveats

Shadow git only tracks files inside the project (external edits in `/tmp` aren't captured), the shadow repo grows over time (it has a pruning policy), and it is **not a substitute for real git** — push real commits as you normally would.

## The event log

Every action, tool call, guardrail verdict, and decision is appended to an immutable **event log**. It is the single source of truth for what happened during a run.

<EventStream />

The event log feeds [evals](./09_evals-and-optimization.md), powers observability, and survives across sessions. Nothing bypasses it.

→ **Read the full concept pages: [Shadow Git and Checkpoints](../../02_concepts/05_persistence/01_shadow-git-and-checkpoints.md) · [Event Log](../../02_concepts/05_persistence/02_event-log.md)**

## See also

- [Context and Memory](./06_context-and-memory.md)
- [Guardrails](./08_guardrails.md)
