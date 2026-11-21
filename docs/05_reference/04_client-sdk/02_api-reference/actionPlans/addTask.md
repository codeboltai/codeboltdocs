---
title: addTask
---

# `addTask`

```typescript
client.actionPlans.addTask(planId: string, data: AddActionPlanTaskRequest): Promise<unknown>
```

Adds a task to an existing action plan.

Appends a new task to the plan's task list. Tasks represent individual
steps that need to be completed as part of the overall plan.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan |
| `data` | `AddActionPlanTaskRequest` | Yes | The task definition to add to the plan |

## Returns

`Promise<unknown>` — A promise that resolves when the task has been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionPlans.addTask('planId', /* AddActionPlanTaskRequest */);
console.log(result);
```
