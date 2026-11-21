---
title: getDiffFiles
---

# `getDiffFiles`

```typescript
client.environments.getDiffFiles(id: string, data: GetDiffFilesRequest): Promise<unknown>
```

Retrieves diff files for an environment.

Compares the environment's current file state against a baseline to
identify modified, added, or deleted files.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `GetDiffFilesRequest` | Yes | Parameters specifying the diff comparison (e.g., base commit or branch) |

## Returns

`Promise<unknown>` — A promise that resolves to the diff file information

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getDiffFiles('id', /* GetDiffFilesRequest */);
console.log(result);
```
