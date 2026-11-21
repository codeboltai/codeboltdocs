---
title: getLocalMcpList
---

# `getLocalMcpList`

```typescript
client.mcp.getLocalMcpList(): Promise<McpServer[]>
```

Retrieves the list of locally defined MCP servers.

Returns MCP servers that are defined in the local workspace configuration rather than
installed from the marketplace. These are typically custom or development servers.

## Parameters

_No parameters._

## Returns

`Promise<McpServer[]>` — A promise that resolves to an array of local MCP servers

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getLocalMcpList();
console.log(result);
```
