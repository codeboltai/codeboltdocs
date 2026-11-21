---
name: add_file
data:
  name: add_file
  category: rag
  link: add_file.md
---

# add_file

```text
codebolt.rag.add_file(filename: string, file_path: string): void
```

This placeholder accepts a file name and path and returns `void`. The SDK performs no file ingestion.

## Example

### Search indexed project files for context

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const matches = await codebolt.codebaseSearch.search('Where does the application load project settings?');
  console.log(matches);
});
```
