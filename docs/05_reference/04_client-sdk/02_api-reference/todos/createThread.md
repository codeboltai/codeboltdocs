---
title: createThread
---

# `createThread`

```typescript
client.todos.createThread(data: CreateTodoThreadRequest): Promise<TodoList>
```

Creates a new todo thread.

Initializes a new thread for organizing related todos. Threads
provide structure and context for groups of tasks, making them
easier to manage and track together.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTodoThreadRequest` | Yes | Thread creation payload containing name and optional metadata |

## Returns

`Promise<TodoList>` — A promise that resolves to the created TodoList thread object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.createThread(/* CreateTodoThreadRequest */);
console.log(result);
```
