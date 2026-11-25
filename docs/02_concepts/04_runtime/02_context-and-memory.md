---
sidebar_position: 7
title: Context and Memory
description: Understand what an agent puts in a prompt and how it can retrieve and store project knowledge.
---

import MemoryLayers from '@site/src/components/diagrams/MemoryLayers';
import ContextAssembly from '@site/src/components/diagrams/ContextAssembly';
import MemoryIngestion from '@site/src/components/diagrams/MemoryIngestion';

# Context and Memory

Context is the information the agent supplies for a particular model call. Memory lets the agent store information and retrieve it for later tasks. For example, an agent can retrieve a project decision before proposing changes and record the outcome when the work is reviewed.

<MemoryLayers />

## Context vs. memory

| Term | What it is | Lifetime |
|---|---|---|
| **Memory** | The persistent substrate — all the stores shown above | Durable across sessions |
| **Context** | The bag of tokens passed to the LLM *this turn* | Ephemeral — discarded after the call |

Context is assembled fresh each turn from memory + the current task + recent history. You can think of memory as the database and context as the query result.

## The nine memory layers

Each layer has a distinct access pattern and is optimised for a different class of knowledge.

### Working memory

A per-turn scratchpad. The agent can write intermediate notes or partial results here during a multi-step tool chain; the contents are discarded once the turn is complete. Nothing is persisted.

### Episodic memory

Stores recorded events in a named episodic memory so the agent can retrieve earlier observations.

### Persistent KV store

Store small values such as preferences or counters under named keys. A `kv_get` retrieval step reads the keys listed in the step from its selected instance and namespace. For example, a step that requests only a project's preferred test command retrieves that setting.

### Persistent JSON store

Structured JSON documents with a named schema. Larger and more complex than KV. Useful for configuration objects, per-project metadata, or structured records that agents need to read and update programmatically.

### Markdown notes

Markdown memory stores text for a thread in `.codebolt/memory/markdown/<threadId>.json`. Use it for notes and decisions that benefit from readable formatting.

### Knowledge graph (Kuzu)

An embedded Kuzu graph database stored at `.codebolt/knowledgegraph/kuzu/`. Entities (files, symbols, people, concepts) are nodes; relationships (calls, depends-on, authored-by) are edges. The graph supports Cypher queries so agents can answer structural questions — "which modules depend on this function?" — without reading every file.

The knowledge graph is populated by the `llm_extract` processor in the ingestion pipeline (see write path below) and queried via `graph_view_read` steps in persistent memory retrieval pipelines.

### Vector store

Semantic embeddings stored at `.codebolt/vectordb/`. Any text — code chunks, conversation summaries, document passages — can be embedded and stored. At retrieval time the agent's current query is embedded and the nearest neighbours are fetched. This is the primary mechanism for "recall something relevant I encountered before" queries.

### Event log

An Event Log instance contains structured entries appended by an agent or workflow. Query the instance to inspect the recorded payloads and timestamps.

### Persistent memory (declarative retrieval)

Persistent memory is not a storage layer — it is a **retrieval abstraction** that sits above the other stores. A persistent memory definition is a YAML/JSON file stored in `.codebolt/PersistentMemory/` that describes, declaratively, *how* to retrieve a particular class of knowledge.

Each definition contains a pipeline of typed steps:

| Step type | What it does |
|---|---|
| `derive_query` | Generates a search query from the current task context |
| `vector_search` | Runs a similarity search against the vector store |
| `graph_view_read` | Executes a named Kuzu graph view |
| `kv_get` | Reads one or more KV keys |
| `log_search` | Filters the event log by type, time, or field |
| `filter` | Drops results that don't match a predicate |
| `rank` | Re-orders results by relevance score |
| `format` | Renders results into a string for inclusion in context |

## The read path: Context Assembly Engine

<ContextAssembly />

An assembly request supplies input, scope variables, and memory definitions or rule engines. Matching rules add memory definitions to the request. Codebolt runs the selected retrieval pipelines, merges duplicate results, groups items by section, and applies a token budget if one was supplied. The caller receives the context and an assembly trace.

For example, if you have a Persistent Memory definition named `architecture-notes`, this rule selects it when a request mentions a refactor:

```json
{
  "id": "include-architecture-notes",
  "when": [{ "field": "input.text", "operator": "contains", "value": "refactor" }],
  "add": ["architecture-notes"]
}
```

In **Context → Context Assembly**, run the rule engine with sample input and inspect which rules matched. Use [AI Requests](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/08_ai-requests.md) to inspect the messages sent to a model.

## The write path: Memory Ingestion

<MemoryIngestion />

An ingestion pipeline has one trigger, ordered processors and routing rules. For example, a manual pipeline can parse a JSON record, then route its named output to a key-value store. Other routes can write to a vector collection, knowledge graph or event log. See [Memory Ingestion](../../02_using-codebolt/05d_memory/06_memory-ingestion.md) for the sample payload and test steps.

## Storage locations on disk

These are examples of project memory locations:

| Path | Contents |
|---|---|
| `.codebolt/PersistentMemory/` | Declarative retrieval pipeline definitions |
| `.codebolt/MemoryIngestion/` | Ingestion pipeline and trigger configuration |
| `.codebolt/ContextRuleEngine/` | Context rules (conditions, contribution caps) |
| `.codebolt/memory/episodic/` | Recorded episodic events |
| `.codebolt/memory/context/` | Assembled context snapshots (debug) |
| `.codebolt/vectordb/` | Vector embeddings |
| `.codebolt/knowledgegraph/kuzu/` | Kuzu graph database |

To share a memory configuration through Git, review the project’s ignore rules and commit the intended files.

## Observability

Open **Context → Context Assembly** to inspect a request. The trace records memory calls, rule evaluations and variables used or missing. The response also reports the overall estimated token count, item count, duration and whether the result was truncated. If an expected memory is missing, check whether its rule matched and whether the retrieval step returned any items.

## See also

- [Context Assembly subsystem](../../04_build-on-codebolt/07b_subsystems/07_context-assembly.md)
- [Memory subsystems](../../04_build-on-codebolt/07b_subsystems/04_memory.md)
- [Chat: context and @-mentions](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md)
