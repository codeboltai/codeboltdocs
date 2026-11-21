---
title: createInstance
---

# `createInstance`

```typescript
client.knowledgeGraph.createInstance(data: CreateKGInstanceRequest): Promise<KGInstance>
```

Creates a new knowledge graph instance.

Provisions an empty graph that can be populated with records and edges.
Optionally created from a template to inherit schema constraints.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKGInstanceRequest` | Yes | Instance creation payload including name and optional template reference |

## Returns

`Promise<KGInstance>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.createInstance(/* CreateKGInstanceRequest */);
console.log(result);
```
