---
title: Planner API
---

# Planner API

Planner API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createTask`](./createTask) | Creates a new task in the planner. |
| [`createTasksFromMarkdown`](./createTasksFromMarkdown) | Bulk-creates tasks by parsing a markdown document. |
| [`deleteTask`](./deleteTask) | Deletes a planner task permanently. |
| [`exportMarkdown`](./exportMarkdown) | Exports the current planner tasks as a markdown document. |
| [`get`](./get) | Retrieves the planner overview with aggregated status information. |
| [`getAgents`](./getAgents) | Retrieves all agents registered in the planner. |
| [`getAgentTasks`](./getAgentTasks) | Retrieves all tasks assigned to a specific agent. |
| [`updateTask`](./updateTask) | Updates an existing planner task. |

## Methods

---

### `createTask`

```typescript
client.planner.createTask(data: CreatePlannerTaskRequest): Promise<PlannerTask>
```

Creates a new task in the planner.

Adds a task with a title, description, and optional agent assignment. Tasks can have
dependencies, priorities, and labels to organize complex project work.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePlannerTaskRequest` | Yes | The task creation payload |

**Returns:** `Promise<PlannerTask>` — A promise that resolves to the newly created planner task

[Full reference →](./createTask)

---

### `createTasksFromMarkdown`

```typescript
client.planner.createTasksFromMarkdown(data: CreateTasksFromMarkdownRequest): Promise<PlannerTask[]>
```

Bulk-creates tasks by parsing a markdown document.

Parses a markdown-formatted task list (using checkboxes, headings, and lists) and
creates individual planner tasks from it. This enables rapid task creation from
planning documents or specifications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateTasksFromMarkdownRequest` | Yes | The request containing the markdown content to parse |

**Returns:** `Promise<PlannerTask[]>` — A promise that resolves to an array of the newly created tasks

[Full reference →](./createTasksFromMarkdown)

---

### `deleteTask`

```typescript
client.planner.deleteTask(taskId: string): Promise<unknown>
```

Deletes a planner task permanently.

Removes a task from the planner. This action cannot be undone. Consider updating the
task status to "cancelled" instead if you want to preserve a record of the work.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the task has been deleted

[Full reference →](./deleteTask)

---

### `exportMarkdown`

```typescript
client.planner.exportMarkdown(params?: ExportMarkdownParams): Promise<unknown>
```

Exports the current planner tasks as a markdown document.

Generates a markdown-formatted representation of all tasks, organized by agent or
status. Useful for creating reports, sharing progress externally, or backing up
the current plan.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ExportMarkdownParams` | No | Optional parameters to control which tasks are exported and formatting |

**Returns:** `Promise<unknown>` — A promise that resolves to the markdown content

[Full reference →](./exportMarkdown)

---

### `get`

```typescript
client.planner.get(): Promise<PlannerOverview>
```

Retrieves the planner overview with aggregated status information.

Returns a high-level summary of the planner state including total tasks, completion
statistics, and agent utilization. Use this for dashboard views and progress monitoring.

_No parameters._

**Returns:** `Promise<PlannerOverview>` — A promise that resolves to the planner overview data

[Full reference →](./get)

---

### `getAgents`

```typescript
client.planner.getAgents(): Promise<PlannerAgent[]>
```

Retrieves all agents registered in the planner.

Returns the list of agents that have been assigned tasks or are available for task
assignment. Each agent includes its current workload and assignment information.

_No parameters._

**Returns:** `Promise<PlannerAgent[]>` — A promise that resolves to an array of planner agents

[Full reference →](./getAgents)

---

### `getAgentTasks`

```typescript
client.planner.getAgentTasks(agentId: string): Promise<PlannerTask[]>
```

Retrieves all tasks assigned to a specific agent.

Returns the task list for a given agent, allowing you to see what work is queued,
in progress, or completed for that agent.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent whose tasks to retrieve |

**Returns:** `Promise<PlannerTask[]>` — A promise that resolves to an array of tasks assigned to the agent

[Full reference →](./getAgentTasks)

---

### `updateTask`

```typescript
client.planner.updateTask(taskId: string, data: UpdatePlannerTaskRequest): Promise<PlannerTask>
```

Updates an existing planner task.

Modifies task properties such as status, assignment, priority, or description.
Use this to transition tasks through their lifecycle (e.g., pending to in-progress
to completed).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to update |
| `data` | `UpdatePlannerTaskRequest` | Yes | The fields to update on the task |

**Returns:** `Promise<PlannerTask>` — A promise that resolves to the updated planner task

[Full reference →](./updateTask)

