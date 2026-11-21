---
title: bulkDelete
---

# `bulkDelete`

```typescript
client.threads.bulkDelete(data: ThreadBulkDeleteRequest): Promise<void>
```

Deletes multiple threads in a single operation.

Removes the specified threads from the system in a bulk operation.
This is more efficient than deleting threads individually and ensures
atomic deletion of multiple threads.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ThreadBulkDeleteRequest` | Yes | The bulk delete request containing thread IDs to delete |

## Returns

`Promise<void>` — A promise that resolves when all threads have been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.bulkDelete(/* ThreadBulkDeleteRequest */);
console.log(result);
```
