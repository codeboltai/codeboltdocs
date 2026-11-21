---
title: allFiles
---

# `allFiles`

```typescript
client.fileRead.allFiles(params?: FileSearchParams): Promise<FileSearchResult[]>
```

Retrieves a listing of all files in the project.

Returns the complete set of files, optionally filtered by the provided
search parameters. Useful for building file indexes or bulk operations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileSearchParams` | No | Optional parameters for filtering the file list |

## Returns

`Promise<FileSearchResult[]>` — A promise that resolves to an array of  entries

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileRead.allFiles();
console.log(result);
```
