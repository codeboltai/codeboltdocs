---
title: VectorDb API
---

# VectorDb API

Vector DB API

```typescript
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient();
```

## Quick Reference

| Method | Description |
|---|---|
| [`addChunks`](./addChunks) | Adds chunks to a vector collection. |
| [`addDocuments`](./addDocuments) | Adds documents to a vector collection. |
| [`createCollection`](./createCollection) | Creates a new vector collection. |
| [`createIndex`](./createIndex) | Creates a vector index for a collection. |
| [`deleteChunk`](./deleteChunk) | Deletes a specific chunk from a vector collection. |
| [`deleteCollection`](./deleteCollection) | Deletes a vector collection. |
| [`deleteDocuments`](./deleteDocuments) | Deletes documents from a vector collection. |
| [`getChunks`](./getChunks) | Retrieves chunks from a vector collection. |
| [`getCollection`](./getCollection) | Retrieves a vector collection by its ID. |
| [`getDocuments`](./getDocuments) | Retrieves documents from a vector collection. |
| [`getSettings`](./getSettings) | Retrieves settings for a vector collection. |
| [`listCollections`](./listCollections) | Lists all vector collections. |
| [`query`](./query) | Queries a vector collection for similar documents. |
| [`updateCollection`](./updateCollection) | Updates a vector collection. |
| [`updateSettings`](./updateSettings) | Updates settings for a vector collection. |

## Methods

---

### `addChunks`

```typescript
client.vectorDb.addChunks(id: string, data: AddVectorChunksRequest): Promise<unknown>
```

Adds chunks to a vector collection.

Manually adds pre-chunked text segments to the collection with their
embeddings. This is useful when you have custom chunking logic or
want to add chunks without full document processing.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddVectorChunksRequest` | Yes | The chunks to add with their embeddings and metadata |

**Returns:** `Promise<unknown>` — A promise that resolves when chunks have been added

[Full reference →](./addChunks)

---

### `addDocuments`

```typescript
client.vectorDb.addDocuments(id: string, data: AddVectorDocumentsRequest): Promise<unknown>
```

Adds documents to a vector collection.

Ingests new documents into the collection, automatically generating
embeddings and storing them for similarity search. Documents can include
text content and metadata for filtering.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the target collection |
| `data` | `AddVectorDocumentsRequest` | Yes | The documents to add along with their metadata |

**Returns:** `Promise<unknown>` — A promise that resolves when documents have been added

[Full reference →](./addDocuments)

---

### `createCollection`

```typescript
client.vectorDb.createCollection(data: CreateVectorCollectionRequest): Promise<VectorCollection>
```

Creates a new vector collection.

Initializes a new collection with specified configuration including
dimensionality, embedding model, and metadata settings. Collections
are used to store and manage vectors for similarity search operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateVectorCollectionRequest` | Yes | The collection configuration data including name, dimensions, and settings |

**Returns:** `Promise<VectorCollection>` — A promise that resolves to the created VectorCollection object

[Full reference →](./createCollection)

---

### `createIndex`

```typescript
client.vectorDb.createIndex(data: CreateVectorIndexRequest): Promise<unknown>
```

Creates a vector index for a collection.

Initializes an index structure to optimize similarity search
performance. Indexes enable fast nearest neighbor queries on
high-dimensional vectors and are essential for efficient retrieval.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `CreateVectorIndexRequest` | Yes | The index creation configuration |

**Returns:** `Promise<unknown>` — A promise that resolves when the index has been created

[Full reference →](./createIndex)

---

### `deleteChunk`

```typescript
client.vectorDb.deleteChunk(id: string, chunkId: string): Promise<unknown>
```

Deletes a specific chunk from a vector collection.

Removes a single chunk by its unique identifier. This is useful for
granular cleanup when individual chunks need to be removed without
affecting other content in the collection.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `chunkId` | `string` | Yes | The unique identifier of the chunk to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the chunk has been deleted

[Full reference →](./deleteChunk)

---

### `deleteCollection`

```typescript
client.vectorDb.deleteCollection(id: string): Promise<unknown>
```

Deletes a vector collection.

Permanently removes a collection and all its associated data including
documents, chunks, and index information. This operation cannot be undone.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to delete |

**Returns:** `Promise<unknown>` — A promise that resolves when the collection has been deleted

[Full reference →](./deleteCollection)

---

### `deleteDocuments`

```typescript
client.vectorDb.deleteDocuments(id: string, data?: DeleteVectorDocumentsRequest): Promise<unknown>
```

Deletes documents from a vector collection.

Removes specified documents from the collection based on provided
criteria such as document IDs or metadata filters. This operation
cleans up the collection and frees storage.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `data` | `DeleteVectorDocumentsRequest` | No | Optional deletion criteria for selecting documents to remove |

**Returns:** `Promise<unknown>` — A promise that resolves when documents have been deleted

[Full reference →](./deleteDocuments)

---

### `getChunks`

```typescript
client.vectorDb.getChunks(id: string, params?: Record<string, unknown>): Promise<VectorChunk[]>
```

Retrieves chunks from a vector collection.

Fetches text chunks that were created when documents were processed.
Chunks are smaller segments of documents used for more granular
similarity search and retrieval operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<VectorChunk[]>` — A promise that resolves to an array of VectorChunk objects

[Full reference →](./getChunks)

---

### `getCollection`

```typescript
client.vectorDb.getCollection(id: string): Promise<VectorCollection>
```

Retrieves a vector collection by its ID.

Fetches detailed information about a specific collection including
its configuration, statistics, and metadata. Use this to inspect
collection properties or verify collection existence.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to retrieve |

**Returns:** `Promise<VectorCollection>` — A promise that resolves to the VectorCollection object

[Full reference →](./getCollection)

---

### `getDocuments`

```typescript
client.vectorDb.getDocuments(id: string, params?: Record<string, unknown>): Promise<VectorDocument[]>
```

Retrieves documents from a vector collection.

Fetches documents stored in the collection with optional filtering and
pagination parameters. Use this to inspect stored content or retrieve
specific documents by criteria.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<VectorDocument[]>` — A promise that resolves to an array of VectorDocument objects

[Full reference →](./getDocuments)

---

### `getSettings`

```typescript
client.vectorDb.getSettings(id: string): Promise<VectorCollectionSettings>
```

Retrieves settings for a vector collection.

Fetches the configuration and settings applied to a collection
including index types, distance metrics, and other operational
parameters.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection |

**Returns:** `Promise<VectorCollectionSettings>` — A promise that resolves to the VectorCollectionSettings object

[Full reference →](./getSettings)

---

### `listCollections`

```typescript
client.vectorDb.listCollections(params?: Record<string, unknown>): Promise<VectorCollection[]>
```

Lists all vector collections.

Retrieves every collection in the vector database system. Use optional
query parameters to filter or paginate results. This is useful for
browsing available collections or displaying a collection catalog.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `params` | `Record<string, unknown>` | No | Optional query parameters for filtering or pagination |

**Returns:** `Promise<VectorCollection[]>` — A promise that resolves to an array of VectorCollection objects

[Full reference →](./listCollections)

---

### `query`

```typescript
client.vectorDb.query(id: string, data: VectorQueryRequest): Promise<VectorSearchResult[]>
```

Queries a vector collection for similar documents.

Performs semantic similarity search using a query vector or text.
Returns documents or chunks ranked by similarity score, enabling
retrieval of contextually relevant content for RAG applications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to query |
| `data` | `VectorQueryRequest` | Yes | The query configuration including vector or text and search parameters |

**Returns:** `Promise<VectorSearchResult[]>` — A promise that resolves to an array of VectorSearchResult objects

[Full reference →](./query)

---

### `updateCollection`

```typescript
client.vectorDb.updateCollection(id: string, data: UpdateVectorCollectionRequest): Promise<VectorCollection>
```

Updates a vector collection.

Modifies the configuration of an existing collection such as name,
metadata, or other configurable properties. The collection ID must
be valid and the collection must exist.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to update |
| `data` | `UpdateVectorCollectionRequest` | Yes | The update data with fields to modify |

**Returns:** `Promise<VectorCollection>` — A promise that resolves to the updated VectorCollection object

[Full reference →](./updateCollection)

---

### `updateSettings`

```typescript
client.vectorDb.updateSettings(id: string, data: UpdateVectorSettingsRequest): Promise<VectorCollectionSettings>
```

Updates settings for a vector collection.

Modifies the configuration parameters of a collection such as
distance metric, index type, or other settings. Some settings
may require index rebuild or have performance implications.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | The unique identifier of the collection to update |
| `data` | `UpdateVectorSettingsRequest` | Yes | The settings to update with new values |

**Returns:** `Promise<VectorCollectionSettings>` — A promise that resolves to the updated VectorCollectionSettings object

[Full reference →](./updateSettings)

