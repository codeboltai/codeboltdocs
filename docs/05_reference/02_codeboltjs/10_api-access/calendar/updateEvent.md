---
name: updateEvent
description: Update an existing calendar event.
cbbaseinfo:
  description: Update an existing calendar event.
data:
  name: updateEvent
  category: calendar
  link: updateEvent.md
---

# updateEvent

```text
codebolt.calendar.updateEvent(params: IUpdateEventParams): Promise<IUpdateEventResponse>
```

Update an existing calendar event

## Parameters

- `params` — Event update parameters including eventId

## Returns

Promise resolving to the updated event

## When to use it

Reschedule a saved event or change its reminder. Use the event ID so the edit applies to the intended record.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  async function promoteToMilestone(eventId: string) {
    const result = await codebolt.calendar.updateEvent({
      eventId,
      eventType: 'milestone',
      tags: ['milestone', 'important']
    });

    return result.success;
  }
});
```

## More examples

### Update Event Title

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Change event title
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_abc123',
    title: 'Updated Meeting Title'
  });

  if (result.success && result.data) {
    console.log('Title updated:', result.data.event.title);
  }
});
```

### Reschedule Event

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Change event time
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_meeting_001',
    startTime: '2026-01-21T14:00:00Z',
    endTime: '2026-01-21T15:00:00Z'
  });

  if (result.success && result.data) {
    const event = result.data.event;
    console.log(`Rescheduled to: ${new Date(event.startTime).toLocaleString()}`);
  }
});
```

### Add Participants

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get event first, then add participants
  const currentEvent = await codebolt.calendar.getEvent({
    eventId: 'evt_meeting_001'
  });

  if (currentEvent.success && currentEvent.data) {
    const existingParticipants = currentEvent.data.event.participants || [];

    // Add new participant
    const result = await codebolt.calendar.updateEvent({
      eventId: 'evt_meeting_001',
      participants: [
        ...existingParticipants,
        {
          id: 'user_new',
          name: 'New Team Member',
          type: 'user',
          status: 'pending'
        }
      ]
    });

    if (result.success) {
      console.log('Participant added');
    }
  }
});
```

### Update Reminder Settings

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Change reminder timing
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_deadline_001',
    reminder: {
      enabled: true,
      minutesBefore: 1440 // 1 day before
    }
  });

  if (result.success) {
    console.log('Reminder updated to 1 day before');
  }
});
```

### Update Meeting Agenda

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update meeting agenda
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_standup',
    agenda: `
1. Review yesterday's accomplishments
2. Plan today's tasks
3. Identify blockers
4. Share relevant updates
  `.trim()
  });

  if (result.success) {
    console.log('Agenda updated');
  }
});
```

### Modify Recurrence

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Change recurring event schedule
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_weekly_review',
    cronExpression: '0 10 * * 1', // Change to Monday at 10 AM
    recurrenceEndTime: '2026-12-31T23:59:59Z'
  });

  if (result.success) {
    console.log('Recurrence updated');
  }
});
```

### Update Tags

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add tags to event
  const currentEvent = await codebolt.calendar.getEvent({
    eventId: 'evt_001'
  });

  if (currentEvent.success && currentEvent.data) {
    const existingTags = currentEvent.data.event.tags || [];

    const result = await codebolt.calendar.updateEvent({
      eventId: 'evt_001',
      tags: [...existingTags, 'urgent', 'priority']
    });

    if (result.success) {
      console.log('Tags added');
    }
  }
});
```

### Update Metadata

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Add or update metadata
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_check_001',
    metadata: {
      endpoint: '/api/v2/health', // Updated endpoint
      timeout: 10000, // New field
      retries: 3 // New field
    }
  });

  if (result.success && result.data) {
    console.log('Metadata updated:', result.data.event.metadata);
  }
});
```

### Multiple Field Update

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Update multiple fields at once
  const result = await codebolt.calendar.updateEvent({
    eventId: 'evt_001',
    title: 'Updated Title',
    description: 'Updated description',
    startTime: '2026-01-21T10:00:00Z',
    endTime: '2026-01-21T11:00:00Z',
    reminder: {
      enabled: true,
      minutesBefore: 15
    }
  });

  if (result.success && result.data) {
    console.log('Event updated successfully');
  }
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle update errors
  const result = await codebolt.calendar.updateEvent({
    eventId: 'nonexistent_event',
    title: 'New Title'
  });

  if (!result.success) {
    console.error('Failed to update event');

    if (result.error) {
      switch (result.error.code) {
        case 'EVENT_NOT_FOUND':
          console.error('Event does not exist');
          break;
        case 'INVALID_EVENT_ID':
          console.error('Invalid event ID format');
          break;
        case 'ACCESS_DENIED':
          console.error('You do not have permission to update this event');
          break;
        case 'VALIDATION_ERROR':
          console.error('Invalid update data:', result.error.details);
          break;
        default:
          console.error('Error:', result.error.message);
      }
    }
  }
});
```

### Conditional Update

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Only update if event is not completed
  const currentEvent = await codebolt.calendar.getEvent({
    eventId: 'evt_001'
  });

  if (currentEvent.success && currentEvent.data) {
    if (!currentEvent.data.event.completed) {
      const result = await codebolt.calendar.updateEvent({
        eventId: 'evt_001',
        title: 'In Progress: ' + currentEvent.data.event.title
      });

      if (result.success) {
        console.log('Event updated');
      }
    } else {
      console.log('Event already completed, cannot update');
    }
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

async function rescheduleMeeting(eventId: string, newStartTime: Date, durationMinutes: number) {
  const newEndTime = new Date(newStartTime.getTime() + durationMinutes * 60000);

  const result = await codebolt.calendar.updateEvent({
    eventId,
    startTime: newStartTime.toISOString(),
    endTime: newEndTime.toISOString()
  });

  return result.success;
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

async function addReminder(eventId: string, minutesBefore: number) {
  const result = await codebolt.calendar.updateEvent({
    eventId,
    reminder: {
      enabled: true,
      minutesBefore
    }
  });

  return result.success;
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

async function updateTaskProgress(eventId: string, progressNote: string) {
  const currentEvent = await codebolt.calendar.getEvent({ eventId });

  if (currentEvent.success && currentEvent.data) {
    const existingDescription = currentEvent.data.event.description || '';
    const updatedDescription = `${existingDescription}\n\nUpdate: ${progressNote}`;

    const result = await codebolt.calendar.updateEvent({
      eventId,
      description: updatedDescription.trim()
    });

    return result.success;
  }

  return false;
}
```
