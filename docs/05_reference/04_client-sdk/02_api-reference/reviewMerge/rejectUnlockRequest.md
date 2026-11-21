---
title: rejectUnlockRequest
---

# `rejectUnlockRequest`

```typescript
client.reviewMerge.rejectUnlockRequest(id: string, unlockRequestId: string, data?: Record<string, unknown>): Promise<unknown>
```

Rejects an unlock request, keeping the review-merge request locked.

The lock holder calls this to deny an unlock request from another agent.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the review-merge request |
| `unlockRequestId` | `string` | Yes | The unique identifier of the unlock request to reject |
| `data` | `Record<string, unknown>` | No | Optional additional data such as rejection reason |

## Returns

`Promise<unknown>` — A promise that resolves when the unlock request has been rejected

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.reviewMerge.rejectUnlockRequest('id', 'unlockRequestId');
console.log(result);
```
