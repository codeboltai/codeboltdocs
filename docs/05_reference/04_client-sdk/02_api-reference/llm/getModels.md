---
title: getModels
---

# `getModels`

```typescript
client.llm.getModels(data: LLMGetModelsRequest): Promise<LLMModel[]>
```

Retrieves the available models for a specific LLM provider.

Queries the models catalog for a given provider, returning all models that can be
used with that provider's current configuration and API key.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMGetModelsRequest` | Yes | The request specifying which provider's models to retrieve |

## Returns

`Promise<LLMModel[]>` — A promise that resolves to an array of models available for the provider

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getModels(/* LLMGetModelsRequest */);
console.log(result);
```
