---
title: startVotingAgents
---

# `startVotingAgents`

```typescript
client.agentDeliberation.startVotingAgents(id: string, data?: StartVotingAgentsRequest): Promise<unknown>
```

Starts voting agents for a deliberation.

Launches the voting agents so they can evaluate the submitted responses
and cast their votes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `StartVotingAgentsRequest` | No | Optional configuration for the voting agent startup |

## Returns

`Promise<unknown>` — A promise that resolves when the voting agents have been started

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.startVotingAgents('id');
console.log(result);
```
