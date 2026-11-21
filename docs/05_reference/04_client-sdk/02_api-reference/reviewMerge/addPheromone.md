---
title: addPheromone
---

# `addPheromone`

```typescript
client.reviewMerge.addPheromone(id: string, data: AddPheromoneRequest): Promise<unknown>
```

Adds a pheromone tag to a review-merge request.

Pheromones are metadata signals used for inter-agent communication. Adding a pheromone
allows agents to tag reviews with contextual information that other agents can detect.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddPheromoneRequest` | Yes | The pheromone data to attach |

## Returns

`Promise<unknown>` — A promise that resolves when the pheromone has been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.addPheromone('id', /* AddPheromoneRequest */);
console.log(result);
```
