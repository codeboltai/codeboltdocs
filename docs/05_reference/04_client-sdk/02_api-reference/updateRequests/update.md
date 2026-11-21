---
title: update
---

# `update`

```typescript
client.updateRequests.update(id: string, data: UpdateUpdateRequestRequest): Promise<UpdateRequest>
```

Update an existing request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |
| `data` | `UpdateUpdateRequestRequest` | Yes |  |

## Returns

`Promise<UpdateRequest>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.update('id', /* UpdateUpdateRequestRequest */);
console.log(result);
```
