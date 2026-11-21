---
name: listEvents
description: List calendar events with optional filters.
cbbaseinfo:
  description: List calendar events with optional filters.
data:
  name: listEvents
  category: calendar
  link: listEvents.md
---

# listEvents

```text
codebolt.calendar.listEvents(params?: IListEventsParams): Promise<IListEventsResponse>
```

List calendar events with optional filters

## Parameters

- `params` — Optional filter parameters

## Returns

Promise resolving to list of events

## When to use it

Build an agenda with event filters. Use the date-range method when your view needs an explicit start and end.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for specific events with filters
  const results = await codebolt.calendar.listEvents({
    search: 'review',
    eventTypes: ['meeting', 'reminder'],
    completed: false,
    tags: ['priority']
  });

  if (results.success && results.data) {
    console.log(`Found ${results.data.count} priority review events`);
  }
});
```

## More examples

### List All Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all events (no filters)
  const result = await codebolt.calendar.listEvents();

  if (result.success && result.data) {
    console.log(`Found ${result.data.count} events`);
    result.data.events.forEach(event => {
      console.log(`- ${event.title} (${event.eventType})`);
    });
  }
});
```

### Filter by Date Range

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events for this week
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const result = await codebolt.calendar.listEvents({
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString()
  });

  if (result.success && result.data) {
    console.log(`Events this week: ${result.data.count}`);
    result.data.events.forEach(event => {
      console.log(`${new Date(event.startTime).toLocaleDateString()}: ${event.title}`);
    });
  }
});
```

### Filter by Event Type

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get only meetings
  const meetings = await codebolt.calendar.listEvents({
    eventTypes: ['meeting']
  });

  if (meetings.success && meetings.data) {
    console.log(`Upcoming meetings: ${meetings.data.count}`);
    meetings.data.events.forEach(meeting => {
      console.log(`- ${meeting.title}`);
      if (meeting.agenda) {
        console.log(`  Agenda: ${meeting.agenda}`);
      }
    });
  }

  // Get deadlines only
  const deadlines = await codebolt.calendar.listEvents({
    eventTypes: ['deadline'],
    completed: false
  });

  if (deadlines.success && deadlines.data) {
    console.log(`Pending deadlines: ${deadlines.data.count}`);
  }
});
```

### Filter by Participant

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events for a specific user
  const myEvents = await codebolt.calendar.listEvents({
    participantId: 'user_123',
    includeRecurrences: true
  });

  if (myEvents.success && myEvents.data) {
    console.log(`My events: ${myEvents.data.count}`);
    myEvents.data.events.forEach(event => {
      console.log(`- ${event.title} at ${new Date(event.startTime).toLocaleString()}`);
    });
  }

  // Get events for a swarm
  const swarmEvents = await codebolt.calendar.listEvents({
    swarmId: 'swarm_frontend'
  });

  if (swarmEvents.success && swarmEvents.data) {
    console.log(`Swarm events: ${swarmEvents.data.count}`);
  }
});
```

### Filter by Tags

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events with specific tags
  const releaseEvents = await codebolt.calendar.listEvents({
    tags: ['release', 'milestone']
  });

  if (releaseEvents.success && releaseEvents.data) {
    console.log('Release milestones:');
    releaseEvents.data.events.forEach(event => {
      console.log(`- ${event.title}`);
      console.log(`  Tags: ${event.tags?.join(', ')}`);
    });
  }
});
```

### Search Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Search for events containing specific text
  const searchResults = await codebolt.calendar.listEvents({
    search: 'sprint'
  });

  if (searchResults.success && searchResults.data) {
    console.log(`Found ${searchResults.data.count} events matching "sprint":`);
    searchResults.data.events.forEach(event => {
      console.log(`- ${event.title}`);
      if (event.description) {
        console.log(`  ${event.description.substring(0, 100)}...`);
      }
    });
  }
});
```

### Filter by Completion Status

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get only incomplete events
  const incomplete = await codebolt.calendar.listEvents({
    completed: false,
    includeCompleted: false
  });

  if (incomplete.success && incomplete.data) {
    console.log(`Incomplete events: ${incomplete.data.count}`);
    incomplete.data.events.forEach(event => {
      const startTime = new Date(event.startTime);
      const isOverdue = startTime < new Date();
      console.log(`- ${event.title} ${isOverdue ? '(OVERDUE)' : ''}`);
    });
  }

  // Get completed events
  const completed = await codebolt.calendar.listEvents({
    completed: true
  });

  if (completed.success && completed.data) {
    console.log(`Completed events: ${completed.data.count}`);
  }
});
```

### Get Triggered Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all triggered (past start time) events
  const triggered = await codebolt.calendar.listEvents({
    onlyTriggered: true,
    includeCompleted: false
  });

  if (triggered.success && triggered.data) {
    console.log(`Triggered events awaiting processing: ${triggered.data.count}`);
    triggered.data.events.forEach(event => {
      console.log(`- ${event.title} (${event.eventType})`);
      console.log(`  Triggered at: ${event.startTime}`);
    });
  }
});
```

### Complex Filter Combination

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Combine multiple filters
  const result = await codebolt.calendar.listEvents({
    startDate: '2026-01-01T00:00:00Z',
    endDate: '2026-01-31T23:59:59Z',
    eventTypes: ['meeting', 'deadline'],
    completed: false,
    participantId: 'user_123',
    tags: ['priority'],
    includeRecurrences: true
  });

  if (result.success && result.data) {
    console.log('Filtered results:');
    result.data.events.forEach(event => {
      console.log(`- ${event.title}`);
      console.log(`  Type: ${event.eventType}`);
      console.log(`  Time: ${new Date(event.startTime).toLocaleString()}`);
      console.log(`  Tags: ${event.tags?.join(', ') || 'none'}`);
    });
  }
});
```

### Events Created by Specific Agent

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events created by a specific agent
  const agentEvents = await codebolt.calendar.listEvents({
    creatorId: 'agent_review_bot'
  });

  if (agentEvents.success && agentEvents.data) {
    console.log(`Events created by agent: ${agentEvents.data.count}`);
    agentEvents.data.events.forEach(event => {
      console.log(`- ${event.title}`);
      console.log(`  Created: ${new Date(event.createdAt).toLocaleString()}`);
    });
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all events for today
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const todayEvents = await codebolt.calendar.listEvents({
    startDate: startOfDay.toISOString(),
    endDate: endOfDay.toISOString(),
    includeCompleted: false
  });

  if (todayEvents.success && todayEvents.data) {
    console.log('Today\'s Agenda:');
    todayEvents.data.events
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .forEach(event => {
        console.log(`${new Date(event.startTime).toLocaleTimeString()} - ${event.title}`);
      });
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get upcoming deadlines
  const deadlines = await codebolt.calendar.listEvents({
    eventTypes: ['deadline'],
    completed: false,
    startDate: new Date().toISOString()
  });

  if (deadlines.success && deadlines.data) {
    console.log('Upcoming Deadlines:');
    deadlines.data.events
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .forEach(event => {
        const daysUntil = Math.ceil(
          (new Date(event.startTime).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
        console.log(`${daysUntil}d: ${event.title}`);
      });
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all team meetings
  const teamMeetings = await codebolt.calendar.listEvents({
    eventTypes: ['meeting'],
    participantId: 'team_dev',
    startDate: new Date().toISOString(),
    includeRecurrences: true
  });

  if (teamMeetings.success && teamMeetings.data) {
    console.log('Team Meeting Schedule:');
    teamMeetings.data.events.forEach(meeting => {
      console.log(`${new Date(meeting.startTime).toLocaleString()}: ${meeting.title}`);
    });
  }
});
```
