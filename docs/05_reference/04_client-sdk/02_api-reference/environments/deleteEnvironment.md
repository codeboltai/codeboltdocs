---
title: deleteEnvironment
---

# `deleteEnvironment`

```typescript
client.environments.deleteEnvironment(id: string): Promise<unknown>
```

Deletes an environment.

Permanently removes the environment and releases its resources. The
environment should be stopped before deletion.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.deleteEnvironment('id');
console.log(result);
```
