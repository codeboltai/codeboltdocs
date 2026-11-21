---
title: bulkCreate
---

# `bulkCreate`

```typescript
client.todos.bulkCreate(data: BulkCreateTodosRequest): Promise<TodoItem[]>
```

Bulk-creates multiple todos at once.

Creates multiple todo items in a single API call, which is more efficient
than creating them individually. Use this for batch operations, importing
tasks, or initializing a thread with multiple items.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkCreateTodosRequest` | Yes | Bulk todo creation payload containing multiple items |

## Returns

`Promise<TodoItem[]>` — A promise that resolves to an array of created TodoItem objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.bulkCreate(/* BulkCreateTodosRequest */);
console.log(result);
```
