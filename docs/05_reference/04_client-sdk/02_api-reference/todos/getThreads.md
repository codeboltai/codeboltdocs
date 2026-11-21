---
title: getThreads
---

# `getThreads`

```typescript
client.todos.getThreads(): Promise<TodoList[]>
```

Retrieves all todo threads.

Returns all thread objects that organize todos into logical groups.
Threads can represent projects, features, or any other categorization
scheme. Use this to get an overview of all todo collections.

## Parameters

_No parameters._

## Returns

`Promise<TodoList[]>` — A promise that resolves to an array of TodoList thread objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.getThreads();
console.log(result);
```
