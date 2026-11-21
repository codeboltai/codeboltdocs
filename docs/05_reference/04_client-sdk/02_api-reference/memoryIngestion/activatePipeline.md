---
title: activatePipeline
---

# `activatePipeline`

```typescript
client.memoryIngestion.activatePipeline(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Activates a disabled ingestion pipeline.

Enables the pipeline so it can be triggered by events or manual execution. A pipeline
must be activated before it will process any data.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to activate |
| `data` | `Record<string, unknown>` | No | Optional activation parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the pipeline has been activated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.activatePipeline('id');
console.log(result);
```
