---
name: appendEvent
description: Append an event to an episodic memory.
cbbaseinfo:
  description: Append an event to an episodic memory.
data:
  name: appendEvent
  category: episodicMemory
  link: appendEvent.md
---

# appendEvent

```text
codebolt.episodicMemory.appendEvent(params: IAppendEventParams): Promise<IAppendEventResponse>
```

Append an event to an episodic memory

## Parameters

- `params` — Event parameters including memoryId, event_type, emitting_agent_id, and payload

## Returns

Promise resolving to the created event

## When to use it

Record an observation or activity in an existing episodic memory.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Append event with simple string payload
  const event = await codebolt.episodicMemory.appendEvent({
      memoryId: 'memory-123',
      event_type: 'note',
      emitting_agent_id: 'agent-001',
      payload: 'Important: Remember to follow up with the client tomorrow'
  });

  console.log('✅ Note event added');
});
```

## More examples

### Append Basic Event

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Append a simple event
  const event = await codebolt.episodicMemory.appendEvent({
      memoryId: 'memory-123',
      event_type: 'task_completed',
      emitting_agent_id: 'agent-001',
      payload: {
          task: 'Review PR #123',
          duration: '30 minutes'
      }
  });

  if (event.success) {
      if (event.data == null) throw new Error('The response is missing data.');
      console.log('✅ Event appended:', event.data.id);
      console.log('Type:', event.data.event_type);
      console.log('Timestamp:', event.data.timestamp);
  }
});
```

### Append Event with Tags

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Append event with multiple tags for filtering
  const event = await codebolt.episodicMemory.appendEvent({
      memoryId: 'memory-123',
      event_type: 'code_change',
      emitting_agent_id: 'agent-002',
      tags: ['backend', 'api', 'authentication'],
      payload: {
          file: 'auth.ts',
          change_type: 'feature',
          lines_changed: 45
      }
  });

  console.log('✅ Tagged event created');
});
```

### Append Different Event Types

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Append various types of events
  const events = [
      {
          event_type: 'user_message',
          emitting_agent_id: 'agent-001',
          payload: { content: 'Hello, how can I help?' }
      },
      {
          event_type: 'system_action',
          emitting_agent_id: 'system',
          payload: { action: 'backup_created', size: '2.5GB' }
      },
      {
          event_type: 'error',
          emitting_agent_id: 'agent-003',
          tags: ['error', 'critical'],
          payload: { error: 'Connection timeout', code: 504 }
      }
  ];

  for (const eventData of events) {
      const event = await codebolt.episodicMemory.appendEvent({
          memoryId: 'memory-123',
          ...eventData
      });
      console.log(`✅ Added ${eventData.event_type} event`);
  }
});
```

### Append Swarm-Level Event

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Append event to a swarm's memory
  const event = await codebolt.episodicMemory.appendEvent({
      swarmId: 'swarm-123',
      event_type: 'coordination',
      emitting_agent_id: 'agent-001',
      team_id: 'team-456',
      payload: {
          action: 'task_delegation',
          delegated_to: 'agent-002',
          task: 'Code review'
      }
  });

  console.log('✅ Swarm coordination event logged');
});
```
