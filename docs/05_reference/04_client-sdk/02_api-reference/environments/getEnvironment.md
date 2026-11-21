---
title: getEnvironment
---

# `getEnvironment`

```typescript
client.environments.getEnvironment(id: string): Promise<Environment>
```

Retrieves a specific environment by its ID.

Returns the full details of a single environment including its current
state, provider, and configuration.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |

## Returns

`Promise<Environment>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getEnvironment('id');
console.log(result);
```
