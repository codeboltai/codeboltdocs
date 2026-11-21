---
title: delete
---

# `delete`

```typescript
client.orchestrator.delete(id: string): Promise<void>
```

Deletes an orchestrator instance permanently.

Removes the orchestrator and its configuration. Any active workflows managed by this
orchestrator should be stopped before deletion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the orchestrator to delete |

## Returns

`Promise<void>` — A promise that resolves when the orchestrator has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.orchestrator.delete('id');
console.log(result);
```
