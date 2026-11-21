---
title: configure
---

# `configure`

```typescript
client.mcp.configure(data: McpConfigureRequest): Promise<unknown>
```

Applies global MCP configuration settings.

Updates the workspace-level MCP settings that affect how all MCP servers are managed,
including default timeout values, transport preferences, and security policies.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpConfigureRequest` | Yes | The global MCP configuration to apply |

## Returns

`Promise<unknown>` — A promise that resolves when the configuration has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.configure(/* McpConfigureRequest */);
console.log(result);
```
