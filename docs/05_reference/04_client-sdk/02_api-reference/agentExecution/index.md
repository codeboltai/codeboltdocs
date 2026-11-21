---
title: AgentExecution API
---

# AgentExecution API

Agent Execution API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`cleanupExecutions`](./cleanupExecutions) | Cleans up old execution records. |
| [`getExecution`](./getExecution) | Retrieves the execution record for a specific thread. |
| [`getExecutions`](./getExecutions) | Retrieves all agent execution records. |
| [`getExecutionTree`](./getExecutionTree) | Retrieves the execution tree for a specific thread. |
| [`getFilteredExecutions`](./getFilteredExecutions) | Retrieves agent executions matching specific filter criteria. |
| [`getSwarmIds`](./getSwarmIds) | Retrieves all known swarm IDs from execution history. |

## Methods

---

### `cleanupExecutions`

```typescript
client.agentExecution.cleanupExecutions(params?: CleanupExecutionsParams): Promise<unknown>
```

Cleans up old execution records.

Removes execution records older than the specified threshold to free
up storage and keep the system performant.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CleanupExecutionsParams` | No | Query parameters controlling the cleanup |

**Returns:** `Promise<unknown>` — A promise that resolves when cleanup is complete

[Full reference →](./cleanupExecutions)

---

### `getExecution`

```typescript
client.agentExecution.getExecution(threadId: string): Promise<AgentExecutionRecord>
```

Retrieves the execution record for a specific thread.

Returns detailed execution information including timing, status,
agent configuration, and outcome for the given thread.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<AgentExecutionRecord>` — A promise that resolves to the AgentExecutionRecord for that thread

[Full reference →](./getExecution)

---

### `getExecutions`

```typescript
client.agentExecution.getExecutions(params?: Record<string, unknown>): Promise<AgentExecutionRecord[]>
```

Retrieves all agent execution records.

Returns the complete history of agent executions, useful for auditing
and monitoring agent activity over time.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<AgentExecutionRecord[]>` — A promise that resolves to an array of AgentExecutionRecord objects

[Full reference →](./getExecutions)

---

### `getExecutionTree`

```typescript
client.agentExecution.getExecutionTree(threadId: string): Promise<AgentExecutionTree>
```

Retrieves the execution tree for a specific thread.

Returns a hierarchical view of the execution, showing parent-child
relationships between agents in multi-agent workflows. Useful for
visualizing how agents spawned sub-agents during execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `threadId` | `string` | Yes | The unique identifier of the thread |

**Returns:** `Promise<AgentExecutionTree>` — A promise that resolves to the AgentExecutionTree structure

[Full reference →](./getExecutionTree)

---

### `getFilteredExecutions`

```typescript
client.agentExecution.getFilteredExecutions(params?: AgentExecutionFilterParams): Promise<AgentExecutionRecord[]>
```

Retrieves agent executions matching specific filter criteria.

Supports filtering by status, swarm ID, start source, thread ID,
and whether the execution ran in the background.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `AgentExecutionFilterParams` | No | Filter parameters to narrow down results |

**Returns:** `Promise<AgentExecutionRecord[]>` — A promise that resolves to an array of matching AgentExecutionRecord objects

[Full reference →](./getFilteredExecutions)

---

### `getSwarmIds`

```typescript
client.agentExecution.getSwarmIds(): Promise<string[]>
```

Retrieves all known swarm IDs from execution history.

Returns a list of unique swarm identifiers that appear in the execution
records, useful for populating filter dropdowns or discovering swarms.

_No parameters._

**Returns:** `Promise<string[]>` — A promise that resolves to an array of swarm ID strings

[Full reference →](./getSwarmIds)

