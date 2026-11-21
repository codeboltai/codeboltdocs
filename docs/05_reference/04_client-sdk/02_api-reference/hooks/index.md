---
title: Hooks API
---

# Hooks API

Hooks API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new hook. |
| [`delete`](./delete) | Deletes a hook. |
| [`disable`](./disable) | Disables a hook without deleting it. |
| [`enable`](./enable) | Enables a previously disabled hook. |
| [`get`](./get) | Retrieves a specific hook by its ID. |
| [`initialize`](./initialize) | Initializes the hooks subsystem. |
| [`list`](./list) | Lists all registered hooks. |
| [`update`](./update) | Updates an existing hook's configuration. |

## Methods

---

### `create`

```typescript
client.hooks.create(data: CreateHookRequest): Promise<Hook>
```

Creates a new hook.

Registers a hook that will fire when the specified event occurs.
The hook is enabled by default upon creation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateHookRequest` | Yes | Hook creation payload including event type and action |

**Returns:** `Promise<Hook>` — A promise that resolves to the newly created

[Full reference →](./create)

---

### `delete`

```typescript
client.hooks.delete(id: string): Promise<unknown>
```

Deletes a hook.

Permanently removes a hook registration. The hook will no longer
fire for any events after deletion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./delete)

---

### `disable`

```typescript
client.hooks.disable(id: string): Promise<unknown>
```

Disables a hook without deleting it.

Prevents the hook from firing while preserving its configuration.
The hook can be re-enabled later with .

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to disable |

**Returns:** `Promise<unknown>` — A promise that resolves when the hook has been disabled

[Full reference →](./disable)

---

### `enable`

```typescript
client.hooks.enable(id: string): Promise<unknown>
```

Enables a previously disabled hook.

Re-activates the hook so it will fire again when its event occurs.
Has no effect if the hook is already enabled.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to enable |

**Returns:** `Promise<unknown>` — A promise that resolves when the hook has been enabled

[Full reference →](./enable)

---

### `get`

```typescript
client.hooks.get(id: string): Promise<Hook>
```

Retrieves a specific hook by its ID.

Returns the full configuration and state of a single hook.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook |

**Returns:** `Promise<Hook>` — A promise that resolves to the

[Full reference →](./get)

---

### `initialize`

```typescript
client.hooks.initialize(data?: InitializeHooksRequest): Promise<unknown>
```

Initializes the hooks subsystem.

Sets up the hooks infrastructure, loading any persisted hooks and
preparing event listeners. Should be called once during application
bootstrap before registering or triggering hooks.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `InitializeHooksRequest` | No | Optional initialization configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when initialization is complete

[Full reference →](./initialize)

---

### `list`

```typescript
client.hooks.list(params?: Record<string, unknown>): Promise<Hook[]>
```

Lists all registered hooks.

Returns every hook in the system, including both enabled and disabled
hooks. Use optional parameters to filter or paginate the results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<Hook[]>` — A promise that resolves to an array of  objects

[Full reference →](./list)

---

### `update`

```typescript
client.hooks.update(id: string, data: UpdateHookRequest): Promise<Hook>
```

Updates an existing hook's configuration.

Modifies hook properties such as its name, event trigger, or action.
Only the fields provided in the request body are updated.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the hook to update |
| `data` | `UpdateHookRequest` | Yes | The fields to update |

**Returns:** `Promise<Hook>` — A promise that resolves to the updated

[Full reference →](./update)

