---
title: getEmbeddingSupportedLLMs
---

# `getEmbeddingSupportedLLMs`

```typescript
client.llm.getEmbeddingSupportedLLMs(): Promise<LLMProvider[]>
```

Retrieves LLM providers that support text embedding capabilities.

Filters providers to only those offering embedding models, which convert text into
numerical vectors for semantic search, similarity matching, and RAG workflows.

## Parameters

_No parameters._

## Returns

`Promise<LLMProvider[]>` — A promise that resolves to an array of embedding-capable LLM providers

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getEmbeddingSupportedLLMs();
console.log(result);
```
