---
title: deleteInstanceTemplate
---

# `deleteInstanceTemplate`

```typescript
client.knowledgeGraph.deleteInstanceTemplate(id: string): Promise<unknown>
```

Deletes a knowledge graph instance template.

Removes the template definition. Instances created from this template
continue to exist but can no longer reference the deleted template.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the template to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.deleteInstanceTemplate('id');
console.log(result);
```
