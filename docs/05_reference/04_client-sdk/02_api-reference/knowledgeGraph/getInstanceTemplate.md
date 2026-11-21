---
title: getInstanceTemplate
---

# `getInstanceTemplate`

```typescript
client.knowledgeGraph.getInstanceTemplate(id: string): Promise<KGInstanceTemplate>
```

Retrieves a specific knowledge graph instance template by its ID.

Returns the full template definition including its schema, node types,
and edge constraints.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the instance template |

## Returns

`Promise<KGInstanceTemplate>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.getInstanceTemplate('id');
console.log(result);
```
