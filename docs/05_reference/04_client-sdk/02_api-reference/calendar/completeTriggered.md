---
title: completeTriggered
---

# `completeTriggered`

```typescript
client.calendar.completeTriggered(data: CompleteTriggeredRequest): Promise<void>
```

Marks triggered events as complete.

Acknowledges and completes triggered events, removing them from
the pending triggered events list.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CompleteTriggeredRequest` | Yes | The completion payload identifying which triggered events to complete |

## Returns

`Promise<void>` — A promise that resolves when the events have been marked complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.completeTriggered(/* CompleteTriggeredRequest */);
console.log(result);
```
