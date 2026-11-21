---
title: calendar
---

# calendar

Calendar events. Access via `client.sockets.calendar`.

All socket modules extend `TypedEventEmitter` and provide `.on()`, `.off()`, `.once()` for event listening.

## Events

Listen for events using `client.sockets.calendar.on(event, handler)`:

| Event |
|---|
| `calendar:create-event:response` |
| `calendar:update-event:response` |
| `calendar:delete-event:response` |
| `calendar:get-event:response` |
| `calendar:list-events:response` |
| `calendar:get-upcoming:response` |
| `calendar:rsvp:response` |
| `calendar:get-status:response` |
| `message` |
| `error` |
| `connected` |
| `disconnected` |

```typescript
client.sockets.calendar.on('calendar:create-event:response', (data) => {
  console.log(data);
});
```

## Send Methods

| Method |
|---|
| `createEvent()` |
| `updateEvent()` |
| `deleteEvent()` |
| `getEvent()` |
| `listEvents()` |
| `getUpcoming()` |
| `rsvp()` |
| `getStatus()` |

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

// Listen for events
client.sockets.calendar.on('calendar:create-event:response', (data) => {
  console.log('calendar:create-event:response:', data);
});

// Send
client.sockets.calendar.createEvent();
```
