# Embeddings

`codebolt.llm` exposes [inference](./inference.md) and model configuration. The SDK does not expose an embeddings method on this module. Use [getVector](../vectordb/getVector.md) to generate an embedding with the configured embedding model.

## Generate an embedding with `codebolt.vectordb.getVector`

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onReady(async () => {
  const result = await codebolt.vectordb.getVector('A short summary to embed.');
  if (result.success) console.log(result.vector?.length);
});
```
