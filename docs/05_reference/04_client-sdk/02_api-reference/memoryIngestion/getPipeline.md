---
title: getPipeline
---

# `getPipeline`

```typescript
client.memoryIngestion.getPipeline(id: string): Promise<IngestionPipeline>
```

Retrieves a specific ingestion pipeline by its unique identifier.

Returns the full pipeline configuration including its processor chain, trigger
conditions, and execution history.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to retrieve |

## Returns

`Promise<IngestionPipeline>` — A promise that resolves to the ingestion pipeline details

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.getPipeline('id');
console.log(result);
```
