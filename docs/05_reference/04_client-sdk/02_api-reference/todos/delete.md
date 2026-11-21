---
title: delete
---

# `delete`

```typescript
client.todos.delete(todoId: string): Promise<void>
```

Deletes a todo by ID.

Permanently removes the specified todo from the system. This operation
cannot be undone. Use with caution and consider alternatives like
archiving if the todo should be preserved for historical purposes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `todoId` | `string` | Yes | The unique identifier of the todo to delete |

## Returns

`Promise<void>` — A promise that resolves when the todo has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.todos.delete('todoId');
console.log(result);
```
