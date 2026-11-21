---
title: createTask
---

# `createTask`

```typescript
client.planner.createTask(data: CreatePlannerTaskRequest): Promise<PlannerTask>
```

Creates a new task in the planner.

Adds a task with a title, description, and optional agent assignment. Tasks can have
dependencies, priorities, and labels to organize complex project work.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePlannerTaskRequest` | Yes | The task creation payload |

## Returns

`Promise<PlannerTask>` — A promise that resolves to the newly created planner task

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.planner.createTask(/* CreatePlannerTaskRequest */);
console.log(result);
```
