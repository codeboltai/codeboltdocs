---
title: createCollection
---

# `createCollection`

```typescript
client.knowledge.createCollection(data: CreateKnowledgeCollectionRequest): Promise<KnowledgeCollection>
```

Creates a new knowledge collection.

A collection is a named container for related documents. Documents
added to a collection are automatically chunked and indexed for
retrieval by agents.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKnowledgeCollectionRequest` | Yes | Collection creation payload including name and configuration |

## Returns

`Promise<KnowledgeCollection>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.createCollection(/* CreateKnowledgeCollectionRequest */);
console.log(result);
```
