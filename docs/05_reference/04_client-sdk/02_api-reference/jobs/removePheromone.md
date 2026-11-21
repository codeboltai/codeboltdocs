---
title: removePheromone
---

# `removePheromone`

```typescript
client.jobs.removePheromone(id: string, type: string): Promise<void>
```

Removes a pheromone of a specific type from a job.

Clears the pheromone signal, which may affect coordination behavior
of agents that rely on its presence.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |
| `type` | `string` | Yes | The pheromone type name to remove |

## Returns

`Promise<void>` — A promise that resolves when the pheromone has been removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.removePheromone('id', 'type');
console.log(result);
```
