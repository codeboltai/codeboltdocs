---
name: queryVectorItem
description: Searches indexed text by semantic similarity.
cbbaseinfo:
  description: Searches indexed text by semantic similarity.
data:
  name: queryVectorItem
  category: vectordb
  link: queryVectorItem.md
---

# queryVectorItem

```text
codebolt.vectordb.queryVectorItem(query: string): Promise<QueryVectorItemResponse>
```

The SDK names the string parameter `key`. Pass a natural-language query. The server searches the first vector collection and sends matching chunks in `response.item`.

## When to use it

Find notes or passages related to a question before building a prompt. A successful query can return zero matches.

## Read matching passages

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.vectordb.queryVectorItem('How does the API load configuration?');
  if (!response.success) throw new Error(response.message ?? 'Could not query the collection.');

  const matches = Array.isArray(response.item) ? response.item : [];
  for (const match of matches) {
    console.log(match.score, match.item?.metadata);
  }
});
```
