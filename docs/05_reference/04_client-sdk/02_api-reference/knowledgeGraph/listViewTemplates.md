---
title: listViewTemplates
---

# `listViewTemplates`

```typescript
client.knowledgeGraph.listViewTemplates(params?: Record<string, unknown>): Promise<KGViewTemplate[]>
```

Lists all knowledge graph view templates.

Returns every view template with their query definitions and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KGViewTemplate[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.listViewTemplates();
console.log(result);
```
