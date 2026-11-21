---
title: getFilteredInstances
---

# `getFilteredInstances`

```typescript
client.agentDebugApi.getFilteredInstances(params?: AgentDebugFilterParams): Promise<AgentDebugInstance[]>
```

Retrieves agent instances matching specific filter criteria.

Supports filtering by status, agent type, thread ID, swarm ID, and
whether the agent is running in the background.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentDebugFilterParams` | No | Filter parameters to narrow down results |

## Returns

`Promise<AgentDebugInstance[]>` — A promise that resolves to an array of matching AgentDebugInstance objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getFilteredInstances();
console.log(result);
```
