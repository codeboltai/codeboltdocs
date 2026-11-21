---
title: markInProgress
---

# `markInProgress`

```typescript
client.tasks.markInProgress(taskId: string): Promise<Task>
```

Marks a task as in-progress.

Updates the task's status to indicate that work has begun on it.
This is typically called when a task is being actively worked on.
Returns the updated task object.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to mark as in-progress |

## Returns

`Promise<Task>` — A promise that resolves to the updated Task object with in-progress status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.tasks.markInProgress('taskId');
console.log(result);
```
