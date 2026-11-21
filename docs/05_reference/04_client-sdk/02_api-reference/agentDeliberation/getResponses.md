---
title: getResponses
---

# `getResponses`

```typescript
client.agentDeliberation.getResponses(id: string): Promise<DeliberationResponse[]>
```

Retrieves all responses submitted to a deliberation.

Returns the proposals or answers that agents have submitted as part
of the deliberation process.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation |

## Returns

`Promise<DeliberationResponse[]>` — A promise that resolves to an array of DeliberationResponse objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.getResponses('id');
console.log(result);
```
