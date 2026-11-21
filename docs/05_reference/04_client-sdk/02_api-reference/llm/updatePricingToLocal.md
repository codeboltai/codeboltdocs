---
title: updatePricingToLocal
---

# `updatePricingToLocal`

```typescript
client.llm.updatePricingToLocal(): Promise<unknown>
```

Syncs the latest LLM pricing information to local storage.

Downloads the most up-to-date pricing catalog from the remote source and persists it
locally. Call this periodically to ensure cost calculations reflect current rates.

## Parameters

_No parameters._

## Returns

`Promise<unknown>` — A promise that resolves when the local pricing data has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.updatePricingToLocal();
console.log(result);
```
