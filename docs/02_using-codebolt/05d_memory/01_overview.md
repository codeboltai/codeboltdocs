---
sidebar_position: 1
title: Memory & Context Overview
description: Memory is how Codebolt agents accumulate, retain, and retrieve knowledge — across turns, across sessions, and across projects
---

# Memory & Context

Memory is how Codebolt agents accumulate, retain, and retrieve knowledge — across turns, across sessions, and across projects. Context is what gets selected from memory and handed to the LLM each turn.

## Two sides of the same system

| Side | What it does | Direction |
|---|---|---|
| **Read path** | Context Assembly Engine selects from storage and composes the prompt | Storage → LLM |
| **Write path** | Memory Ingestion pipeline captures, processes, and stores new information | Events → Storage |

Both sides operate on the same set of storage backends. Understanding which layer to use — and how to configure retrieval and ingestion — gives you direct control over what your agents know and how quickly they learn.

## Storage layers at a glance

| Layer | Lifetime | Best for |
|---|---|---|
| [Working memory](./02_memory-layers.md#working-memory) | Single turn | Scratchpad, intermediate notes |
| [Episodic memory](./02_memory-layers.md#episodic-memory) | Single run | Turn history, short-term coherence |
| [KV store](./02_memory-layers.md#kv-store) | Persistent | Preferences, flags, small values |
| [JSON store](./02_memory-layers.md#json-store) | Persistent | Structured records, config objects |
| [Markdown notes](./02_memory-layers.md#markdown-notes) | Persistent | Human-editable long-form notes |
| [Knowledge graph](./02_memory-layers.md#knowledge-graph) | Persistent | Entities, relationships, code structure |
| [Vector store](./02_memory-layers.md#vector-store) | Persistent | Semantic recall, similarity search |
| [Event log](./02_memory-layers.md#event-log) | Persistent | Audit trail, searchable history |

## In this section

- [Memory layers](./02_memory-layers.md) — what each store holds and when to use it
- [Context assembly](./03_context-assembly.md) — how the read path composes a prompt each turn
- [Context rules](./04_context-rules.md) — the JSON DSL for controlling what gets included
- [Persistent memory](./05_persistent-memory.md) — declarative retrieval pipelines
- [Memory ingestion](./06_memory-ingestion.md) — the write path: triggers, processors, routing
- [Event log](./07_event-log.md) — the append-only audit trail, treated as a memory layer

## See also

- [Context and Memory concept](../../02_concepts/04_runtime/02_context-and-memory.md) — architectural deep-dive
