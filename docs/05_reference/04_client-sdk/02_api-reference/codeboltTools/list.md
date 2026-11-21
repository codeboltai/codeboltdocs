---
title: list
---

# `list`

```typescript
client.codeboltTools.list(params?: Record<string, unknown>): Promise<CodeboltTool[]>
```

Lists all available CodeBolt tools.

Returns every registered tool in the system regardless of category or
permission. Use this for comprehensive tool discovery or to populate
tool selection interfaces.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering tools |

## Returns

`Promise<CodeboltTool[]>` — A promise that resolves to an array of CodeboltTool objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codeboltTools.list();
console.log(result);
```
