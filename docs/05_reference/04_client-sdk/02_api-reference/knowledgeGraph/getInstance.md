---
title: getInstance
---

# `getInstance`

```typescript
client.knowledgeGraph.getInstance(id: string): Promise<KGInstance>
```

Retrieves a specific knowledge graph instance by its ID.

Returns the full details of a graph instance including its metadata,
template reference, and statistics.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |

## Returns

`Promise<KGInstance>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.getInstance('id');
console.log(result);
```
