---
title: startEnvironment
---

# `startEnvironment`

```typescript
client.environments.startEnvironment(id: string, data?: Record<string, unknown>): Promise<unknown>
```

Starts an environment.

Boots up the environment so it becomes active and ready for use.
The environment's provider must be running first.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to start |
| `data` | `Record<string, unknown>` | No | Optional start configuration |

## Returns

`Promise<unknown>` — A promise that resolves when the environment has started

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.startEnvironment('id');
console.log(result);
```
