---
sidebar_position: 1
title: Chat Overview
description: The chat panel is the primary way most people interact with Codebolt. You pick an agent, type a message, watch it work, review the result
---

# Chat Overview

![Chat Overview](/productImages/chat/overview.gif)

The chat panel is the primary way most people interact with Codebolt. You pick an agent, type a message, watch it work, review the result. Everything else in Codebolt — marketplace, flows, custom agents, multi-agent orchestration — is either a variation on this loop or infrastructure that makes it better.

## Anatomy of the chat panel

```
┌──────────────────────────────────────────────┐
│ [tab] [tab] [+]                              │  ← tabs (multiple conversations)
├──────────────────────────────────────────────┤
│ agent: generalist ▾    model: claude-sonnet-4│  ← agent + model picker
├──────────────────────────────────────────────┤
│                                              │
│   user: rename getUser to fetchUser         │
│                                              │
│   ↳ reading src/auth/session.ts              │  ← tool calls inline
│   ↳ reading src/api/users.ts                 │
│   ↳ writing src/auth/session.ts              │
│                                              │
│   assistant: Done. 3 files changed.          │
│   [diff preview]                             │
│                                              │
├──────────────────────────────────────────────┤
│ [checkpoint: 2s ago]  [rollback]  [details]  │  ← checkpoint controls
├──────────────────────────────────────────────┤
│ > type a message...                    [send]│  ← composer
└──────────────────────────────────────────────┘
```

Main areas:
- **Tabs** — each tab is a thread with its own history, agent, and model.
- **Agent + model pickers** — change either at any point; subsequent turns use the new values.
- **Message stream** — user and assistant messages, with tool calls rendered inline.
- **Checkpoint controls** — every turn creates a checkpoint you can roll back to. See [Checkpoints](./04_checkpoints-and-rollback.md).
- **Composer** — where you type. Supports @-mentions, slash commands, file drops.

## What a turn looks like

When you send a message:

1. The turn is added to the thread and persisted.
2. The bound agent wakes up.
3. Context is assembled (recent turns, active rules, relevant memory, open files).
4. The agent calls the LLM with tools available.
5. If the LLM returns tool calls, they run (each one visible in the stream).
6. Guardrails check every tool call before it executes.
7. The agent decides whether to continue or finish; loop until done.
8. A final message is streamed back.
9. A checkpoint is recorded at the end.

All of this is traced — you can dig into any turn to see exactly what happened. See [Agent Debug](../05c_agent-observability/02_agent-debug.md).

## Tabs

Each chat tab is a separate thread. Tabs are useful for:

- **Parallel tasks** — working on two things at once, one per tab.
- **Different agents** — a reviewer tab and a coder tab on the same project.
- **Experimental exploration** — spin up a throwaway tab to try something without polluting your main thread.

Tabs persist across restarts. Close a tab deliberately if you want it gone.

See [Tabs and history](./02_tabs-and-history.md).

## The context window

The chat doesn't dump your entire conversation into the LLM every turn. The [context assembler](../../04_build-on-codebolt/09_internals/03_subsystems/07_context-assembly.md) picks what goes in, based on:

- Recent turns (most recent N).
- Persistent memory relevant to the current task.
- Open files in the editor.
- Codemap entries for files you've mentioned.
- @-mentions you included explicitly.
- Project-wide context rules.

When the context budget is tight, older turns are compressed automatically. You'll see a compression marker in the thread when this happens.

See [Context and @-mentions](./03_context-and-at-mentions.md).

## Agent and model picker

**Agent** — which agent handles this thread. Can be any installed agent: built-ins, custom, marketplace. The same project can have different tabs bound to different agents.

**Model** — which LLM the agent uses. Defaults to the agent's `default_model`, but you can override per tab. The model picker respects the agent's constraints — if the agent is configured for a specific model family, you can't switch to an incompatible one.

Changing either mid-thread is fine. The next turn uses the new values; previous turns are unchanged.

See [Model selection](./06_model-selection.md).

## Checkpoints

Every chat turn that changes files creates a checkpoint. You can:

- **Rollback to a checkpoint** — revert the files to that point without touching real git.
- **Replay from a checkpoint** — see a read-only snapshot of the FS at that point.
- **Branch from a checkpoint** — start a new thread with that FS state as the starting point.

Checkpoints are cheap. Don't be afraid to let the agent try things; you can always rewind.

See [Checkpoints and rollback](./04_checkpoints-and-rollback.md).

## Mentions and action popovers

The current GUI composer is richer than a plain text box:

- `@` opens a picker for files, folders, and docs
- `/` opens action suggestions based on available agent actions
- `#` opens a picker for agents and docs
- file and image drag-and-drop are supported

Earlier versions of these docs described a fixed slash-command set in the GUI chat panel. The current UI exposes popovers and action suggestions, not that hard-coded command list.

## Keyboard shortcuts

The current GUI chat panel has a smaller confirmed shortcut set than earlier docs claimed:

| Shortcut | Action |
|---|---|
| Enter | Send message |
| Shift+Enter | Insert a new line |
| Ctrl/Cmd+X | Stop the current agent turn |

New chat creation, history access, restart, and most thread navigation are currently exposed through the header controls rather than through the chat-specific shortcut list documented in older drafts.

## See also

- [Tabs and history](./02_tabs-and-history.md)
- [Context and @-mentions](./03_context-and-at-mentions.md)
- [Checkpoints and rollback](./04_checkpoints-and-rollback.md)
- [Model selection](./06_model-selection.md)
- [Chat message end-to-end (internals)](../../04_build-on-codebolt/09_internals/04_data-flow-walkthroughs/chat-message-end-to-end.md)
