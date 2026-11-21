---
title: Capability API
---

# Capability API

Capability API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new capability. |
| [`createExecutor`](./createExecutor) | Creates a new capability executor. |
| [`getDetail`](./getDetail) | Retrieves detailed information for a specific capability. |
| [`getExecutors`](./getExecutors) | Retrieves all capability executors. |
| [`getStats`](./getStats) | Retrieves aggregate statistics about capabilities. |
| [`getTypes`](./getTypes) | Retrieves the list of available capability types. |
| [`list`](./list) | Retrieves all registered capabilities. |
| [`refresh`](./refresh) | Refreshes the capability registry. |

## Methods

---

### `create`

```typescript
client.capability.create(data: CreateCapabilityRequest): Promise<Capability>
```

Creates a new capability.

Registers a new capability in the system, defining a skill or action
that agents can use.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCapabilityRequest` | Yes | The capability creation payload |

**Returns:** `Promise<Capability>` — A promise that resolves to the newly created Capability

[Full reference →](./create)

---

### `createExecutor`

```typescript
client.capability.createExecutor(data: CreateCapabilityExecutorRequest): Promise<CapabilityExecutor>
```

Creates a new capability executor.

Registers an executor implementation that can handle invocations
of a specific capability.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateCapabilityExecutorRequest` | Yes | The executor creation payload |

**Returns:** `Promise<CapabilityExecutor>` — A promise that resolves to the created CapabilityExecutor

[Full reference →](./createExecutor)

---

### `getDetail`

```typescript
client.capability.getDetail(name: string): Promise<Capability>
```

Retrieves detailed information for a specific capability.

Returns the full definition of a capability including its
configuration, executors, and usage documentation.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | The unique name of the capability |

**Returns:** `Promise<Capability>` — A promise that resolves to the Capability object

[Full reference →](./getDetail)

---

### `getExecutors`

```typescript
client.capability.getExecutors(params?: Record<string, unknown>): Promise<CapabilityExecutor[]>
```

Retrieves all capability executors.

Returns the list of executor implementations that are registered
to handle capability invocations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering |

**Returns:** `Promise<CapabilityExecutor[]>` — A promise that resolves to an array of CapabilityExecutor objects

[Full reference →](./getExecutors)

---

### `getStats`

```typescript
client.capability.getStats(): Promise<CapabilityStats>
```

Retrieves aggregate statistics about capabilities.

Returns summary metrics about the capability system including
total counts, usage rates, and executor distribution.

_No parameters._

**Returns:** `Promise<CapabilityStats>` — A promise that resolves to the CapabilityStats object

[Full reference →](./getStats)

---

### `getTypes`

```typescript
client.capability.getTypes(): Promise<string[]>
```

Retrieves the list of available capability types.

Returns the distinct type identifiers that capabilities can belong to,
useful for categorizing or filtering capabilities.

_No parameters._

**Returns:** `Promise<string[]>` — A promise that resolves to an array of type name strings

[Full reference →](./getTypes)

---

### `list`

```typescript
client.capability.list(params?: Record<string, unknown>): Promise<Capability[]>
```

Retrieves all registered capabilities.

Returns the complete list of capabilities available in the system,
representing the skills and actions that agents can perform.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<Capability[]>` — A promise that resolves to an array of Capability objects

[Full reference →](./list)

---

### `refresh`

```typescript
client.capability.refresh(data?: Record<string, unknown>): Promise<unknown>
```

Refreshes the capability registry.

Forces a re-scan and reload of all registered capabilities, picking
up any newly added or modified capability definitions.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `Record<string, unknown>` | No | Optional configuration for the refresh operation |

**Returns:** `Promise<unknown>` — A promise that resolves when the refresh is complete

[Full reference →](./refresh)

