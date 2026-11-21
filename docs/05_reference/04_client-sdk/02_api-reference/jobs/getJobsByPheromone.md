---
title: getJobsByPheromone
---

# `getJobsByPheromone`

```typescript
client.jobs.getJobsByPheromone(type: string): Promise<Job[]>
```

Retrieves all jobs that have a specific pheromone type attached.

Useful for finding jobs that share a common signal, enabling
swarm-style discovery of related work items.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | `string` | Yes | The pheromone type name to filter by |

## Returns

`Promise<Job[]>` — A promise that resolves to an array of  objects carrying the specified pheromone

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getJobsByPheromone('type');
console.log(result);
```
