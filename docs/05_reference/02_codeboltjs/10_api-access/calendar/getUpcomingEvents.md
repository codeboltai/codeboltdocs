---
name: getUpcomingEvents
description: Get upcoming events within a specified time window.
cbbaseinfo:
  description: Get upcoming events within a specified time window.
data:
  name: getUpcomingEvents
  category: calendar
  link: getUpcomingEvents.md
---

# getUpcomingEvents

```text
codebolt.calendar.getUpcomingEvents(params?: IGetUpcomingEventsParams): Promise<IGetUpcomingEventsResponse>
```

Get upcoming events within a specified time window

## Parameters

- `params` — Optional parameters including withinMinutes (default: 60)

## Returns

Promise resolving to upcoming events

## When to use it

Populate an upcoming-events list or prepare for the next meetings and deadlines.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events happening soon
  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 15
  });

  if (result.success && result.data) {
    console.log('Events in the next 15 minutes:');
    result.data.events.forEach(event => {
      const startTime = new Date(event.startTime);
      const timeUntil = startTime.toLocaleTimeString();
      console.log(`[${timeUntil}] ${event.title} (${event.eventType})`);
    });
  }
});
```

## More examples

### Get Default Upcoming Events (Next 60 Minutes)

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events in the next hour
  const result = await codebolt.calendar.getUpcomingEvents();

  if (result.success && result.data) {
    console.log(`Found ${result.data.count} upcoming events`);
    result.data.events.forEach(event => {
      const startTime = new Date(event.startTime);
      const minutesUntil = Math.floor((startTime.getTime() - Date.now()) / 60000);
      console.log(`${minutesUntil}min: ${event.title}`);
    });
  }
});
```

### Get Today's Remaining Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all events for the rest of the day
  const now = new Date();
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));
  const minutesUntilEndOfDay = Math.floor((endOfDay.getTime() - Date.now()) / 60000);

  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: minutesUntilEndOfDay
  });

  if (result.success && result.data) {
    console.log(`Events remaining today: ${result.data.count}`);
    result.data.events.forEach(event => {
      console.log(`${new Date(event.startTime).toLocaleTimeString()} - ${event.title}`);
    });
  }
});
```

### Check for Immediate Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Check if there are any events in the next 5 minutes
  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 5
  });

  if (result.success && result.data) {
    if (result.data.count > 0) {
      console.log('🔔 You have upcoming events soon:');
      result.data.events.forEach(event => {
        const startTime = new Date(event.startTime);
        const minutesUntil = Math.floor((startTime.getTime() - Date.now()) / 60000);
        console.log(`  In ${minutesUntil}min: ${event.title}`);
      });
    } else {
      console.log('No immediate events');
    }
  }
});
```

### Prepare for Upcoming Meetings

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get upcoming meetings only
  const allUpcoming = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 120
  });

  if (allUpcoming.success && allUpcoming.data) {
    const meetings = allUpcoming.data.events.filter(
      event => event.eventType === 'meeting'
    );

    if (meetings.length > 0) {
      console.log('Upcoming meetings:');
      meetings.forEach(meeting => {
        const startTime = new Date(meeting.startTime);
        const timeUntil = Math.floor((startTime.getTime() - Date.now()) / 60000);

        console.log(`\n${meeting.title}`);
        console.log(`  Starts in: ${timeUntil} minutes`);
        console.log(`  Agenda: ${meeting.agenda || 'No agenda'}`);

        if (meeting.participants && meeting.participants.length > 0) {
          console.log(`  Participants: ${meeting.participants.length}`);
        }
      });
    }
  }
});
```

### Sort by Urgency

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get and sort upcoming events by time
  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 480 // 8 hours
  });

  if (result.success && result.data) {
    const sorted = result.data.events.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });

    console.log('Upcoming events (sorted):');
    sorted.forEach((event, index) => {
      const startTime = new Date(event.startTime);
      const hoursUntil = ((startTime.getTime() - Date.now()) / 3600000).toFixed(1);
      console.log(`${index + 1}. ${event.title} (in ${hoursUntil}h)`);
    });
  }
});
```

### Filter Out Completed Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get only incomplete upcoming events
  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 60
  });

  if (result.success && result.data) {
    const incomplete = result.data.events.filter(event => !event.completed);

    console.log(`Incomplete upcoming events: ${incomplete.length}`);
    incomplete.forEach(event => {
      const startTime = new Date(event.startTime);
      console.log(`${startTime.toLocaleTimeString()}: ${event.title}`);
    });
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Get events for dashboard
async function getDashboardEvents() {
  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 240 // 4 hours
  });

  if (result.success && result.data) {
    return result.data.events.map(event => ({
      id: event.id,
      title: event.title,
      type: event.eventType,
      startTime: new Date(event.startTime),
      timeUntil: Math.floor(
        (new Date(event.startTime).getTime() - Date.now()) / 60000
      ),
      participants: event.participants?.length || 0
    }));
  }

  return [];
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Prepare for upcoming meetings
async function prepareForMeetings() {
  const result = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 30
  });

  if (result.success && result.data) {
    const meetings = result.data.events.filter(
      event => event.eventType === 'meeting' && !event.completed
    );

    for (const meeting of meetings) {
      console.log(`Preparing for: ${meeting.title}`);

      if (meeting.agenda) {
        console.log('Reviewing agenda...');
        // Load agenda items
      }

      if (meeting.participants) {
        console.log('Checking participant availability...');
        // Verify participants
      }

      if (meeting.description) {
        console.log('Reading meeting context...');
        // Load background materials
      }
    }
  }
}
```
