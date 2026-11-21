---
title: getAggregatedPheromones
---

# `getAggregatedPheromones`

```typescript
client.jobs.getAggregatedPheromones(id: string): Promise<Record<string, unknown>>
```

Retrieves aggregated pheromone data for a job.

Returns a summary of all pheromone signals on the job, grouped and
aggregated by type. Useful for dashboards and high-level status views.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the job |

## Returns

`Promise<Record<string, unknown>>` — A promise that resolves to a record of aggregated pheromone data keyed by type

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.jobs.getAggregatedPheromones('id');
console.log(result);
```
