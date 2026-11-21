---
title: browserNavigate
---

# `browserNavigate`

```typescript
client.mcp.browserNavigate(data: McpBrowserNavigateRequest): Promise<unknown>
```

Navigates to a URL using the browser MCP server.

Sends a navigation command to the browser automation MCP server, instructing it to
load a specific web page. Requires the browser MCP server to be installed and enabled.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpBrowserNavigateRequest` | Yes | The navigation request |

## Returns

`Promise<unknown>` — A promise that resolves when the navigation has been initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.browserNavigate(/* McpBrowserNavigateRequest */);
console.log(result);
```
