---
title: convertProposedJob
---

# `convertProposedJob`

```typescript
client.reviewMerge.convertProposedJob(id: string, proposedJobId: string, data?: Record<string, unknown>): Promise<unknown>
```

Converts an approved proposed job into an actual job.

Takes a previously approved proposed job and creates a real job from it. The proposed
job must have been approved before conversion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `proposedJobId` | `string` | Yes | The unique identifier of the approved proposed job to convert |
| `data` | `Record<string, unknown>` | No | Optional additional data for the conversion |

## Returns

`Promise<unknown>` — A promise that resolves when the proposed job has been converted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.convertProposedJob('id', 'proposedJobId');
console.log(result);
```
