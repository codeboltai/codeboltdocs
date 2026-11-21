---
title: create
---

# `create`

```typescript
client.mcp.create(data: McpCreateRequest): Promise<unknown>
```

Creates a new custom MCP server configuration.

Registers a custom MCP server that is not part of the standard catalog. This is useful
for connecting to proprietary or locally developed MCP-compatible services.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpCreateRequest` | Yes | The custom server creation payload |

## Returns

`Promise<unknown>` — A promise that resolves when the server has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.create(/* McpCreateRequest */);
console.log(result);
```
