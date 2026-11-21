---
title: create
---

# `create`

```typescript
client.requirementPlan.create(data: CreateRequirementPlanRequest): Promise<RequirementPlan>
```

Creates a new requirement plan.

Registers a new requirement plan with the system using the provided
specification. The plan can include project goals, feature lists,
acceptance criteria, and other requirement documentation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateRequirementPlanRequest` | Yes | Request containing the plan details |

## Returns

`Promise<RequirementPlan>` — A promise that resolves to the created RequirementPlan object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.requirementPlan.create(/* CreateRequirementPlanRequest */);
console.log(result);
```
