---
title: exportTodos
---

# `exportTodos`

```typescript
client.todos.exportTodos(params?: TodoExportParams): Promise<unknown>
```

Exports todos, optionally filtered by thread.

Returns todo data in a format suitable for external systems or backup.
The export can be scoped to a specific thread or include all todos
in the system. The exact format depends on server configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TodoExportParams` | No | Optional query parameters for filtering the export |

## Returns

`Promise<unknown>` — A promise that resolves to the exported todo data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.exportTodos();
console.log(result);
```
