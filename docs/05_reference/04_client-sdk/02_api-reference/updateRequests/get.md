---
title: get
---

# `get`

```typescript
client.updateRequests.get(id: string): Promise<UpdateRequest>
```

Get a single update request

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes |  |

## Returns

`Promise<UpdateRequest>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.get('id');
console.log(result);
```
