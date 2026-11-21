---
title: getAgentKarma
---

# `getAgentKarma`

```typescript
client.agentPortfolioApi.getAgentKarma(agentId: string, params?: Record<string, unknown>): Promise<AgentKarma>
```

Retrieves karma details for a specific agent.

Returns the agent's karma score breakdown including total karma,
recent awards, and karma history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering karma records |

## Returns

`Promise<AgentKarma>` — A promise that resolves to the AgentKarma details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.getAgentKarma('agentId');
console.log(result);
```
