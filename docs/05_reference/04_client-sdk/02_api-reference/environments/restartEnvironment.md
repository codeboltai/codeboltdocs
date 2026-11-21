---
title: restartEnvironment
---

# `restartEnvironment`

```typescript
client.environments.restartEnvironment(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Restarts an environment.

Performs a stop followed by a start on the environment. Useful for
applying configuration changes that require a fresh boot.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to restart |
| `data` | `Record<string, unknown>` | No | Optional restart configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the environment has restarted

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.restartEnvironment('id');
console.log(result);
```
