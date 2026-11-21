---
title: stopAgent
---

# `stopAgent`

```typescript
client.agents.stopAgent(data: StopAgentRequest): Promise<void>
```

Stops a running agent.

Sends a stop signal to the specified agent, causing it to terminate
gracefully.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StopAgentRequest` | Yes | The stop request configuration |

## Returns

`Promise<void>` — A promise that resolves when the agent has been stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.stopAgent(/* StopAgentRequest */);
console.log(result);
```
