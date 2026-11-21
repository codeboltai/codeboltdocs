---
title: updateKey
---

# `updateKey`

```typescript
client.llm.updateKey(data: LLMUpdateKeyRequest): Promise<unknown>
```

Updates the API key for a specific LLM provider.

Sets or rotates the authentication key used to communicate with an LLM provider's API.
The key is stored securely and used for all subsequent requests to that provider.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `LLMUpdateKeyRequest` | Yes | The key update request |

## Returns

`Promise<unknown>` — A promise that resolves when the key has been updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.llm.updateKey(/* LLMUpdateKeyRequest */);
console.log(result);
```
