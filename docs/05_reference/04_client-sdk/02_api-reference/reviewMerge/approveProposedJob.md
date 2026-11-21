---
title: approveProposedJob
---

# `approveProposedJob`

```typescript
client.reviewMerge.approveProposedJob(id: string, proposedJobId: string, data?: Record<string, unknown>): Promise<unknown>
```

Approves a proposed job on a review-merge request.

Marks the proposed job as approved, making it eligible for conversion into an actual job.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `proposedJobId` | `string` | Yes | The unique identifier of the proposed job to approve |
| `data` | `Record<string, unknown>` | No | Optional additional data for the approval |

## Returns

`Promise<unknown>` — A promise that resolves when the proposed job has been approved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.approveProposedJob('id', 'proposedJobId');
console.log(result);
```
