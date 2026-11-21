---
title: get
---

# `get`

```typescript
client.actionPlans.get(planId: string): Promise<ActionPlan>
```

Retrieves a specific action plan by its ID.

Returns the full action plan including its tasks, status, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan |

## Returns

`Promise<ActionPlan>` — A promise that resolves to the ActionPlan object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionPlans.get('planId');
console.log(result);
```
