---
name: updateTask
description: Updates an existing task.
cbbaseinfo:
  description: Updates an existing task.
data:
  name: updateTask
  category: taskplaner
  link: updateTask.md
---

# updateTask

```text
codebolt.task.updateTask(taskId: string, updates: UpdateTaskOptions): Promise<UpdateTaskResponse>
```

Updates an existing task.

## Parameters

- `taskId` — The task ID to update
- `updates` — The task update parameters

## When to use it

Rename a task, mark it complete, or change its assignment using the task ID.

## Example

### Complete an existing task

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.task.updateTask('task-id', { completed: true });
  console.log(result);
});
```
