---
title: unarchiveThread
---

# `unarchiveThread`

```typescript
client.todos.unarchiveThread(threadId: string): Promise<void>
```

Unarchives a todo thread.

Removes the archived status from the specified thread, making it
visible in active views again. This restores the thread and all its
todos to normal operational status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to unarchive |

## Returns

`Promise<void>` — A promise that resolves when the thread has been unarchived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.unarchiveThread('threadId');
console.log(result);
```
