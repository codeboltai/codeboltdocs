---
sidebar_position: 5
title: Knowledge & Vector
description: "Source code: controllers/{knowledge,kg,vector}, services/knowledgeService, services/knowledgeDataService, services/knowledgeChunkingService,."
---

# Knowledge & Vector Subsystem

Long-term structured memory. Where [Memory](./04_memory.md) handles the *layers*, this subsystem handles the *stores* underneath the two biggest ones: the knowledge graph and the vector database.

> **Source code:** `controllers/{knowledge,kg,vector}`, `services/knowledgeService`, `services/knowledgeDataService`, `services/knowledgeChunkingService`, `services/kgDataService`, `services/kgInstanceService`, `services/kuzuDbService`, `services/vectordbService`, `services/vectordbDataService`, `services/vectordb/`.

## Two complementary shapes of memory

| Store | Shape | Good at | Backed by |
|---|---|---|---|
| **Knowledge graph** | Typed nodes + typed edges | "What calls this function?" "Which files implement this interface?" "Which decisions affected this module?" | Kuzu (embedded graph DB) |
| **Vector database** | High-dimensional vectors + metadata | "Find code similar to this." "Find earlier discussions about authentication." | In-process vector DB + embedding index |

An agent rarely uses just one. A typical recall does a vector search to find candidates, then walks the graph around those candidates to get the right structural context.

## Knowledge graph

### `kuzuDbService`
Talks to Kuzu. Handles schema creation, connection pooling, and query execution. Kuzu was picked because it's embedded (no extra service), supports Cypher-like querying, and handles the scale of a single project fine.

### `kgDataService` + `kgInstanceService`
`kgDataService` is the stateless API — node/edge CRUD, queries. `kgInstanceService` is the per-project instance manager (each project has its own graph).

### What lives in the graph
- **Code entities** — files, classes, functions, modules, with calls/imports/extends edges. Indexed continuously by the project subsystem.
- **Run entities** — agent runs, phases, tool calls, with "happened-during" and "caused-by" edges. Lets you walk from a bug to the agent decision that caused it.
- **Decisions & narrative** — written by the narrative engine, with links into code and runs.
- **Domain entities** — whatever the user or a custom agent defines.

### `knowledgeService`
Higher-level API on top of `kg*`. Used when an agent wants to say "remember this" without knowing graph semantics.

## Vector database

### `vectordbService` + `vectordbDataService`
The vector store. Holds chunks + embeddings + metadata. Supports hybrid search (vector + keyword filter).

### `knowledgeChunkingService`
Takes raw text (code, chat, docs) and splits it into semantically sensible chunks before embedding. Bad chunking = bad retrieval; this is a dedicated service because the rules are non-trivial (respect function boundaries, preserve context headers, size-cap intelligently).

### Where the vectors come from
The [memory ingestion pipeline](./04_memory.md#the-ingestion-pipeline) calls `knowledgeChunkingService` → `embeddingService` → `vectordbService.upsert()`. The agent never writes vectors directly.

## How context assembly uses both

When the agent runs `contextAssembly` for the next step:

1. Extract query keywords and entity mentions from the current task.
2. Vector search (`vectordbService.search`) for top-k semantically similar chunks.
3. For each hit with a known entity, graph-traverse (`kgDataService`) one or two hops.
4. Merge + dedupe + budget-truncate.

The point: neither store is enough on its own. Vector search gives you "maybe relevant", the graph gives you "definitely structurally connected", and you want the intersection.

## See also

- [Memory](./04_memory.md) — the full layer stack
- [Context Assembly](./07_context-assembly.md) — the consumer
- [Narrative Engine](./06_narrative-engine.md) — writes into the graph
