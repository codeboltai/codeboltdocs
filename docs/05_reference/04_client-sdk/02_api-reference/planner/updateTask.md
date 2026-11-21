---
title: updateTask
---

# `updateTask`

```typescript
client.planner.updateTask(taskId: string, data: UpdatePlannerTaskRequest): Promise<PlannerTask>
```

Updates an existing planner task.

Modifies task properties such as status, assignment, priority, or description.
Use this to transition tasks through their lifecycle (e.g., pending to in-progress
to completed).

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `taskId` | `string` | Yes | The unique identifier of the task to update |
| `data` | `UpdatePlannerTaskRequest` | Yes | The fields to update on the task |

## Returns

`Promise<PlannerTask>` — A promise that resolves to the updated planner task

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.updateTask('taskId', /* UpdatePlannerTaskRequest */);
console.log(result);
```
