---
title: complete
---

# `complete`

```typescript
client.threads.complete(threadId: string): Promise<void>
```

Marks a thread as completed.

Sets the thread's status to completed, indicating that its execution
has finished successfully. This is typically done automatically by
the thread, but can be called manually when needed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to complete |

## Returns

`Promise<void>` — A promise that resolves when the thread has been marked complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.complete('threadId');
console.log(result);
```
