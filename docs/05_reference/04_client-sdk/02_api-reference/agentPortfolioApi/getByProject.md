---
title: getByProject
---

# `getByProject`

```typescript
client.agentPortfolioApi.getByProject(params?: AgentByProjectParams): Promise<AgentPortfolio[]>
```

Retrieves agent portfolios filtered by project.

Returns portfolios for agents that have contributed to a specific project,
useful for understanding which agents are active in a project context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentByProjectParams` | No | Parameters to filter portfolios by project |

## Returns

`Promise<AgentPortfolio[]>` — A promise that resolves to an array of AgentPortfolio objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentPortfolioApi.getByProject();
console.log(result);
```
