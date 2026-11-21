---
name: createEvent
description: Create a new calendar event.
cbbaseinfo:
  description: Create a new calendar event.
data:
  name: createEvent
  category: calendar
  link: createEvent.md
---

# createEvent

```text
codebolt.calendar.createEvent(params: ICreateEventParams): Promise<ICreateEventResponse>
```

Create a new calendar event

## Parameters

- `params` — Event creation parameters

## Returns

Promise resolving to the created event

## When to use it

Schedule a meeting, milestone, or reminder. Use start and end times to represent an event with duration.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Track project milestones
  await codebolt.calendar.createEvent({
    title: 'Alpha Release',
    eventType: 'milestone',
    startTime: '2026-02-01T00:00:00Z',
    description: 'First public alpha release',
    tags: ['milestone', 'alpha']
  });
});
```

## More examples

### Basic Event Creation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple event
  const result = await codebolt.calendar.createEvent({
    title: 'Team Meeting',
    startTime: '2026-01-20T10:00:00Z'
  });

  if (result.success) {
    if (result.data == null) throw new Error('The response is missing data.');
    console.log('Event created:', result.data.event.id);
    console.log('Title:', result.data.event.title);
    console.log('Start:', result.data.event.startTime);
  }
});
```

### Meeting with Duration and Participants

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a meeting with participants
  const meeting = await codebolt.calendar.createEvent({
    title: 'Sprint Planning',
    description: 'Plan tasks for Sprint 23',
    eventType: 'meeting',
    startTime: '2026-01-20T14:00:00Z',
    endTime: '2026-01-20T16:00:00Z',
    hasDuration: true,
    agenda: 'Review backlog and assign tasks',
    reminder: {
      enabled: true,
      minutesBefore: 30
    },
    participants: [
      {
        id: 'user-123',
        name: 'Alice Johnson',
        type: 'user'
      },
      {
        id: 'user-456',
        name: 'Bob Smith',
        type: 'user'
      },
      {
        id: 'agent-789',
        name: 'Scribe Agent',
        type: 'agent',
        agentExecutionId: 'exec-abc',
        threadId: 'thread-xyz'
      }
    ]
  });

  if (meeting.data == null) throw new Error('The response is missing data.');
  if (meeting.data.event.participants == null) throw new Error('The response is missing participants.');
  console.log('Meeting created with', meeting.data.event.participants.length, 'participants');
});
```

### Recurring Daily Standup

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a recurring daily standup
  const standup = await codebolt.calendar.createEvent({
    title: 'Daily Standup',
    description: 'Team sync meeting',
    eventType: 'meeting',
    startTime: '2026-01-20T09:00:00Z',
    endTime: '2026-01-20T09:15:00Z',
    hasDuration: true,
    isRecurring: true,
    cronExpression: '0 9 * * 1-5', // Weekdays at 9 AM
    recurrenceEndTime: '2026-12-31T23:59:59Z',
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
    ],
    tags: ['standup', 'recurring', 'team']
  });

  console.log('Recurring standup created');
});
```

### Deadline with Reminder

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a deadline event
  const deadline = await codebolt.calendar.createEvent({
    title: 'Feature Release',
    description: 'Q1 2026 Product Release',
    eventType: 'deadline',
    startTime: '2026-03-31T23:59:59Z',
    reminder: {
      enabled: true,
      minutesBefore: 1440 // 1 day before
    },
    tags: ['release', 'milestone', 'q1'],
    metadata: {
      version: '2.0.0',
      releaseManager: 'user-123'
    }
  });

  console.log('Deadline created with reminder');
});
```

### Automated Health Check

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an automated check event
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
      expectedStatus: 200,
      timeout: 5000
    },
    tags: ['automated', 'health', 'monitoring']
  });

  console.log('Health check scheduled');
});
```

### All-Day Event

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an all-day event
  const allDayEvent = await codebolt.calendar.createEvent({
    title: 'Company Holiday',
    description: 'Office closed for New Year',
    eventType: 'generic',
    startTime: '2026-12-25T00:00:00Z',
    allDay: true,
    tags: ['holiday', 'company']
  });

  console.log('All-day event created');
});
```

### Event Created by Agent

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create an event as an agent
  const agentEvent = await codebolt.calendar.createEvent({
    title: 'Code Review Reminder',
    description: 'Review PR #123',
    eventType: 'reminder',
    startTime: '2026-01-20T14:00:00Z',
    createdById: 'agent-456',
    createdByName: 'Reminder Agent',
    createdByType: 'agent',
    agentExecutionId: 'exec-789',
    threadId: 'thread-101',
    reminder: {
      enabled: true,
      minutesBefore: 0
    }
  });

  if (agentEvent.data == null) throw new Error('The response is missing data.');
  console.log('Agent created event:', agentEvent.data.event.id);
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle creation errors
  try {
    const result = await codebolt.calendar.createEvent({
      title: 'Test Event',
      startTime: 'invalid-date' // Invalid date format
    });

    if (!result.success) {
      if (result.error == null) throw new Error('The response is missing error.');
      console.error('Failed to create event:', result.error.message);
      // Handle specific error codes
      if (result.error.code === 'INVALID_TIMESTAMP') {
        console.error('Invalid timestamp format');
      }
    }
  } catch (error) {
    console.error('Exception during event creation:', error);
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Set up a reminder
  await codebolt.calendar.createEvent({
    title: 'Follow up with client',
    eventType: 'reminder',
    startTime: '2026-01-20T10:00:00Z',
    reminder: {
      enabled: true,
      minutesBefore: 60
    },
    metadata: {
      clientId: 'client-123',
      contactInfo: 'client@example.com'
    }
  });
});
```
