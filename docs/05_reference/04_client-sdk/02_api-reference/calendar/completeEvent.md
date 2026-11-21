---
title: completeEvent
---

# `completeEvent`

```typescript
client.calendar.completeEvent(id: string, data?: CompleteEventRequest): Promise<void>
```

Marks a specific calendar event as complete.

Records the completion of an event, optionally with completion
details such as outcome or notes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event to complete |
| `data` | `CompleteEventRequest` | No | Optional completion details |

## Returns

`Promise<void>` — A promise that resolves when the event has been marked complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.completeEvent('id');
console.log(result);
```
