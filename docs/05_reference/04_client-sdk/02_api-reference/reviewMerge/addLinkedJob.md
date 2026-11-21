---
title: addLinkedJob
---

# `addLinkedJob`

```typescript
client.reviewMerge.addLinkedJob(id: string, data: AddLinkedJobRequest): Promise<unknown>
```

Links an existing job to a review-merge request.

Associates a job with this review so that changes from the job are tracked as part
of the review workflow.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `data` | `AddLinkedJobRequest` | Yes | The linked job details including the job ID to associate |

## Returns

`Promise<unknown>` — A promise that resolves when the job has been linked

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.addLinkedJob('id', /* AddLinkedJobRequest */);
console.log(result);
```
