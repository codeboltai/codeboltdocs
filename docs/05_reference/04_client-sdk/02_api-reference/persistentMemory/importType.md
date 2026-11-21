---
title: importType
---

# `importType`

```typescript
client.persistentMemory.importType(data: ImportPersistentMemoryRequest): Promise<PersistentMemoryType>
```

Imports a persistent memory type configuration from an exported format.

Creates a new persistent memory type from previously exported data. This enables
sharing pipeline configurations between workspaces or restoring from backups.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `ImportPersistentMemoryRequest` | Yes | The import payload containing the exported type configuration |

## Returns

`Promise<PersistentMemoryType>` — A promise that resolves to the newly imported persistent memory type

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.importType(/* ImportPersistentMemoryRequest */);
console.log(result);
```
