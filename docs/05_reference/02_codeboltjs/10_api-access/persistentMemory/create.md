---
name: create
description: Create a new persistent memory configuration.
cbbaseinfo:
  description: Create a new persistent memory configuration.
data:
  name: create
  category: persistentMemory
  link: create.md
---

# create

```text
codebolt.persistentMemory.create(config: CreatePersistentMemoryParams): Promise<PersistentMemoryResponse>
```

Create a new persistent memory configuration

## Parameters

- `config` — Memory configuration

## When to use it

Define a reusable retrieval configuration for knowledge an agent will need across tasks.

## Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create memory using key-value store
  const memory = await codebolt.persistentMemory.create({
      label: 'User Preferences',
      description: 'Retrieves user preference settings',
      retrieval: {
          source_type: 'kv',
          source_id: 'user-prefs',
          query_template: 'user:{userId}'
      },
      contribution: {
          format: 'json'
      }
  });

  console.log('✅ User preferences memory created');
});
```

## More examples

### Create Basic Persistent Memory

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a simple persistent memory configuration
  const memory = await codebolt.persistentMemory.create({
      label: 'Code Context Memory',
      retrieval: {
          source_type: 'vectordb',
          source_id: 'code-vectors'
      },
      contribution: {
          format: 'text'
      }
  });

  if (memory.success) {
      if (memory.data == null) throw new Error('The response is missing data.');
      console.log('✅ Memory created:', memory.data.memory.id);
      console.log('Label:', memory.data.memory.label);
  }
});
```

### Create Memory with Vector DB Retrieval

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create memory with vector database retrieval
  const memory = await codebolt.persistentMemory.create({
      label: 'Documentation Search',
      description: 'Searches documentation for relevant context',
      inputs_scope: ['codebolt.project', 'codebolt.file'],
      retrieval: {
          source_type: 'vectordb',
          source_id: 'docs-vectors',
          query_template: 'Find documentation about {query}',
          limit: 5,
          filters: {
              language: 'en'
          }
      },
      contribution: {
          format: 'markdown',
          template: '## Relevant Documentation\n\n{results}\n\n',
          max_tokens: 1500
      }
  });

  console.log('✅ Documentation memory created');
});
```

### Create Memory with Event Log

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create memory that queries event logs
  const memory = await codebolt.persistentMemory.create({
      label: 'Recent Activity Log',
      description: 'Accesses recent system events',
      retrieval: {
          source_type: 'eventlog',
          source_id: 'system-events',
          query_template: 'type:{eventType} since:{timeframe}',
          limit: 50
      },
      contribution: {
          format: 'text',
          template: 'Recent Events:\n{events}',
          max_tokens: 2000
      }
  });

  console.log('✅ Event log memory created');
});
```

### Create Memory with Knowledge Graph

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create memory that queries knowledge graph
  const memory = await codebolt.persistentMemory.create({
      label: 'Entity Relationships',
      description: 'Retrieves related entities from knowledge graph',
      retrieval: {
          source_type: 'kg',
          source_id: 'entity-graph',
          query_template: 'FIND relationships FOR entity:{entityId}',
          filters: {
              depth: 2,
              maxResults: 20
          }
      },
      contribution: {
          format: 'json',
          template: '{ "entities": {entities}, "relationships": {relationships} }'
      }
  });

  console.log('✅ Knowledge graph memory created');
});
```

### Create Memory with Custom Variables

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create memory with additional configuration variables
  const memory = await codebolt.persistentMemory.create({
      label: 'Contextual Memory',
      description: 'Context-aware memory retrieval',
      inputs_scope: ['codebolt.task', 'codebolt.conversation'],
      additional_variables: {
          context_window: 5,
          include_metadata: true,
          ranking_method: 'semantic_similarity',
          min_confidence: 0.7
      },
      retrieval: {
          source_type: 'vectordb',
          source_id: 'context-store',
          limit: 10
      },
      contribution: {
          format: 'markdown',
          max_tokens: 3000
      }
  });

  console.log('✅ Contextual memory created with custom variables');
});
```
