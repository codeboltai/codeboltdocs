---
title: lock
---

# `lock`

```typescript
client.reviewMerge.lock(id: string, data?: LockReviewRequest): Promise<unknown>
```

Locks a review-merge request to prevent concurrent modifications.

Acquiring a lock ensures exclusive access while performing operations on the request.
Other agents attempting to modify a locked request will be blocked.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to lock |
| `data` | `LockReviewRequest` | No | Optional lock configuration parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the lock has been acquired

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.lock('id');
console.log(result);
```
