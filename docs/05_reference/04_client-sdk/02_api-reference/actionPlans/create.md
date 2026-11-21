---
title: create
---

# `create`

```typescript
client.actionPlans.create(data: CreateActionPlanRequest): Promise<ActionPlan>
```

Creates a new action plan.

Defines a new structured workflow plan that can be populated with tasks
and executed by agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateActionPlanRequest` | Yes | The creation payload for the new action plan |

## Returns

`Promise<ActionPlan>` — A promise that resolves to the newly created ActionPlan

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionPlans.create(/* CreateActionPlanRequest */);
console.log(result);
```
