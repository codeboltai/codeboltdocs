---
sidebar_position: 7
title: Event Log
description: Use event logs as queryable evidence streams for handoffs, audits, replay, and debugging.
---

# Event Log

The **Event Log** panel stores queryable event streams. In deposition workflows, it provides the audit trail behind a handoff: what happened, when it happened, which stream or agent emitted it, and what payload was recorded.

Open via: **Context menu -> Event Log** or from event-log result widgets in chat.

## What gets deposited

- Event type.
- Payload and metadata.
- Project, instance, and stream identifiers.
- Creation time.
- Agent, severity, or correlation fields when present in metadata.

## Query workflow

1. Open the Event Log panel.
2. Select or create an event-log instance.
3. Query events by type, stream, agent, severity, correlation ID, or time range.
4. Use query or reduce results as supporting evidence for a review, test result, or follow-up agent task.

## See also

- [Deposition Framework](../../../../03_guides/03_loops-and-deposition-engineering/deposition-framework.md)
- [Auto Testing](./04_auto-testing.md)
- [Artifacts](./05_artifacts.md)
