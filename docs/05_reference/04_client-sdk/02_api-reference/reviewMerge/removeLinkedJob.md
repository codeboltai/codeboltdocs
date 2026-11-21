---
title: removeLinkedJob
---

# `removeLinkedJob`

```typescript
client.reviewMerge.removeLinkedJob(id: string, jobId: string): Promise<unknown>
```

Removes a linked job from a review-merge request.

Disassociates a previously linked job from the review request.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `jobId` | `string` | Yes | The unique identifier of the job to unlink |

## Returns

`Promise<unknown>` — A promise that resolves when the job has been unlinked

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.removeLinkedJob('id', 'jobId');
console.log(result);
```
