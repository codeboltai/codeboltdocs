---
title: updateInstanceTemplate
---

# `updateInstanceTemplate`

```typescript
client.knowledgeGraph.updateInstanceTemplate(id: string, data: UpdateKGInstanceTemplateRequest): Promise<KGInstanceTemplate>
```

Updates a knowledge graph instance template.

Modifies the template's schema or metadata. Existing instances
created from this template are not automatically updated.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the template to update |
| `data` | `UpdateKGInstanceTemplateRequest` | Yes | The fields to update |

## Returns

`Promise<KGInstanceTemplate>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.updateInstanceTemplate('id', /* UpdateKGInstanceTemplateRequest */);
console.log(result);
```
