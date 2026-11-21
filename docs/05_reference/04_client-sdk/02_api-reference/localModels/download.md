---
title: download
---

# `download`

```typescript
client.localModels.download(data: DownloadLocalModelRequest): Promise<unknown>
```

Initiates the download of a model for local execution.

Starts an asynchronous download of the specified model. Large models may take
significant time and disk space. Monitor download progress through status endpoints.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `DownloadLocalModelRequest` | Yes | The download request configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the download has been initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.download(/* DownloadLocalModelRequest */);
console.log(result);
```
