---
title: updateEnvironment
---

# `updateEnvironment`

```typescript
client.environments.updateEnvironment(id: string, data: UpdateEnvironmentRequest): Promise<Environment>
```

Updates an existing environment's configuration.

Modifies environment settings such as name, resource allocations, or
other configurable properties.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment to update |
| `data` | `UpdateEnvironmentRequest` | Yes | The fields to update on the environment |

## Returns

`Promise<Environment>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.updateEnvironment('id', /* UpdateEnvironmentRequest */);
console.log(result);
```
