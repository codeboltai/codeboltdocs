---
title: removeDependency
---

# `removeDependency`

```typescript
client.jobs.removeDependency(id: string, targetId: string): Promise<void>
```

Removes a dependency from a job.

Detaches the dependency link between the job and its target, which
may unblock the job if this was its only remaining dependency.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the dependent job |
| `targetId` | `string` | Yes | The unique identifier of the dependency target to remove |

## Returns

`Promise<void>` — A promise that resolves when the dependency has been removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.removeDependency('id', 'targetId');
console.log(result);
```
