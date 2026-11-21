---
title: deleteTask
---

# `deleteTask`

```typescript
client.planner.deleteTask(taskId: string): Promise<unknown>
```

Deletes a planner task permanently.

Removes a task from the planner. This action cannot be undone. Consider updating the
task status to "cancelled" instead if you want to preserve a record of the work.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the task has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.deleteTask('taskId');
console.log(result);
```
