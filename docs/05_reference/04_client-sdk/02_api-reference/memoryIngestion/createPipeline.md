---
title: createPipeline
---

# `createPipeline`

```typescript
client.memoryIngestion.createPipeline(data: CreateIngestionPipelineRequest): Promise<IngestionPipeline>
```

Creates a new ingestion pipeline with the specified processor chain.

Defines a new data processing workflow that can be triggered manually or automatically
in response to events. The pipeline chains processors together to transform data
before storing it in memory.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateIngestionPipelineRequest` | Yes | The pipeline creation payload |

## Returns

`Promise<IngestionPipeline>` — A promise that resolves to the newly created pipeline

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.createPipeline(/* CreateIngestionPipelineRequest */);
console.log(result);
```
