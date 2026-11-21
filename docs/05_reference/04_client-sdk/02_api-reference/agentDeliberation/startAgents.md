---
title: startAgents
---

# `startAgents`

```typescript
client.agentDeliberation.startAgents(id: string, data?: StartDeliberationAgentsRequest): Promise<unknown>
```

Starts agents for a deliberation.

Launches the participant agents so they can begin generating responses
for the deliberation topic.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `StartDeliberationAgentsRequest` | No | Optional configuration for the agent startup |

## Returns

`Promise<unknown>` — A promise that resolves when the agents have been started

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.startAgents('id');
console.log(result);
```
