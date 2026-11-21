---
title: archiveThread
---

# `archiveThread`

```typescript
client.todos.archiveThread(threadId: string): Promise<void>
```

Archives a todo thread.

Marks the specified thread as archived, removing it from active view
while preserving all todos within it. Archived threads can still be
accessed but are typically hidden from default views.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to archive |

## Returns

`Promise<void>` — A promise that resolves when the thread has been archived

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.archiveThread('threadId');
console.log(result);
```
