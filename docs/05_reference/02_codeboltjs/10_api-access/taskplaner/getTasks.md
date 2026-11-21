---
name: getTaskList
description: Retrieves a list of tasks.
cbbaseinfo:
  description: Retrieves a list of tasks.
data:
  name: getTaskList
  category: taskplaner
  link: getTasks.md
---

# getTaskList

```text
codebolt.task.getTaskList(options?: GetTaskListOptions): Promise<ListTasksResponse>
```

Retrieves a list of tasks.

## Parameters

- `options` — Optional filters for tasks

## When to use it

Build a view of pending or completed tasks using the task list filters.

## Example

### List pending tasks

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.task.getTaskList({ status: 'pending' });
  console.log(result);
});
```
