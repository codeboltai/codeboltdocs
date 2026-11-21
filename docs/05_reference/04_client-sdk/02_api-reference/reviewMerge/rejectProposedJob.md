---
title: rejectProposedJob
---

# `rejectProposedJob`

```typescript
client.reviewMerge.rejectProposedJob(id: string, proposedJobId: string, data?: Record<string, unknown>): Promise<unknown>
```

Rejects a proposed job on a review-merge request.

Marks the proposed job as rejected, preventing it from being converted into an actual job.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `proposedJobId` | `string` | Yes | The unique identifier of the proposed job to reject |
| `data` | `Record<string, unknown>` | No | Optional additional data such as rejection reason |

## Returns

`Promise<unknown>` — A promise that resolves when the proposed job has been rejected

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.rejectProposedJob('id', 'proposedJobId');
console.log(result);
```
