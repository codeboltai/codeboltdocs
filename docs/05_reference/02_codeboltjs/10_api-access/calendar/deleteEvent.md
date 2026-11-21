---
name: deleteEvent
description: Delete a calendar event.
cbbaseinfo:
  description: Delete a calendar event.
data:
  name: deleteEvent
  category: calendar
  link: deleteEvent.md
---

# deleteEvent

```text
codebolt.calendar.deleteEvent(params: IDeleteEventParams): Promise<IDeleteEventResponse>
```

Delete a calendar event

## Parameters

- `params` — Parameters including eventId

## Returns

Promise resolving to deletion confirmation

## When to use it

Remove a cancelled or test event by its ID. Verify the ID against the calendar before deleting it.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Delete all instances of a recurring event
  // Note: This would need to be implemented based on how recurring events are stored
  async function deleteRecurringSeries(baseEventId: string) {
    const result = await codebolt.calendar.deleteEvent({
      eventId: baseEventId
    });

    if (result.success) {
      console.log('Recurring event series deleted');
    }
  }
});
```

## More examples

### Basic Event Deletion

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Delete an event by ID
  const result = await codebolt.calendar.deleteEvent({
    eventId: 'evt_abc123xyz'
  });

  if (result.success) {
    console.log('Event deleted successfully');
  } else {
    console.error('Failed to delete event:', result.error?.message);
  }
});
```

### Delete with Verification

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Verify event exists before deleting
  const eventCheck = await codebolt.calendar.getEvent({
    eventId: 'evt_to_delete'
  });

  if (eventCheck.success && eventCheck.data) {
    console.log('Deleting event:', eventCheck.data.event.title);

    const deleteResult = await codebolt.calendar.deleteEvent({
      eventId: 'evt_to_delete'
    });

    if (deleteResult.success) {
      console.log('Event deleted successfully');
    }
  } else {
    console.log('Event not found, nothing to delete');
  }
});
```

### Delete with User Confirmation

```typescript
import codebolt from '@codebolt/codeboltjs';

// Delete event after confirmation
async function deleteEventWithConfirmation(eventId: string) {
  // First, get event details
  const eventResult = await codebolt.calendar.getEvent({ eventId });

  if (!eventResult.success || !eventResult.data) {
    console.log('Event not found');
    return false;
  }

  const event = eventResult.data.event;

  // Show event details and confirm
  console.log(`Event to delete: ${event.title}`);
  console.log(`Type: ${event.eventType}`);
  console.log(`Time: ${new Date(event.startTime).toLocaleString()}`);

  // In a real application, you would show a confirmation dialog
  const confirmed = true; // Simulating user confirmation

  if (confirmed) {
    const result = await codebolt.calendar.deleteEvent({ eventId });
    return result.success;
  }

  return false;
}
```

### Delete Completed Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find and delete old completed events
  async function cleanupOldEvents(daysToKeep: number) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const oldEvents = await codebolt.calendar.listEvents({
      endDate: cutoffDate.toISOString(),
      completed: true
    });

    if (oldEvents.success && oldEvents.data) {
      console.log(`Found ${oldEvents.data.count} old completed events`);

      for (const event of oldEvents.data.events) {
        const result = await codebolt.calendar.deleteEvent({
          eventId: event.id
        });

        if (result.success) {
          console.log(`Deleted: ${event.title}`);
        }
      }
    }
  }

  // Usage: Delete events older than 30 days
  await cleanupOldEvents(30);
});
```

### Batch Delete Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Delete multiple events
  async function batchDeleteEvents(eventIds: string[]) {
    let deletedCount = 0;
    let failedCount = 0;

    for (const eventId of eventIds) {
      const result = await codebolt.calendar.deleteEvent({ eventId });

      if (result.success) {
        deletedCount++;
        console.log(`Deleted event ${eventId}`);
      } else {
        failedCount++;
        console.error(`Failed to delete ${eventId}:`, result.error?.message);
      }
    }

    console.log(`Batch delete complete: ${deletedCount} deleted, ${failedCount} failed`);
    return { deletedCount, failedCount };
  }

  // Usage
  const eventsToDelete = ['evt_001', 'evt_002', 'evt_003'];
  await batchDeleteEvents(eventsToDelete);
});
```

### Delete by Search

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Find and delete events matching criteria
  async function deleteEventsByTag(tag: string) {
    const events = await codebolt.calendar.listEvents({
      tags: [tag]
    });

    if (events.success && events.data) {
      console.log(`Found ${events.data.count} events with tag "${tag}"`);

      for (const event of events.data.events) {
        const result = await codebolt.calendar.deleteEvent({
          eventId: event.id
        });

        if (result.success) {
          console.log(`Deleted: ${event.title}`);
        }
      }
    }
  }

  // Usage: Delete all test events
  await deleteEventsByTag('test');
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle various error scenarios
  const result = await codebolt.calendar.deleteEvent({
    eventId: 'nonexistent_event'
  });

  if (!result.success) {
    console.error('Failed to delete event');

    if (result.error) {
      switch (result.error.code) {
        case 'EVENT_NOT_FOUND':
          console.error('Event does not exist');
          break;
        case 'INVALID_EVENT_ID':
          console.error('Invalid event ID format');
          break;
        case 'ACCESS_DENIED':
          console.error('You do not have permission to delete this event');
          break;
        case 'EVENT_LOCKED':
          console.error('Event is locked and cannot be deleted');
          break;
        default:
          console.error('Error:', result.error.message);
      }
    }
  }
});
```

### Conditional Deletion

```typescript
import codebolt from '@codebolt/codeboltjs';

// Only delete if event meets certain criteria
async function deleteIfIncomplete(eventId: string) {
  const eventResult = await codebolt.calendar.getEvent({ eventId });

  if (eventResult.success && eventResult.data) {
    const event = eventResult.data.event;

    // Only delete if not completed
    if (!event.completed) {
      const result = await codebolt.calendar.deleteEvent({ eventId });

      if (result.success) {
        console.log('Deleted incomplete event:', event.title);
        return true;
      }
    } else {
      console.log('Event is completed, will not delete');
      return false;
    }
  }

  return false;
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Remove events older than specified days
async function cleanupOldEvents(daysOld: number) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysOld);

  const oldEvents = await codebolt.calendar.listEvents({
    endDate: cutoff.toISOString()
  });

  if (oldEvents.success && oldEvents.data) {
    for (const event of oldEvents.data.events) {
      await codebolt.calendar.deleteEvent({ eventId: event.id });
    }
  }
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Delete all events marked as test
async function removeTestEvents() {
  const testEvents = await codebolt.calendar.listEvents({
    tags: ['test']
  });

  if (testEvents.success && testEvents.data) {
    for (const event of testEvents.data.events) {
      await codebolt.calendar.deleteEvent({ eventId: event.id });
    }
  }
}
```
