---
title: get
---

# `get`

```typescript
client.todos.get(todoId: string): Promise<TodoItem>
```

Retrieves a specific todo by ID.

Returns detailed information about a single todo item including
its current status, description, assignee, and all other fields.
Use this to get the full details of a particular task.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `todoId` | `string` | Yes | The unique identifier of the todo to retrieve |

## Returns

`Promise<TodoItem>` — A promise that resolves to the requested TodoItem object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.get('todoId');
console.log(result);
```
