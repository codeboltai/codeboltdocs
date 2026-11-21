---
title: AgentDebugApi API
---

# AgentDebugApi API

Agent Debug API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`cleanup`](./cleanup) | Cleans up old agent debug data. |
| [`getBySwarm`](./getBySwarm) | Retrieves agent instances associated with a specific swarm. |
| [`getByThread`](./getByThread) | Retrieves agent instances associated with a specific thread. |
| [`getFilteredInstances`](./getFilteredInstances) | Retrieves agent instances matching specific filter criteria. |
| [`getInstance`](./getInstance) | Retrieves details for a specific agent debug instance. |
| [`getInstanceLogs`](./getInstanceLogs) | Retrieves parsed and structured logs for a specific agent instance. |
| [`getInstanceRawLogs`](./getInstanceRawLogs) | Retrieves raw, unprocessed logs for a specific agent instance. |
| [`getInstances`](./getInstances) | Retrieves all agent debug instances. |
| [`getRunning`](./getRunning) | Retrieves all currently running agent instances. |
| [`rebuildIndex`](./rebuildIndex) | Rebuilds the agent debug index. |

## Methods

---

### `cleanup`

```typescript
client.agentDebugApi.cleanup(params?: CleanupAgentDebugParams): Promise<unknown>
```

Cleans up old agent debug data.

Removes debug records that are older than the specified threshold.
Use this to free up storage and keep the debug system performant.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CleanupAgentDebugParams` | No | Query parameters controlling the cleanup |

**Returns:** `Promise<unknown>` — A promise that resolves when cleanup is complete

[Full reference →](./cleanup)

---

### `getBySwarm`

```typescript
client.agentDebugApi.getBySwarm(swarmId: string): Promise<AgentDebugInstance[]>
```

Retrieves agent instances associated with a specific swarm.

Returns all debug instances that belong to the given swarm, useful for
inspecting multi-agent coordination.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `swarmId` | `string` | Yes | The unique identifier of the swarm to query |

**Returns:** `Promise<AgentDebugInstance[]>` — A promise that resolves to an array of AgentDebugInstance objects for that swarm

[Full reference →](./getBySwarm)

---

### `getByThread`

```typescript
client.agentDebugApi.getByThread(threadId: string): Promise<AgentDebugInstance[]>
```

Retrieves agent instances associated with a specific thread.

Returns all debug instances that were spawned within or are linked to
the given thread ID.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread to query |

**Returns:** `Promise<AgentDebugInstance[]>` — A promise that resolves to an array of AgentDebugInstance objects for that thread

[Full reference →](./getByThread)

---

### `getFilteredInstances`

```typescript
client.agentDebugApi.getFilteredInstances(params?: AgentDebugFilterParams): Promise<AgentDebugInstance[]>
```

Retrieves agent instances matching specific filter criteria.

Supports filtering by status, agent type, thread ID, swarm ID, and
whether the agent is running in the background.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentDebugFilterParams` | No | Filter parameters to narrow down results |

**Returns:** `Promise<AgentDebugInstance[]>` — A promise that resolves to an array of matching AgentDebugInstance objects

[Full reference →](./getFilteredInstances)

---

### `getInstance`

```typescript
client.agentDebugApi.getInstance(agentInstanceId: string): Promise<AgentDebugInstance>
```

Retrieves details for a specific agent debug instance.

Returns the full debug record for a single agent instance including
its configuration, status, timing, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentInstanceId` | `string` | Yes | The unique identifier of the agent instance |

**Returns:** `Promise<AgentDebugInstance>` — A promise that resolves to the AgentDebugInstance object

[Full reference →](./getInstance)

---

### `getInstanceLogs`

```typescript
client.agentDebugApi.getInstanceLogs(agentInstanceId: string, params?: AgentDebugLogsParams): Promise<AgentDebugLog[]>
```

Retrieves parsed and structured logs for a specific agent instance.

Returns logs that have been parsed into structured AgentDebugLog objects,
making them easier to analyze programmatically. Supports pagination
through offset and limit parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentInstanceId` | `string` | Yes | The unique identifier of the agent instance |
| `params` | `AgentDebugLogsParams` | No | Optional pagination parameters |

**Returns:** `Promise<AgentDebugLog[]>` — A promise that resolves to an array of structured AgentDebugLog objects

[Full reference →](./getInstanceLogs)

---

### `getInstanceRawLogs`

```typescript
client.agentDebugApi.getInstanceRawLogs(agentInstanceId: string, params?: AgentDebugLogsParams): Promise<unknown>
```

Retrieves raw, unprocessed logs for a specific agent instance.

Returns the raw log output as produced by the agent, without any
parsing or structuring. Useful for debugging issues not captured
by the structured log parser.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agentInstanceId` | `string` | Yes | The unique identifier of the agent instance |
| `params` | `AgentDebugLogsParams` | No | Optional pagination parameters |

**Returns:** `Promise<unknown>` — A promise that resolves to the raw log data

[Full reference →](./getInstanceRawLogs)

---

### `getInstances`

```typescript
client.agentDebugApi.getInstances(params?: Record<string, unknown>): Promise<AgentDebugInstance[]>
```

Retrieves all agent debug instances.

Returns every agent instance that has been tracked by the debug system,
regardless of its current status.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<AgentDebugInstance[]>` — A promise that resolves to an array of AgentDebugInstance objects

[Full reference →](./getInstances)

---

### `getRunning`

```typescript
client.agentDebugApi.getRunning(): Promise<AgentDebugInstance[]>
```

Retrieves all currently running agent instances.

A convenience method that returns only instances with an active/running status,
useful for real-time monitoring dashboards.

_No parameters._

**Returns:** `Promise<AgentDebugInstance[]>` — A promise that resolves to an array of running AgentDebugInstance objects

[Full reference →](./getRunning)

---

### `rebuildIndex`

```typescript
client.agentDebugApi.rebuildIndex(data?: RebuildAgentDebugIndexRequest): Promise<unknown>
```

Rebuilds the agent debug index.

Forces a full re-index of all agent debug data. This can resolve
issues with missing or inconsistent search results in the debug interface.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `RebuildAgentDebugIndexRequest` | No | Optional configuration for the rebuild operation |

**Returns:** `Promise<unknown>` — A promise that resolves when the index rebuild is complete

[Full reference →](./rebuildIndex)

