---
title: createEventsBatch
---

# `createEventsBatch`

```typescript
client.eventLog.createEventsBatch(data: CreateEventLogEventRequest[]): Promise<EventLogEvent[]>
```

Creates multiple events in a single batch operation.

More efficient than creating events one at a time when you have
multiple events to record simultaneously.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateEventLogEventRequest[]` | Yes | An array of event creation payloads |

## Returns

`Promise<EventLogEvent[]>` — A promise that resolves to an array of the created  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.createEventsBatch(/* CreateEventLogEventRequest[] */);
console.log(result);
```
