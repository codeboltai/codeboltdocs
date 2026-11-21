---
title: listInstances
---

# `listInstances`

```typescript
client.environmentDebugApi.listInstances(params?: EnvironmentDebugInstancesParams): Promise<EnvironmentDebugInstance[]>
```

Lists all environment debug instances.

Returns every known environment instance regardless of state. Use the
optional parameters to paginate or filter results server-side.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `EnvironmentDebugInstancesParams` | No | Optional query parameters for pagination and filtering |

## Returns

`Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.listInstances();
console.log(result);
```
