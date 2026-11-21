---
name: getVector
description: Generates an embedding for text.
cbbaseinfo:
  description: Generates an embedding for text.
data:
  name: getVector
  category: vectordb
  link: getVector.md
---

# getVector

```text
codebolt.vectordb.getVector(text: string): Promise<GetVectorResponse>
```

Generate an embedding for a string with the configured embedding model. The SDK names the argument `key`, and the server treats it as the text to embed. Read the numeric vector from `response.vector`.

## When to use it

Generate a vector for a sentence or document when you need its numeric representation. To look up related indexed text, use [queryVectorItem](./queryVectorItem.md).

## Embed a project summary

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const response = await codebolt.vectordb.getVector('The API loads configuration during startup.');
  if (!response.success || !response.vector) {
    throw new Error(response.message ?? 'Could not generate an embedding.');
  }
  console.log('Dimensions', response.vector.length);
});
```
