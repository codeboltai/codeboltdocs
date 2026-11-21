---
title: update
---

# `update`

```typescript
client.agentFlow.update(data: UpdateAgentFlowRequest): Promise<AgentFlow>
```

Updates an existing agent flow.

Modifies the node configuration, connections, or metadata of an
existing flow.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateAgentFlowRequest` | Yes | The update payload containing the modified flow data |

## Returns

`Promise<AgentFlow>` — A promise that resolves to the updated AgentFlow

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentFlow.update(/* UpdateAgentFlowRequest */);
console.log(result);
```
