---
title: updateViewTemplate
---

# `updateViewTemplate`

```typescript
client.knowledgeGraph.updateViewTemplate(id: string, data: UpdateKGViewTemplateRequest): Promise<KGViewTemplate>
```

Updates a view template.

Modifies the template's query definition or metadata. Existing
views created from this template are not automatically updated.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view template to update |
| `data` | `UpdateKGViewTemplateRequest` | Yes | The fields to update |

## Returns

`Promise<KGViewTemplate>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.updateViewTemplate('id', /* UpdateKGViewTemplateRequest */);
console.log(result);
```
