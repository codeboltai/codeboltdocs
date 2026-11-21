---
title: getFilteredExecutions
---

# `getFilteredExecutions`

```typescript
client.agentExecution.getFilteredExecutions(params?: AgentExecutionFilterParams): Promise<AgentExecutionRecord[]>
```

Retrieves agent executions matching specific filter criteria.

Supports filtering by status, swarm ID, start source, thread ID,
and whether the execution ran in the background.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentExecutionFilterParams` | No | Filter parameters to narrow down results |

## Returns

`Promise<AgentExecutionRecord[]>` — A promise that resolves to an array of matching AgentExecutionRecord objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecution.getFilteredExecutions();
console.log(result);
```
