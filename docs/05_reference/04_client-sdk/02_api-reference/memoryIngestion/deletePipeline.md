---
title: deletePipeline
---

# `deletePipeline`

```typescript
client.memoryIngestion.deletePipeline(id: string): Promise<unknown>
```

Permanently deletes an ingestion pipeline.

Removes the pipeline configuration. Previously ingested data is not affected.
The pipeline must be disabled before deletion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to delete |

## Returns

`Promise<unknown>` — A promise that resolves when the pipeline has been deleted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.deletePipeline('id');
console.log(result);
```
