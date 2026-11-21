---
title: install
---

# `install`

```typescript
client.mcp.install(data: McpInstallRequest): Promise<unknown>
```

Installs an MCP server from the available catalog.

Downloads and registers an MCP server, making it available for configuration and use.
The server may require additional configuration (e.g., API keys) before it can be started.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpInstallRequest` | Yes | The installation request specifying which server to install |

## Returns

`Promise<unknown>` — A promise that resolves when the installation has completed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.install(/* McpInstallRequest */);
console.log(result);
```
