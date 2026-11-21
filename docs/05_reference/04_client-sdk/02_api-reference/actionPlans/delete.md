---
title: delete
---

# `delete`

```typescript
client.actionPlans.delete(planId: string): Promise<unknown>
```

Deletes an action plan.

Permanently removes the specified action plan and all its associated tasks.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `planId` | `string` | Yes | The unique identifier of the action plan to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the plan has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionPlans.delete('planId');
console.log(result);
```
