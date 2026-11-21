---
title: getStatistics
---

# `getStatistics`

```typescript
client.reviewMerge.getStatistics(): Promise<ReviewMergeStatistics>
```

Retrieves aggregate statistics about review-merge requests.

Returns counts and metrics across all review states, useful for monitoring review
throughput and identifying bottlenecks in the review process.

## Parameters

_No parameters._

## Returns

`Promise<ReviewMergeStatistics>` — A promise that resolves to a ReviewMergeStatistics object with aggregate data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getStatistics();
console.log(result);
```
