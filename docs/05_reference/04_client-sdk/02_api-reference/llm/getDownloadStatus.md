---
title: getDownloadStatus
---

# `getDownloadStatus`

```typescript
client.llm.getDownloadStatus(modelId: string): Promise<LLMDownloadStatus>
```

Checks the current download status of a model.

Returns progress information for an active or completed model download, including
percentage complete, bytes downloaded, and any error state.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `modelId` | `string` | Yes | The identifier of the model to check |

## Returns

`Promise<LLMDownloadStatus>` — A promise that resolves to the current download status

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getDownloadStatus('modelId');
console.log(result);
```
