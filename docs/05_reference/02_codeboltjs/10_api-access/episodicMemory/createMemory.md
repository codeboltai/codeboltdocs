---
name: createMemory
description: Create a new episodic memory.
cbbaseinfo:
  description: Create a new episodic memory.
data:
  name: createMemory
  category: episodicMemory
  link: createMemory.md
---

# createMemory

```text
codebolt.episodicMemory.createMemory(params: ICreateMemoryParams): Promise<ICreateMemoryResponse>
```

Create a new episodic memory

## Parameters

- `params` — Memory creation parameters (title)

## Returns

Promise resolving to the created memory

## When to use it

Create a memory collection before recording events for an agent or conversation.

## Examples

### Create Basic Memory

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a new episodic memory
  const memory = await codebolt.episodicMemory.createMemory({
      title: 'Project Alpha History'
  });

  if (memory.success) {
      if (memory.data == null) throw new Error('The response is missing data.');
      console.log('✅ Memory created:', memory.data.id);
      console.log('Title:', memory.data.title);
      console.log('Created:', memory.data.createdAt);
  }
});
```

### Create Memory for Different Purposes

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create memories for different use cases
  const memories = [
      { title: 'Development Sprint 1' },
      { title: 'Customer Support Interactions' },
      { title: 'System Events Log' },
      { title: 'Meeting Notes Archive' }
  ];

  for (const config of memories) {
      const memory = await codebolt.episodicMemory.createMemory(config);
      if (memory.success) {
          if (memory.data == null) throw new Error('The response is missing data.');
          console.log(`✅ Created "${config.title}":`, memory.data.id);
      }
  }
});
```
