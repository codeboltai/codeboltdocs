---
title: setLocalAgent
---

# `setLocalAgent`

```typescript
client.llm.setLocalAgent(data: LLMLocalAgentConfig): Promise<unknown>
```

Configures the LLM settings for a specific local agent.

Allows overriding the default LLM configuration on a per-agent basis, so different
agents can use different models or provider settings tailored to their tasks.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMLocalAgentConfig` | Yes | The agent-specific LLM configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the agent configuration has been saved

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.setLocalAgent(/* LLMLocalAgentConfig */);
console.log(result);
```
