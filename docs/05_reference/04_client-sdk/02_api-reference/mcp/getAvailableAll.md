---
title: getAvailableAll
---

# `getAvailableAll`

```typescript
client.mcp.getAvailableAll(): Promise<McpAvailableServer[]>
```

Retrieves all available MCP servers including both marketplace and community servers.

Returns the full unfiltered catalog of MCP servers from all sources. This includes
official, community-contributed, and locally developed servers.

## Parameters

_No parameters._

## Returns

`Promise<McpAvailableServer[]>` — A promise that resolves to an array of all available MCP servers

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.getAvailableAll();
console.log(result);
```
