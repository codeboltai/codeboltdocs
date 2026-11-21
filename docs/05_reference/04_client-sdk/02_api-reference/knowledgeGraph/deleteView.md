---
title: deleteView
---

# `deleteView`

```typescript
client.knowledgeGraph.deleteView(id: string): Promise<unknown>
```

Deletes a view.

Removes the saved query. The underlying graph data is not affected.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.deleteView('id');
console.log(result);
```
