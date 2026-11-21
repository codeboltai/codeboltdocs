---
title: addReview
---

# `addReview`

```typescript
client.reviewMerge.addReview(id: string, data: AddReviewFeedbackRequest): Promise<unknown>
```

Adds a review or feedback to a review-merge request.

Submits review feedback (approval, rejection, or comments) from a reviewer.
Multiple reviews can be added from different reviewers.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddReviewFeedbackRequest` | Yes | The review feedback payload containing the reviewer's assessment |

## Returns

`Promise<unknown>` — A promise that resolves when the review has been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.addReview('id', /* AddReviewFeedbackRequest */);
console.log(result);
```
