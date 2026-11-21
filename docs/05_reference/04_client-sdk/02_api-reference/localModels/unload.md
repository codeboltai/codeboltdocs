---
title: unload
---

# `unload`

```typescript
client.localModels.unload(data: UnloadLocalModelRequest): Promise<unknown>
```

Unloads a model from system memory.

Releases the memory (RAM/VRAM) occupied by a loaded model. The model remains on disk
and can be loaded again later. Use this to free resources when a model is no longer needed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UnloadLocalModelRequest` | Yes | The unload request configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the model has been unloaded from memory

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.unload(/* UnloadLocalModelRequest */);
console.log(result);
```
