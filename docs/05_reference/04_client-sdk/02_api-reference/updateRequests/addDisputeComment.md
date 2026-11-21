---
title: addDisputeComment
---

# `addDisputeComment`

```typescript
client.updateRequests.addDisputeComment(id: string, disputeId: string, data: AddDisputeCommentRequest): Promise<unknown>
```

Add a comment to a dispute

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `disputeId` | `string` | Yes |  |
| `data` | `AddDisputeCommentRequest` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.addDisputeComment('id', 'disputeId', /* AddDisputeCommentRequest */);
console.log(result);
```
