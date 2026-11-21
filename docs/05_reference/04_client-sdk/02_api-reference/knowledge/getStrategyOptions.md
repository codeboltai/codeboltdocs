---
title: getStrategyOptions
---

# `getStrategyOptions`

```typescript
client.knowledge.getStrategyOptions(strategy: string): Promise<KnowledgeStrategyOptions>
```

Retrieves the configurable options for a specific chunking strategy.

Returns the parameter schema for the strategy, including defaults
and valid ranges. Use this to build dynamic configuration UIs.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `strategy` | `string` | Yes | The name of the chunking strategy |

## Returns

`Promise<KnowledgeStrategyOptions>` — A promise that resolves to the  for the strategy

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.getStrategyOptions('strategy');
console.log(result);
```
