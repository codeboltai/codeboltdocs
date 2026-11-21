---
title: addVote
---

# `addVote`

```typescript
client.agentDeliberation.addVote(id: string, data: AddDeliberationVoteRequest): Promise<DeliberationVote>
```

Casts a vote on a deliberation.

Records an agent's vote for a specific response within the deliberation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `AddDeliberationVoteRequest` | Yes | The vote payload |

## Returns

`Promise<DeliberationVote>` — A promise that resolves to the recorded DeliberationVote

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.addVote('id', /* AddDeliberationVoteRequest */);
console.log(result);
```
