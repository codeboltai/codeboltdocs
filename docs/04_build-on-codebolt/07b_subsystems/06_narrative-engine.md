---
sidebar_position: 6
title: Narrative Engine
description: "Source code: services/narrativeService, sibling packages packages/codeboltNarrative and packages/narrativejspackage."
---

# Narrative Engine

The narrative engine is what turns a raw firehose of events — tool calls, file edits, agent decisions, chat turns — into a coherent *story* of what's happening in the project. That story is itself something agents (and humans) can read.

> **Source code:** `services/narrativeService`, sibling packages `packages/codeboltNarrative` and `packages/narrativejspackage`.

## Why this exists

LLMs are bad at long histories. A project run over weeks produces thousands of events — no context window fits them, and dumping a raw log into a prompt is noise. What agents actually need is the *shape* of the history: "we tried X, it didn't work because of Y, we pivoted to Z, Z is now mostly done, open question is W".

That shape is the narrative. It's:
- **Causal** — events are linked by "because" and "then", not just timestamps.
- **Abstracted** — individual tool calls collapse into high-level steps.
- **Summarised** — old branches that are no longer relevant are compressed.
- **Queryable** — "what did we try for auth?" returns a focused narrative thread, not the whole log.

## Components

### `narrativeService` (server-side)
The server's interface to the engine. Takes events from the `applicationEventBus`, feeds them into the narrative builder, and exposes narrative reads to `contextAssembly`.

### `packages/codeboltNarrative`
The core library: the data model (threads, beats, pivots), the summariser, the causal linker. Kept as its own package so it can be used outside the server (e.g. in a CLI `codebolt narrative show` command).

### `packages/narrativejspackage`
The JS runtime wrapper / SDK surface for agents that want to read or write narrative directly.

## Data model

```
Narrative
  └── Thread          ← a focused line of work ("authentication rewrite")
        ├── Beat      ← a meaningful step ("tried JWT, hit CORS issue")
        │     ├── linked events (from eventLog)
        │     └── causal links to other beats
        └── Pivot     ← a decision point ("abandoned JWT, switched to session cookies")
```

Threads are not branches of a tree — they can overlap. A single file edit might belong to the "authentication rewrite" thread *and* the "cleanup unused deps" thread.

## How it connects to other subsystems

- **Event log** → narrative service subscribes; every event is a candidate beat.
- **Knowledge graph** → beats and pivots are written as nodes with causal edges. This is how the graph grows beyond just code structure.
- **Context assembly** → when building a prompt, it asks the narrative service for the active threads related to the current task, not for raw events.
- **Memory ingestion** → the ingestion pipeline consults narrative to decide *what's worth keeping* long-term. An event that's already captured in a summarised beat can be dropped from episodic memory.

## See also

- [Memory](./04_memory.md)
- [Knowledge & Vector](./05_knowledge-and-vector.md)
- [Context Assembly](./07_context-assembly.md)
