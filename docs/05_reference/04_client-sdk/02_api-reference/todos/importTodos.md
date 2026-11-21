---
title: importTodos
---

# `importTodos`

```typescript
client.todos.importTodos(data: ImportTodosRequest): Promise<TodoItem[]>
```

Imports todos from an external source.

Imports todo items from an external system or file format. This enables
migrating tasks from other todo management tools or bulk loading
tasks from predefined lists.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ImportTodosRequest` | Yes | Import payload containing external todo data |

## Returns

`Promise<TodoItem[]>` — A promise that resolves to an array of imported TodoItem objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.importTodos(/* ImportTodosRequest */);
console.log(result);
```
