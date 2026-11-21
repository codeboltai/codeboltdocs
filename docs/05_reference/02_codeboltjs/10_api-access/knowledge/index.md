# Knowledge

`codebolt.knowledge` is an empty object in this SDK. Use [Knowledge Graph](../knowledgeGraph/index.md) for graph records, [Persistent Memory](../persistentMemory/index.md) for stored memory, or [Documentation](../docs/index.md) for the documentation knowledge collection.

## Example

### Search indexed project files for context

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const matches = await codebolt.codebaseSearch.search('Where does the application load project settings?');
  console.log(matches);
});
```
