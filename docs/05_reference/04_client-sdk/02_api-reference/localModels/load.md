---
title: load
---

# `load`

```typescript
client.localModels.load(data: LoadLocalModelRequest): Promise<unknown>
```

Loads a downloaded model into system memory for inference.

Prepares a local model for use by loading its weights into RAM or VRAM. The model
must be downloaded first. Once loaded, it can serve inference requests without
additional startup latency.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LoadLocalModelRequest` | Yes | The load request configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the model has been loaded into memory

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.load(/* LoadLocalModelRequest */);
console.log(result);
```
