---
title: delete
---

# `delete`

```typescript
client.codemap.delete(codemapId: string): Promise<unknown>
```

Deletes a codemap by its ID.

Permanently removes the codemap from the system. The underlying
source files are not affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `codemapId` | `string` | Yes | The unique identifier of the codemap to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.codemap.delete('codemapId');
console.log(result);
```
