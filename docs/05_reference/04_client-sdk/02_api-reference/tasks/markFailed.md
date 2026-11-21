---
title: markFailed
---

# `markFailed`

```typescript
client.tasks.markFailed(taskId: string): Promise<Task>
```

Marks a task as failed.

Updates the task's status to indicate that the task could not be
completed successfully. This is typically called when errors occur or
when task objectives cannot be achieved. Returns the updated task object.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to mark as failed |

## Returns

`Promise<Task>` — A promise that resolves to the updated Task object with failed status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.markFailed('taskId');
console.log(result);
```
