---
title: delete
---

# `delete`

```typescript
client.updateRequests.delete(id: string): Promise<unknown>
```

Delete an update request

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

const result = await client.updateRequests.delete('id');
console.log(result);
```
