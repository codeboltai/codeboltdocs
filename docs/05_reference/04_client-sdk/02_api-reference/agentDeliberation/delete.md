---
title: delete
---

# `delete`

```typescript
client.agentDeliberation.delete(id: string): Promise<unknown>
```

Deletes a deliberation.

Permanently removes the specified deliberation and all its associated
responses and votes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the deliberation to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the deliberation has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.agentDeliberation.delete('id');
console.log(result);
```
