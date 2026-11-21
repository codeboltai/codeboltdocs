---
title: search
---

# `search`

```typescript
client.fileRead.search(params?: FileSearchParams): Promise<FileSearchResult[]>
```

Searches for files matching a query string.

Performs a text-based search across file names and paths in the project.
Returns matching files with their paths and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `FileSearchParams` | No | Optional search parameters including the query string |

## Returns

`Promise<FileSearchResult[]>` — A promise that resolves to an array of  matches

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.fileRead.search();
console.log(result);
```
