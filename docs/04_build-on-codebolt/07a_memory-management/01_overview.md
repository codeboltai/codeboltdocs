---
sidebar_position: 1
title: Overview
description: Choose a memory store, configure retrieval, and use the results in an agent.
---

# Memory & Context

Choose a store based on how your agent will retrieve the information.

| What you need | Where to start |
|---|---|
| Read a preference by its key | [KV Store](./02e_kv-store.md) |
| Import and split source documents | [Knowledge](./02b_knowledge.md) |
| Find text related to a query | [Vector DB](./02a_vector-db.md) |
| Follow relationships between records | [Knowledge Graph](./02c_knowledge-graph.md) |
| Record and query project events | [Event Log](../../02_using-codebolt/05d_memory/07_event-log.md) |
| Append events to a memory thread or save a Markdown note | [Runtime Memory APIs](./02_runtime-memory-apis.md) |

## Connect storage to your agent

1. Use [Memory Ingestion](./02f_memory-ingestion.md) to process an event and write the result to a store.
2. Define a [Persistent Memory](./02d_persistent-memory.md) retrieval pipeline for the information you want to read back.
3. Use [Context Assembly](./02g_context-assembly.md) to request that memory by ID or select it with a rule. Inspect the returned sections and trace before passing the result to your agent.

For a long conversation, [Context Compaction](./02h_context-compaction.md) can reduce the thread history used for subsequent turns.

## In this section

- [Runtime Memory APIs](./02_runtime-memory-apis.md) shows how to read and write memory from agent code.
- [Hooks and Action Blocks](./03_hooks-and-action-blocks.md) shows how to save a note when an agent session ends.
- [Memory Evaluation](./05_memory-evaluation.md) and [Optimization Patterns](./06_optimization-patterns.md) cover testing recall and inspecting retrieval results.
- [Desktop memory panels](../../02_using-codebolt/02_surfaces/02_desktop-app/03c_panels/04e_memory-features/00_overview.md) shows where to manage your project's memory in the application.
