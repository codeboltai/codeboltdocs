---
title: getEventSchema
---

# `getEventSchema`

```typescript
client.memoryIngestion.getEventSchema(eventType: string): Promise<IngestionEventSchema>
```

Retrieves the schema for a specific ingestion event type.

Returns the field definitions and validation rules for a single event type,
useful for building event handlers or display components.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventType` | `string` | Yes | The event type identifier to get the schema for |

## Returns

`Promise<IngestionEventSchema>` — A promise that resolves to the event schema definition

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.memoryIngestion.getEventSchema('eventType');
console.log(result);
```
