---
title: getInstances
---

# `getInstances`

```typescript
client.agentDebugApi.getInstances(params?: Record<string, unknown>): Promise<AgentDebugInstance[]>
```

Retrieves all agent debug instances.

Returns every agent instance that has been tracked by the debug system,
regardless of its current status.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<AgentDebugInstance[]>` — A promise that resolves to an array of AgentDebugInstance objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getInstances();
console.log(result);
```
