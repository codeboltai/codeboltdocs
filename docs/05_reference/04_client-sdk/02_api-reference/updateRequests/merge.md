---
title: merge
---

# `merge`

```typescript
client.updateRequests.merge(id: string, data?: MergeUpdateRequestRequest): Promise<unknown>
```

Merge a request into project structure

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `MergeUpdateRequestRequest` | No |  |

## Returns

`Promise<unknown>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.merge('id');
console.log(result);
```
