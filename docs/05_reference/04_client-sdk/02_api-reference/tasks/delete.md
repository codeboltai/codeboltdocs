---
title: delete
---

# `delete`

```typescript
client.tasks.delete(taskId: string): Promise<void>
```

Permanently deletes a task from the system.

Removes the specified task and all its associated data. If the task
has child tasks, they may be affected depending on system configuration.
This operation cannot be undone.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to delete |

## Returns

`Promise<void>` — A promise that resolves when the task has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.delete('taskId');
console.log(result);
```
