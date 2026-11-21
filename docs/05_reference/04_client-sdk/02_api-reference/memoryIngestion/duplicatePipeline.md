---
title: duplicatePipeline
---

# `duplicatePipeline`

```typescript
client.memoryIngestion.duplicatePipeline(id: string, data?: DuplicateIngestionPipelineRequest): Promise<IngestionPipeline>
```

Creates a copy of an existing ingestion pipeline.

Duplicates the pipeline configuration, optionally with modifications. Useful for
creating variations of working pipelines without starting from scratch.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to duplicate |
| `data` | `DuplicateIngestionPipelineRequest` | No | Optional modifications to apply to the duplicated pipeline |

## Returns

`Promise<IngestionPipeline>` — A promise that resolves to the newly created duplicate pipeline

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.duplicatePipeline('id');
console.log(result);
```
