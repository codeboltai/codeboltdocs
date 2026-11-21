---
title: BackgroundAgents API
---

# BackgroundAgents API

Background Agents API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`get`](./get) | Retrieves a specific background agent instance by ID. |
| [`getActive`](./getActive) | Retrieves currently active background agents. |
| [`list`](./list) | Retrieves all background agent instances. |
| [`start`](./start) | Starts a new background agent. |
| [`stop`](./stop) | Stops a running background agent instance. |

## Methods

---

### `get`

```typescript
client.backgroundAgents.get(instanceId: string): Promise<BackgroundAgentInstance>
```

Retrieves a specific background agent instance by ID.

Returns the full details of a single background agent including
its configuration, status, and runtime metrics.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the background agent instance |

**Returns:** `Promise<BackgroundAgentInstance>` — A promise that resolves to the BackgroundAgentInstance object

[Full reference →](./get)

---

### `getActive`

```typescript
client.backgroundAgents.getActive(params?: Record<string, unknown>): Promise<BackgroundAgentInstance[]>
```

Retrieves currently active background agents.

Returns only the background agents that are currently running,
excluding terminated or stopped instances.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

**Returns:** `Promise<BackgroundAgentInstance[]>` — A promise that resolves to an array of active BackgroundAgentInstance objects

[Full reference →](./getActive)

---

### `list`

```typescript
client.backgroundAgents.list(params?: Record<string, unknown>): Promise<BackgroundAgentInstance[]>
```

Retrieves all background agent instances.

Returns every background agent instance that has been created,
including both active and terminated ones.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<BackgroundAgentInstance[]>` — A promise that resolves to an array of BackgroundAgentInstance objects

[Full reference →](./list)

---

### `start`

```typescript
client.backgroundAgents.start(data: StartBackgroundAgentRequest): Promise<BackgroundAgentInstance>
```

Starts a new background agent.

Launches a background agent that will run continuously until explicitly
stopped. Background agents are suitable for long-running monitoring,
indexing, or maintenance tasks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `StartBackgroundAgentRequest` | Yes | The background agent start configuration |

**Returns:** `Promise<BackgroundAgentInstance>` — A promise that resolves to the started BackgroundAgentInstance

[Full reference →](./start)

---

### `stop`

```typescript
client.backgroundAgents.stop(instanceId: string, data?: StopBackgroundAgentRequest): Promise<unknown>
```

Stops a running background agent instance.

Sends a stop signal to the specified background agent, causing it
to terminate gracefully.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instanceId` | `string` | Yes | The unique identifier of the background agent instance to stop |
| `data` | `StopBackgroundAgentRequest` | No | Optional stop configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the stop signal has been sent

[Full reference →](./stop)

