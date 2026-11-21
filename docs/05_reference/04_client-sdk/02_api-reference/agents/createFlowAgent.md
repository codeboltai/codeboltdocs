---
title: createFlowAgent
---

# `createFlowAgent`

```typescript
client.agents.createFlowAgent(data: CreateFlowAgentRequest): Promise<Agent>
```

Creates a flow-based agent.

Defines a new agent that operates based on a visual flow definition,
where behavior is determined by connected nodes in a flow graph.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateFlowAgentRequest` | Yes | The flow agent creation configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the created Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.createFlowAgent(/* CreateFlowAgentRequest */);
console.log(result);
```
