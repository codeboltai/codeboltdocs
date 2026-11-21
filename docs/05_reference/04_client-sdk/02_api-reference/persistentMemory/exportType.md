---
title: exportType
---

# `exportType`

```typescript
client.persistentMemory.exportType(id: string): Promise<unknown>
```

Exports a persistent memory type configuration as a portable format.

Serializes the type definition for sharing, backup, or migration to another workspace.
The exported data can be imported using .

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the type to export |

## Returns

`Promise<unknown>` — A promise that resolves to the exported type configuration

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.persistentMemory.exportType('id');
console.log(result);
```
