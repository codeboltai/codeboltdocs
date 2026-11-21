---
title: getVotes
---

# `getVotes`

```typescript
client.agentDeliberation.getVotes(id: string): Promise<DeliberationVote[]>
```

Retrieves all votes cast in a deliberation.

Returns the voting records showing which agents voted for which
responses.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

## Returns

`Promise<DeliberationVote[]>` — A promise that resolves to an array of DeliberationVote objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.getVotes('id');
console.log(result);
```
