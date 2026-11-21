---
title: addResponse
---

# `addResponse`

```typescript
client.agentDeliberation.addResponse(id: string, data: AddDeliberationResponseRequest): Promise<DeliberationResponse>
```

Adds a response to a deliberation.

Submits a new proposal or answer from an agent as part of the
deliberation process.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |
| `data` | `AddDeliberationResponseRequest` | Yes | The response payload containing the agent's proposal |

## Returns

`Promise<DeliberationResponse>` — A promise that resolves to the created DeliberationResponse

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.addResponse('id', /* AddDeliberationResponseRequest */);
console.log(result);
```
