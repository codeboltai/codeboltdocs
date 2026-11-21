---
title: update
---

# `update`

```typescript
client.todos.update(todoId: string, data: UpdateTodoRequest): Promise<TodoItem>
```

Updates an existing todo.

Modifies the specified todo with the provided field values. Only the
fields included in the request will be updated; all other fields remain
unchanged. Use this to change status, reassign tasks, or update details.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `todoId` | `string` | Yes | The unique identifier of the todo to update |
| `data` | `UpdateTodoRequest` | Yes | Partial update payload containing fields to modify |

## Returns

`Promise<TodoItem>` — A promise that resolves to the updated TodoItem object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.update('todoId', /* UpdateTodoRequest */);
console.log(result);
```
