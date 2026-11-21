---
sidebar_position: 12
title: Persistence & Event Log
description: Query recorded events and understand how they are stored by project.
---

# Persistence and Event Log

CodeBolt persists different kinds of state through their own services. The Event Log stores structured entries in the project's SQLite database. Each entry belongs to a log instance and carries an event type, payload, and creation time. Metadata and stream identifiers can add context.

## Query events

Pass a structured query to `codebolt.eventLog.queryEvents`. Use the ID of a log instance from your project.

```typescript
const result = await codebolt.eventLog.queryEvents({
  instance,
  orderBy: 'created_at',
  order: 'DESC',
  limit: 20
});
```

Add `filters` or `timeRange` to narrow the result. The compiler validates the filter fields and translates the request into SQL. Query mode returns events. Reduce mode derives a value for an entity from matching events.

## Inspect recorded activity

Use [Event Log](../../02_using-codebolt/05d_memory/07_event-log.md) to investigate recorded activity for a project. Use [Repeat an Agent Prompt](../../03_guides/08_advanced/replay-an-agent-run.md) to compare two separate runs.

See [Memory](./04_memory.md) for the persistence services used for notes, retrieval, and other stored data.
