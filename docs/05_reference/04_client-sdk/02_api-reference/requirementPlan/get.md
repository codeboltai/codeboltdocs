---
title: get
---

# `get`

```typescript
client.requirementPlan.get(params?: GetRequirementPlanParams): Promise<RequirementPlan>
```

Retrieves a requirement plan based on query parameters.

Returns the plan matching the specified criteria, typically by project
ID or plan name. If multiple plans match, the most relevant one is returned.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetRequirementPlanParams` | No | Query parameters to identify the plan |

## Returns

`Promise<RequirementPlan>` — A promise that resolves to the RequirementPlan object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.requirementPlan.get();
console.log(result);
```
