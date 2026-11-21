---
title: listInstanceTemplates
---

# `listInstanceTemplates`

```typescript
client.knowledgeGraph.listInstanceTemplates(params?: Record<string, unknown>): Promise<KGInstanceTemplate[]>
```

Lists all knowledge graph instance templates.

Returns every template in the system with their schema definitions
and metadata.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KGInstanceTemplate[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.listInstanceTemplates();
console.log(result);
```
