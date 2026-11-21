---
title: completeEvents
---

# `completeEvents`

```typescript
client.calendar.completeEvents(data: BulkCompleteEventsRequest): Promise<void>
```

Bulk-completes multiple calendar events.

Marks multiple events as complete in a single operation, useful for
batch processing of finished events.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkCompleteEventsRequest` | Yes | The bulk completion payload |

## Returns

`Promise<void>` — A promise that resolves when all specified events have been completed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.completeEvents(/* BulkCompleteEventsRequest */);
console.log(result);
```
