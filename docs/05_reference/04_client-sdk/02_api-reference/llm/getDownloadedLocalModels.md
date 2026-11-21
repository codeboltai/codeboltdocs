---
title: getDownloadedLocalModels
---

# `getDownloadedLocalModels`

```typescript
client.llm.getDownloadedLocalModels(): Promise<LLMModel[]>
```

Retrieves the list of models that have been downloaded for local execution.

Returns all models currently available on disk for local inference, as opposed to
cloud-hosted models that require API calls.

## Parameters

_No parameters._

## Returns

`Promise<LLMModel[]>` — A promise that resolves to an array of locally downloaded models

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getDownloadedLocalModels();
console.log(result);
```
