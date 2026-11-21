---
title: getAgentConfig
---

# `getAgentConfig`

```typescript
client.agents.getAgentConfig(agentName: string): Promise<AgentConfig>
```

Retrieves the configuration for a specific agent by name.

Returns the full configuration object for the named agent, including
its capabilities, settings, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentName` | `string` | Yes | The name of the agent to look up |

## Returns

`Promise<AgentConfig>` — A promise that resolves to the AgentConfig for the specified agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getAgentConfig('agentName');
console.log(result);
```
