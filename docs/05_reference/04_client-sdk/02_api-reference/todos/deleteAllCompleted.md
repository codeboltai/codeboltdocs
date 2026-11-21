---
title: deleteAllCompleted
---

# `deleteAllCompleted`

```typescript
client.todos.deleteAllCompleted(params?: TodoListParams): Promise<void>
```

Deletes all completed todos, optionally filtered by thread.

Removes all todos with a completed status. When a threadId is provided,
only completed todos within that specific thread are deleted. This is
useful for cleanup operations to maintain a tidy task list.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoListParams` | No | Optional query parameters for filtering deletion scope |

## Returns

`Promise<void>` — A promise that resolves when all completed todos have been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.deleteAllCompleted();
console.log(result);
```
