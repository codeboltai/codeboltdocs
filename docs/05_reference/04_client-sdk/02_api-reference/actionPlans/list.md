---
title: list
---

# `list`

```typescript
client.actionPlans.list(params?: Record<string, unknown>): Promise<ActionPlan[]>
```

Retrieves all action plans.

Returns every action plan in the system. Use optional query parameters
to paginate or filter the results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<ActionPlan[]>` — A promise that resolves to an array of ActionPlan objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionPlans.list();
console.log(result);
```
