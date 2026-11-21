---
title: addDispute
---

# `addDispute`

```typescript
client.updateRequests.addDispute(id: string, data: AddDisputeRequest): Promise<unknown>
```

Add a dispute to a request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `AddDisputeRequest` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.addDispute('id', /* AddDisputeRequest */);
console.log(result);
```
