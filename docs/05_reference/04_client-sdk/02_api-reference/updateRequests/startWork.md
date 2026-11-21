---
title: startWork
---

# `startWork`

```typescript
client.updateRequests.startWork(id: string): Promise<unknown>
```

Start working on a request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.startWork('id');
console.log(result);
```
