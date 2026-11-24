---
sidebar_position: 2
title: Memory Layers
description: Choose a CodeBolt store for key-value data, notes, searchable knowledge, or events.
---

# Memory Layers

Choose a store based on what the agent will need to read back.

| Store | Use it for | Where to start |
|---|---|---|
| KV store | Values retrieved by instance, namespace, and key | [Key-Value Store](../02_surfaces/02_desktop-app/03c_panels/04e_memory-features/09_kv-store.md) |
| JSON or Markdown memory | Structured records or notes stored with a thread | [Runtime Memory APIs](../../04_build-on-codebolt/07a_memory-management/02_runtime-memory-apis.md) |
| Knowledge, graph, and vector stores | Searchable documents, relationships, or embeddings | [Memory overview](./01_overview.md) |
| Event Log | Events you explicitly record and query | [Event Log](./07_event-log.md) |

## Working memory

Keep temporary state in your agent loop. Persist information in a store if a later thread or run needs it.

## Episodic memory

Use episodic memory for structured records of events and outcomes you want to preserve. Thread history provides a separate view of the conversation.

## KV store

Open **Context → KV Store**. Select an instance or create one first. Select **Add key** and enter a namespace, key, and value. For example, enter `preferences`, `language`, and `TypeScript` to record a language preference for a workflow. Select the namespace again to inspect the saved value.

Agents can read and write entries through the [KV Store API](../../05_reference/02_codeboltjs/10_api-access/kvStore/index.md).

## JSON store

Create a JSON memory thread and update its data using the thread ID. See the [thread API examples](../../04_build-on-codebolt/07a_memory-management/02_runtime-memory-apis.md).

## Markdown notes

Create a Markdown thread for a note and update its content using the thread ID. The Markdown memory service manages records in per-thread JSON files. For project-authored Markdown files, use the editor or file tools.

## Knowledge graph

Use graph instances to store and retrieve entities and relationships. See [Knowledge Graph](../../04_build-on-codebolt/07a_memory-management/02c_knowledge-graph.md) for instances and views.

## Vector store

Use vector collections when retrieval depends on similarity. See [Vector DB](../../04_build-on-codebolt/07a_memory-management/02a_vector-db.md) for collection and search behavior.

## Event log

Use a log instance to append and query events with timestamps and metadata. See [Event Log](./07_event-log.md).
