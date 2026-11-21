---
title: getAgentPortfolio
---

# `getAgentPortfolio`

```typescript
client.agentPortfolioApi.getAgentPortfolio(agentId: string): Promise<AgentPortfolio>
```

Retrieves a specific agent's portfolio.

Returns the full portfolio for a single agent, including their profile,
karma, talents, testimonials, and performance metrics.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |

## Returns

`Promise<AgentPortfolio>` — A promise that resolves to the AgentPortfolio object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.getAgentPortfolio('agentId');
console.log(result);
```
