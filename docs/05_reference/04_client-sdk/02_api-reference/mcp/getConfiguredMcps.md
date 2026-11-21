---
title: getConfiguredMcps
---

# `getConfiguredMcps`

```typescript
client.mcp.getConfiguredMcps(): Promise<McpServer[]>
```

Retrieves all MCP servers that have been configured in the workspace.

Returns only servers that have been explicitly set up (installed and configured),
as opposed to all available servers in the catalog.

## Parameters

_No parameters._

## Returns

`Promise<McpServer[]>` — A promise that resolves to an array of configured MCP servers

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getConfiguredMcps();
console.log(result);
```
