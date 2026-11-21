---
name: addVectorItem
description: Indexes text in the first vector collection.
cbbaseinfo:
  description: Indexes text in the first vector collection.
data:
  name: addVectorItem
  category: vectordb
  link: addVectorItem.md
---

# addVectorItem

```text
codebolt.vectordb.addVectorItem(item: any): Promise<AddVectorItemResponse>
```

Pass a text string. The SDK declares `item` as `any`, and the server uses it as document text. The server chooses the first collection or creates a default collection on the first write.

## When to use it

Index a short project note that you want to retrieve with [queryVectorItem](./queryVectorItem.md).

## Index a note and search it

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const added = await codebolt.vectordb.addVectorItem(
    'The application loads user defaults when the project opens.',
  );
  if (!added.success) throw new Error(added.message ?? 'Could not index the text.');

  const result = await codebolt.vectordb.queryVectorItem('When are user defaults loaded?');
  if (result.success) console.log(result.item);
});
```
