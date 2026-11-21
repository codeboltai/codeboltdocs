---
title: addPheromone
---

# `addPheromone`

```typescript
client.jobs.addPheromone(id: string, data: PheromoneDepositRequest): Promise<Pheromone>
```

Deposits a pheromone signal on a job.

Attaches a pheromone of the specified type to the job, which other
agents can detect and use for coordination decisions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |
| `data` | `PheromoneDepositRequest` | Yes | Pheromone deposit payload including type and value |

## Returns

`Promise<Pheromone>` — A promise that resolves to the created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.addPheromone('id', /* PheromoneDepositRequest */);
console.log(result);
```
