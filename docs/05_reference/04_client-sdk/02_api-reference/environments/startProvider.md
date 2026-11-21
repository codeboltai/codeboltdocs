---
title: startProvider
---

# `startProvider`

```typescript
client.environments.startProvider(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Starts the underlying provider for an environment.

Boots up the provider process that backs the environment, making it
ready to accept operations. This is distinct from starting the
environment itself.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `Record<string, unknown>` | No | Optional start configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the provider has started

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.startProvider('id');
console.log(result);
```
