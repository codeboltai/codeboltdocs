---
title: getAvailableDetail
---

# `getAvailableDetail`

```typescript
client.mcp.getAvailableDetail(mcpId: string): Promise<McpAvailableServer>
```

Retrieves detailed information about a specific available MCP server.

Returns comprehensive details about an MCP server from the catalog, including its
description, supported tools, configuration schema, and installation requirements.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `mcpId` | `string` | Yes | The identifier of the available MCP server to inspect |

## Returns

`Promise<McpAvailableServer>` — A promise that resolves to the detailed MCP server information

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getAvailableDetail('mcpId');
console.log(result);
```
