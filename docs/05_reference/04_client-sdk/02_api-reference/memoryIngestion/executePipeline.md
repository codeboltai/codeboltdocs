---
title: executePipeline
---

# `executePipeline`

```typescript
client.memoryIngestion.executePipeline(id: string, data?: ExecuteIngestionPipelineRequest): Promise<unknown>
```

Manually triggers execution of an ingestion pipeline.

Runs the pipeline's processor chain against the provided input data or its configured
data source. The execution is asynchronous; monitor progress through events.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to execute |
| `data` | `ExecuteIngestionPipelineRequest` | No | Optional execution parameters and input data |

## Returns

`Promise<unknown>` — A promise that resolves when the execution has been initiated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.executePipeline('id');
console.log(result);
```
