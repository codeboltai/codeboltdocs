---
title: query
---

# `query`

```typescript
client.eventLog.query(data: EventLogQueryRequest): Promise<EventLogEvent[]>
```

Queries events using filter criteria.

Searches across event log instances to find events matching specific
types, time ranges, or other filter conditions.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EventLogQueryRequest` | Yes | Query parameters specifying filters and sorting |

## Returns

`Promise<EventLogEvent[]>` — A promise that resolves to an array of matching  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.eventLog.query(/* EventLogQueryRequest */);
console.log(result);
```
