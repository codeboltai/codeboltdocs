---
title: getInstance
---

# `getInstance`

```typescript
client.agentDebugApi.getInstance(agentInstanceId: string): Promise<AgentDebugInstance>
```

Retrieves details for a specific agent debug instance.

Returns the full debug record for a single agent instance including
its configuration, status, timing, and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentInstanceId` | `string` | Yes | The unique identifier of the agent instance |

## Returns

`Promise<AgentDebugInstance>` — A promise that resolves to the AgentDebugInstance object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDebugApi.getInstance('agentInstanceId');
console.log(result);
```
