---
title: getPheromones
---

# `getPheromones`

```typescript
client.jobs.getPheromones(id: string): Promise<Pheromone[]>
```

Retrieves all pheromones attached to a specific job.

Returns the list of pheromone signals that have been deposited on the
job by agents, useful for understanding the job's coordination state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |

## Returns

`Promise<Pheromone[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getPheromones('id');
console.log(result);
```
