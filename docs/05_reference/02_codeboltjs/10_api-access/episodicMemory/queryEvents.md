---
name: queryEvents
description: Query events from an episodic memory with optional filters.
cbbaseinfo:
  description: Query events from an episodic memory with optional filters.
data:
  name: queryEvents
  category: episodicMemory
  link: queryEvents.md
---

# queryEvents

```text
codebolt.episodicMemory.queryEvents(params: IQueryEventsParams): Promise<IQueryEventsResponse>
```

Query events from an episodic memory with optional filters

## Parameters

- `params` — Query parameters including memoryId and optional filters

## Returns

Promise resolving to filtered events

## When to use it

Retrieve episodes for a time window or filter them when reviewing what happened during a run.

## Examples

### Query All Events

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get all events from a memory
  const result = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123'
  });

  if (result.success) {
      if (result.data == null) throw new Error('The response is missing data.');
      console.log(`✅ Found ${result.data.events.length} events`);
      console.log('Total events in memory:', result.data.total);
      console.log('Filtered:', result.data.filtered);
  }
});
```

### Query Recent Events

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events from the last hour
  const result = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      lastMinutes: 60
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Events in the last hour: ${result.data.events.length}`);

  // Get events from the last 24 hours
  const dayResult = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      lastMinutes: 1440 // 24 hours
  });
});
```

### Query Last N Events

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get the 10 most recent events
  const result = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      lastCount: 10
  });

  console.log('Last 10 events:');
  if (result.data == null) throw new Error('The response is missing data.');
  result.data.events.forEach((event, index) => {
      console.log(`${index + 1}. [${event.event_type}] ${event.timestamp}`);
  });
});
```

### Query by Event Type

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get only error events
  const errors = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      event_type: 'error'
  });

  if (errors.data == null) throw new Error('The response is missing data.');
  console.log(`Found ${errors.data.events.length} error events`);

  // Get only task completion events
  const completed = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      event_type: 'task_completed'
  });
});
```

### Query by Tags

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events tagged with 'backend'
  const backendEvents = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      tags: ['backend']
  });

  // Get events with multiple tags (AND logic)
  const criticalBackendEvents = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      tags: ['backend', 'critical']
  });

  if (criticalBackendEvents.data == null) throw new Error('The response is missing data.');
  console.log(`Critical backend events: ${criticalBackendEvents.data.events.length}`);
});
```

### Query by Agent

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events from a specific agent
  const agentEvents = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      emitting_agent_id: 'agent-001'
  });

  if (agentEvents.data == null) throw new Error('The response is missing data.');
  console.log(`Agent activity: ${agentEvents.data.events.length} events`);
});
```

### Query Since Timestamp

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Get events since a specific time
  const result = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      since: '2024-01-15T10:00:00Z'
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log(`Events since Jan 15: ${result.data.events.length}`);
});
```

### Complex Query with Multiple Filters

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Complex query: backend errors from last hour by specific agent
  const result = await codebolt.episodicMemory.queryEvents({
      memoryId: 'memory-123',
      event_type: 'error',
      tags: ['backend', 'production'],
      emitting_agent_id: 'agent-003',
      lastMinutes: 60
  });

  console.log('Filtered results:');
  if (result.data == null) throw new Error('The response is missing data.');
  result.data.events.forEach(event => {
      console.log(`- [${event.timestamp}] ${event.payload}`);
  });
});
```

### Query Swarm Events

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Query events at the swarm level
  const result = await codebolt.episodicMemory.queryEvents({
      swarmId: 'swarm-123',
      team_id: 'team-456',
      lastCount: 20
  });

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Swarm team events:', result.data.events.length);
});
```
