---
title: getByName
---

# `getByName`

```typescript
client.mcp.getByName(serverName: string): Promise<McpServer>
```

Retrieves a specific MCP server by its registered name.

Returns the full configuration and status of a single MCP server, including its
tool definitions, resource list, and connection parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `serverName` | `string` | Yes | The registered name of the MCP server to retrieve |

## Returns

`Promise<McpServer>` — A promise that resolves to the MCP server details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getByName('serverName');
console.log(result);
```
