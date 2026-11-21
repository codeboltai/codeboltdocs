---
title: update
---

# `update`

```typescript
client.actionPlans.update(planId: string, data: UpdateActionPlanRequest): Promise<ActionPlan>
```

Updates an existing action plan.

Modifies the properties of an action plan such as its name, description,
or status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan to update |
| `data` | `UpdateActionPlanRequest` | Yes | The fields to update on the action plan |

## Returns

`Promise<ActionPlan>` — A promise that resolves to the updated ActionPlan

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionPlans.update('planId', /* UpdateActionPlanRequest */);
console.log(result);
```
