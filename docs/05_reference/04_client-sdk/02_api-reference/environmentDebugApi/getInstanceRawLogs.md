---
title: getInstanceRawLogs
---

# `getInstanceRawLogs`

```typescript
client.environmentDebugApi.getInstanceRawLogs(environmentId: string, params?: EnvironmentDebugLogsParams): Promise<unknown>
```

Retrieves raw, unprocessed logs for an environment debug instance.

Returns the original log output without parsing or structuring. Useful
for debugging cases where parsed logs may lose important context.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `environmentId` | `string` | Yes | The unique identifier of the environment instance |
| `params` | `EnvironmentDebugLogsParams` | No | Optional parameters to filter or paginate raw log output |

## Returns

`Promise<unknown>` — A promise that resolves to the raw log data

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.getInstanceRawLogs('environmentId');
console.log(result);
```
