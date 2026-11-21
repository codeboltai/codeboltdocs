---
name: retrieve_related_knowledge
data:
  name: retrieve_related_knowledge
  category: rag
  link: retrieve_related_knowledge.md
---

# retrieve_related_knowledge

```text
codebolt.rag.retrieve_related_knowledge(query: string, filename: string): void
```

This placeholder accepts a query and file name and returns `void`. The SDK performs no retrieval.

## Example

### Search indexed project files for context

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const matches = await codebolt.codebaseSearch.search('Where does the application load project settings?');
  console.log(matches);
});
```
