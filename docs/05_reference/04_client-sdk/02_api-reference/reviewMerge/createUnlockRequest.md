---
title: createUnlockRequest
---

# `createUnlockRequest`

```typescript
client.reviewMerge.createUnlockRequest(id: string, data: CreateUnlockRequest): Promise<unknown>
```

Creates an unlock request for a locked review-merge request.

When a review is locked by another agent, this creates a formal request to unlock it.
The lock holder can then approve or reject the unlock request.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the locked review-merge request |
| `data` | `CreateUnlockRequest` | Yes | The unlock request payload with reason and requester information |

## Returns

`Promise<unknown>` — A promise that resolves when the unlock request has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.createUnlockRequest('id', /* CreateUnlockRequest */);
console.log(result);
```
