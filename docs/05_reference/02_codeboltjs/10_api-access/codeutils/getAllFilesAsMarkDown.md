---
name: getAllFilesAsMarkDown
description: Requests project source as Markdown.
cbbaseinfo:
  description: Requests project source as Markdown.
data:
  name: getAllFilesAsMarkDown
  category: codeutils
  link: getAllFilesAsMarkDown.md
---

# getAllFilesAsMarkDown

```text
codebolt.codeutils.getAllFilesAsMarkDown(): Promise<string>
```

Collect project source in a Markdown representation. The SDK declares a string return value. The current server sends a response envelope with the Markdown in `files[0].content`.

## When to use it

Read the Markdown representation when you need a project-wide source snapshot. Use file reads or scoped search for targeted work.

## Read a source snapshot for review

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response: unknown = await codebolt.codeutils.getAllFilesAsMarkDown();
  const envelope = response as { files?: Array<{ content?: string }> } | undefined;
  const markdown = typeof response === 'string' ? response : envelope?.files?.[0]?.content;
  if (typeof markdown === 'string') {
    console.log('Snapshot size', markdown.length);
  }
});
```
