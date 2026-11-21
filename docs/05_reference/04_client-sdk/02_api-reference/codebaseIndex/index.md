---
title: index
---

# `index`

```typescript
client.codebaseIndex.index(data?: CodebaseIndexRequest): Promise<unknown>
```

Triggers codebase indexing.

Starts an indexing operation that scans the project files and builds
or updates the search index. This may take time for large codebases.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CodebaseIndexRequest` | No | Optional indexing configuration (e.g., paths to include/exclude) |

## Returns

`Promise<unknown>` — A promise that resolves when indexing has been initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codebaseIndex.index();
console.log(result);
```
