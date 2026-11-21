# Rag

The SDK exports the RAG method names as placeholders. Their implementations perform no operations.

Use [Knowledge Graph](../knowledgeGraph/index.md), [Persistent Memory](../persistentMemory/index.md), or [Vector Database](../vectordb/index.md) for implemented storage and query methods.

## Example

### Search indexed project files for context

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const matches = await codebolt.codebaseSearch.search('Where does the application load project settings?');
  console.log(matches);
});
```

## SDK methods

### init

```text
codebolt.rag.init(): void
```

### add_file

[`add_file`](add_file.md)

### retrieve_related_knowledge

[`retrieve_related_knowledge`](retrieve_related_knowledge.md)
