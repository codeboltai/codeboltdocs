---
title: Knowledge API
---

# Knowledge API

Knowledge API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addDocumentFromUrl`](./addDocumentFromUrl) | Adds a document to a collection by fetching it from a URL. |
| [`addDocuments`](./addDocuments) | Adds one or more documents to a knowledge collection. |
| [`createCollection`](./createCollection) | Creates a new knowledge collection. |
| [`deleteCollection`](./deleteCollection) | Deletes a knowledge collection and all its documents. |
| [`deleteDocument`](./deleteDocument) | Deletes a document and all its associated chunks. |
| [`getCollection`](./getCollection) | Retrieves a specific knowledge collection by its ID. |
| [`getDocument`](./getDocument) | Retrieves a specific document by its ID. |
| [`getSettings`](./getSettings) | Retrieves the settings for a knowledge collection. |
| [`getStrategies`](./getStrategies) | Retrieves all available chunking strategies. |
| [`getStrategyOptions`](./getStrategyOptions) | Retrieves the configurable options for a specific chunking strategy. |
| [`listCollections`](./listCollections) | Lists all knowledge collections. |
| [`listDocuments`](./listDocuments) | Lists all documents in a knowledge collection. |
| [`rechunkDocument`](./rechunkDocument) | Re-chunks a document using updated chunking settings. |
| [`updateChunk`](./updateChunk) | Updates a specific chunk's content or metadata. |
| [`updateCollection`](./updateCollection) | Updates a knowledge collection's properties. |
| [`updateSettings`](./updateSettings) | Updates the settings for a knowledge collection. |

## Methods

---

### `addDocumentFromUrl`

```typescript
client.knowledge.addDocumentFromUrl(id: string, data: AddKnowledgeDocumentFromUrlRequest): Promise<unknown>
```

Adds a document to a collection by fetching it from a URL.

Downloads the content at the specified URL and adds it as a document
to the collection. The content is automatically parsed and chunked.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddKnowledgeDocumentFromUrlRequest` | Yes | Request specifying the URL and optional metadata |

**Returns:** `Promise<unknown>` — A promise that resolves when the document has been fetched and added

[Full reference →](./addDocumentFromUrl)

---

### `addDocuments`

```typescript
client.knowledge.addDocuments(id: string, data: AddKnowledgeDocumentsRequest): Promise<unknown>
```

Adds one or more documents to a knowledge collection.

Uploads documents that will be automatically processed, chunked,
and indexed for retrieval. Supports multiple documents in a single request.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddKnowledgeDocumentsRequest` | Yes | The documents to add, including their content and metadata |

**Returns:** `Promise<unknown>` — A promise that resolves when the documents have been added and processing has begun

[Full reference →](./addDocuments)

---

### `createCollection`

```typescript
client.knowledge.createCollection(data: CreateKnowledgeCollectionRequest): Promise<KnowledgeCollection>
```

Creates a new knowledge collection.

A collection is a named container for related documents. Documents
added to a collection are automatically chunked and indexed for
retrieval by agents.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateKnowledgeCollectionRequest` | Yes | Collection creation payload including name and configuration |

**Returns:** `Promise<KnowledgeCollection>` — A promise that resolves to the newly created

[Full reference →](./createCollection)

---

### `deleteCollection`

```typescript
client.knowledge.deleteCollection(id: string): Promise<unknown>
```

Deletes a knowledge collection and all its documents.

Permanently removes the collection, its documents, and all
associated chunks. This action cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteCollection)

---

### `deleteDocument`

```typescript
client.knowledge.deleteDocument(documentId: string): Promise<unknown>
```

Deletes a document and all its associated chunks.

Permanently removes the document from its collection. The collection
itself is not affected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `documentId` | `string` | Yes | The unique identifier of the document to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when deletion is complete

[Full reference →](./deleteDocument)

---

### `getCollection`

```typescript
client.knowledge.getCollection(id: string): Promise<KnowledgeCollection>
```

Retrieves a specific knowledge collection by its ID.

Returns the full details of a collection including its metadata,
document count, and configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the knowledge collection |

**Returns:** `Promise<KnowledgeCollection>` — A promise that resolves to the

[Full reference →](./getCollection)

---

### `getDocument`

```typescript
client.knowledge.getDocument(documentId: string): Promise<KnowledgeDocument>
```

Retrieves a specific document by its ID.

Returns the full details of a document including its metadata,
processing status, and chunk count.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `documentId` | `string` | Yes | The unique identifier of the document |

**Returns:** `Promise<KnowledgeDocument>` — A promise that resolves to the

[Full reference →](./getDocument)

---

### `getSettings`

```typescript
client.knowledge.getSettings(id: string): Promise<KnowledgeCollectionSettings>
```

Retrieves the settings for a knowledge collection.

Returns the collection's chunking configuration, embedding settings,
and other processing parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |

**Returns:** `Promise<KnowledgeCollectionSettings>` — A promise that resolves to the

[Full reference →](./getSettings)

---

### `getStrategies`

```typescript
client.knowledge.getStrategies(): Promise<KnowledgeStrategy[]>
```

Retrieves all available chunking strategies.

Returns the list of chunking algorithms that can be used when
processing documents (e.g., fixed-size, sentence-based, semantic).

_No parameters._

**Returns:** `Promise<KnowledgeStrategy[]>` — A promise that resolves to an array of  descriptors

[Full reference →](./getStrategies)

---

### `getStrategyOptions`

```typescript
client.knowledge.getStrategyOptions(strategy: string): Promise<KnowledgeStrategyOptions>
```

Retrieves the configurable options for a specific chunking strategy.

Returns the parameter schema for the strategy, including defaults
and valid ranges. Use this to build dynamic configuration UIs.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `strategy` | `string` | Yes | The name of the chunking strategy |

**Returns:** `Promise<KnowledgeStrategyOptions>` — A promise that resolves to the  for the strategy

[Full reference →](./getStrategyOptions)

---

### `listCollections`

```typescript
client.knowledge.listCollections(params?: Record<string, unknown>): Promise<KnowledgeCollection[]>
```

Lists all knowledge collections.

Returns every collection in the system. Use optional parameters
to filter or paginate the results.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KnowledgeCollection[]>` — A promise that resolves to an array of  objects

[Full reference →](./listCollections)

---

### `listDocuments`

```typescript
client.knowledge.listDocuments(id: string, params?: Record<string, unknown>): Promise<KnowledgeDocument[]>
```

Lists all documents in a knowledge collection.

Returns the documents belonging to the specified collection with
their metadata. Does not include chunk-level content.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<KnowledgeDocument[]>` — A promise that resolves to an array of  objects

[Full reference →](./listDocuments)

---

### `rechunkDocument`

```typescript
client.knowledge.rechunkDocument(documentId: string, data?: RechunkDocumentRequest): Promise<unknown>
```

Re-chunks a document using updated chunking settings.

Discards existing chunks and re-processes the document with the
current or specified chunking strategy. Useful after changing
collection settings or chunking parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `documentId` | `string` | Yes | The unique identifier of the document to re-chunk |
| `data` | `RechunkDocumentRequest` | No | Optional parameters specifying the new chunking configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when re-chunking is complete

[Full reference →](./rechunkDocument)

---

### `updateChunk`

```typescript
client.knowledge.updateChunk(chunkId: string, data: UpdateKnowledgeChunkRequest): Promise<unknown>
```

Updates a specific chunk's content or metadata.

Modifies an individual chunk within a document. Useful for
correcting chunking artifacts or adding manual annotations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `chunkId` | `string` | Yes | The unique identifier of the chunk to update |
| `data` | `UpdateKnowledgeChunkRequest` | Yes | The fields to update on the chunk |

**Returns:** `Promise<unknown>` — A promise that resolves when the chunk has been updated

[Full reference →](./updateChunk)

---

### `updateCollection`

```typescript
client.knowledge.updateCollection(id: string, data: UpdateKnowledgeCollectionRequest): Promise<KnowledgeCollection>
```

Updates a knowledge collection's properties.

Modifies collection settings such as name, description, or
chunking configuration.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to update |
| `data` | `UpdateKnowledgeCollectionRequest` | Yes | The fields to update |

**Returns:** `Promise<KnowledgeCollection>` — A promise that resolves to the updated

[Full reference →](./updateCollection)

---

### `updateSettings`

```typescript
client.knowledge.updateSettings(id: string, data: UpdateKnowledgeSettingsRequest): Promise<KnowledgeCollectionSettings>
```

Updates the settings for a knowledge collection.

Modifies chunking strategy, chunk size, overlap, and other processing
parameters. Existing documents are not automatically re-chunked;
use  to apply new settings to existing content.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `data` | `UpdateKnowledgeSettingsRequest` | Yes | The settings to update |

**Returns:** `Promise<KnowledgeCollectionSettings>` — A promise that resolves to the updated

[Full reference →](./updateSettings)

