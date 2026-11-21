---
title: listEvents
---

# `listEvents`

```typescript
client.memoryIngestion.listEvents(params?: Record<string, unknown>): Promise<IngestionEvent[]>
```

Lists ingestion events with optional filtering.

Returns records of ingestion pipeline executions, including success/failure status,
processing metrics, and error details. Useful for monitoring and debugging pipelines.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering events |

## Returns

`Promise<IngestionEvent[]>` — A promise that resolves to an array of ingestion events

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.listEvents();
console.log(result);
```
