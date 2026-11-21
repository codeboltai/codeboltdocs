---
title: getUpcoming
---

# `getUpcoming`

```typescript
client.calendar.getUpcoming(params?: CalendarFilterOptions): Promise<CalendarEvent[]>
```

Retrieves upcoming calendar events.

Returns events scheduled in the near future, sorted chronologically.
Useful for displaying "what's next" views.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options to customize the results |

## Returns

`Promise<CalendarEvent[]>` — A promise that resolves to an array of upcoming CalendarEvent objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.getUpcoming();
console.log(result);
```
