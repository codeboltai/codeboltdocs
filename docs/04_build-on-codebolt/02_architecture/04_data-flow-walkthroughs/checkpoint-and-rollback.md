---
sidebar_position: 4
title: Checkpoint and rollback
description: "How Codebolt's \"go back to before the agent did that\" button actually works. The short answer: shadow git + the event log."
---

# Checkpoint and rollback

How Codebolt's "go back to before the agent did that" button actually works. The short answer: **shadow git + the event log**.

## What a checkpoint actually is

A checkpoint is not a snapshot. It's a *coordinate* — a tuple of:

1. A **shadow git commit hash** (the FS state at that moment).
2. An **event log cursor** (the last event before the checkpoint).
3. A **run ID + phase ID** (which step you were on).
4. Optionally a **memory epoch** (the state of mutable memory layers).

Together, these let Codebolt reconstruct the exact state at that point, or roll the live state back to it.

## Step 1 — how checkpoints get written

You never explicitly "save a checkpoint" as a user. Checkpoints are emitted automatically at safe points:

| Safe point | Who triggers it |
|---|---|
| Before any file write | `fileUpdateIntentService` |
| At the start of each agent phase | Agent loop |
| After a successful tool call that changed state | `toolService` |
| At user-visible boundaries (message sent, agent done) | `chatService`, `agentService` |
| Explicit `checkpoint` tool call | Agent can request one |

Each checkpoint is cheap: shadow git is append-only and uses git's normal content-addressable storage, so most checkpoints share most objects with their predecessors.

## Step 2 — shadow git vs real git

This is the trick that makes checkpoints work without interfering with the user's own git workflow:

```
working directory
      │
      ├── real .git     ← the user's repo, only touched when explicitly told
      │
      └── .codebolt/shadow-git
                        ← a parallel repo that mirrors every write automatically
```

The shadow repo is never pushed. It's never the answer to `git status`. It exists purely so Codebolt has a complete write history that the user's real git doesn't know about. If the user hasn't committed in two hours but the agent has made 40 edits, the shadow repo has 40 commits and the real repo has zero — and the user can roll back to any of those 40 without ever touching their real git state.

**Source:** `services/shadowGitService`.

## Step 3 — the rollback operation

When the user clicks "rollback to here" (or calls the rollback API, or an agent calls `codebolt.checkpoint.rollback`):

1. **Target resolution.** The checkpoint coordinate is loaded from the DB.
2. **Live run handling.** If any agents are currently running on this project, they're paused. A rollback mid-run is allowed but recorded explicitly — the paused agents will see "you were rolled back" on their next step.
3. **Shadow git checkout.** `shadowGitService` does the equivalent of `git checkout <commit>` against the shadow repo, **but writes into the working directory**. Result: every file is back to its checkpoint state.
4. **Real git stays untouched.** The user's real `.git` is not modified. If they had uncommitted changes in real git, those changes are preserved in a temporary stash with a clear marker.
5. **Index invalidation.** `codebaseIndexService` and `projectStructureService` are told to re-index. The codemap is rebuilt.
6. **Memory rewind (optional).** Mutable memory layers (`episodicMemory`, working memory) are rewound to the checkpoint's epoch. Persistent memory and the event log are **not** rewound — they're append-only history, and erasing them would break auditability.
7. **Event emitted.** A `checkpoint.rollback` event is written to the event log with the source and target coordinates as causal parents. This is important: the rollback *itself* is recorded, so the event log is never a lie.

## Step 4 — what replay means (and why it's different)

Rollback changes live state. **Replay** is the read-only version: reconstruct what the state *was* at a checkpoint without modifying the current state.

Replay is how the UI shows you "what the code looked like after step 14 of this run". It's implemented by:

1. Loading the shadow git tree at the checkpoint commit (without checking it out).
2. Loading the event log slice from run start to the checkpoint cursor.
3. Presenting both as a read-only view.

Because shadow git is content-addressable, serving a replay view is essentially free — no disk I/O beyond reading a few git objects.

## Step 5 — partial rollback

Sometimes you don't want to rewind everything, just one file. `shadowGitService` supports path-scoped rollback:

```
rollback src/auth/session.ts to checkpoint ckpt_abc
```

This checks out only that path from the shadow commit. Event log gets a `checkpoint.rollback` entry scoped to the path. Other files, other agents, and the rest of the state are untouched.

## What this makes possible

- **Undo any agent change, instantly**, without touching the user's real git history.
- **Time-travel debugging** — scroll back through the run and see the FS + events as they were at each step.
- **Branch an exploration** — "let's try a different approach from here" becomes "start a new run from this checkpoint".
- **Safe experimentation** — the user can let an agent do anything, because anything is rewindable.

## What it does NOT give you

- **Rewind of external side effects.** If the agent sent an email, called a payment API, or pushed to a remote — rollback can't undo that. The event log shows what happened; the real world has moved on.
- **Rewind of mutable external state.** A database write outside the workspace, a docker volume change — not covered. Agents doing those things should explicitly guard them.

These limits are why the guardrail engine is stricter about externally-visible actions than about in-workspace edits.

## See also

- [Project & Workspace Subsystem](../../07b_subsystems/10_project-and-workspace.md) — where shadow git lives
- [Persistence & Event Log](../../07b_subsystems/12_persistence-and-eventlog.md) — the append-only side
- [Checkpoints (user-facing)](../../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md)
- [Replay an agent run (guide)](../../../03_guides/07_advanced/replay-an-agent-run.md)
