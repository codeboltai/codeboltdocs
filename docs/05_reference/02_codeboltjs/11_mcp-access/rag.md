---
title: RAG MCP
sidebar_label: codebolt.rag
sidebar_position: 10
---

# codebolt.rag

Retrieval Augmented Generation tools for creating and querying knowledge indexes.

## Available Tools

- `rag_create_index` - Create a new RAG index
- `rag_add_documents` - Add documents to a RAG index
- `rag_query` - Query documents from RAG index
- `rag_delete_index` - Delete a RAG index
- `rag_update_document` - Update a document in RAG index
- `rag_list_indexes` - List all available RAG indexes

## Tool Parameters

### `rag_create_index`

Creates a new RAG (Retrieval Augmented Generation) index for storing and retrieving documents.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| indexName | string | Yes | The unique name for the new RAG index |
| description | string | No | A description of what the index contains |

### `rag_add_documents`

Adds one or more documents to an existing RAG index.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| indexName | string | Yes | The name of the RAG index to add documents to |
| documents | array | Yes | Array of document objects to add |
| documents[].id | string | Yes | Unique identifier for the document |
| documents[].content | string | Yes | The text content of the document |
| documents[].metadata | object | No | Optional metadata associated with the document (e.g., type, version) |

### `rag_query`

Queries documents from a RAG index based on a natural language query.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| indexName | string | Yes | The name of the RAG index to query |
| query | string | Yes | The natural language query to search for |
| topK | number | No | Maximum number of results to return (default varies by implementation) |

### `rag_delete_index`

Deletes an existing RAG index and all its documents.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| indexName | string | Yes | The name of the RAG index to delete |

### `rag_update_document`

Updates an existing document in a RAG index.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| indexName | string | Yes | The name of the RAG index containing the document |
| documentId | string | Yes | The unique identifier of the document to update |
| content | string | Yes | The new text content for the document |
| metadata | object | No | Optional updated metadata for the document |

### `rag_list_indexes`

Lists all available RAG indexes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| (none) | - | - | This tool takes no parameters |

## Sample Usage

```javascript
// Create a new RAG index
const createResult = await codeboltMCP.executeTool(
  "codebolt.rag",
  "rag_create_index",
  { 
    indexName: "project_docs",
    description: "Project documentation index"
  }
);

// Add documents to index
const addResult = await codeboltMCP.executeTool(
  "codebolt.rag",
  "rag_add_documents",
  { 
    indexName: "project_docs",
    documents: [
      {
        id: "doc1",
        content: "This is the API documentation...",
        metadata: { type: "api", version: "1.0" }
      }
    ]
  }
);

// Query the RAG index
const queryResult = await codeboltMCP.executeTool(
  "codebolt.rag",
  "rag_query",
  { 
    indexName: "project_docs",
    query: "How to authenticate users?",
    topK: 3
  }
);

// List all indexes
const listResult = await codeboltMCP.executeTool(
  "codebolt.rag",
  "rag_list_indexes",
  {}
);

// Update a document
const updateResult = await codeboltMCP.executeTool(
  "codebolt.rag",
  "rag_update_document",
  { 
    indexName: "project_docs",
    documentId: "doc1",
    content: "Updated API documentation..."
  }
);
```

:::info
This functionality is similar to the [rag API](../10_api-access/rag/index.md) and provides knowledge retrieval through MCP interface.
::: 
