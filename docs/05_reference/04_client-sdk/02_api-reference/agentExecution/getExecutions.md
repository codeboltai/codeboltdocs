---
title: getExecutions
---

# `getExecutions`

```typescript
client.agentExecution.getExecutions(params?: Record<string, unknown>): Promise<AgentExecutionRecord[]>
```

Retrieves all agent execution records.

Returns the complete history of agent executions, useful for auditing
and monitoring agent activity over time.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<AgentExecutionRecord[]>` — A promise that resolves to an array of AgentExecutionRecord objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecution.getExecutions();
console.log(result);
```
