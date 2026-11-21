---
title: ActionBlocks API
---

# ActionBlocks API

Action Blocks API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`getDetail`](./getDetail) | Retrieves detailed information for a specific action block. |
| [`getExecutions`](./getExecutions) | Retrieves execution records for action blocks. |
| [`getStats`](./getStats) | Retrieves aggregate statistics about action blocks. |
| [`getTypes`](./getTypes) | Retrieves the list of available action block types. |
| [`list`](./list) | Retrieves all registered action blocks. |
| [`refresh`](./refresh) | Refreshes the action block registry. |
| [`stop`](./stop) | Stops a currently running action block execution. |

## Methods

---

### `getDetail`

```typescript
client.actionBlocks.getDetail(identifier: string): Promise<ActionBlockDetail>
```

Retrieves detailed information for a specific action block.

Returns the full configuration, metadata, and current state of the
action block identified by the given identifier string.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `identifier` | `string` | Yes | The unique identifier or name of the action block |

**Returns:** `Promise<ActionBlockDetail>` — A promise that resolves to the detailed ActionBlockDetail object

[Full reference →](./getDetail)

---

### `getExecutions`

```typescript
client.actionBlocks.getExecutions(params?: Record<string, unknown>): Promise<ActionBlockExecution[]>
```

Retrieves execution records for action blocks.

Returns a list of past and current executions, useful for monitoring
which action blocks have run and their outcomes.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<ActionBlockExecution[]>` — A promise that resolves to an array of ActionBlockExecution records

[Full reference →](./getExecutions)

---

### `getStats`

```typescript
client.actionBlocks.getStats(): Promise<ActionBlockStats>
```

Retrieves aggregate statistics about action blocks.

Returns counts, success rates, and other summary metrics for all
action blocks in the system.

_No parameters._

**Returns:** `Promise<ActionBlockStats>` — A promise that resolves to an ActionBlockStats object with summary metrics

[Full reference →](./getStats)

---

### `getTypes`

```typescript
client.actionBlocks.getTypes(): Promise<string[]>
```

Retrieves the list of available action block types.

Returns the distinct type identifiers that can be used when creating
or filtering action blocks.

_No parameters._

**Returns:** `Promise<string[]>` — A promise that resolves to an array of type name strings

[Full reference →](./getTypes)

---

### `list`

```typescript
client.actionBlocks.list(params?: Record<string, unknown>): Promise<ActionBlock[]>
```

Retrieves all registered action blocks.

Returns the full list of action blocks available in the current workspace.
Use optional query parameters to paginate or filter the results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<ActionBlock[]>` — A promise that resolves to an array of ActionBlock objects

[Full reference →](./list)

---

### `refresh`

```typescript
client.actionBlocks.refresh(data?: Record<string, unknown>): Promise<unknown>
```

Refreshes the action block registry.

Forces a re-scan and reload of all registered action blocks, picking up
any newly added or modified block definitions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional configuration for the refresh operation |

**Returns:** `Promise<unknown>` — A promise that resolves when the refresh is complete

[Full reference →](./refresh)

---

### `stop`

```typescript
client.actionBlocks.stop(data: StopActionBlockRequest): Promise<unknown>
```

Stops a currently running action block execution.

Sends a stop signal to the specified action block execution, causing it
to terminate gracefully. Use this to cancel long-running or stuck executions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StopActionBlockRequest` | Yes | The stop request containing the execution identifier to halt |

**Returns:** `Promise<unknown>` — A promise that resolves when the stop signal has been sent

[Full reference →](./stop)

