---
title: getMcpConfigPath
---

# `getMcpConfigPath`

```typescript
client.mcp.getMcpConfigPath(): Promise<McpConfigPath>
```

Retrieves the filesystem path to the MCP configuration file.

Returns the absolute path where the MCP configuration is stored on disk. Useful for
manual editing or backup of MCP server configurations.

## Parameters

_No parameters._

## Returns

`Promise<McpConfigPath>` — A promise that resolves to the MCP configuration file path

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getMcpConfigPath();
console.log(result);
```
