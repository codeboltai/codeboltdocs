---
title: getPluginUi
---

# `getPluginUi`

```typescript
client.agentFlow.getPluginUi(pluginName: string): Promise<AgentFlowPluginUi>
```

Retrieves the UI definition for a specific flow plugin.

Returns the schema and layout information needed to render the
plugin's configuration interface in the flow editor.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `pluginName` | `string` | Yes | The name of the plugin to get the UI definition for |

## Returns

`Promise<AgentFlowPluginUi>` — A promise that resolves to the AgentFlowPluginUi definition

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentFlow.getPluginUi('pluginName');
console.log(result);
```
