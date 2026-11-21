---
title: changeAgent
---

# `changeAgent`

```typescript
client.agents.changeAgent(data: ChangeAgentRequest): Promise<Agent>
```

Changes the currently active agent.

Switches the runtime to use a different agent, stopping the current
one if necessary. Use this when transitioning between different agent
types during a workflow.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ChangeAgentRequest` | Yes | The agent change configuration |

## Returns

`Promise<Agent>` — A promise that resolves to the newly active Agent instance

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agents.changeAgent(/* ChangeAgentRequest */);
console.log(result);
```
