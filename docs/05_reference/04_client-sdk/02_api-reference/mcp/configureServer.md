---
title: configureServer
---

# `configureServer`

```typescript
client.mcp.configureServer(serverName: string, data: McpConfigureServerRequest): Promise<unknown>
```

Configures a specific MCP server's settings.

Updates the connection parameters, environment variables, and other settings for a
named MCP server. The server may need to be restarted for changes to take effect.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `serverName` | `string` | Yes | The name of the MCP server to configure |
| `data` | `McpConfigureServerRequest` | Yes | The server-specific configuration to apply |

## Returns

`Promise<unknown>` — A promise that resolves when the server configuration has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.configureServer('serverName', /* McpConfigureServerRequest */);
console.log(result);
```
