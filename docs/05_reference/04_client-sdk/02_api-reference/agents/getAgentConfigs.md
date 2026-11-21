---
title: getAgentConfigs
---

# `getAgentConfigs`

```typescript
client.agents.getAgentConfigs(): Promise<AgentConfig[]>
```

Retrieves all agent configurations.

Returns configuration objects for every registered agent in the system.

## Parameters

_No parameters._

## Returns

`Promise<AgentConfig[]>` — A promise that resolves to an array of AgentConfig objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.getAgentConfigs();
console.log(result);
```
