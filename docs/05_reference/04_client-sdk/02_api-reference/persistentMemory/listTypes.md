---
title: listTypes
---

# `listTypes`

```typescript
client.persistentMemory.listTypes(params?: Record<string, unknown>): Promise<PersistentMemoryType[]>
```

Lists all persistent memory type definitions with optional filtering.

Returns the collection of defined persistent memory types, each describing a reusable
processing pipeline for generating memory entries.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering and pagination |

## Returns

`Promise<PersistentMemoryType[]>` — A promise that resolves to an array of persistent memory types

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.listTypes();
console.log(result);
```
