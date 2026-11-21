---
title: submit
---

# `submit`

```typescript
client.updateRequests.submit(id: string): Promise<unknown>
```

Submit a request for review

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

const result = await client.updateRequests.submit('id');
console.log(result);
```
