---
title: update
---

# `update`

```typescript
client.agentExecutionPhases.update(name: string, data: UpdateAgentExecutionPhaseRequest): Promise<AgentExecutionPhase>
```

Updates an existing execution phase.

Modifies the configuration of an execution phase. Use this to change
the phase description, ordering, or other properties.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the phase to update |
| `data` | `UpdateAgentExecutionPhaseRequest` | Yes | The fields to update on the phase |

## Returns

`Promise<AgentExecutionPhase>` — A promise that resolves to the updated AgentExecutionPhase

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecutionPhases.update('name', /* UpdateAgentExecutionPhaseRequest */);
console.log(result);
```
