---
title: getAll
---

# `getAll`

```typescript
client.agentExecutionPhases.getAll(params?: Record<string, unknown>): Promise<AgentExecutionPhase[]>
```

Retrieves all defined agent execution phases.

Returns the complete list of execution phases that have been configured
in the system.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<AgentExecutionPhase[]>` — A promise that resolves to an array of AgentExecutionPhase objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecutionPhases.getAll();
console.log(result);
```
