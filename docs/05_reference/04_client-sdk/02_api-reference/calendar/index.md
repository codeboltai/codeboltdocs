---
title: Calendar API
---

# Calendar API

Calendar API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`completeEvent`](./completeEvent) | Marks a specific calendar event as complete. |
| [`completeEvents`](./completeEvents) | Bulk-completes multiple calendar events. |
| [`completeTriggered`](./completeTriggered) | Marks triggered events as complete. |
| [`createEvent`](./createEvent) | Creates a new calendar event. |
| [`deleteEvent`](./deleteEvent) | Deletes a calendar event. |
| [`getEvent`](./getEvent) | Retrieves a specific calendar event by ID. |
| [`getIndex`](./getIndex) | Retrieves the calendar index. |
| [`getRange`](./getRange) | Retrieves calendar events within a date range. |
| [`getStatus`](./getStatus) | Retrieves the calendar service status. |
| [`getTriggered`](./getTriggered) | Retrieves triggered calendar events. |
| [`getUpcoming`](./getUpcoming) | Retrieves upcoming calendar events. |
| [`listEvents`](./listEvents) | Retrieves all calendar events as summaries. |
| [`rsvp`](./rsvp) | Sends an RSVP response to a calendar event. |
| [`updateEvent`](./updateEvent) | Updates a calendar event. |

## Methods

---

### `completeEvent`

```typescript
client.calendar.completeEvent(id: string, data?: CompleteEventRequest): Promise<void>
```

Marks a specific calendar event as complete.

Records the completion of an event, optionally with completion
details such as outcome or notes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event to complete |
| `data` | `CompleteEventRequest` | No | Optional completion details |

**Returns:** `Promise<void>` — A promise that resolves when the event has been marked complete

[Full reference →](./completeEvent)

---

### `completeEvents`

```typescript
client.calendar.completeEvents(data: BulkCompleteEventsRequest): Promise<void>
```

Bulk-completes multiple calendar events.

Marks multiple events as complete in a single operation, useful for
batch processing of finished events.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `BulkCompleteEventsRequest` | Yes | The bulk completion payload |

**Returns:** `Promise<void>` — A promise that resolves when all specified events have been completed

[Full reference →](./completeEvents)

---

### `completeTriggered`

```typescript
client.calendar.completeTriggered(data: CompleteTriggeredRequest): Promise<void>
```

Marks triggered events as complete.

Acknowledges and completes triggered events, removing them from
the pending triggered events list.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CompleteTriggeredRequest` | Yes | The completion payload identifying which triggered events to complete |

**Returns:** `Promise<void>` — A promise that resolves when the events have been marked complete

[Full reference →](./completeTriggered)

---

### `createEvent`

```typescript
client.calendar.createEvent(data: CreateCalendarEventRequest): Promise<CalendarEvent>
```

Creates a new calendar event.

Schedules a new event that can trigger agent actions or serve as
a coordination point for workflows.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCalendarEventRequest` | Yes | The event creation payload |

**Returns:** `Promise<CalendarEvent>` — A promise that resolves to the newly created CalendarEvent

[Full reference →](./createEvent)

---

### `deleteEvent`

```typescript
client.calendar.deleteEvent(id: string): Promise<void>
```

Deletes a calendar event.

Permanently removes the specified calendar event.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event to delete |

**Returns:** `Promise<void>` — A promise that resolves when the event has been deleted

[Full reference →](./deleteEvent)

---

### `getEvent`

```typescript
client.calendar.getEvent(id: string): Promise<CalendarEvent>
```

Retrieves a specific calendar event by ID.

Returns the full event details including all metadata, participants,
and configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the calendar event |

**Returns:** `Promise<CalendarEvent>` — A promise that resolves to the CalendarEvent object

[Full reference →](./getEvent)

---

### `getIndex`

```typescript
client.calendar.getIndex(params?: CalendarFilterOptions): Promise<CalendarIndexEntry[]>
```

Retrieves the calendar index.

Returns an indexed view of calendar events, optimized for fast
lookups and navigation across large numbers of events.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options |

**Returns:** `Promise<CalendarIndexEntry[]>` — A promise that resolves to an array of CalendarIndexEntry objects

[Full reference →](./getIndex)

---

### `getRange`

```typescript
client.calendar.getRange(params?: CalendarFilterOptions): Promise<CalendarEvent[]>
```

Retrieves calendar events within a date range.

Returns full event objects for all events that overlap with the
specified date range.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options including date range boundaries |

**Returns:** `Promise<CalendarEvent[]>` — A promise that resolves to an array of CalendarEvent objects in the range

[Full reference →](./getRange)

---

### `getStatus`

```typescript
client.calendar.getStatus(): Promise<CalendarStatus>
```

Retrieves the calendar service status.

Returns health and configuration information about the calendar
subsystem, including whether triggers are active.

_No parameters._

**Returns:** `Promise<CalendarStatus>` — A promise that resolves to the CalendarStatus object

[Full reference →](./getStatus)

---

### `getTriggered`

```typescript
client.calendar.getTriggered(params?: CalendarFilterOptions): Promise<CalendarEvent[]>
```

Retrieves triggered calendar events.

Returns events whose trigger conditions have been met and are
pending action or acknowledgment.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options |

**Returns:** `Promise<CalendarEvent[]>` — A promise that resolves to an array of triggered CalendarEvent objects

[Full reference →](./getTriggered)

---

### `getUpcoming`

```typescript
client.calendar.getUpcoming(params?: CalendarFilterOptions): Promise<CalendarEvent[]>
```

Retrieves upcoming calendar events.

Returns events scheduled in the near future, sorted chronologically.
Useful for displaying "what's next" views.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options to customize the results |

**Returns:** `Promise<CalendarEvent[]>` — A promise that resolves to an array of upcoming CalendarEvent objects

[Full reference →](./getUpcoming)

---

### `listEvents`

```typescript
client.calendar.listEvents(params?: CalendarFilterOptions): Promise<CalendarEventSummary[]>
```

Retrieves all calendar events as summaries.

Returns lightweight summary representations of all events,
suitable for calendar overview displays.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CalendarFilterOptions` | No | Optional filter options for narrowing results |

**Returns:** `Promise<CalendarEventSummary[]>` — A promise that resolves to an array of CalendarEventSummary objects

[Full reference →](./listEvents)

---

### `rsvp`

```typescript
client.calendar.rsvp(id: string, data: CalendarRSVPRequest): Promise<void>
```

Sends an RSVP response to a calendar event.

Records a participant's attendance response (accept, decline, tentative)
for the specified event.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the calendar event |
| `data` | `CalendarRSVPRequest` | Yes | The RSVP payload |

**Returns:** `Promise<void>` — A promise that resolves when the RSVP has been recorded

[Full reference →](./rsvp)

---

### `updateEvent`

```typescript
client.calendar.updateEvent(id: string, data: UpdateCalendarEventRequest): Promise<CalendarEvent>
```

Updates a calendar event.

Modifies the properties of an existing calendar event such as
its title, time, or configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the event to update |
| `data` | `UpdateCalendarEventRequest` | Yes | The fields to update on the event |

**Returns:** `Promise<CalendarEvent>` — A promise that resolves to the updated CalendarEvent

[Full reference →](./updateEvent)

