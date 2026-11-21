---
title: bulkUpdate
---

# `bulkUpdate`

```typescript
client.threads.bulkUpdate(data: ThreadBulkUpdateRequest): Promise<void>
```

Updates multiple threads in a single operation.

Performs bulk modifications across multiple threads simultaneously.
This is more efficient than updating threads individually when you need
to apply the same changes to many threads.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadBulkUpdateRequest` | Yes | The bulk update request containing thread IDs and updates |

## Returns

`Promise<void>` — A promise that resolves when all threads have been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.bulkUpdate(/* ThreadBulkUpdateRequest */);
console.log(result);
```
