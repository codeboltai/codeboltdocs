---
title: addEpisodicEvents
---

# `addEpisodicEvents`

```typescript
client.memory.addEpisodicEvents(id: string, data: AddEpisodicEventsRequest): Promise<unknown>
```

Appends new events to an episodic memory.

Adds one or more event records to the episodic memory's timeline. Events capture
discrete actions, observations, or state changes that occurred during an operation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the episodic memory |
| `data` | `AddEpisodicEventsRequest` | Yes | The events to add |

## Returns

`Promise<unknown>` — A promise that resolves when the events have been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memory.addEpisodicEvents('id', /* AddEpisodicEventsRequest */);
console.log(result);
```
