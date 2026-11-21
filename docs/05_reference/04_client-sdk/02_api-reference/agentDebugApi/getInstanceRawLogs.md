---
title: getInstanceRawLogs
---

# `getInstanceRawLogs`

```typescript
client.agentDebugApi.getInstanceRawLogs(agentInstanceId: string, params?: AgentDebugLogsParams): Promise<unknown>
```

Retrieves raw, unprocessed logs for a specific agent instance.

Returns the raw log output as produced by the agent, without any
parsing or structuring. Useful for debugging issues not captured
by the structured log parser.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentInstanceId` | `string` | Yes | The unique identifier of the agent instance |
| `params` | `AgentDebugLogsParams` | No | Optional pagination parameters |

## Returns

`Promise<unknown>` — A promise that resolves to the raw log data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getInstanceRawLogs('agentInstanceId');
console.log(result);
```
