---
title: cancel
---

# `cancel`

```typescript
client.threads.cancel(threadId: string): Promise<void>
```

Cancels the execution of a thread.

Terminates the thread's operations and places it in a cancelled state.
Unlike pausing, this action cannot be reversed and the thread will not
continue execution. Use this to stop threads that are no longer needed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to cancel |

## Returns

`Promise<void>` — A promise that resolves when the thread has been cancelled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.threads.cancel('threadId');
console.log(result);
```
