---
title: setDefault
---

# `setDefault`

```typescript
client.llm.setDefault(data: LLMSetDefaultRequest): Promise<unknown>
```

Sets the default LLM model and provider for the workspace.

Configures which model is used by default when no specific model is requested.
This affects all operations that rely on LLM inference without explicit model selection.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMSetDefaultRequest` | Yes | The default LLM configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the default has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.setDefault(/* LLMSetDefaultRequest */);
console.log(result);
```
