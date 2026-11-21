---
title: downloadModel
---

# `downloadModel`

```typescript
client.llm.downloadModel(data: LLMDownloadModelRequest): Promise<unknown>
```

Initiates the download of a model for local use.

Starts an asynchronous download of a model that can be run locally (e.g., via Ollama).
Use  to monitor progress.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMDownloadModelRequest` | Yes | The download request specifying which model to download |

## Returns

`Promise<unknown>` — A promise that resolves when the download has been initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.downloadModel(/* LLMDownloadModelRequest */);
console.log(result);
```
