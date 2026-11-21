# Persistent Memory

Create and query persistent memory stores.

## Example

### Quick Start Example

```js
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  // Create a persistent memory configuration
  const memory = await codebolt.persistentMemory.create({
      label: 'Code Context Memory',
      description: 'Retrieves relevant code context for development tasks',
      inputs_scope: ['codebolt.project', 'codebolt.file'],
      retrieval: {
          source_type: 'vectordb',
          source_id: 'code-vectors',
          query_template: 'Find relevant code for {context}',
          limit: 10
      },
      contribution: {
          format: 'markdown',
          template: '## Relevant Code\n\n{results}',
          max_tokens: 2000
      }
  });

  // Execute retrieval with context
  if (memory.data == null) throw new Error('The response is missing data.');
  const result = await codebolt.persistentMemory.executeRetrieval(
      memory.data.memory.id,
      {
          query: 'How is authentication implemented?',
          context: { task: 'code_review' }
      }
  );

  if (result.data == null) throw new Error('The response is missing data.');
  console.log('Retrieved memory:', result.data.result);
});
```

## SDK methods

### create

[`create`](create.md) · Create a new persistent memory configuration.

### get

Get a persistent memory by ID.

```text
codebolt.persistentMemory.get(memoryId: string): Promise<PersistentMemoryResponse>
```

### list

List persistent memories.

```text
codebolt.persistentMemory.list(filters?: ListPersistentMemoryParams): Promise<PersistentMemoryListResponse>
```

### update

Update a persistent memory.

```text
codebolt.persistentMemory.update(memoryId: string, updates: UpdatePersistentMemoryParams): Promise<PersistentMemoryResponse>
```

### delete

Delete a persistent memory.

```text
codebolt.persistentMemory.delete(memoryId: string): Promise<PersistentMemoryResponse>
```

### executeRetrieval

[`executeRetrieval`](executeRetrieval.md) · Execute memory retrieval pipeline.

### validate

Validate a memory configuration.

```text
codebolt.persistentMemory.validate(memory: CreatePersistentMemoryParams): Promise<PersistentMemoryValidateResponse>
```

### getStepSpecs

Get available step specifications.

```text
codebolt.persistentMemory.getStepSpecs(): Promise<PersistentMemoryStepSpecsResponse>
```
