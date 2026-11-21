---
title: AgentExecutionPhases API
---

# AgentExecutionPhases API

Agent Execution Phases API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new execution phase. |
| [`delete`](./delete) | Deletes an execution phase. |
| [`get`](./get) | Retrieves a specific execution phase by its name. |
| [`getAll`](./getAll) | Retrieves all defined agent execution phases. |
| [`reset`](./reset) | Resets all agent execution phases to their default configuration. |
| [`update`](./update) | Updates an existing execution phase. |

## Methods

---

### `create`

```typescript
client.agentExecutionPhases.create(data: CreateAgentExecutionPhaseRequest): Promise<AgentExecutionPhase>
```

Creates a new execution phase.

Defines a new phase in the agent execution lifecycle. The phase will
be available for agents to transition through during their execution.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateAgentExecutionPhaseRequest` | Yes | The phase creation payload |

**Returns:** `Promise<AgentExecutionPhase>` — A promise that resolves to the newly created AgentExecutionPhase

[Full reference →](./create)

---

### `delete`

```typescript
client.agentExecutionPhases.delete(name: string): Promise<unknown>
```

Deletes an execution phase.

Permanently removes the specified execution phase from the system.
Agents will no longer transition through this phase.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the phase to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the phase has been deleted

[Full reference →](./delete)

---

### `get`

```typescript
client.agentExecutionPhases.get(name: string): Promise<AgentExecutionPhase>
```

Retrieves a specific execution phase by its name.

Returns the full definition of a single phase including its
configuration, order, and associated behavior.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the execution phase |

**Returns:** `Promise<AgentExecutionPhase>` — A promise that resolves to the AgentExecutionPhase object

[Full reference →](./get)

---

### `getAll`

```typescript
client.agentExecutionPhases.getAll(params?: Record<string, unknown>): Promise<AgentExecutionPhase[]>
```

Retrieves all defined agent execution phases.

Returns the complete list of execution phases that have been configured
in the system.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<AgentExecutionPhase[]>` — A promise that resolves to an array of AgentExecutionPhase objects

[Full reference →](./getAll)

---

### `reset`

```typescript
client.agentExecutionPhases.reset(data?: ResetAgentExecutionPhasesRequest): Promise<unknown>
```

Resets all agent execution phases to their default configuration.

Restores the built-in phase definitions, removing any custom phases
and reverting modified ones to their original state.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ResetAgentExecutionPhasesRequest` | No | Optional configuration for the reset operation |

**Returns:** `Promise<unknown>` — A promise that resolves when the reset is complete

[Full reference →](./reset)

---

### `update`

```typescript
client.agentExecutionPhases.update(name: string, data: UpdateAgentExecutionPhaseRequest): Promise<AgentExecutionPhase>
```

Updates an existing execution phase.

Modifies the configuration of an execution phase. Use this to change
the phase description, ordering, or other properties.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the phase to update |
| `data` | `UpdateAgentExecutionPhaseRequest` | Yes | The fields to update on the phase |

**Returns:** `Promise<AgentExecutionPhase>` — A promise that resolves to the updated AgentExecutionPhase

[Full reference →](./update)

