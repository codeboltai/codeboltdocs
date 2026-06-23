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

![Context assembly engine](/productImages/memorycontext/contextAssemblyEngine.png)

![Vector memory](/productImages/memorycontext/vector_meory.png)

![Knowledge graph](/productImages/memorycontext/knowledgegraph.png)

→ **Read the full concept page: [Context and Memory](../../02_concepts/04_runtime/02_context-and-memory.md)**

## See also

- [Hooks and Processors](./05_hooks-and-processors.md)
- [Event Log](./07_event-log.md)
