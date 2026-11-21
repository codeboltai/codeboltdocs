---
title: get
---

# `get`

```typescript
client.reviewMerge.get(id: string): Promise<ReviewMergeRequest>
```

Retrieves a specific review-merge request by its ID.

Fetches the full details of a single review-merge request including its current
status, reviews, pheromones, and linked jobs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |

## Returns

`Promise<ReviewMergeRequest>` — A promise that resolves to the ReviewMergeRequest object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.get('id');
console.log(result);
```
