---
title: cancelDownload
---

# `cancelDownload`

```typescript
client.llm.cancelDownload(data: LLMCancelDownloadRequest): Promise<unknown>
```

Cancels an in-progress model download.

Stops the download of a model that was previously initiated with .
Any partially downloaded data may be cleaned up.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMCancelDownloadRequest` | Yes | The cancellation request identifying the download to stop |

## Returns

`Promise<unknown>` — A promise that resolves when the cancellation has been processed

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.cancelDownload(/* LLMCancelDownloadRequest */);
console.log(result);
```
