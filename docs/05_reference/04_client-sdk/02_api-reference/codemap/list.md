---
title: list
---

# `list`

```typescript
client.codemap.list(params?: Record<string, unknown>): Promise<Codemap[]>
```

Lists all codemaps.

Returns every codemap that has been generated in the current workspace.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<Codemap[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codemap.list();
console.log(result);
```
