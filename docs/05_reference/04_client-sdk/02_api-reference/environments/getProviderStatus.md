---
title: getProviderStatus
---

# `getProviderStatus`

```typescript
client.environments.getProviderStatus(id: string): Promise<EnvironmentProviderStatus>
```

Retrieves the current provider status for an environment.

Returns whether the backing provider is running, stopped, or in an
error state. Useful for health checks and monitoring.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the environment |

## Returns

`Promise<EnvironmentProviderStatus>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environments.getProviderStatus('id');
console.log(result);
```
