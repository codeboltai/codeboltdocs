---
title: getIndex
---

# `getIndex`

```typescript
client.calendar.getIndex(params?: CalendarFilterOptions): Promise<CalendarIndexEntry[]>
```

Retrieves the calendar index.

Returns an indexed view of calendar events, optimized for fast
lookups and navigation across large numbers of events.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options |

## Returns

`Promise<CalendarIndexEntry[]>` — A promise that resolves to an array of CalendarIndexEntry objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.getIndex();
console.log(result);
```
