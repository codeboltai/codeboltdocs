---
title: get
---

# `get`

```typescript
client.localModels.get(modelId: string): Promise<LocalModel>
```

Retrieves detailed information about a specific local model.

Returns comprehensive metadata for a model including its size, quantization level,
architecture, and current status (downloaded, loaded, etc.).

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The unique identifier of the model to retrieve |

## Returns

`Promise<LocalModel>` — A promise that resolves to the model's detailed information

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.get('modelId');
console.log(result);
```
