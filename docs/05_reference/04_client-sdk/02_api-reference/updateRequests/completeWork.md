---
title: completeWork
---

# `completeWork`

```typescript
client.updateRequests.completeWork(id: string, data?: CompleteWorkRequest): Promise<unknown>
```

Complete work on a request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `CompleteWorkRequest` | No |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.completeWork('id');
console.log(result);
```
