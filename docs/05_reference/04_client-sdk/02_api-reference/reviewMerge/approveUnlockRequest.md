---
title: approveUnlockRequest
---

# `approveUnlockRequest`

```typescript
client.reviewMerge.approveUnlockRequest(id: string, unlockRequestId: string, data?: Record<string, unknown>): Promise<unknown>
```

Approves an unlock request, releasing the lock on a review-merge request.

The lock holder calls this to grant an unlock request from another agent.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `unlockRequestId` | `string` | Yes | The unique identifier of the unlock request to approve |
| `data` | `Record<string, unknown>` | No | Optional additional data for the approval |

## Returns

`Promise<unknown>` — A promise that resolves when the unlock request has been approved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.approveUnlockRequest('id', 'unlockRequestId');
console.log(result);
```
