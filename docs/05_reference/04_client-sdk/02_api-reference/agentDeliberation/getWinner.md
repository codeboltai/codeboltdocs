---
title: getWinner
---

# `getWinner`

```typescript
client.agentDeliberation.getWinner(id: string): Promise<DeliberationResponse>
```

Retrieves the winning response of a deliberation.

Returns the response that received the most votes or was otherwise
selected as the winner of the deliberation process.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

## Returns

`Promise<DeliberationResponse>` — A promise that resolves to the winning DeliberationResponse

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.getWinner('id');
console.log(result);
```
