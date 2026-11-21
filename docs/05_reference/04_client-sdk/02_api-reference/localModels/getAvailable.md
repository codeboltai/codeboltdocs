---
title: getAvailable
---

# `getAvailable`

```typescript
client.localModels.getAvailable(): Promise<LocalModel[]>
```

Retrieves the catalog of models available for local download and execution.

Returns all models that can be downloaded from supported registries (e.g., Ollama, GGUF)
for local inference. Use this to browse what models are available before downloading.

## Parameters

_No parameters._

## Returns

`Promise<LocalModel[]>` — A promise that resolves to an array of available local models

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.localModels.getAvailable();
console.log(result);
```
