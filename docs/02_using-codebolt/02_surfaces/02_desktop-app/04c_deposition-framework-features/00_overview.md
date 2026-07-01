---
sidebar_position: 0
title: Overview
description: Desktop surfaces that store durable handoffs, evidence, approvals, schedules, and test results for later pickup.
---

# Deposition Framework Features

Deposition Framework Features are desktop surfaces that help agents deposit durable results for another agent, thread, user, or future session to pick up later.

A deposition can be a review request, inbox message, scheduled event, test run, decision, or artifact-backed handoff. It should preserve what happened, the evidence, the current status, and the next action.

## Feature map

| Feature | Use it for |
|---|---|
| [Review Merge Requests](./01_review-merge-requests.md) | Store reviewable change requests, linked artifacts, linked jobs, proposed jobs, and feedback. |
| [Agent Deliberation](./02_agent-deliberation.md) | Store multi-agent responses, votes, winners, summaries, and completed decisions. |
| [Inbox](./02_inbox.md) | Capture agent-to-user escalation messages and pickup notes. |
| [Calendar](./03_calendar.md) | Schedule time-based handoffs, reminders, recurring checks, and agent-triggered events. |
| [Auto Testing](./04_auto-testing.md) | Store test suites, cases, runs, statuses, steps, logs, and linked result artifacts as evidence. |
| [Artifacts](./05_artifacts.md) | Store agent-produced files, apps, previews, external URLs, runtime metadata, and review-linked outputs. |
| [Event Log](./06_event-log.md) | Query durable event streams for audit trails, evidence, replay, and handoff context. |
| [Update Project Structure Request](./07_update-project-structure-request.md) | Store proposed project-structure changes, disputes, watchers, comments, status, and merge state. |
| [Changes Summary](./08_changes-summary.md) | Inspect change-summary evidence linked from review and merge workflows. |

## Related context infrastructure

Persistent Memory, Memory Ingestion, Vector DB, Knowledge, Knowledge Graph, and KV Store also persist context, but they belong to the desktop app's Context menu. Use those pages as supporting infrastructure for deposition workflows rather than primary deposition handoff surfaces.

## See also

- [Deposition Framework](../../../../03_guides/03_loops-and-deposition-engineering/deposition-framework.md)
- [Agent Management Features](../04b_agent-management-features/00_overview.md)
