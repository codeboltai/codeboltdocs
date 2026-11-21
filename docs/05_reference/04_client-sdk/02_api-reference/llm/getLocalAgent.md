---
title: getLocalAgent
---

# `getLocalAgent`

```typescript
client.llm.getLocalAgent(agentName: string): Promise<LLMLocalAgentConfig>
```

Retrieves the LLM configuration for a specific local agent.

Returns the provider and model settings that have been configured for the given agent,
or the default configuration if no agent-specific override exists.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentName` | `string` | Yes | The name of the agent whose LLM configuration to retrieve |

## Returns

`Promise<LLMLocalAgentConfig>` — A promise that resolves to the agent's LLM configuration

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getLocalAgent('agentName');
console.log(result);
```
