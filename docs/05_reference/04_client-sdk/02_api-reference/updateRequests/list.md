---
title: list
---

# `list`

```typescript
client.updateRequests.list(params?: Record<string, unknown>): Promise<UpdateRequest[]>
```

List all update requests

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No |  |

## Returns

`Promise<UpdateRequest[]>`

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.updateRequests.list();
console.log(result);
```
