---
title: toggle
---

# `toggle`

```typescript
client.mcp.toggle(data: McpToggleRequest): Promise<unknown>
```

Toggles an MCP server between enabled and disabled states.

Enables or disables a registered MCP server. Disabled servers will not be started
or connected to, and their tools will not be available to agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `McpToggleRequest` | Yes | The toggle request specifying the server and desired state |

## Returns

`Promise<unknown>` — A promise that resolves when the toggle operation has completed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.mcp.toggle(/* McpToggleRequest */);
console.log(result);
```
