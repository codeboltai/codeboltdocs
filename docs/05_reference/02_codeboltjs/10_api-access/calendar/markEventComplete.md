---
name: markEventComplete
description: Mark a single event as complete.
cbbaseinfo:
  description: Mark a single event as complete.
data:
  name: markEventComplete
  category: calendar
  link: markEventComplete.md
---

# markEventComplete

```text
codebolt.calendar.markEventComplete(params: IMarkEventCompleteParams): Promise<IMarkEventCompleteResponse>
```

Mark a single event as complete

## Parameters

- `params` — Parameters including eventId

## Returns

Promise resolving to the completed event

## When to use it

Mark a scheduled check or task event complete after its work finishes.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Complete a task event
  async function finishTask(taskEventId: string) {
    await codebolt.calendar.markEventComplete({
      eventId: taskEventId
    });
    console.log('Task marked as complete');
  }
});
```

## More examples

### Basic Completion

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Mark an event as complete
  const result = await codebolt.calendar.markEventComplete({
    eventId: 'evt_task_001'
  });

  if (result.success && result.data) {
    const event = result.data.event;
    console.log(`Event "${event.title}" marked as complete`);
    console.log(`Completed at: ${new Date(event.completedAt!).toLocaleString()}`);
  }
});
```

### Batch Complete by Type

```typescript
import codebolt from '@codebolt/codeboltjs';

// Complete all triggered events of a specific type
async function completeTriggeredChecks() {
  const triggered = await codebolt.calendar.getTriggeredEvents({
    includeCompleted: false
  });

  if (triggered.success && triggered.data) {
    const checks = triggered.data.events.filter(
      event => event.eventType === 'check'
    );

    console.log(`Completing ${checks.length} triggered checks...`);

    for (const check of checks) {
      const result = await codebolt.calendar.markEventComplete({
        eventId: check.id
      });

      if (result.success) {
        console.log(`✓ ${check.title}`);
      } else {
        console.error(`✗ Failed to complete ${check.title}`);
      }
    }
  }
}
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle completion errors
  const result = await codebolt.calendar.markEventComplete({
    eventId: 'evt_abc123'
  });

  if (!result.success) {
    console.error('Failed to mark event as complete');

    if (result.error) {
      switch (result.error.code) {
        case 'EVENT_NOT_FOUND':
          console.error('Event does not exist');
          break;
        case 'ALREADY_COMPLETED':
          console.error('Event is already completed');
          // Get the event to see when it was completed
          const eventResult = await codebolt.calendar.getEvent({
            eventId: 'evt_abc123'
          });
          if (eventResult.success && eventResult.data?.event.completedAt) {
            console.log('Completed at:', eventResult.data.event.completedAt);
          }
          break;
        case 'ACCESS_DENIED':
          console.error('You do not have permission to complete this event');
          break;
        default:
          console.error('Error:', result.error.message);
      }
    }
  }
});
```

### Verify Completion

```typescript
import codebolt from '@codebolt/codeboltjs';

// Mark complete and verify
async function markCompleteAndVerify(eventId: string) {
  const result = await codebolt.calendar.markEventComplete({
    eventId
  });

  if (result.success && result.data) {
    const event = result.data.event;

    // Verify the event is actually marked complete
    if (event.completed && event.completedAt) {
      const completedTime = new Date(event.completedAt);
      const now = new Date();

      // Verify completion timestamp is recent
      const timeDiff = now.getTime() - completedTime.getTime();
      if (timeDiff < 5000) { // Within 5 seconds
        console.log('✅ Event verified as completed');
        return true;
      }
    }
  }

  console.log('⚠️  Verification failed');
  return false;
}
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Add completion notes via metadata update
async function completeWithNotes(eventId: string, notes: string) {
  // First add notes to metadata
  await codebolt.calendar.updateEvent({
    eventId,
    metadata: {
      completionNotes: notes,
      completedAt: new Date().toISOString()
    }
  });

  // Then mark as complete
  const result = await codebolt.calendar.markEventComplete({
    eventId
  });

  return result.success;
}
```
