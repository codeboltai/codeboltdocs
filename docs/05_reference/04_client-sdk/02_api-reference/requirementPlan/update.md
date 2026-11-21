---
title: update
---

# `update`

```typescript
client.requirementPlan.update(data: UpdateRequirementPlanRequest): Promise<RequirementPlan>
```

Updates an existing requirement plan.

Modifies the content, status, or structure of a requirement plan.
Use this to add new requirements, update priorities, change status,
or make other modifications as the project evolves.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateRequirementPlanRequest` | Yes | Request containing the plan updates |

## Returns

`Promise<RequirementPlan>` — A promise that resolves to the updated RequirementPlan object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.requirementPlan.update(/* UpdateRequirementPlanRequest */);
console.log(result);
```
