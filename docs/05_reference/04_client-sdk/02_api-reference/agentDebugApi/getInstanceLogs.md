---
title: getInstanceLogs
---

# `getInstanceLogs`

```typescript
client.agentDebugApi.getInstanceLogs(agentInstanceId: string, params?: AgentDebugLogsParams): Promise<AgentDebugLog[]>
```

Retrieves parsed and structured logs for a specific agent instance.

Returns logs that have been parsed into structured AgentDebugLog objects,
making them easier to analyze programmatically. Supports pagination
through offset and limit parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentInstanceId` | `string` | Yes | The unique identifier of the agent instance |
| `params` | `AgentDebugLogsParams` | No | Optional pagination parameters |

## Returns

`Promise<AgentDebugLog[]>` — A promise that resolves to an array of structured AgentDebugLog objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getInstanceLogs('agentInstanceId');
console.log(result);
```
