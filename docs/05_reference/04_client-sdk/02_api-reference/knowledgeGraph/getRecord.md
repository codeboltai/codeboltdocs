---
title: getRecord
---

# `getRecord`

```typescript
client.knowledgeGraph.getRecord(id: string, recordId: string): Promise<KGRecord>
```

Retrieves a specific record from a knowledge graph instance.

Returns the full record including all its properties and type
information.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the graph instance |
| `recordId` | `string` | Yes | The unique identifier of the record within the instance |

## Returns

`Promise<KGRecord>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.getRecord('id', 'recordId');
console.log(result);
```
