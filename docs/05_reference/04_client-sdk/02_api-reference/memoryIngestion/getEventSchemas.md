---
title: getEventSchemas
---

# `getEventSchemas`

```typescript
client.memoryIngestion.getEventSchemas(): Promise<IngestionEventSchema[]>
```

Retrieves all event schemas that define the structure of ingestion events.

Returns the schema definitions for each event type emitted by the ingestion system,
describing the fields and data types contained in each event.

## Parameters

_No parameters._

## Returns

`Promise<IngestionEventSchema[]>` — A promise that resolves to an array of event schema definitions

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.getEventSchemas();
console.log(result);
```
