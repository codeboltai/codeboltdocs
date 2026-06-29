---
sidebar_position: 7
title: Scheduled Tasks
description: Run agent prompts later or on a recurring schedule using cloud thread runtime providers, with list and calendar views.
---

# Scheduled Tasks

**Scheduled Tasks** let you run an agent prompt later — once, at an interval, or on a cron schedule — against an enabled cloud thread runtime provider. They turn Cloud into a time-driven automation layer: schedule a daily report, a nightly refactor pass, or a one-off investigation for tomorrow morning.

Open it at **Agents → Scheduled Tasks** in the portal.

## The schedule kinds

| Kind | How it works | Example |
|---|---|---|
| **One time** (`once`) | Runs once at a specific date/time in your timezone | "Run this audit tomorrow at 9am" |
| **Interval** (`interval`) | Runs every N minutes from the start time | "Every 60 minutes" |
| **Cron** (`cron`) | Runs on a five-field **UTC** cron expression | `0 9 * * 1` = every Monday 09:00 UTC |

Cron uses standard five-field syntax (`minute hour day-of-month month day-of-week`). The portal evaluates cron in UTC, so convert from your local time when authoring expressions.

## Runtime providers

A scheduled task runs on a **thread runtime provider** — one of the cloud sandbox providers you've enabled and supplied credentials for (E2B Remote, Sprites Remote, Runloop Remote). The provider drop-down in the create dialog lists only providers that are:

- **Enabled** in [Thread Runtime Providers](../05_settings/04_thread-runtime-providers.md), and
- **Configured** with credentials in [Remote Sandboxes](../05_settings/03_remote-sandboxes.md)

If the list is empty, set up a provider first.

## Creating a schedule

1. Click **Add schedule**.
2. Fill in:
   - **Name** — a label for the task
   - **Prompt** — what the agent should do when the schedule runs (required)
   - **Agent ID or slug** — optional; which agent handles the run
   - **Runtime provider** — which sandbox backend to use
   - **Schedule** — one time / interval / cron, plus its parameters
3. The task starts **enabled**. Each run spins up a new thread on the chosen provider, executes the prompt, and records a run.

## Views

The page has two modes:

- **List** — every task with its schedule kind, next run time, status, and run history. Expand **Runs** on a task to see each execution's status (`scheduled`, `running`, `completed`, `failed`) with any error or resulting thread/runtime ID.
- **Calendar** — upcoming occurrences projected from your schedules onto a month grid. Color-coded by kind: blue (once), emerald (interval), purple (cron). Useful for visualizing when many schedules overlap.

## Managing tasks

| Action | Effect |
|---|---|
| **Pause / Resume** | Disables or re-enables a task without deleting it |
| **Delete** | Removes the task; in-flight runs are unaffected |
| **Runs** | Shows the execution history for a task |

A paused task stops producing occurrences; the calendar and next-run fields update accordingly.

## Fields at a glance

| Field | Meaning |
|---|---|
| `taskId` | Unique ID |
| `name` / `prompt` | The task label and what runs |
| `agentId` | Optional target agent |
| `providerId` | The thread runtime provider (e.g. `e2b-remote`) |
| `scheduleKind` | `once` / `interval` / `cron` |
| `cronExpression` / `intervalMinutes` / `runAt` | The schedule parameters (one applies per kind) |
| `timezone` | Authoring timezone (cron itself runs in UTC) |
| `nextRunAt` | When the next execution will fire |
| `enabled` | Whether the schedule is active |

## See also

- [Thread Runtime Providers](../05_settings/04_thread-runtime-providers.md) — enabling providers for scheduled tasks
- [Remote Sandboxes](../05_settings/03_remote-sandboxes.md) — provider credentials
- [Remote Chat](./01_remote-chat.md) — ad-hoc runs (no schedule)
