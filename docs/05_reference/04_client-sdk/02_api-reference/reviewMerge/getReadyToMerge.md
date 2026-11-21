---
title: getReadyToMerge
---

# `getReadyToMerge`

```typescript
client.reviewMerge.getReadyToMerge(): Promise<ReviewMergeRequest[]>
```

Retrieves all review-merge requests that are approved and ready to merge.

Filters for requests that have passed all review criteria and can be merged immediately.
Useful for automated merge pipelines or merge-ready dashboards.

## Parameters

_No parameters._

## Returns

`Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of merge-ready ReviewMergeRequest objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getReadyToMerge();
console.log(result);
```
