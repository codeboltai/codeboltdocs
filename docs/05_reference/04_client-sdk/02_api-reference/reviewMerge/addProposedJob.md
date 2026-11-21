---
title: addProposedJob
---

# `addProposedJob`

```typescript
client.reviewMerge.addProposedJob(id: string, data: AddProposedJobRequest): Promise<unknown>
```

Adds a proposed job to a review-merge request.

Proposed jobs are suggested work items that arise from the review process. They must
be approved before being converted into actual jobs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddProposedJobRequest` | Yes | The proposed job details |

## Returns

`Promise<unknown>` — A promise that resolves when the proposed job has been added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.addProposedJob('id', /* AddProposedJobRequest */);
console.log(result);
```
