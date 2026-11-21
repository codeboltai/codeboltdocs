---
sidebar_label: Tasks
---

# Tasks

Create, assign, execute, and inspect tasks.

Use the task ID returned by the task service to retrieve, update, assign, or run a task.

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

## SDK methods

### createTask

[`createTask`](addTask.md) · Creates a new task.

### updateTask

[`updateTask`](updateTask.md) · Updates an existing task.

### deleteTask

Deletes a task.

```text
codebolt.task.deleteTask(taskId: string): Promise<DeleteTaskResponse>
```

### getTaskList

[`getTaskList`](getTasks.md) · Retrieves a list of tasks.

### getTaskDetail

Retrieves detailed information about a specific task.

```text
codebolt.task.getTaskDetail(options: GetTaskDetailOptions): Promise<GetTaskResponse>
```

### assignAgentToTask

Assigns an agent to a task.

```text
codebolt.task.assignAgentToTask(taskId: string, agentId: string): Promise<UpdateTaskResponse>
```

### executeTaskWithAgent

Executes a task with a specific agent.

```text
codebolt.task.executeTaskWithAgent(taskId: string, agentId: string): Promise<StartTaskWithAgentResponse>
```

### getTaskStatus

Gets the status of a task.

```text
codebolt.task.getTaskStatus(taskId: string): Promise<string | undefined>
```

### getTaskSummary

Gets the summary (description) of a task.

```text
codebolt.task.getTaskSummary(taskId: string): Promise<string | undefined>
```
