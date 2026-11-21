---
title: create
---

# `create`

```typescript
client.agentExecutionPhases.create(data: CreateAgentExecutionPhaseRequest): Promise<AgentExecutionPhase>
```

Creates a new execution phase.

Defines a new phase in the agent execution lifecycle. The phase will
be available for agents to transition through during their execution.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateAgentExecutionPhaseRequest` | Yes | The phase creation payload |

## Returns

`Promise<AgentExecutionPhase>` — A promise that resolves to the newly created AgentExecutionPhase

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentExecutionPhases.create(/* CreateAgentExecutionPhaseRequest */);
console.log(result);
```
