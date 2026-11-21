---
title: listPipelines
---

# `listPipelines`

```typescript
client.memoryIngestion.listPipelines(params?: Record<string, unknown>): Promise<IngestionPipeline[]>
```

Lists all ingestion pipelines with optional filtering.

Returns the collection of configured ingestion pipelines. Each pipeline defines a
sequence of processing steps for transforming raw data into memory entries.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering and pagination |

## Returns

`Promise<IngestionPipeline[]>` — A promise that resolves to an array of ingestion pipelines

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.listPipelines();
console.log(result);
```
