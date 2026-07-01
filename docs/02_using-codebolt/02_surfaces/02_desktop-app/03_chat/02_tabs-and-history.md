---
sidebar_position: 2
title: Tabs and History
description: Each chat tab is a separate conversation with its own agent, model, and message history
---

# Tabs and History

Each chat tab is a separate conversation with its own agent, model, and message history. History persists across restarts — closing a tab is a decision to lose it, not an accident.

## Tabs

Create a tab from the **New Chat** control in the header, or reopen an existing thread from the history popover.

Each tab has:
- A bound agent (picker at the top)
- A bound model (picker at the top)
- Its own message stream
- Its own checkpoint timeline
- Its own tab name (editable; defaults to the first user message)

Tabs are independent — a tool call in tab A doesn't affect tab B. You can have a planner tab, a coder tab, and a reviewer tab running at once on the same project.

## Tab management

In the current GUI chat panel, tab management is primarily exposed through visible controls:

- **New Chat** creates a new thread tab
- the thread strip lets you switch active threads
- close controls on tabs remove them from the current panel
- the history popover reopens older threads
- the running-thread dropdown helps you jump between active threads

Older versions of this page documented a larger keyboard shortcut set for tab management, but that is not what the current GUI chat panel exposes.

## History

Every tab is backed by a persisted chat thread. **Settings → History** shows all past threads across all projects, searchable:

- By text in messages.
- By date.
- By agent.
- By project.
- By checkpoint activity (threads that had rollbacks).

Reopen a thread from history to continue an old conversation with full context — all previous turns, tool calls, and checkpoints are restored.

## Session vs thread

A **session** is a single time you had a chat tab open. A **thread** can span many sessions — you closed the tab yesterday, reopened it today, it's the same thread. The thread's ID is stable; session IDs are not.

This matters for:
- **Memory** — the thread-level persistent memory sees all sessions in the thread.
- **Replay** — replaying a thread replays all sessions combined.
- **Analytics** — "how many sessions on this thread" is different from "how many threads".

## Thread length limits

Threads don't have a hard cap, but:

- **Compression** kicks in around 30-50 turns depending on turn size.
- **Eventually** the compression becomes lossy enough that starting a new thread (and importing the important bits into persistent memory) is better than continuing.
- **Replay fidelity** decreases with heavily compressed threads.

Rule of thumb: when a thread is making the agent visibly confused about earlier decisions, it's time to start fresh.

## Deleting history

Two levels of delete:

- **Archive a thread** — removes it from the main list but keeps the data. Recoverable.
- **Delete a thread** — removes the data permanently. Not recoverable.

For compliance reasons, the event log entries referenced by a deleted thread remain append-only but lose their chat metadata. If strict deletion is required, use the administrative deletion surface exposed by your deployment.

## See also

- [Chat Overview](./01_overview.md)
- [Context and @-mentions](./03_context-and-at-mentions.md)
- [Checkpoints and rollback](./04_checkpoints-and-rollback.md)
