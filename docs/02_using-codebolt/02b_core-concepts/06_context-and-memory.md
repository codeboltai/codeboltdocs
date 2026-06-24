---
sidebar_position: 6
title: Context and Memory
description: What an agent "knows" at any moment — the memory layers and how context is assembled.
---

import ContextAssembly from '@site/src/components/diagrams/ContextAssembly';
import MemoryLayers from '@site/src/components/diagrams/MemoryLayers';

# Context and Memory

At every turn, an agent assembles **context**: the system prompt, the conversation so far, relevant memory, and file snippets. The goal is to give the agent the most useful window of information without blowing the token budget.

<ContextAssembly />

## The memory layers

Codebolt's memory is **layered**, with each layer serving a different purpose:

<MemoryLayers />

| Layer | Purpose |
|---|---|
| **Episodic memory** | The conversation history for the current thread |
| **Vector store** | Semantic search over documents, code, and past runs |
| **Knowledge graph** | Structured entity and relationship data about the project |
| **KV store** | Key-value facts the agent can read and write explicitly |

## Context assembly

Context assembly is a pipeline (see [Hooks and Processors](./05_hooks-and-processors.md)). On every LLM call, processors pull from the layers above, then compact, redact, rerank, and de-loop the result before it reaches the model.

### What the assembly engine looks like

The context assembly engine shows the live pipeline of memory layers being pulled, filtered, and compacted into the final context window before it reaches the LLM:

![Context assembly engine — the pipeline that pulls from memory layers and compacts context for each LLM call](/productImages/memorycontext/contextAssemblyEngine.png)

### Vector store

The **vector store** lets the agent do semantic search over documents, code, and past runs. This view shows the indexed chunks and how the agent retrieves the most relevant ones for the current query:

![Vector memory — indexed chunks retrieved by semantic similarity for the current query](/productImages/memorycontext/vector_meory.png)

### Knowledge graph

The **knowledge graph** holds structured entity and relationship data about the project (functions, modules, dependencies). This view shows the graph the agent can traverse to understand how parts of the codebase connect:

![Knowledge graph — entities and relationships the agent traverses to understand the codebase](/productImages/memorycontext/knowledgegraph.png)

→ **Read the full concept page: [Context and Memory](../../02_concepts/04_runtime/02_context-and-memory.md)**

## See also

- [Hooks and Processors](./05_hooks-and-processors.md)
- [Event Log](../../02_concepts/05_persistence/02_event-log.md)
