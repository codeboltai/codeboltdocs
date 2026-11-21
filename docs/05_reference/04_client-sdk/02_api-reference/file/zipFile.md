---
title: zipFile
---

# `zipFile`

```typescript
client.file.zipFile(data: ZipFileRequest): Promise<unknown>
```

Creates a zip archive from specified files or directories.

Compresses the specified sources into a zip file at the given output
path. Useful for bundling project files for download or deployment.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ZipFileRequest` | Yes | Request specifying source paths and the output zip file location |

## Returns

`Promise<unknown>` — A promise that resolves when the zip file has been created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.file.zipFile(/* ZipFileRequest */);
console.log(result);
```
