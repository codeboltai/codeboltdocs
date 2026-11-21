---
title: rsvp
---

# `rsvp`

```typescript
client.calendar.rsvp(id: string, data: CalendarRSVPRequest): Promise<void>
```

Sends an RSVP response to a calendar event.

Records a participant's attendance response (accept, decline, tentative)
for the specified event.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the calendar event |
| `data` | `CalendarRSVPRequest` | Yes | The RSVP payload |

## Returns

`Promise<void>` — A promise that resolves when the RSVP has been recorded

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.calendar.rsvp('id', /* CalendarRSVPRequest */);
console.log(result);
```
