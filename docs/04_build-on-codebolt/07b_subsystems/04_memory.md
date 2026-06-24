---
sidebar_position: 4
title: Memory
description: "Source code: controllers/{memory,contextMemory,episodicMemory,persistentMemory,jsonMemory,markdownMemory,kvStore,memoryIngestion,knowledge,kg,vector}, plus the."
---

# Memory Subsystem

Codebolt does not have "a memory" — it has a stack of memory layers, each optimised for a different access pattern. The agent loop reads and writes through `contextAssembly`, which decides which layer to consult.

> **Source code:** `controllers/{memory,contextMemory,episodicMemory,persistentMemory,jsonMemory,markdownMemory,kvStore,memoryIngestion,knowledge,kg,vector}`, plus the corresponding `*Service` / `*DataService` files.

## The layers

| Layer | Lifetime | Backed by | Used for |
|---|---|---|---|
| **Working / context memory** | Single agent step | `contextMemoryService` | What's in the current LLM prompt window. |
| **Episodic memory** | One run / one session | `episodicMemoryDataService` | "What happened in this run so far." Fully replayable. |
| **Persistent memory** | Across sessions, per project | `persistentMemoryDataService`, `persistentMemoryInstanceService`, `persistentMemoryPipelineService` | Long-lived facts, decisions, user preferences, project conventions. |
| **KV store** | Indefinite | `kvStoreDataService`, `kvStoreInstanceService`, `kvStoreQueryCompiler` | Fast structured lookups. Has its own query compiler. |
| **JSON memory** | Indefinite | `jsonMemoryService` | Structured, schema'd documents. |
| **Markdown memory** | Indefinite | `markdownMemoryService` | Notebook-style human-editable notes that the agent can read. |
| **Knowledge graph** | Indefinite | `kgDataService` + `kuzuDbService` (Kuzu DB) | Typed entities + relationships across the codebase and history. |
| **Vector DB** | Indefinite | `vectordbService`, `vectordbDataService` | Semantic search. |
| **Narrative threads** | Indefinite | `narrativeService` (+ `codeboltNarrative` package) | Long-form story-of-the-project that the agent can pull from. |

## The ingestion pipeline

Raw events don't land in long-term memory directly. They flow through `memoryIngestionDataService` → `memoryIngestionExecutionService`, which is bridged from the application event bus by `memoryIngestionEventBridge`. This pipeline:

1. Receives events from the bus (chat turns, tool results, file edits, agent decisions).
2. Decides what's worth keeping (most isn't).
3. Chunks it (`knowledgeChunkingService`).
4. Embeds, indexes, and writes it to the appropriate layer(s).

Without this pipeline, every event would either be lost or would balloon the long-term store with junk.

## How `contextAssembly` uses the layers

When an agent step is about to run, `contextAssemblyService` builds the prompt by querying layers in order of cost and specificity:

```
context window
   ├── system prompt
   ├── relevant rules from contextRuleEngine
   ├── recent episodic memory (the last N turns)
   ├── persistent memory hits (filtered by current task)
   ├── knowledge graph traversal (entities mentioned in the task)
   ├── vector hits (top-k semantic neighbours)
   └── live tool results (open files, git status, etc.)
```

The selection is rule-driven (`contextRuleEngineService`) so a project can tune what shows up.

## When to use which layer (developer view)

Building a custom agent and not sure where to put a piece of state?

- **Will you re-read it in the same step?** Working memory — just keep it in a local variable.
- **Same run, later step?** `contextMemory`.
- **Across runs in the same session?** `episodicMemory`.
- **Across sessions, this project?** `persistentMemory`.
- **Cross-project, fast lookup by key?** `kvStore`.
- **Want semantic search later?** Write it to `vectordb` (the ingestion pipeline can do this for you).
- **Modelling things and relationships?** `kg`.
- **Human-curated notes the agent should read?** `markdownMemory`.

## See also

- [Knowledge & Vector](./05_knowledge-and-vector.md)
- [Context Assembly](./07_context-assembly.md)
- [Narrative Engine](./06_narrative-engine.md)
