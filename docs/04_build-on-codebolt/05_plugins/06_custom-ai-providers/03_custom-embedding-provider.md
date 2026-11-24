---
sidebar_position: 3
title: Configure an Embedding Provider
description: Choose how Codebolt generates vectors for memory ingestion and semantic search.
---

# Configure an embedding provider

Codebolt’s memory service reads the embedding provider and model from settings. A local model runs on the machine. With a supported cloud provider, Codebolt sends text to the provider’s embedding API. The LLM plugin completion handler serves chat requests and does not register an embedding endpoint for this workflow.

## Choose a model

- **Local model.** Download the model in Settings, then select it as the embedding model. Codebolt checks that the model is available before using it.
- **Cloud model.** Select an embedding-capable provider and model. Supply the provider’s key and, if required, its API base URL. Use a model ID that the endpoint accepts for embeddings.

## Check the result

Index a short document in a vector collection, then query it with a related phrase. Check that the matching document URI appears in the results. For a local-model error, check that the selected model has finished downloading. For a cloud error, check the embedding model ID, endpoint, and key. [Index and query a document](../../07a_memory-management/02a_vector-db.md#upsert-a-document).

## Response Format

For cloud embeddings, the memory service reads a numeric vector from each entry in `data`. Example response:

```json
{
  "data": [
    { "embedding": [0.1, 0.2], "index": 0 }
  ],
  "usage": {
    "prompt_tokens": 10,
    "total_tokens": 10
  }
}
```

## See Also

- [Custom AI Providers](./01_overview.md)
- [Custom LLM Provider](./02_custom-llm-provider.md)
- [Plugins Overview](../01_overview.md)
- [Plugin SDK and Lifecycle](../02_sdk-and-lifecycle.md)
