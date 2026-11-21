---
name: rsvp
description: RSVP to a calendar event.
cbbaseinfo:
  description: RSVP to a calendar event.
data:
  name: rsvp
  category: calendar
  link: rsvp.md
---

# rsvp

```text
codebolt.calendar.rsvp(params: IRSVPParams): Promise<IRSVPResponse>
```

RSVP to a calendar event

## Parameters

- `params` — Parameters including eventId, participantId, and status

## Returns

Promise resolving to the updated event

## When to use it

Record a participant's response to an existing event. Use the event ID and the participant identifier from that event.

## Example

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Decline an event
  const result = await codebolt.calendar.rsvp({
    eventId: 'evt_meeting_002',
    participantId: 'user_456',
    status: 'declined'
  });

  if (result.success) {
    console.log('Event declined');
  }
});
```

## More examples

### Accept Event Invitation

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Accept a meeting invitation
  const result = await codebolt.calendar.rsvp({
    eventId: 'evt_meeting_001',
    participantId: 'user_123',
    status: 'accepted'
  });

  if (result.success && result.data) {
    const event = result.data.event;
    console.log(`You have accepted: ${event.title}`);

    // Find the participant to verify status
    const participant = event.participants?.find(p => p.id === 'user_123');
    if (participant) {
      console.log(`RSVP status: ${participant.status}`);
    }
  }
});
```

### Batch RSVP for Multiple Events

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Accept multiple event invitations
  async function acceptMultipleInvitations(eventIds: string[], userId: string) {
    let acceptedCount = 0;
    let failedCount = 0;

    for (const eventId of eventIds) {
      const result = await codebolt.calendar.rsvp({
        eventId,
        participantId: userId,
        status: 'accepted'
      });

      if (result.success) {
        acceptedCount++;
        console.log(`✓ Accepted event ${eventId}`);
      } else {
        failedCount++;
        console.error(`✗ Failed to accept ${eventId}`);
      }
    }

    console.log(`RSVP complete: ${acceptedCount} accepted, ${failedCount} failed`);
    return { acceptedCount, failedCount };
  }

  // Usage
  await acceptMultipleInvitations(
    ['evt_001', 'evt_002', 'evt_003'],
    'user_123'
  );
});
```

### RSVP with Comments (via metadata)

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // RSVP with additional notes (stored in metadata)
  async function rsvpWithNotes(
    eventId: string,
    participantId: string,
    status: 'accepted' | 'declined',
    notes?: string
  ) {
    // First, get current event
    const eventResult = await codebolt.calendar.getEvent({ eventId });

    if (!eventResult.success || !eventResult.data) {
      return false;
    }

    const event = eventResult.data.event;

    // Store RSVP notes in metadata
    const rsvpNotes = event.metadata?.rsvpNotes || {};
    rsvpNotes[participantId] = {
      status,
      notes,
      respondedAt: new Date().toISOString()
    };

    // Update metadata first
    await codebolt.calendar.updateEvent({
      eventId,
      metadata: {
        ...event.metadata,
        rsvpNotes
      }
    });

    // Then RSVP
    const result = await codebolt.calendar.rsvp({
      eventId,
      participantId,
      status
    });

    return result.success;
  }

  // Usage
  await rsvpWithNotes(
    'evt_meeting_001',
    'user_123',
    'declined',
    'Have a conflicting meeting at that time'
  );
});
```

### Error Handling

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Handle RSVP errors
  const result = await codebolt.calendar.rsvp({
    eventId: 'evt_001',
    participantId: 'user_999',
    status: 'accepted'
  });

  if (!result.success) {
    console.error('RSVP failed');

    if (result.error) {
      switch (result.error.code) {
        case 'EVENT_NOT_FOUND':
          console.error('Event does not exist');
          break;
        case 'NOT_A_PARTICIPANT':
          console.error('User is not a participant of this event');
          break;
        case 'INVALID_RSVP_STATUS':
          console.error('Invalid RSVP status (must be accepted or declined)');
          break;
        case 'RSVP_CLOSED':
          console.error('RSVP is no longer being accepted for this event');
          break;
        case 'ALREADY_RESPONDED':
          console.error('Already responded to this invitation');
          break;
        default:
          console.error('Error:', result.error.message);
      }
    }
  }
});
```

### Update RSVP (Change Response)

```typescript
import codebolt from '@codebolt/codeboltjs';

// Change an RSVP from declined to accepted
async function updateRSVP(eventId: string, participantId: string) {
  // Check current status
  const eventResult = await codebolt.calendar.getEvent({ eventId });

  if (!eventResult.success || !eventResult.data) {
    return;
  }

  const event = eventResult.data.event;
  const participant = event.participants?.find(p => p.id === participantId);

  if (participant?.status === 'declined') {
    console.log('Previously declined, now accepting...');

    const result = await codebolt.calendar.rsvp({
      eventId,
      participantId,
      status: 'accepted'
    });

    if (result.success) {
      console.log('RSVP updated to accepted');
    }
  }
}
```

### RSVP for Agent Participant

```typescript
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // RSVP on behalf of an agent
  const result = await codebolt.calendar.rsvp({
    eventId: 'evt_meeting_agent',
    participantId: 'agent_code_reviewer',
    status: 'accepted'
  });

  if (result.success) {
    console.log('Agent has accepted the meeting invitation');
  }
});
```

```typescript
import codebolt from '@codebolt/codeboltjs';

// Agent automatically accepts invitations
async function agentAutoAccept(eventId: string, agentId: string) {
  const result = await codebolt.calendar.rsvp({
    eventId,
    participantId: agentId,
    status: 'accepted'
  });

  if (result.success) {
    console.log(`Agent ${agentId} automatically accepted invitation`);
  }
}
```
