---
title: rebuildIndex
---

# `rebuildIndex`

```typescript
client.environmentDebugApi.rebuildIndex(data?: RebuildEnvironmentIndexRequest): Promise<unknown>
```

Rebuilds the environment debug index from scratch.

Triggers a full re-indexing of all environment instances. Use this when
the index becomes inconsistent or after bulk data migrations.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RebuildEnvironmentIndexRequest` | No | Optional configuration for the rebuild process |

## Returns

`Promise<unknown>` — A promise that resolves when the rebuild is initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.rebuildIndex();
console.log(result);
```
