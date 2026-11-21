---
title: Orchestrator API
---

# Orchestrator API

Orchestrator API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new orchestrator instance with the specified configuration. |
| [`delete`](./delete) | Deletes an orchestrator instance permanently. |
| [`get`](./get) | Retrieves a specific orchestrator instance by its unique identifier. |
| [`list`](./list) | Lists all orchestrator instances with optional filtering. |
| [`update`](./update) | Updates an existing orchestrator instance's configuration. |

## Methods

---

### `create`

```typescript
client.orchestrator.create(data: CreateOrchestratorRequest): Promise<OrchestratorInstance>
```

Creates a new orchestrator instance with the specified configuration.

Sets up a new orchestrator that will coordinate agent interactions according to the
provided rules and workflow definitions. The orchestrator can be started immediately
or configured further before activation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateOrchestratorRequest` | Yes | The orchestrator creation configuration |

**Returns:** `Promise<OrchestratorInstance>` — A promise that resolves to the newly created orchestrator instance

[Full reference →](./create)

---

### `delete`

```typescript
client.orchestrator.delete(id: string): Promise<void>
```

Deletes an orchestrator instance permanently.

Removes the orchestrator and its configuration. Any active workflows managed by this
orchestrator should be stopped before deletion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the orchestrator to delete |

**Returns:** `Promise<void>` — A promise that resolves when the orchestrator has been deleted

[Full reference →](./delete)

---

### `get`

```typescript
client.orchestrator.get(id: string): Promise<OrchestratorInstance>
```

Retrieves a specific orchestrator instance by its unique identifier.

Returns the full configuration and current state of an orchestrator, including its
assigned agents, coordination rules, and execution history.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the orchestrator to retrieve |

**Returns:** `Promise<OrchestratorInstance>` — A promise that resolves to the orchestrator instance details

[Full reference →](./get)

---

### `list`

```typescript
client.orchestrator.list(params?: OrchestratorListParams): Promise<OrchestratorInstance[]>
```

Lists all orchestrator instances with optional filtering.

Returns the collection of configured orchestrators, which can be filtered by status,
type, or other criteria. Each orchestrator defines a coordination strategy for
multi-agent workflows.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `OrchestratorListParams` | No | Optional filtering and pagination parameters |

**Returns:** `Promise<OrchestratorInstance[]>` — A promise that resolves to an array of orchestrator instances

[Full reference →](./list)

---

### `update`

```typescript
client.orchestrator.update(id: string, data: UpdateOrchestratorRequest): Promise<OrchestratorInstance>
```

Updates an existing orchestrator instance's configuration.

Modifies the settings, rules, or agent assignments of an orchestrator. Changes take
effect for subsequent workflow executions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the orchestrator to update |
| `data` | `UpdateOrchestratorRequest` | Yes | The fields to update on the orchestrator |

**Returns:** `Promise<OrchestratorInstance>` — A promise that resolves to the updated orchestrator instance

[Full reference →](./update)

