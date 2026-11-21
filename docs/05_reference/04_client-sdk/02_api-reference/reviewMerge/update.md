---
title: update
---

# `update`

```typescript
client.reviewMerge.update(id: string, data: UpdateReviewMergeRequest): Promise<ReviewMergeRequest>
```

Updates an existing review-merge request.

Modifies the mutable fields of a review-merge request such as title, description,
or other metadata. Does not change the review status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to update |
| `data` | `UpdateReviewMergeRequest` | Yes | The fields to update |

## Returns

`Promise<ReviewMergeRequest>` — A promise that resolves to the updated ReviewMergeRequest

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.update('id', /* UpdateReviewMergeRequest */);
console.log(result);
```
