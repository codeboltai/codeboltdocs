---
name: getEvent
description: Get a single calendar event by ID.
cbbaseinfo:
  description: Get a single calendar event by ID.
data:
  name: getEvent
  category: calendar
  link: getEvent.md
---

# getEvent

```text
codebolt.calendar.getEvent(params: IGetEventParams): Promise<IGetEventResponse>
```

Get a single calendar event by ID

## Parameters

- `params` — Parameters including eventId

## Returns

Promise resolving to the event

## When to use it

Load one event's saved details before displaying it or preparing an update.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Check if event exists and is accessible
  async function validateEvent(eventId: string): Promise<boolean> {
    const result = await codebolt.calendar.getEvent({ eventId });
    return result.success && result.data !== undefined;
  }
});
```

## More examples

### Basic Event Retrieval

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get an event by ID
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_abc123xyz'
  });

  if (result.success && result.data) {
    const event = result.data.event;
    console.log('Event Title:', event.title);
    console.log('Event Type:', event.eventType);
    console.log('Start Time:', event.startTime);
    console.log('Created By:', event.createdBy.name);
  }
});
```

### Display Event Details

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve and display full event details
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_meeting_001'
  });

  if (result.success && result.data) {
    const event = result.data.event;

    console.log('=== Event Details ===');
    console.log('Title:', event.title);
    console.log('Description:', event.description || 'No description');
    console.log('Type:', event.eventType);
    console.log('Start:', new Date(event.startTime).toLocaleString());

    if (event.hasDuration && event.endTime) {
      console.log('End:', new Date(event.endTime).toLocaleString());
    }

    if (event.reminder?.enabled) {
      console.log(`Reminder: ${event.reminder.minutesBefore} minutes before`);
    }

    if (event.participants && event.participants.length > 0) {
      console.log('Participants:', event.participants.length);
      event.participants.forEach(p => {
        console.log(`  - ${p.name} (${p.type})`);
      });
    }

    if (event.tags && event.tags.length > 0) {
      console.log('Tags:', event.tags.join(', '));
    }

    console.log('Status:', event.completed ? 'Completed' : 'Pending');
    console.log('Created:', new Date(event.createdAt).toLocaleString());
  }
});
```

### Check Meeting Details with Agenda

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get meeting event and display agenda
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_standup_daily'
  });

  if (result.success && result.data) {
    const event = result.data.event;

    if (event.eventType === 'meeting') {
      console.log('Meeting:', event.title);
      console.log('Time:', new Date(event.startTime).toLocaleString());

      if (event.agenda) {
        console.log('\nAgenda:');
        console.log(event.agenda);
      }

      if (event.participants) {
        const accepted = event.participants.filter(p => p.status === 'accepted').length;
        const declined = event.participants.filter(p => p.status === 'declined').length;
        const pending = event.participants.filter(p => p.status === 'pending' || !p.status).length;

        console.log('\nRSVP Status:');
        console.log(`  Accepted: ${accepted}`);
        console.log(`  Declined: ${declined}`);
        console.log(`  Pending: ${pending}`);
      }
    }
  }
});
```

### Get Recurring Event Details

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve recurring event information
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_weekly_review'
  });

  if (result.success && result.data) {
    const event = result.data.event;

    console.log('Event:', event.title);
    console.log('Recurring:', event.isRecurring ? 'Yes' : 'No');

    if (event.isRecurring) {
      console.log('Cron Expression:', event.cronExpression);
      console.log('Recurrence End:', event.recurrenceEndTime
        ? new Date(event.recurrenceEndTime).toLocaleString()
        : 'Never');
    }
  }
});
```

### Get Check Event with Metadata

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve automated check event
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_health_check'
  });

  if (result.success && result.data) {
    const event = result.data.event;

    if (event.eventType === 'check' && event.checkType) {
      console.log('Check Type:', event.checkType);
      console.log('Last Completed:', event.completedAt
        ? new Date(event.completedAt).toLocaleString()
        : 'Never');

      if (event.metadata) {
        console.log('\nCheck Configuration:');
        console.log('Endpoint:', event.metadata.endpoint);
        console.log('Method:', event.metadata.method);
        console.log('Expected Status:', event.metadata.expectedStatus);
      }
    }
  }
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle various error scenarios
  const result = await codebolt.calendar.getEvent({
    eventId: 'nonexistent_event'
  });

  if (!result.success) {
    console.error('Failed to retrieve event');

    if (result.error) {
      switch (result.error.code) {
        case 'EVENT_NOT_FOUND':
          console.error('Event does not exist');
          break;
        case 'INVALID_EVENT_ID':
          console.error('Invalid event ID format');
          break;
        case 'ACCESS_DENIED':
          console.error('You do not have permission to view this event');
          break;
        default:
          console.error('Error:', result.error.message);
      }
    }
  }
});
```

### Check Event Completion Status

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get event and check if it's completed
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_task_001'
  });

  if (result.success && result.data) {
    const event = result.data.event;

    console.log('Task:', event.title);
    console.log('Status:', event.completed ? 'Completed' : 'Pending');

    if (event.completed) {
      console.log('Completed At:', new Date(event.completedAt!).toLocaleString());

      // Calculate time since completion
      const completedTime = new Date(event.completedAt!);
      const now = new Date();
      const hoursSince = (now.getTime() - completedTime.getTime()) / (1000 * 60 * 60);
      console.log(`Completed ${hoursSince.toFixed(1)} hours ago`);
    } else {
      // Check if event is overdue
      const startTime = new Date(event.startTime);
      const now = new Date();
      if (startTime < now) {
        console.log('⚠️  This event is overdue!');
      }
    }
  }
});
```

### Get Event with Creator Information

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Retrieve event and display creator details
  const result = await codebolt.calendar.getEvent({
    eventId: 'evt_agent_created'
  });

  if (result.success && result.data) {
    const event = result.data.event;
    const creator = event.createdBy;

    console.log('Event:', event.title);
    console.log('Created By:', creator.name);
    console.log('Creator Type:', creator.type);

    if (creator.type === 'agent') {
      console.log('Agent Execution ID:', creator.agentExecutionId);
      console.log('Thread ID:', creator.threadId);
    }

    console.log('Created At:', new Date(event.createdAt).toLocaleString());
    console.log('Last Updated:', new Date(event.updatedAt).toLocaleString());
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Fetch and display event for UI
async function displayEvent(eventId: string) {
  const result = await codebolt.calendar.getEvent({ eventId });

  if (!result.success || !result.data) {
    return null;
  }

  const event = result.data.event;
  return {
    id: event.id,
    title: event.title,
    type: event.eventType,
    start: new Date(event.startTime),
    end: event.endTime ? new Date(event.endTime) : null,
    participants: event.participants || [],
    completed: event.completed || false
  };
}
```
