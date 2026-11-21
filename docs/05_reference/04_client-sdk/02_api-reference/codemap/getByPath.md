---
title: getByPath
---

# `getByPath`

```typescript
client.codemap.getByPath(params: CodemapByPathParams): Promise<Codemap[]>
```

Retrieves codemap entries by file path.

Looks up codemaps associated with a specific file path, returning
all structural information for that file.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CodemapByPathParams` | Yes | Query parameters including the file path to look up |

## Returns

`Promise<Codemap[]>` — A promise that resolves to an array of matching  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codemap.getByPath(/* CodemapByPathParams */);
console.log(result);
```
