---
sidebar_position: 8
title: Inbox
description: Messages from local and cloud agents that need your attention, with severity, status workflow, and bulk cleanup.
---

# Inbox

The **Inbox** collects messages that agents send when they need a human — a blocked task, a missing credential, a completed milestone, a critical failure. Think of it as the agent-to-human notification channel across both your local and cloud agents.

Open it at **Agents → Inbox** in the portal.

## What's in an inbox message

Each message carries:

| Field | Meaning |
|---|---|
| **Subject / Body** | What the agent is telling you |
| **Severity** | `info` · `warning` · `critical` — drives the color |
| **Status** | `unread` · `acknowledged` · `resolved` |
| **Agent** | Which agent sent it (name or ID) |
| **Thread / Runtime / Project** | Context for where the message came from |
| **Created / Updated** | Timestamps |

Critical messages get a red border, warnings amber, info neutral — so you can triage at a glance.

## Status workflow

```
unread  ──acknowledge──►  acknowledged  ──resolve──►  resolved
   │                                                  ▲
   └──────────────────── resolve ─────────────────────┘
```

- **Acknowledge** — marks that you've seen it (only available on `unread` messages).
- **Resolve** — closes the loop. Available from `unread` or `acknowledged`.
- **Clear resolved** — bulk-deletes all `resolved` messages to keep the queue tidy.

Use the filter chips (**All** / **Unread** / **Acknowledged** / **Resolved**) to focus on what matters. The header shows the unread count.

## Where messages come from

Both local agents (running on your machine via the cloud plugin or a runner node) and cloud agents (running in a sandbox) can post to the Inbox. The `threadId`, `runtimeId`, and `projectName` fields tie each message back to its source so you can jump into the relevant chat or environment.

## See also

- [Issues & Tasks](./09_issues-and-tasks.md) — structured ticket tracking
- [Remote Chat](./01_remote-chat.md) — where most threads originate
- [Scheduled Tasks](./07_scheduled-tasks.md) — automated runs that may post here
