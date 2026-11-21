---
title: getEpisodicEvents
---

# `getEpisodicEvents`

```typescript
client.memory.getEpisodicEvents(id: string, params?: EpisodicEventsParams): Promise<unknown>
```

Retrieves events from an episodic memory with optional filtering.

Returns the sequence of events stored in the episodic memory, optionally filtered
by event type, date range, or agent.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |
| `params` | `EpisodicEventsParams` | No | Optional parameters to filter events |

## Returns

`Promise<unknown>` — A promise that resolves to the filtered list of events

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.getEpisodicEvents('id');
console.log(result);
```
