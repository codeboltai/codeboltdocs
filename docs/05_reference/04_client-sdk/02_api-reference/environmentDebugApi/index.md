---
title: EnvironmentDebugApi API
---

# EnvironmentDebugApi API

Environment Debug API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`cleanup`](./cleanup) | Cleans up stale or orphaned environment instances. |
| [`getByProvider`](./getByProvider) | Retrieves environment instances associated with a specific provider. |
| [`getInstance`](./getInstance) | Retrieves a specific environment debug instance by its ID. |
| [`getInstanceLogs`](./getInstanceLogs) | Retrieves parsed logs for an environment debug instance. |
| [`getInstanceRawLogs`](./getInstanceRawLogs) | Retrieves raw, unprocessed logs for an environment debug instance. |
| [`getRunningInstances`](./getRunningInstances) | Retrieves all currently running environment instances. |
| [`listFilteredInstances`](./listFilteredInstances) | Lists environment debug instances matching specific filter criteria. |
| [`listInstances`](./listInstances) | Lists all environment debug instances. |
| [`rebuildIndex`](./rebuildIndex) | Rebuilds the environment debug index from scratch. |

## Methods

---

### `cleanup`

```typescript
client.environmentDebugApi.cleanup(): Promise<unknown>
```

Cleans up stale or orphaned environment instances.

Removes environment instances that are no longer active or have been
orphaned due to provider failures. This is a maintenance operation that
should be run periodically to keep the debug index clean.

_No parameters._

**Returns:** `Promise<unknown>` — A promise that resolves when cleanup is complete

[Full reference →](./cleanup)

---

### `getByProvider`

```typescript
client.environmentDebugApi.getByProvider(providerId: string): Promise<EnvironmentDebugInstance[]>
```

Retrieves environment instances associated with a specific provider.

Filters instances by the provider that created or manages them, useful
for diagnosing issues with a particular environment provider.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `providerId` | `string` | Yes | The unique identifier of the environment provider |

**Returns:** `Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of  objects for the given provider

[Full reference →](./getByProvider)

---

### `getInstance`

```typescript
client.environmentDebugApi.getInstance(environmentId: string): Promise<EnvironmentDebugInstance>
```

Retrieves a specific environment debug instance by its ID.

Returns the full detail of a single environment instance including
its current state, provider information, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `environmentId` | `string` | Yes | The unique identifier of the environment instance |

**Returns:** `Promise<EnvironmentDebugInstance>` — A promise that resolves to the

[Full reference →](./getInstance)

---

### `getInstanceLogs`

```typescript
client.environmentDebugApi.getInstanceLogs(environmentId: string, params?: EnvironmentDebugLogsParams): Promise<EnvironmentDebugLog[]>
```

Retrieves parsed logs for an environment debug instance.

Returns structured log entries that have been parsed from raw output,
making them easier to filter, search, and display in a UI.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `environmentId` | `string` | Yes | The unique identifier of the environment instance |
| `params` | `EnvironmentDebugLogsParams` | No | Optional parameters to filter logs by level, time range, or pagination |

**Returns:** `Promise<EnvironmentDebugLog[]>` — A promise that resolves to an array of  entries

[Full reference →](./getInstanceLogs)

---

### `getInstanceRawLogs`

```typescript
client.environmentDebugApi.getInstanceRawLogs(environmentId: string, params?: EnvironmentDebugLogsParams): Promise<unknown>
```

Retrieves raw, unprocessed logs for an environment debug instance.

Returns the original log output without parsing or structuring. Useful
for debugging cases where parsed logs may lose important context.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `environmentId` | `string` | Yes | The unique identifier of the environment instance |
| `params` | `EnvironmentDebugLogsParams` | No | Optional parameters to filter or paginate raw log output |

**Returns:** `Promise<unknown>` — A promise that resolves to the raw log data

[Full reference →](./getInstanceRawLogs)

---

### `getRunningInstances`

```typescript
client.environmentDebugApi.getRunningInstances(): Promise<EnvironmentDebugInstance[]>
```

Retrieves all currently running environment instances.

Returns only instances that are in an active/running state, which is
useful for monitoring dashboards and health checks.

_No parameters._

**Returns:** `Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of running  objects

[Full reference →](./getRunningInstances)

---

### `listFilteredInstances`

```typescript
client.environmentDebugApi.listFilteredInstances(params?: EnvironmentDebugFilteredParams): Promise<EnvironmentDebugInstance[]>
```

Lists environment debug instances matching specific filter criteria.

Similar to  but applies additional server-side
filtering such as status, date range, or provider constraints.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `EnvironmentDebugFilteredParams` | No | Optional filter parameters to narrow results |

**Returns:** `Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of filtered  objects

[Full reference →](./listFilteredInstances)

---

### `listInstances`

```typescript
client.environmentDebugApi.listInstances(params?: EnvironmentDebugInstancesParams): Promise<EnvironmentDebugInstance[]>
```

Lists all environment debug instances.

Returns every known environment instance regardless of state. Use the
optional parameters to paginate or filter results server-side.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `EnvironmentDebugInstancesParams` | No | Optional query parameters for pagination and filtering |

**Returns:** `Promise<EnvironmentDebugInstance[]>` — A promise that resolves to an array of  objects

[Full reference →](./listInstances)

---

### `rebuildIndex`

```typescript
client.environmentDebugApi.rebuildIndex(data?: RebuildEnvironmentIndexRequest): Promise<unknown>
```

Rebuilds the environment debug index from scratch.

Triggers a full re-indexing of all environment instances. Use this when
the index becomes inconsistent or after bulk data migrations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RebuildEnvironmentIndexRequest` | No | Optional configuration for the rebuild process |

**Returns:** `Promise<unknown>` — A promise that resolves when the rebuild is initiated

[Full reference →](./rebuildIndex)

