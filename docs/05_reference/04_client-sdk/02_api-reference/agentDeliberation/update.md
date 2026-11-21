---
title: update
---

# `update`

```typescript
client.agentDeliberation.update(id: string, data: UpdateDeliberationRequest): Promise<Deliberation>
```

Partially updates a deliberation.

Applies a patch to the deliberation record, updating only the
fields provided in the request.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation to update |
| `data` | `UpdateDeliberationRequest` | Yes | The fields to patch on the deliberation |

## Returns

`Promise<Deliberation>` — A promise that resolves to the updated Deliberation

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.update('id', /* UpdateDeliberationRequest */);
console.log(result);
```
