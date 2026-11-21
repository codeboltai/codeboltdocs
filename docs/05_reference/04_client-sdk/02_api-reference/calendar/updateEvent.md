---
title: updateEvent
---

# `updateEvent`

```typescript
client.calendar.updateEvent(id: string, data: UpdateCalendarEventRequest): Promise<CalendarEvent>
```

Updates a calendar event.

Modifies the properties of an existing calendar event such as
its title, time, or configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event to update |
| `data` | `UpdateCalendarEventRequest` | Yes | The fields to update on the event |

## Returns

`Promise<CalendarEvent>` — A promise that resolves to the updated CalendarEvent

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.updateEvent('id', /* UpdateCalendarEventRequest */);
console.log(result);
```
