---
title: createRemoteAgent
---

# `createRemoteAgent`

```typescript
client.agents.createRemoteAgent(data: CreateRemoteAgentRequest): Promise<Agent>
```

Creates a remote agent.

Registers a new agent that runs on a remote server, allowing
CodeBolt to delegate tasks to external agent services.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateRemoteAgentRequest` | Yes | The remote agent creation configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the created Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.createRemoteAgent(/* CreateRemoteAgentRequest */);
console.log(result);
```
