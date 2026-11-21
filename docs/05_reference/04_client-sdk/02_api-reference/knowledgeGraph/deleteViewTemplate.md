---
title: deleteViewTemplate
---

# `deleteViewTemplate`

```typescript
client.knowledgeGraph.deleteViewTemplate(id: string): Promise<unknown>
```

Deletes a view template.

Removes the template definition. Views created from this template
continue to exist independently.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view template to delete |

## Returns

`Promise<unknown>` — A promise that resolves when deletion is complete

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.deleteViewTemplate('id');
console.log(result);
```
