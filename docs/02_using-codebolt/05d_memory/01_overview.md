---
sidebar_position: 1
title: Memory & Context Overview
description: Codebolt provides project stores for records, documents, notes, and events
---

# Memory & Context

Codebolt provides project stores for records, documents, notes, and events. Use context assembly to select stored information for an agent request.

## Two sides of the same system

| Side | What it does | Direction |
|---|---|---|
| **Read path** | Context Assembly runs the requested retrieval pipelines | Storage → assembled context |
| **Write path** | Memory Ingestion pipeline captures, processes, and stores new information | Events → Storage |

Configure ingestion when you need to capture events. Configure retrieval when your agent needs to read them back.

## Storage layers at a glance

| Layer | Lifetime | Best for |
|---|---|---|
| [Working memory](./02_memory-layers.md#working-memory) | Single turn | Scratchpad, intermediate notes |
| [Episodic memory](./02_memory-layers.md#episodic-memory) | Persistent until removed | Events recorded in an episodic memory thread |
| [KV store](./02_memory-layers.md#kv-store) | Persistent | Preferences, flags, small values |
| [JSON store](./02_memory-layers.md#json-store) | Persistent | Structured records, config objects |
| [Markdown notes](./02_memory-layers.md#markdown-notes) | Persistent | Human-editable long-form notes |
| [Knowledge graph](./02_memory-layers.md#knowledge-graph) | Persistent | Entities, relationships, code structure |
| [Vector store](./02_memory-layers.md#vector-store) | Persistent | Semantic recall, similarity search |
| [Event log](./02_memory-layers.md#event-log) | Persistent | Audit trail, searchable history |

## In this section

- [Memory layers](./02_memory-layers.md) — what each store holds and when to use it
- [Context assembly](./03_context-assembly.md) — how to select memory and inspect a retrieval request
- [Context rules](./04_context-rules.md) — the JSON DSL for controlling what gets included
- [Persistent memory](./05_persistent-memory.md) — declarative retrieval pipelines
- [Memory ingestion](./06_memory-ingestion.md) — the write path: triggers, processors, routing
- [Event log](./07_event-log.md) — the append-only audit trail, treated as a memory layer

- [Context compaction](../05b_guardrails-and-settings/02_context-compaction.md) — reduce conversation history for later turns

## See also

- [Context and Memory concept](../../02_concepts/04_runtime/02_context-and-memory.md) — architectural deep-dive
