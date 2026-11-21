---
title: updateRecord
---

# `updateRecord`

```typescript
client.knowledgeGraph.updateRecord(id: string, recordId: string, data: UpdateKGRecordRequest): Promise<KGRecord>
```

Updates a record in a knowledge graph instance.

Modifies the record's properties or type. Only the fields provided
in the request body are updated.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `recordId` | `string` | Yes | The unique identifier of the record to update |
| `data` | `UpdateKGRecordRequest` | Yes | The fields to update on the record |

## Returns

`Promise<KGRecord>` — A promise that resolves to the updated

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.updateRecord('id', 'recordId', /* UpdateKGRecordRequest */);
console.log(result);
```
