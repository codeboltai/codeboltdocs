---
title: getAvailableList
---

# `getAvailableList`

```typescript
client.mcp.getAvailableList(): Promise<McpAvailableServer[]>
```

Retrieves the catalog of MCP servers available for installation.

Returns a curated list of MCP servers that can be installed from the marketplace or
registry. Use this to discover new capabilities to add to the workspace.

## Parameters

_No parameters._

## Returns

`Promise<McpAvailableServer[]>` — A promise that resolves to an array of available MCP servers

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getAvailableList();
console.log(result);
```
