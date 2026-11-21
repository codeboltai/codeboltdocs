---
title: createRecord
---

# `createRecord`

```typescript
client.knowledgeGraph.createRecord(id: string, data: CreateKGRecordRequest): Promise<KGRecord>
```

Creates a new record (node) in a knowledge graph instance.

Records represent entities or concepts in the graph. Each record
has a type, properties, and can be connected to other records
through edges.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `data` | `CreateKGRecordRequest` | Yes | Record creation payload including type and properties |

## Returns

`Promise<KGRecord>` — A promise that resolves to the newly created

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.createRecord('id', /* CreateKGRecordRequest */);
console.log(result);
```
