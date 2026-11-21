---
title: createEvent
---

# `createEvent`

```typescript
client.calendar.createEvent(data: CreateCalendarEventRequest): Promise<CalendarEvent>
```

Creates a new calendar event.

Schedules a new event that can trigger agent actions or serve as
a coordination point for workflows.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCalendarEventRequest` | Yes | The event creation payload |

## Returns

`Promise<CalendarEvent>` — A promise that resolves to the newly created CalendarEvent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.createEvent(/* CreateCalendarEventRequest */);
console.log(result);
```
