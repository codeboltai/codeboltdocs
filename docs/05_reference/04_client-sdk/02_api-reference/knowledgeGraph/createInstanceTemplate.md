---
title: createInstanceTemplate
---

# `createInstanceTemplate`

```typescript
client.knowledgeGraph.createInstanceTemplate(data: CreateKGInstanceTemplateRequest): Promise<KGInstanceTemplate>
```

Creates a new knowledge graph instance template.

Templates define the schema and structure for knowledge graph instances.
Use templates to enforce consistent node types and edge patterns
across multiple graph instances.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGInstanceTemplateRequest` | Yes | Template creation payload including schema definition |

## Returns

`Promise<KGInstanceTemplate>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.createInstanceTemplate(/* CreateKGInstanceTemplateRequest */);
console.log(result);
```
