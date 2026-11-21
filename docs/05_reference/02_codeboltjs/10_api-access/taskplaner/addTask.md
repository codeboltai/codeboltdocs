---
name: createTask
description: Creates a new task.
cbbaseinfo:
  description: Creates a new task.
data:
  name: createTask
  category: taskplaner
  link: addTask.md
---

# createTask

```text
codebolt.task.createTask(options: CreateTaskOptions): Promise<CreateTaskResponse>
```

Creates a new task.

## Parameters

- `options` — The task creation parameters

## When to use it

Create a work item associated with a thread when its progress should be visible separately from the chat.

## Example

### Create a task for the current thread

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async () => {
  const threadId = codebolt.userMessage.getThreadId();
  if (!threadId) return;

  const result = await codebolt.task.createTask({ threadId, name: 'Review the README' });
  console.log(result);
});
```
