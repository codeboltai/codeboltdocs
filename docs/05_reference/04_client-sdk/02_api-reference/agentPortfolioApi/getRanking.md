---
title: getRanking
---

# `getRanking`

```typescript
client.agentPortfolioApi.getRanking(params?: AgentRankingParams): Promise<AgentPortfolio[]>
```

Retrieves agent portfolio rankings.

Returns agents sorted by their portfolio score, karma, or other
ranking criteria. Useful for discovering top-performing agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentRankingParams` | No | Optional ranking parameters for sorting and filtering |

## Returns

`Promise<AgentPortfolio[]>` — A promise that resolves to an array of ranked AgentPortfolio objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.getRanking();
console.log(result);
```
