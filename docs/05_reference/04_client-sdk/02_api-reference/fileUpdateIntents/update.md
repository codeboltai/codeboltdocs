---
title: update
---

# `update`

```typescript
client.fileUpdateIntents.update(id: string, data: UpdateFileUpdateIntentRequest): Promise<FileUpdateIntent>
```

Updates an existing file update intent.

Modifies the properties, files, or status of an existing intent.
Use this to extend file ranges, update metadata, or change intent
configuration as operations progress.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the intent to update |
| `data` | `UpdateFileUpdateIntentRequest` | Yes | Request containing the intent updates to apply |

## Returns

`Promise<FileUpdateIntent>` — A promise that resolves to the updated FileUpdateIntent object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileUpdateIntents.update('id', /* UpdateFileUpdateIntentRequest */);
console.log(result);
```
