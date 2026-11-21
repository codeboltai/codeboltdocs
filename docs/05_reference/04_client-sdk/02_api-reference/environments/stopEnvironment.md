---
title: stopEnvironment
---

# `stopEnvironment`

```typescript
client.environments.stopEnvironment(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Stops a running environment.

Gracefully shuts down the environment, preserving its state for later
restart. Resources may be released depending on the provider.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to stop |
| `data` | `Record<string, unknown>` | No | Optional stop configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the environment has stopped

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.stopEnvironment('id');
console.log(result);
```
