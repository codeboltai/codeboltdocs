---
title: getAllModels
---

# `getAllModels`

```typescript
client.llm.getAllModels(data?: Record<string, unknown>): Promise<LLMModel[]>
```

Retrieves all models across all configured providers.

Returns a flat list of every available model from all providers. Optionally accepts
filter criteria to narrow results by capability, provider, or other attributes.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional filter criteria for narrowing the model list |

## Returns

`Promise<LLMModel[]>` — A promise that resolves to an array of all available LLM models

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getAllModels();
console.log(result);
```
