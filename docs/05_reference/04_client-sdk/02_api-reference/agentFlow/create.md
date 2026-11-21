---
title: create
---

# `create`

```typescript
client.agentFlow.create(data: CreateAgentFlowRequest): Promise<AgentFlow>
```

Creates a new agent flow.

Defines a new node-based workflow that agents can execute. The flow
consists of interconnected plugin nodes that define the processing pipeline.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateAgentFlowRequest` | Yes | The flow creation payload including nodes and connections |

## Returns

`Promise<AgentFlow>` — A promise that resolves to the newly created AgentFlow

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentFlow.create(/* CreateAgentFlowRequest */);
console.log(result);
```
