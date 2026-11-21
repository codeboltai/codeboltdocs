---
title: getViewTemplate
---

# `getViewTemplate`

```typescript
client.knowledgeGraph.getViewTemplate(id: string): Promise<KGViewTemplate>
```

Retrieves a specific view template by its ID.

Returns the full template definition including its query pattern
and configurable parameters.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the view template |

## Returns

`Promise<KGViewTemplate>` — A promise that resolves to the

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledgeGraph.getViewTemplate('id');
console.log(result);
```
