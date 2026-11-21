---
title: listFilteredInstances
---

# `listFilteredInstances`

```typescript
client.environmentDebugApi.listFilteredInstances(params?: EnvironmentDebugFilteredParams): Promise<EnvironmentDebugInstance[]>
```

Lists environment debug instances matching specific filter criteria.

Similar to  but applies additional server-side
filtering such as status, date range, or provider constraints.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `EnvironmentDebugFilteredParams` | No | Optional filter parameters to narrow results |

## Returns

`Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of filtered  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.listFilteredInstances();
console.log(result);
```
