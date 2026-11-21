---
title: Codemap API
---

# Codemap API

Codemap API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`delete`](./delete) | Deletes a codemap by its ID. |
| [`generate`](./generate) | Generates a new codemap for specified files. |
| [`get`](./get) | Retrieves a specific codemap by its ID. |
| [`getByPath`](./getByPath) | Retrieves codemap entries by file path. |
| [`list`](./list) | Lists all codemaps. |

## Methods

---

### `delete`

```typescript
client.codemap.delete(codemapId: string): Promise<unknown>
```

Deletes a codemap by its ID.

Permanently removes the codemap from the system. The underlying
source files are not affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `codemapId` | `string` | Yes | The unique identifier of the codemap to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./delete)

---

### `generate`

```typescript
client.codemap.generate(data: GenerateCodemapRequest): Promise<Codemap>
```

Generates a new codemap for specified files.

Parses the target files and produces a structural representation
capturing symbols, dependencies, and relationships.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `GenerateCodemapRequest` | Yes | The generation request specifying target files or directories |

**Returns:** `Promise<Codemap>` — A promise that resolves to the newly generated

[Full reference →](./generate)

---

### `get`

```typescript
client.codemap.get(codemapId: string): Promise<Codemap>
```

Retrieves a specific codemap by its ID.

Returns the full structural representation including all symbols,
relationships, and metadata.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `codemapId` | `string` | Yes | The unique identifier of the codemap |

**Returns:** `Promise<Codemap>` — A promise that resolves to the

[Full reference →](./get)

---

### `getByPath`

```typescript
client.codemap.getByPath(params: CodemapByPathParams): Promise<Codemap[]>
```

Retrieves codemap entries by file path.

Looks up codemaps associated with a specific file path, returning
all structural information for that file.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `CodemapByPathParams` | Yes | Query parameters including the file path to look up |

**Returns:** `Promise<Codemap[]>` — A promise that resolves to an array of matching  objects

[Full reference →](./getByPath)

---

### `list`

```typescript
client.codemap.list(params?: Record<string, unknown>): Promise<Codemap[]>
```

Lists all codemaps.

Returns every codemap that has been generated in the current workspace.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<Codemap[]>` — A promise that resolves to an array of  objects

[Full reference →](./list)

