---
title: merge
---

# `merge`

```typescript
client.reviewMerge.merge(id: string, data?: MergeReviewRequest): Promise<unknown>
```

Merges an approved review-merge request.

Executes the final merge operation on a review that has been approved and is ready
to merge. This applies the associated changes to the target branch or codebase.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to merge |
| `data` | `MergeReviewRequest` | No | Optional merge configuration parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the merge is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.merge('id');
console.log(result);
```
