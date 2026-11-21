---
title: delete
---

# `delete`

```typescript
client.localModels.delete(modelId: string): Promise<unknown>
```

Deletes a downloaded model from local storage.

Permanently removes the model files from disk, freeing storage space. The model must
be unloaded from memory before deletion. It can be re-downloaded later if needed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The unique identifier of the model to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the model has been removed from disk

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.delete('modelId');
console.log(result);
```
