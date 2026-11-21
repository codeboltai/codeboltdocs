---
title: getAgentConversations
---

# `getAgentConversations`

```typescript
client.agentPortfolioApi.getAgentConversations(agentId: string, params?: Record<string, unknown>): Promise<unknown>
```

Retrieves conversation history for an agent's portfolio.

Returns the list of conversations the agent has participated in,
providing context for their portfolio activity.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentId` | `string` | Yes | The unique identifier of the agent |
| `params` | `Record<string, unknown>` | No | Optional query parameters for pagination |

## Returns

`Promise<unknown>` — A promise that resolves to the agent's conversation records

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.getAgentConversations('agentId');
console.log(result);
```
