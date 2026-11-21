---
title: startAgent
---

# `startAgent`

```typescript
client.agents.startAgent(data: StartAgentRequest): Promise<Agent>
```

Starts a new agent instance with the specified configuration.

Initializes and launches an agent process in the CodeBolt runtime.
The agent will be configured based on the provided request parameters
including its type, capabilities, and execution context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StartAgentRequest` | Yes | The agent start configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the started Agent instance with its runtime details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.startAgent(/* StartAgentRequest */);
console.log(result);
```
