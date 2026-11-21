---
title: getProviders
---

# `getProviders`

```typescript
client.llm.getProviders(): Promise<LLMProvider[]>
```

Retrieves all configured LLM providers with their current status and available models.

Returns the complete list of LLM providers (e.g., OpenAI, Anthropic, Ollama) that have
been configured in the system, including whether they have valid API keys set.

## Parameters

_No parameters._

## Returns

`Promise<LLMProvider[]>` — A promise that resolves to an array of LLM provider configurations

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getProviders();
console.log(result);
```
