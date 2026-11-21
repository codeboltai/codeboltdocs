---
title: getPlugins
---

# `getPlugins`

```typescript
client.agentFlow.getPlugins(params?: Record<string, unknown>): Promise<AgentFlowPlugin[]>
```

Retrieves available agent flow plugins.

Returns the list of plugin types that can be used as nodes within
agent flows, each defining a specific processing capability.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering plugins |

## Returns

`Promise<AgentFlowPlugin[]>` — A promise that resolves to an array of AgentFlowPlugin objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentFlow.getPlugins();
console.log(result);
```
