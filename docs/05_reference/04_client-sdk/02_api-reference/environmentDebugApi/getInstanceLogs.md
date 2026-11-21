---
title: getInstanceLogs
---

# `getInstanceLogs`

```typescript
client.environmentDebugApi.getInstanceLogs(environmentId: string, params?: EnvironmentDebugLogsParams): Promise<EnvironmentDebugLog[]>
```

Retrieves parsed logs for an environment debug instance.

Returns structured log entries that have been parsed from raw output,
making them easier to filter, search, and display in a UI.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `environmentId` | `string` | Yes | The unique identifier of the environment instance |
| `params` | `EnvironmentDebugLogsParams` | No | Optional parameters to filter logs by level, time range, or pagination |

## Returns

`Promise<EnvironmentDebugLog[]>` — A promise that resolves to an array of  entries

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.environmentDebugApi.getInstanceLogs('environmentId');
console.log(result);
```
