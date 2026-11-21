---
title: setDefaultProvider
---

# `setDefaultProvider`

```typescript
client.environments.setDefaultProvider(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Sets an installed provider as the system default.

New environments will use this provider unless another is explicitly
specified during creation.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the provider to set as default |
| `data` | `Record<string, unknown>` | No | Optional additional configuration for the default setting |

## Returns

`Promise<unknown>` — A promise that resolves when the default is updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.setDefaultProvider('id');
console.log(result);
```
