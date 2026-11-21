---
title: addDocumentFromUrl
---

# `addDocumentFromUrl`

```typescript
client.knowledge.addDocumentFromUrl(id: string, data: AddKnowledgeDocumentFromUrlRequest): Promise<unknown>
```

Adds a document to a collection by fetching it from a URL.

Downloads the content at the specified URL and adds it as a document
to the collection. The content is automatically parsed and chunked.

## Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddKnowledgeDocumentFromUrlRequest` | Yes | Request specifying the URL and optional metadata |

## Returns

`Promise<unknown>` — A promise that resolves when the document has been fetched and added

## Example

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();

const result = await client.knowledge.addDocumentFromUrl('id', /* AddKnowledgeDocumentFromUrlRequest */);
console.log(result);
```
