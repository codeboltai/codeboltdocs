---
title: removePheromone
---

# `removePheromone`

```typescript
client.reviewMerge.removePheromone(id: string, type: string): Promise<unknown>
```

Removes a pheromone tag from a review-merge request.

Detaches a previously added pheromone by its type string from the review request.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `type` | `string` | Yes | The pheromone type string to remove |

## Returns

`Promise<unknown>` — A promise that resolves when the pheromone has been removed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.removePheromone('id', 'type');
console.log(result);
```
