---
title: delete
---

# `delete`

```typescript
client.threads.delete(threadId: string): Promise<void>
```

Deletes a thread from the system.

Permanently removes the specified thread and all its associated data.
This action cannot be undone, so use with caution. Deleting a thread
will also remove its relationships with other threads.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to delete |

## Returns

`Promise<void>` — A promise that resolves when the thread has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.delete('threadId');
console.log(result);
```
