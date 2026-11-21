---
title: updateStatus
---

# `updateStatus`

```typescript
client.reviewMerge.updateStatus(id: string, data: UpdateReviewStatusRequest): Promise<unknown>
```

Updates the status of a review-merge request.

Transitions the request to a new review status (e.g., approved, rejected, needs-changes).
This is the primary mechanism for progressing a request through the review workflow.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `UpdateReviewStatusRequest` | Yes | The status update payload containing the new status |

## Returns

`Promise<unknown>` — A promise that resolves when the status has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.updateStatus('id', /* UpdateReviewStatusRequest */);
console.log(result);
```
