---
title: listViews
---

# `listViews`

```typescript
client.knowledgeGraph.listViews(params?: Record<string, unknown>): Promise<KGView[]>
```

Lists all knowledge graph views.

Returns every view with their query definitions and associated
graph instances.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KGView[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.listViews();
console.log(result);
```
