---
title: createCustomLocalAgent
---

# `createCustomLocalAgent`

```typescript
client.agents.createCustomLocalAgent(data: CreateCustomLocalAgentRequest): Promise<Agent>
```

Creates a custom local agent.

Defines a new agent from scratch on the local filesystem with custom
configuration, making it available for use in the runtime.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCustomLocalAgentRequest` | Yes | The custom agent creation configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the created Agent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.createCustomLocalAgent(/* CreateCustomLocalAgentRequest */);
console.log(result);
```
