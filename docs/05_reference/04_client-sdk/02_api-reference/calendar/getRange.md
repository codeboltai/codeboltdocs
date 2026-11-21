---
title: getRange
---

# `getRange`

```typescript
client.calendar.getRange(params?: CalendarFilterOptions): Promise<CalendarEvent[]>
```

Retrieves calendar events within a date range.

Returns full event objects for all events that overlap with the
specified date range.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options including date range boundaries |

## Returns

`Promise<CalendarEvent[]>` — A promise that resolves to an array of CalendarEvent objects in the range

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.getRange();
console.log(result);
```
