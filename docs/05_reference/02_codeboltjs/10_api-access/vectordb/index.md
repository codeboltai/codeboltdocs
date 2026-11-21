# Vectordb

Generate embeddings, index text, and find related passages.

Use `codebolt.vectordb` on the default client.

## When to use it

Generate a vector embedding from text, index text in the default collection, or run a semantic text query against that collection.

## Index text and search for related passages

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const added = await codebolt.vectordb.addVectorItem('Run the setup script before starting the API.');
  if (!added.success) throw new Error(added.message ?? 'Could not index the note.');

  const matches = await codebolt.vectordb.queryVectorItem('How do I start the API?');
  if (matches.success) console.log(matches.item);
});
```

## SDK methods

### getVector

[`getVector`](getVector.md) · Generates an embedding for text.

### addVectorItem

[`addVectorItem`](addVectorItem.md) · Indexes text.

### queryVectorItem

[`queryVectorItem`](queryVectorItem.md) · Searches indexed text.

### queryVectorItems

Legacy batch query. The SDK declares `items` as an empty tuple. Use [queryVectorItem](./queryVectorItem.md) for text queries with the current types.

```text
codebolt.vectordb.queryVectorItems(items: [], dbPath: string): Promise<QueryVectorItemResponse>
```
