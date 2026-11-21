---
title: getPending
---

# `getPending`

```typescript
client.reviewMerge.getPending(): Promise<ReviewMergeRequest[]>
```

Retrieves all pending review-merge requests.

Returns requests that are awaiting review and have not yet been approved or rejected.
Use this to build a review queue or dashboard showing outstanding work.

## Parameters

_No parameters._

## Returns

`Promise<ReviewMergeRequest[]>` — A promise that resolves to an array of pending ReviewMergeRequest objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.getPending();
console.log(result);
```
