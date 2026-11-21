---
title: listEvents
---

# `listEvents`

```typescript
client.calendar.listEvents(params?: CalendarFilterOptions): Promise<CalendarEventSummary[]>
```

Retrieves all calendar events as summaries.

Returns lightweight summary representations of all events,
suitable for calendar overview displays.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options for narrowing results |

## Returns

`Promise<CalendarEventSummary[]>` — A promise that resolves to an array of CalendarEventSummary objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.listEvents();
console.log(result);
```
