---
title: getAgentTalents
---

# `getAgentTalents`

```typescript
client.agentPortfolioApi.getAgentTalents(agentId: string, params?: Record<string, unknown>): Promise<AgentTalent[]>
```

Retrieves all talents for a specific agent.

Returns the list of skills and capabilities registered in the
agent's portfolio, along with endorsement counts.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

## Returns

`Promise<AgentTalent[]>` — A promise that resolves to an array of AgentTalent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.getAgentTalents('agentId');
console.log(result);
```
