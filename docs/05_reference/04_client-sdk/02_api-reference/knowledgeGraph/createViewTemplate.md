---
title: createViewTemplate
---

# `createViewTemplate`

```typescript
client.knowledgeGraph.createViewTemplate(data: CreateKGViewTemplateRequest): Promise<KGViewTemplate>
```

Creates a new view template for knowledge graphs.

View templates define reusable query patterns for extracting
specific subsets of graph data. They act as saved queries that
can be instantiated with different parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGViewTemplateRequest` | Yes | View template creation payload including query definition |

## Returns

`Promise<KGViewTemplate>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.createViewTemplate(/* CreateKGViewTemplateRequest */);
console.log(result);
```
