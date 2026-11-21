---
title: updateTools
---

# `updateTools`

```typescript
client.mcp.updateTools(data: McpUpdateToolsRequest): Promise<unknown>
```

Updates the tool configurations for MCP servers.

Modifies which tools are exposed or hidden from agents, and updates tool-specific
settings like descriptions, parameter defaults, or access permissions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpUpdateToolsRequest` | Yes | The tool update configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the tool configurations have been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.updateTools(/* McpUpdateToolsRequest */);
console.log(result);
```
