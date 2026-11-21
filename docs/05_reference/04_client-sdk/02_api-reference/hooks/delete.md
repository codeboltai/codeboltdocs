---
title: delete
---

# `delete`

```typescript
client.hooks.delete(id: string): Promise<unknown>
```

Deletes a hook.

Permanently removes a hook registration. The hook will no longer
fire for any events after deletion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.hooks.delete('id');
console.log(result);
```
