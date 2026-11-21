---
title: createEvent
---

# `createEvent`

```typescript
client.eventLog.createEvent(data: CreateEventLogEventRequest): Promise<EventLogEvent>
```

Creates a new event within an event log instance.

Records a single event with its type, payload, and timestamp. Events
are immutable once created.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEventLogEventRequest` | Yes | Event creation payload including instance ID, type, and data |

## Returns

`Promise<EventLogEvent>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.createEvent(/* CreateEventLogEventRequest */);
console.log(result);
```
