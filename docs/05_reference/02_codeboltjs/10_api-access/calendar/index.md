---
sidebar_position: 1
title: Calendar Module
---

# Calendar

Create and manage Codebolt calendar events and query upcoming events.

## When to use it

Record a meeting or deadline, find it in a date range, and mark it complete when its work is done. Add a recurrence or reminder when a single event should repeat or notify someone.

## Examples

### Quick Start

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple event
  const event = await codebolt.calendar.createEvent({
    title: 'Team Standup',
    description: 'Daily sync meeting',
    eventType: 'meeting',
    startTime: '2026-01-20T10:00:00Z',
    endTime: '2026-01-20T10:30:00Z',
    hasDuration: true,
    reminder: {
      enabled: true,
      minutesBefore: 15
    }
  });

  // List upcoming events
  const upcoming = await codebolt.calendar.getUpcomingEvents({
    withinMinutes: 60
  });

  // Mark event as complete
  if (event.data == null) throw new Error('The response is missing data.');
  await codebolt.calendar.markEventComplete({
    eventId: event.data.event.id
  });
});
```

### Generic Event

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.calendar.createEvent({
    title: 'Project Deadline',
    eventType: 'generic',
    startTime: '2026-01-31T17:00:00Z'
  });
});
```

### Meeting

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.calendar.createEvent({
    title: 'Sprint Planning',
    eventType: 'meeting',
    startTime: '2026-01-20T14:00:00Z',
    endTime: '2026-01-20T16:00:00Z',
    hasDuration: true,
    agenda: 'Plan tasks for next sprint',
    participants: [
      {
        id: 'user-123',
        name: 'John Doe',
        type: 'user'
      }
    ]
  });
});
```

### Reminder

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.calendar.createEvent({
    title: 'Review PR',
    eventType: 'reminder',
    startTime: '2026-01-20T09:00:00Z',
    reminder: {
      enabled: true,
      minutesBefore: 30
    }
  });
});
```

### Deadline

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.calendar.createEvent({
    title: 'Feature Release',
    eventType: 'deadline',
    startTime: '2026-01-31T23:59:59Z',
    tags: ['release', 'milestone']
  });
});
```

### Check (Automated)

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.calendar.createEvent({
    title: 'Health Check',
    eventType: 'check',
    checkType: 'api',
    startTime: '2026-01-20T08:00:00Z',
    isRecurring: true,
    cronExpression: '0 8 * * *', // Daily at 8 AM
    metadata: {
      endpoint: '/api/health'
    }
  });
});
```

### Milestone

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  await codebolt.calendar.createEvent({
    title: 'Beta Launch',
    eventType: 'milestone',
    startTime: '2026-02-01T00:00:00Z',
    description: 'Public beta release'
  });
});
```

### Recurring Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Daily standup at 10 AM
  await codebolt.calendar.createEvent({
    title: 'Daily Standup',
    eventType: 'meeting',
    startTime: '2026-01-20T10:00:00Z',
    endTime: '2026-01-20T10:30:00Z',
    hasDuration: true,
    isRecurring: true,
    cronExpression: '0 10 * * *', // Every day at 10 AM
    recurrenceEndTime: '2026-12-31T23:59:59Z'
  });

  // Weekly review every Friday
  await codebolt.calendar.createEvent({
    title: 'Weekly Review',
    eventType: 'meeting',
    startTime: '2026-01-20T16:00:00Z',
    isRecurring: true,
    cronExpression: '0 16 * * 5', // Every Friday at 4 PM
    recurrenceEndTime: '2026-06-30T23:59:59Z'
  });

  // Monthly backup on first day
  await codebolt.calendar.createEvent({
    title: 'Monthly Backup',
    eventType: 'check',
    checkType: 'api',
    startTime: '2026-01-20T02:00:00Z',
    isRecurring: true,
    cronExpression: '0 2 1 * *', // First day of every month at 2 AM
    recurrenceEndTime: '2026-12-31T23:59:59Z'
  });
});
```

### Adding Participants

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const event = await codebolt.calendar.createEvent({
    title: 'Sprint Review',
    eventType: 'meeting',
    startTime: '2026-01-20T14:00:00Z',
    endTime: '2026-01-20T16:00:00Z',
    hasDuration: true,
    participants: [
      {
        id: 'user-123',
        name: 'Alice Johnson',
        type: 'user'
      },
      {
        id: 'agent-456',
        name: 'Code Reviewer Agent',
        type: 'agent',
        agentExecutionId: 'exec-789',
        threadId: 'thread-101'
      },
      {
        id: 'team-202',
        name: 'Development Team',
        type: 'team'
      },
      {
        id: 'swarm-303',
        name: 'Frontend Swarm',
        type: 'swarm'
      }
    ]
  });
});
```

### RSVP Management

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Accept an event
  await codebolt.calendar.rsvp({
    eventId: 'event-123',
    participantId: 'user-123',
    status: 'accepted'
  });

  // Decline an event
  await codebolt.calendar.rsvp({
    eventId: 'event-123',
    participantId: 'user-456',
    status: 'declined'
  });
});
```

### Filter by Type

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const meetings = await codebolt.calendar.listEvents({
    eventTypes: ['meeting'],
    startDate: '2026-01-01T00:00:00Z',
    endDate: '2026-01-31T23:59:59Z'
  });
});
```

### Filter by Participant

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const myEvents = await codebolt.calendar.listEvents({
    participantId: 'user-123',
    includeRecurrences: true
  });
});
```

### Filter by Swarm

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const swarmEvents = await codebolt.calendar.listEvents({
    swarmId: 'swarm-303'
  });
});
```

### Search by Tags

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const releaseEvents = await codebolt.calendar.listEvents({
    tags: ['release', 'milestone']
  });
});
```

### Text Search

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const searchResults = await codebolt.calendar.listEvents({
    search: 'sprint'
  });
});
```

### Daily Standup Automation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create recurring daily standup
  const standup = await codebolt.calendar.createEvent({
    title: 'Daily Standup',
    description: 'Team sync meeting',
    eventType: 'meeting',
    startTime: '2026-01-20T09:00:00Z',
    endTime: '2026-01-20T09:15:00Z',
    hasDuration: true,
    isRecurring: true,
    cronExpression: '0 9 * * 1-5', // Weekdays at 9 AM
    reminder: {
      enabled: true,
      minutesBefore: 5
    },
    participants: [
      {
        id: 'team-dev',
        name: 'Development Team',
        type: 'team'
      }
    ]
  });
});
```

### Deadline Tracking

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create project deadline
  const deadline = await codebolt.calendar.createEvent({
    title: 'Q1 Release',
    eventType: 'deadline',
    startTime: '2026-03-31T23:59:59Z',
    description: 'Q1 2026 Product Release',
    reminder: {
      enabled: true,
      minutesBefore: 1440 // 1 day before
    },
    tags: ['release', 'q1', 'milestone']
  });

  // Check upcoming deadlines
  const upcomingDeadlines = await codebolt.calendar.listEvents({
    eventTypes: ['deadline'],
    startDate: new Date().toISOString(),
    completed: false
  });
});
```

### Automated Health Checks

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create automated health check event
  const healthCheck = await codebolt.calendar.createEvent({
    title: 'API Health Check',
    eventType: 'check',
    checkType: 'api',
    startTime: '2026-01-20T00:00:00Z',
    isRecurring: true,
    cronExpression: '0 */4 * * *', // Every 4 hours
    metadata: {
      endpoint: '/api/health',
      method: 'GET',
      expectedStatus: 200
    }
  });
});
```

### Batch Complete Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all triggered events and mark complete at once
  const result = await codebolt.calendar.getTriggeredEventsAndMarkComplete();

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Processed ${result.data.count} events`);
  result.data.events.forEach(event => {
    console.log(`- ${event.title}: ${event.eventType}`);
  });
});
```

### Event Search & Filtering

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find all incomplete events this week
  const thisWeek = await codebolt.calendar.listEvents({
    startDate: '2026-01-19T00:00:00Z',
    endDate: '2026-01-25T23:59:59Z',
    completed: false,
    includeCompleted: false
  });

  // Find all events for a specific user
  const userEvents = await codebolt.calendar.listEvents({
    participantId: 'user-123',
    includeRecurrences: true
  });

  // Find high-priority events
  const priorityEvents = await codebolt.calendar.listEvents({
    tags: ['urgent', 'priority'],
    completed: false
  });
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  try {
    const event = await codebolt.calendar.createEvent({
      title: 'New Event',
      startTime: '2026-01-20T10:00:00Z'
    });

    if (event.success) {
      if (event.data == null) throw new Error('The response is missing data.');
      console.log('Event created:', event.data.event);
    } else {
      console.error('Failed to create event:', event.error);
    }
  } catch (error) {
    console.error('Error creating event:', error);
  }
});
```

## SDK methods

### createEvent

[`createEvent`](createEvent.md) · Create a new calendar event.

### updateEvent

[`updateEvent`](updateEvent.md) · Update an existing calendar event.

### deleteEvent

[`deleteEvent`](deleteEvent.md) · Delete a calendar event.

### getEvent

[`getEvent`](getEvent.md) · Get a single calendar event by ID.

### listEvents

[`listEvents`](listEvents.md) · List calendar events with optional filters.

### getEventsInRange

Get events within a specific date range.

```text
codebolt.calendar.getEventsInRange(params: IGetEventsInRangeParams): Promise<IGetEventsInRangeResponse>
```

### getUpcomingEvents

[`getUpcomingEvents`](getUpcomingEvents.md) · Get upcoming events within a specified time window.

### getTriggeredEvents

Get triggered events (events whose start time has passed).

```text
codebolt.calendar.getTriggeredEvents(params?: IGetTriggeredEventsParams): Promise<IGetTriggeredEventsResponse>
```

### markEventComplete

[`markEventComplete`](markEventComplete.md) · Mark a single event as complete.

### markEventsComplete

Mark multiple events as complete.

```text
codebolt.calendar.markEventsComplete(params: IMarkEventsCompleteParams): Promise<IMarkEventsCompleteResponse>
```

### getTriggeredEventsAndMarkComplete

Get triggered events and mark them all as complete in one operation.

```text
codebolt.calendar.getTriggeredEventsAndMarkComplete(): Promise<IGetTriggeredEventsAndMarkCompleteResponse>
```

### rsvp

[`rsvp`](rsvp.md) · RSVP to a calendar event.

### getStatus

Get the calendar scheduler status.

```text
codebolt.calendar.getStatus(): Promise<IGetStatusResponse>
```
