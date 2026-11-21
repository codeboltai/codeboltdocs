---
title: PersistentMemory API
---

# PersistentMemory API

Persistent Memory API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`createType`](./createType) | Creates a new persistent memory type with a defined processing pipeline. |
| [`deleteType`](./deleteType) | Permanently deletes a persistent memory type definition. |
| [`duplicateType`](./duplicateType) | Creates a copy of an existing persistent memory type. |
| [`executeType`](./executeType) | Executes a persistent memory type's processing pipeline. |
| [`exportType`](./exportType) | Exports a persistent memory type configuration as a portable format. |
| [`getStepSpecs`](./getStepSpecs) | Retrieves all available processing step specifications. |
| [`getType`](./getType) | Retrieves a specific persistent memory type by its unique identifier. |
| [`getUserConfigurableStepSpecs`](./getUserConfigurableStepSpecs) | Retrieves step specifications that are user-configurable. |
| [`importType`](./importType) | Imports a persistent memory type configuration from an exported format. |
| [`listTypes`](./listTypes) | Lists all persistent memory type definitions with optional filtering. |
| [`updateType`](./updateType) | Updates an existing persistent memory type's configuration. |
| [`validate`](./validate) | Validates a persistent memory type configuration without saving it. |

## Methods

---

### `createType`

```typescript
client.persistentMemory.createType(data: CreatePersistentMemoryTypeRequest): Promise<PersistentMemoryType>
```

Creates a new persistent memory type with a defined processing pipeline.

Registers a new memory type that describes how input data should be processed and
stored. The type definition includes a sequence of steps that will be executed
when the pipeline runs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreatePersistentMemoryTypeRequest` | Yes | The type creation payload |

**Returns:** `Promise<PersistentMemoryType>` — A promise that resolves to the newly created persistent memory type

[Full reference →](./createType)

---

### `deleteType`

```typescript
client.persistentMemory.deleteType(id: string): Promise<unknown>
```

Permanently deletes a persistent memory type definition.

Removes the type and its pipeline configuration. Previously generated memory entries
are not affected by the deletion.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the type has been deleted

[Full reference →](./deleteType)

---

### `duplicateType`

```typescript
client.persistentMemory.duplicateType(id: string, data?: DuplicatePersistentMemoryRequest): Promise<PersistentMemoryType>
```

Creates a copy of an existing persistent memory type.

Duplicates the type definition, optionally with modifications such as a new name.
Useful for creating variations of working pipelines.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to duplicate |
| `data` | `DuplicatePersistentMemoryRequest` | No | Optional modifications to apply to the duplicated type |

**Returns:** `Promise<PersistentMemoryType>` — A promise that resolves to the newly created duplicate type

[Full reference →](./duplicateType)

---

### `executeType`

```typescript
client.persistentMemory.executeType(id: string, data?: ExecutePersistentMemoryRequest): Promise<unknown>
```

Executes a persistent memory type's processing pipeline.

Runs the defined processing steps against the provided input data or configured
data source, generating new memory entries as output.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to execute |
| `data` | `ExecutePersistentMemoryRequest` | No | Optional execution parameters and input data |

**Returns:** `Promise<unknown>` — A promise that resolves when the execution has been initiated

[Full reference →](./executeType)

---

### `exportType`

```typescript
client.persistentMemory.exportType(id: string): Promise<unknown>
```

Exports a persistent memory type configuration as a portable format.

Serializes the type definition for sharing, backup, or migration to another workspace.
The exported data can be imported using .

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to export |

**Returns:** `Promise<unknown>` — A promise that resolves to the exported type configuration

[Full reference →](./exportType)

---

### `getStepSpecs`

```typescript
client.persistentMemory.getStepSpecs(): Promise<PersistentMemoryStepSpec[]>
```

Retrieves all available processing step specifications.

Returns the catalog of step types that can be used when building persistent memory
pipelines. Each spec describes a step's inputs, outputs, and configurable parameters.

_No parameters._

**Returns:** `Promise<PersistentMemoryStepSpec[]>` — A promise that resolves to an array of step specifications

[Full reference →](./getStepSpecs)

---

### `getType`

```typescript
client.persistentMemory.getType(id: string): Promise<PersistentMemoryType>
```

Retrieves a specific persistent memory type by its unique identifier.

Returns the full type definition including its processing steps, configuration,
and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the persistent memory type |

**Returns:** `Promise<PersistentMemoryType>` — A promise that resolves to the persistent memory type definition

[Full reference →](./getType)

---

### `getUserConfigurableStepSpecs`

```typescript
client.persistentMemory.getUserConfigurableStepSpecs(): Promise<PersistentMemoryStepSpec[]>
```

Retrieves step specifications that are user-configurable.

Returns a subset of step specifications that expose user-facing configuration options,
filtering out internal-only or system-managed steps.

_No parameters._

**Returns:** `Promise<PersistentMemoryStepSpec[]>` — A promise that resolves to an array of user-configurable step specifications

[Full reference →](./getUserConfigurableStepSpecs)

---

### `importType`

```typescript
client.persistentMemory.importType(data: ImportPersistentMemoryRequest): Promise<PersistentMemoryType>
```

Imports a persistent memory type configuration from an exported format.

Creates a new persistent memory type from previously exported data. This enables
sharing pipeline configurations between workspaces or restoring from backups.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ImportPersistentMemoryRequest` | Yes | The import payload containing the exported type configuration |

**Returns:** `Promise<PersistentMemoryType>` — A promise that resolves to the newly imported persistent memory type

[Full reference →](./importType)

---

### `listTypes`

```typescript
client.persistentMemory.listTypes(params?: Record<string, unknown>): Promise<PersistentMemoryType[]>
```

Lists all persistent memory type definitions with optional filtering.

Returns the collection of defined persistent memory types, each describing a reusable
processing pipeline for generating memory entries.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering and pagination |

**Returns:** `Promise<PersistentMemoryType[]>` — A promise that resolves to an array of persistent memory types

[Full reference →](./listTypes)

---

### `updateType`

```typescript
client.persistentMemory.updateType(id: string, data: UpdatePersistentMemoryTypeRequest): Promise<PersistentMemoryType>
```

Updates an existing persistent memory type's configuration.

Modifies the type's processing steps, name, or other settings. Changes affect
subsequent executions but do not alter previously generated memories.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to update |
| `data` | `UpdatePersistentMemoryTypeRequest` | Yes | The fields to update |

**Returns:** `Promise<PersistentMemoryType>` — A promise that resolves to the updated persistent memory type

[Full reference →](./updateType)

---

### `validate`

```typescript
client.persistentMemory.validate(data: ValidatePersistentMemoryRequest): Promise<unknown>
```

Validates a persistent memory type configuration without saving it.

Checks that the type definition is well-formed, all referenced step types exist,
and the processing chain is compatible. Use this before creating or updating a type
to catch configuration errors early.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ValidatePersistentMemoryRequest` | Yes | The type configuration to validate |

**Returns:** `Promise<unknown>` — A promise that resolves to the validation result

[Full reference →](./validate)

