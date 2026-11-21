---
title: getAll
---

# `getAll`

```typescript
client.mcp.getAll(): Promise<McpServer[]>
```

Retrieves all MCP servers currently registered in the workspace.

Returns every MCP server regardless of its enabled/disabled status, including
connection details, available tools, and current health information.

## Parameters

_No parameters._

## Returns

`Promise<McpServer[]>` — A promise that resolves to an array of all registered MCP servers

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getAll();
console.log(result);
```
