---
title: getPricing
---

# `getPricing`

```typescript
client.llm.getPricing(): Promise<unknown>
```

Fetches the current pricing information for all LLM models.

Returns token pricing data (input/output cost per token) for each model across all
providers. Useful for cost estimation and budget tracking of LLM usage.

## Parameters

_No parameters._

## Returns

`Promise<unknown>` — A promise that resolves to the pricing data for all available models

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.getPricing();
console.log(result);
```
