---
title: create
---

# `create`

```typescript
client.reviewMerge.create(data: CreateReviewMergeRequest): Promise<ReviewMergeRequest>
```

Creates a new review-merge request.

Initiates a review workflow for a set of changes. The request will enter the pending
state and can be reviewed, locked, and eventually merged.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateReviewMergeRequest` | Yes | The review-merge request creation payload |

## Returns

`Promise<ReviewMergeRequest>` — A promise that resolves to the newly created ReviewMergeRequest

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.create(/* CreateReviewMergeRequest */);
console.log(result);
```
