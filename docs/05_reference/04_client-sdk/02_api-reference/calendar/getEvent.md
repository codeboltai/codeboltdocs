---
title: getEvent
---

# `getEvent`

```typescript
client.calendar.getEvent(id: string): Promise<CalendarEvent>
```

Retrieves a specific calendar event by ID.

Returns the full event details including all metadata, participants,
and configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the calendar event |

## Returns

`Promise<CalendarEvent>` — A promise that resolves to the CalendarEvent object

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.getEvent('id');
console.log(result);
```
