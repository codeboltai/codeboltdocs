---
title: stopProvider
---

# `stopProvider`

```typescript
client.environments.stopProvider(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Stops the underlying provider for an environment.

Shuts down the provider process without destroying the environment.
The provider can be restarted later.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |
| `data` | `Record<string, unknown>` | No | Optional stop configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the provider has stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.stopProvider('id');
console.log(result);
```
