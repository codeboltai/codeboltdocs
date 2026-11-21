---
title: getAll
---

# `getAll`

```typescript
client.todos.getAll(params?: TodoListParams): Promise<TodoItem[]>
```

Retrieves all todos, optionally filtered by thread.

Returns all todo items in the system. When a threadId is provided,
only todos belonging to that specific thread are returned. This
is useful for displaying task lists scoped to a particular context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoListParams` | No | Optional query parameters for filtering todos |

## Returns

`Promise<TodoItem[]>` — A promise that resolves to an array of TodoItem objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.getAll();
console.log(result);
```
