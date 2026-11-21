---
title: read
---

# `read`

```typescript
client.fileRead.read(params?: FileReadParams): Promise<unknown>
```

Reads the content of a file.

Retrieves the full content of a file at the specified path. Returns
the raw file data suitable for display or further processing.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileReadParams` | No | Optional parameters specifying which file to read |

## Returns

`Promise<unknown>` — A promise that resolves to the file content

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileRead.read();
console.log(result);
```
