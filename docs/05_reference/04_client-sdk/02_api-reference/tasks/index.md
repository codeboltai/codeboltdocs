---
title: Tasks API
---

# Tasks API

Tasks API - task management

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addChild`](./addChild) | Adds a child task to an existing parent task. |
| [`addMessage`](./addMessage) | Adds a message to a task's message thread. |
| [`create`](./create) | Creates a new task in the system. |
| [`delete`](./delete) | Permanently deletes a task from the system. |
| [`deleteCompletedTasks`](./deleteCompletedTasks) | Deletes all completed tasks across all projects. |
| [`deleteProjectCompletedTasks`](./deleteProjectCompletedTasks) | Deletes all completed tasks for a specific project. |
| [`get`](./get) | Retrieves a specific task by its unique identifier. |
| [`getChildren`](./getChildren) | Retrieves all child tasks of a parent task. |
| [`getForCurrentProject`](./getForCurrentProject) | Retrieves all tasks associated with the current project. |
| [`getForProject`](./getForProject) | Retrieves all tasks for a specific project path. |
| [`getHierarchy`](./getHierarchy) | Retrieves the complete hierarchy for a task. |
| [`getProjectStatistics`](./getProjectStatistics) | Retrieves statistics for tasks in the current project. |
| [`getStatistics`](./getStatistics) | Retrieves overall task statistics across all projects. |
| [`healthCheck`](./healthCheck) | Performs a health check on the task service. |
| [`markCompleted`](./markCompleted) | Marks a task as completed. |
| [`markFailed`](./markFailed) | Marks a task as failed. |
| [`markInProgress`](./markInProgress) | Marks a task as in-progress. |
| [`search`](./search) | Searches for tasks using optional query parameters. |
| [`update`](./update) | Updates an existing task with new information. |

## Methods

---

### `addChild`

```typescript
client.tasks.addChild(taskId: string, data: CreateTaskRequest): Promise<Task>
```

Adds a child task to an existing parent task.

Creates a new task as a child of the specified parent task, establishing
a hierarchical relationship. Child tasks represent subtasks or components
that contribute to completing the parent task. Returns the new child task.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the parent task |
| `data` | `CreateTaskRequest` | Yes | The child task creation request |

**Returns:** `Promise<Task>` — A promise that resolves to the newly created child Task object

[Full reference →](./addChild)

---

### `addMessage`

```typescript
client.tasks.addMessage(taskId: string, data: AddTaskMessageRequest): Promise<TaskMessage>
```

Adds a message to a task's message thread.

Appends a new message to the task's communication thread. Messages
can be used for notes, comments, status updates, or other
communication related to the task. Returns the created message.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to add the message to |
| `data` | `AddTaskMessageRequest` | Yes | The message creation request |

**Returns:** `Promise<TaskMessage>` — A promise that resolves to the created TaskMessage object

[Full reference →](./addMessage)

---

### `create`

```typescript
client.tasks.create(data: CreateTaskRequest): Promise<Task>
```

Creates a new task in the system.

Creates a new task with the provided configuration. The task can be
a standalone unit of work or can later have child tasks added to create
a task hierarchy. Returns the created task with its generated ID.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTaskRequest` | Yes | The task creation request containing task properties |

**Returns:** `Promise<Task>` — A promise that resolves to the newly created Task object

[Full reference →](./create)

---

### `delete`

```typescript
client.tasks.delete(taskId: string): Promise<void>
```

Permanently deletes a task from the system.

Removes the specified task and all its associated data. If the task
has child tasks, they may be affected depending on system configuration.
This operation cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to delete |

**Returns:** `Promise<void>` — A promise that resolves when the task has been deleted

[Full reference →](./delete)

---

### `deleteCompletedTasks`

```typescript
client.tasks.deleteCompletedTasks(): Promise<void>
```

Deletes all completed tasks across all projects.

Removes every task with 'completed' status in the entire system.
This is a global cleanup operation that affects all projects.
Use with caution as this operation cannot be undone.

_No parameters._

**Returns:** `Promise<void>` — A promise that resolves when all completed tasks have been deleted

[Full reference →](./deleteCompletedTasks)

---

### `deleteProjectCompletedTasks`

```typescript
client.tasks.deleteProjectCompletedTasks(projectPath: string): Promise<void>
```

Deletes all completed tasks for a specific project.

Removes all tasks with 'completed' status that belong to the specified
project. Use this for cleanup operations to maintain a lean task
history. This operation cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectPath` | `string` | Yes | The filesystem path identifying the target project |

**Returns:** `Promise<void>` — A promise that resolves when the completed tasks have been deleted

[Full reference →](./deleteProjectCompletedTasks)

---

### `get`

```typescript
client.tasks.get(taskId: string): Promise<Task>
```

Retrieves a specific task by its unique identifier.

Returns the complete task object including all properties, metadata,
and relationships. Use this to get full task details after a search or
when you need the complete task representation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to retrieve |

**Returns:** `Promise<Task>` — A promise that resolves to the Task object with the specified ID

[Full reference →](./get)

---

### `getChildren`

```typescript
client.tasks.getChildren(taskId: string): Promise<Task[]>
```

Retrieves all child tasks of a parent task.

Returns all tasks that have been added as children of the specified
parent task. This provides access to the task's subtasks and allows
for navigation of the task hierarchy.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the parent task |

**Returns:** `Promise<Task[]>` — A promise that resolves to an array of child Task objects

[Full reference →](./getChildren)

---

### `getForCurrentProject`

```typescript
client.tasks.getForCurrentProject(): Promise<Task[]>
```

Retrieves all tasks associated with the current project.

Returns tasks that belong to the currently active project context.
This is useful for project-specific task views and when you need to
operate on tasks within the current working project.

_No parameters._

**Returns:** `Promise<Task[]>` — A promise that resolves to an array of Task objects for the current project

[Full reference →](./getForCurrentProject)

---

### `getForProject`

```typescript
client.tasks.getForProject(projectPath: string): Promise<Task[]>
```

Retrieves all tasks for a specific project path.

Returns tasks that belong to the project identified by its filesystem
path. This allows accessing tasks from any project regardless of the
current working directory context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `projectPath` | `string` | Yes | The filesystem path identifying the target project |

**Returns:** `Promise<Task[]>` — A promise that resolves to an array of Task objects for the specified project

[Full reference →](./getForProject)

---

### `getHierarchy`

```typescript
client.tasks.getHierarchy(taskId: string): Promise<TaskHierarchy>
```

Retrieves the complete hierarchy for a task.

Returns a hierarchical tree representation starting from the specified
task, including all descendants and their relationships. This provides
a complete view of the task's entire subtree for visualization or
comprehensive analysis.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the root task |

**Returns:** `Promise<TaskHierarchy>` — A promise that resolves to a TaskHierarchy object containing the full tree structure

[Full reference →](./getHierarchy)

---

### `getProjectStatistics`

```typescript
client.tasks.getProjectStatistics(): Promise<TaskStatistics>
```

Retrieves statistics for tasks in the current project.

Returns aggregated statistics specific to the current project context,
including task counts by status, priority distribution, and other
project-specific metrics. Ideal for project dashboards.

_No parameters._

**Returns:** `Promise<TaskStatistics>` — A promise that resolves to TaskStatistics for the current project

[Full reference →](./getProjectStatistics)

---

### `getStatistics`

```typescript
client.tasks.getStatistics(): Promise<TaskStatistics>
```

Retrieves overall task statistics across all projects.

Returns aggregated statistics including total task counts, status
distribution, and other metrics. Use this for dashboard displays or
high-level reporting on task activity across the entire platform.

_No parameters._

**Returns:** `Promise<TaskStatistics>` — A promise that resolves to TaskStatistics containing overview metrics

[Full reference →](./getStatistics)

---

### `healthCheck`

```typescript
client.tasks.healthCheck(): Promise<object>
```

Performs a health check on the task service.

Verifies that the task management service is operational and responding.
Use this to monitor service availability or for health monitoring in
production environments.

_No parameters._

**Returns:** `Promise<object>` — A promise that resolves to an object containing the service status

[Full reference →](./healthCheck)

---

### `markCompleted`

```typescript
client.tasks.markCompleted(taskId: string): Promise<Task>
```

Marks a task as completed.

Updates the task's status to indicate that all work has been finished.
This is typically called when a task's objectives have been fully
achieved. Returns the updated task object.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to mark as completed |

**Returns:** `Promise<Task>` — A promise that resolves to the updated Task object with completed status

[Full reference →](./markCompleted)

---

### `markFailed`

```typescript
client.tasks.markFailed(taskId: string): Promise<Task>
```

Marks a task as failed.

Updates the task's status to indicate that the task could not be
completed successfully. This is typically called when errors occur or
when task objectives cannot be achieved. Returns the updated task object.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to mark as failed |

**Returns:** `Promise<Task>` — A promise that resolves to the updated Task object with failed status

[Full reference →](./markFailed)

---

### `markInProgress`

```typescript
client.tasks.markInProgress(taskId: string): Promise<Task>
```

Marks a task as in-progress.

Updates the task's status to indicate that work has begun on it.
This is typically called when a task is being actively worked on.
Returns the updated task object.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to mark as in-progress |

**Returns:** `Promise<Task>` — A promise that resolves to the updated Task object with in-progress status

[Full reference →](./markInProgress)

---

### `search`

```typescript
client.tasks.search(params?: TaskSearchParams): Promise<Task[]>
```

Searches for tasks using optional query parameters.

Returns tasks that match the specified search criteria. Use this method
to find tasks by various attributes including status, priority, date
ranges, or custom filters. Returns an empty array if no tasks match.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `TaskSearchParams` | No | Optional search parameters for filtering and sorting tasks |

**Returns:** `Promise<Task[]>` — A promise that resolves to an array of matching Task objects

[Full reference →](./search)

---

### `update`

```typescript
client.tasks.update(taskId: string, data: UpdateTaskRequest): Promise<Task>
```

Updates an existing task with new information.

Modifies the specified task with the provided updates. Only the
fields included in the request will be modified; other fields remain
unchanged. Returns the updated task object.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to update |
| `data` | `UpdateTaskRequest` | Yes | The update request containing fields to modify |

**Returns:** `Promise<Task>` — A promise that resolves to the updated Task object

[Full reference →](./update)

