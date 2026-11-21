---
title: ActionPlans API
---

# ActionPlans API

Action Plans API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addTask`](./addTask) | Adds a task to an existing action plan. |
| [`create`](./create) | Creates a new action plan. |
| [`delete`](./delete) | Deletes an action plan. |
| [`get`](./get) | Retrieves a specific action plan by its ID. |
| [`list`](./list) | Retrieves all action plans. |
| [`update`](./update) | Updates an existing action plan. |

## Methods

---

### `addTask`

```typescript
client.actionPlans.addTask(planId: string, data: AddActionPlanTaskRequest): Promise<unknown>
```

Adds a task to an existing action plan.

Appends a new task to the plan's task list. Tasks represent individual
steps that need to be completed as part of the overall plan.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan |
| `data` | `AddActionPlanTaskRequest` | Yes | The task definition to add to the plan |

**Returns:** `Promise<unknown>` — A promise that resolves when the task has been added

[Full reference →](./addTask)

---

### `create`

```typescript
client.actionPlans.create(data: CreateActionPlanRequest): Promise<ActionPlan>
```

Creates a new action plan.

Defines a new structured workflow plan that can be populated with tasks
and executed by agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateActionPlanRequest` | Yes | The creation payload for the new action plan |

**Returns:** `Promise<ActionPlan>` — A promise that resolves to the newly created ActionPlan

[Full reference →](./create)

---

### `delete`

```typescript
client.actionPlans.delete(planId: string): Promise<unknown>
```

Deletes an action plan.

Permanently removes the specified action plan and all its associated tasks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the plan has been deleted

[Full reference →](./delete)

---

### `get`

```typescript
client.actionPlans.get(planId: string): Promise<ActionPlan>
```

Retrieves a specific action plan by its ID.

Returns the full action plan including its tasks, status, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan |

**Returns:** `Promise<ActionPlan>` — A promise that resolves to the ActionPlan object

[Full reference →](./get)

---

### `list`

```typescript
client.actionPlans.list(params?: Record<string, unknown>): Promise<ActionPlan[]>
```

Retrieves all action plans.

Returns every action plan in the system. Use optional query parameters
to paginate or filter the results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<ActionPlan[]>` — A promise that resolves to an array of ActionPlan objects

[Full reference →](./list)

---

### `update`

```typescript
client.actionPlans.update(planId: string, data: UpdateActionPlanRequest): Promise<ActionPlan>
```

Updates an existing action plan.

Modifies the properties of an action plan such as its name, description,
or status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan to update |
| `data` | `UpdateActionPlanRequest` | Yes | The fields to update on the action plan |

**Returns:** `Promise<ActionPlan>` — A promise that resolves to the updated ActionPlan

[Full reference →](./update)

