---
title: createView
---

# `createView`

```typescript
client.knowledgeGraph.createView(data: CreateKGViewRequest): Promise<KGView>
```

Creates a new view for querying a knowledge graph.

Views are saved queries that extract specific subsets of graph data.
They can be created from a template or with a custom query definition.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGViewRequest` | Yes | View creation payload including query definition and target instance |

## Returns

`Promise<KGView>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.createView(/* CreateKGViewRequest */);
console.log(result);
```
