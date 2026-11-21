---
title: Specs API
---

# Specs API

Specs API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`create`](./create) | Creates a new specification document. |
| [`ensureFolder`](./ensureFolder) | Ensures the specs folder exists in the workspace. |
| [`get`](./get) | Retrieves a specific specification document. |
| [`list`](./list) | Lists all specification documents. |
| [`update`](./update) | Updates an existing specification document. |

## Methods

---

### `create`

```typescript
client.specs.create(data: CreateSpecRequest): Promise<Spec>
```

Creates a new specification document.

Registers a new spec with the system using the provided content.
The spec can include technical details, API definitions, architecture
descriptions, and other structured specification information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateSpecRequest` | Yes | Request containing the spec details |

**Returns:** `Promise<Spec>` — A promise that resolves to the created Spec object

[Full reference →](./create)

---

### `ensureFolder`

```typescript
client.specs.ensureFolder(data?: EnsureSpecFolderRequest): Promise<unknown>
```

Ensures the specs folder exists in the workspace.

Creates the specification directory if it doesn't already exist,
establishing a location for storing spec files and related documentation.
This operation is idempotent and safe to call multiple times.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `EnsureSpecFolderRequest` | No | Optional parameters for folder creation |

**Returns:** `Promise<unknown>` — A promise that resolves when the folder is ensured

[Full reference →](./ensureFolder)

---

### `get`

```typescript
client.specs.get(params?: GetSpecParams): Promise<Spec>
```

Retrieves a specific specification document.

Returns the spec matching the provided query parameters, typically
by spec ID or project. The document includes all sections, metadata,
and version information.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `GetSpecParams` | No | Query parameters to identify the spec |

**Returns:** `Promise<Spec>` — A promise that resolves to the Spec object

[Full reference →](./get)

---

### `list`

```typescript
client.specs.list(params?: ListSpecsParams): Promise<Spec[]>
```

Lists all specification documents.

Returns every spec document in the system, optionally filtered by
project, type, or other criteria. Use this for browsing specs or
populating specification management UIs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `ListSpecsParams` | No | Optional query parameters for filtering specs |

**Returns:** `Promise<Spec[]>` — A promise that resolves to an array of Spec objects

[Full reference →](./list)

---

### `update`

```typescript
client.specs.update(data: UpdateSpecRequest): Promise<Spec>
```

Updates an existing specification document.

Modifies the content, metadata, or structure of a spec. Use this to
add new sections, update information, change versions, or make other
modifications as specifications evolve.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `UpdateSpecRequest` | Yes | Request containing the spec updates |

**Returns:** `Promise<Spec>` — A promise that resolves to the updated Spec object

[Full reference →](./update)

