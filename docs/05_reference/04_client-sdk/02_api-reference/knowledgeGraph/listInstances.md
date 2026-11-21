---
title: listInstances
---

# `listInstances`

```typescript
client.knowledgeGraph.listInstances(params?: Record<string, unknown>): Promise<KGInstance[]>
```

Lists all knowledge graph instances.

Returns every graph instance in the system with their metadata
and record/edge counts.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

## Returns

`Promise<KGInstance[]>` — A promise that resolves to an array of  objects

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.listInstances();
console.log(result);
```
