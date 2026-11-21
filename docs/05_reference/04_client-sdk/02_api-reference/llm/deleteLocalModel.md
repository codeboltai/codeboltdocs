---
title: deleteLocalModel
---

# `deleteLocalModel`

```typescript
client.llm.deleteLocalModel(modelId: string): Promise<unknown>
```

Deletes a locally downloaded model from disk.

Permanently removes a model that was previously downloaded for local execution,
freeing up disk space. The model can be re-downloaded later if needed.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The identifier of the local model to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the model has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.deleteLocalModel('modelId');
console.log(result);
```
