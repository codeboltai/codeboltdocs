---
title: unlock
---

# `unlock`

```typescript
client.reviewMerge.unlock(id: string, data?: UnlockReviewRequest): Promise<unknown>
```

Unlocks a previously locked review-merge request.

Releases the lock on a review request, allowing other agents to modify it again.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request to unlock |
| `data` | `UnlockReviewRequest` | No | Optional unlock parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the lock has been released

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.unlock('id');
console.log(result);
```
