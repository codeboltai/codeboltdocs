---
title: list
---

# `list`

```typescript
client.actionBlocks.list(params?: Record<string, unknown>): Promise<ActionBlock[]>
```

Retrieves all registered action blocks.

Returns the full list of action blocks available in the current workspace.
Use optional query parameters to paginate or filter the results.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<ActionBlock[]>` — A promise that resolves to an array of ActionBlock objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.actionBlocks.list();
console.log(result);
```
