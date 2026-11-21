---
title: resolveDispute
---

# `resolveDispute`

```typescript
client.updateRequests.resolveDispute(id: string, disputeId: string, data: ResolveDisputeRequest): Promise<unknown>
```

Resolve a dispute

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `disputeId` | `string` | Yes |  |
| `data` | `ResolveDisputeRequest` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.resolveDispute('id', 'disputeId', /* ResolveDisputeRequest */);
console.log(result);
```
