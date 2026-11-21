---
title: updatePipeline
---

# `updatePipeline`

```typescript
client.memoryIngestion.updatePipeline(id: string, data: UpdateIngestionPipelineRequest): Promise<IngestionPipeline>
```

Updates an existing ingestion pipeline's configuration.

Modifies the pipeline's processor chain, triggers, or metadata. Changes affect
subsequent executions but do not alter previously ingested data.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to update |
| `data` | `UpdateIngestionPipelineRequest` | Yes | The fields to update on the pipeline |

## Returns

`Promise<IngestionPipeline>` — A promise that resolves to the updated pipeline

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.updatePipeline('id', /* UpdateIngestionPipelineRequest */);
console.log(result);
```
