---
title: list
---

# `list`

```typescript
client.hooks.list(params?: Record<string, unknown>): Promise<Hook[]>
```

Lists all registered hooks.

Returns every hook in the system, including both enabled and disabled
hooks. Use optional parameters to filter or paginate the results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<Hook[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.list();
console.log(result);
```
