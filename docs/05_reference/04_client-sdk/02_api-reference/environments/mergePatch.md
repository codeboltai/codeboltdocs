---
title: mergePatch
---

# `mergePatch`

```typescript
client.environments.mergePatch(id: string, data: MergePatchRequest): Promise<unknown>
```

Merges a patch into the environment's project files.

Applies a set of file changes (additions, modifications, deletions) to
the environment in a single atomic operation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `MergePatchRequest` | Yes | The patch payload describing file changes to apply |

## Returns

`Promise<unknown>` — A promise that resolves when the patch has been applied

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.mergePatch('id', /* MergePatchRequest */);
console.log(result);
```
