# Episodic Memory

Store and retrieve episodes and their events.

## Example

### Quick Start Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new episodic memory
  const memory = await codebolt.episodicMemory.createMemory({
      title: 'Project Alpha History'
  });

  // Append events to the memory
  if (memory.data == null) throw new Error('The response is missing data.');
  await codebolt.episodicMemory.appendEvent({
      memoryId: memory.data.id,
      event_type: 'task_created',
      emitting_agent_id: 'agent-001',
      tags: ['important', 'backend'],
      payload: {
          task: 'Implement user authentication',
          priority: 'high'
      }
  });

  if (memory.data == null) throw new Error('The response is missing data.');
  await codebolt.episodicMemory.appendEvent({
      memoryId: memory.data.id,
      event_type: 'task_completed',
      emitting_agent_id: 'agent-001',
      tags: ['backend'],
      payload: {
          task: 'Implement user authentication',
          duration: '4 hours'
      }
  });

  // Query events from the last hour
  if (memory.data == null) throw new Error('The response is missing data.');
  const events = await codebolt.episodicMemory.queryEvents({
      memoryId: memory.data.id,
      lastMinutes: 60
  });

  if (events.data == null) throw new Error('The response is missing data.');
  console.log(`Found ${events.data.events.length} events in the last hour`);
});
```

## SDK methods

### createMemory

[`createMemory`](createMemory.md) · Create a new episodic memory.

### listMemories

List all episodic memories.

```text
codebolt.episodicMemory.listMemories(): Promise<IListMemoriesResponse>
```

### getMemory

Get a specific episodic memory by ID.

```text
codebolt.episodicMemory.getMemory(params: IGetMemoryParams): Promise<IGetMemoryResponse>
```

### appendEvent

[`appendEvent`](appendEvent.md) · Append an event to an episodic memory.

### queryEvents

[`queryEvents`](queryEvents.md) · Query events from an episodic memory with optional filters.

### getEventTypes

Get unique event types from an episodic memory.

```text
codebolt.episodicMemory.getEventTypes(params: IGetEventTypesParams): Promise<IGetEventTypesResponse>
```

### getTags

Get unique tags from an episodic memory.

```text
codebolt.episodicMemory.getTags(params: IGetTagsParams): Promise<IGetTagsResponse>
```

### getAgents

Get unique agent IDs from an episodic memory.

```text
codebolt.episodicMemory.getAgents(params: IGetAgentsParams): Promise<IGetAgentsResponse>
```

### archiveMemory

Archive an episodic memory.

```text
codebolt.episodicMemory.archiveMemory(params: IArchiveMemoryParams): Promise<IArchiveMemoryResponse>
```

### unarchiveMemory

Unarchive an episodic memory.

```text
codebolt.episodicMemory.unarchiveMemory(params: IUnarchiveMemoryParams): Promise<IUnarchiveMemoryResponse>
```

### updateTitle

Update the title of an episodic memory.

```text
codebolt.episodicMemory.updateTitle(params: IUpdateTitleParams): Promise<IUpdateTitleResponse>
```
