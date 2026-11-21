---
title: create
---

# `create`

```typescript
client.todos.create(data: CreateTodoRequest): Promise<TodoItem>
```

Creates a new todo.

Initializes a new todo item with the provided data. The todo can be
assigned to a thread, given a priority, and include any other relevant
task information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTodoRequest` | Yes | Todo creation payload containing task details |

## Returns

`Promise<TodoItem>` — A promise that resolves to the created TodoItem object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.create(/* CreateTodoRequest */);
console.log(result);
```
