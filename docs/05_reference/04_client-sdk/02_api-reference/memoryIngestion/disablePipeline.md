---
title: disablePipeline
---

# `disablePipeline`

```typescript
client.memoryIngestion.disablePipeline(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Disables an active ingestion pipeline.

Prevents the pipeline from being triggered or executed until it is reactivated.
Any in-progress executions may continue to completion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the pipeline to disable |
| `data` | `Record<string, unknown>` | No | Optional deactivation parameters |

## Returns

`Promise<unknown>` — A promise that resolves when the pipeline has been disabled

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.disablePipeline('id');
console.log(result);
```
