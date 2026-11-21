---
title: search
---

# `search`

```typescript
client.codebaseIndex.search(data: CodebaseSearchRequest): Promise<CodebaseSearchResult[]>
```

Searches the codebase index.

Performs a structured search over the indexed codebase, returning
matching files and code snippets ranked by relevance.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CodebaseSearchRequest` | Yes | The search query and filter parameters |

## Returns

`Promise<CodebaseSearchResult[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codebaseIndex.search(/* CodebaseSearchRequest */);
console.log(result);
```
