---
title: executeView
---

# `executeView`

```typescript
client.knowledgeGraph.executeView(id: string, params?: Record<string, unknown>): Promise<unknown>
```

Executes a view and returns the query results.

Runs the view's query against its associated graph instance and
returns the matching records and edges. This is the primary way
to extract data from a knowledge graph.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view to execute |
| `params` | `Record<string, unknown>` | No | Optional runtime parameters to pass to the view query |

## Returns

`Promise<unknown>` — A promise that resolves to the query results (records and edges)

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.executeView('id');
console.log(result);
```
