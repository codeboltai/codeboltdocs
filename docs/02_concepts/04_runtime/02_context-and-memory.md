---
sidebar_position: 7
title: Context and Memory
description: The single most important question for an agent is what does it know right now? That answer is rebuilt from scratch every turn by the Context Assembly Engine —.
---

import MemoryLayers from '@site/src/components/diagrams/MemoryLayers';
import ContextAssembly from '@site/src/components/diagrams/ContextAssembly';
import MemoryIngestion from '@site/src/components/diagrams/MemoryIngestion';

# Context and Memory

The single most important question for an agent is **what does it know right now?** That answer is rebuilt from scratch every turn by the **Context Assembly Engine** — a pipeline that selects, ranks, and token-budgets information from up to nine distinct memory stores before handing the final prompt to the LLM.

Codebolt treats memory as a **two-sided system**:

- **Read path** — the Context Assembly Engine pulls from storage and composes a bounded context window each turn.
- **Write path** — the Memory Ingestion pipeline listens for lifecycle events, processes raw data through a sequence of processors, and routes the results to one or more storage backends.

Both sides share the same storage layer; they just move in opposite directions.

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

Stores every turn of the current agent run — what the LLM said, what tools were called, what came back. The episodic record is what lets an agent say "three steps ago I fetched this file." It is bounded to the lifetime of a single run and is the primary source of short-term coherence.

### Persistent KV store

Key → value storage backed by a simple JSON file. Suited to small, frequently-read values: user preferences, feature flags, counters, state that must survive across runs. The entire store is loaded eagerly into context whenever a context rule references it.

### Persistent JSON store

Structured JSON documents with a named schema. Larger and more complex than KV. Useful for configuration objects, per-project metadata, or structured records that agents need to read and update programmatically.

### Markdown notes

Human-editable `.md` files that both the agent and the developer can read and write. Useful for long-form notes, decisions, or shared knowledge that benefits from being readable without tooling. Notes live inside `.codebolt/memory/` and are versioned with the project.

### Knowledge graph (Kuzu)

An embedded Kuzu graph database stored at `.codebolt/knowledgegraph/kuzu/`. Entities (files, symbols, people, concepts) are nodes; relationships (calls, depends-on, authored-by) are edges. The graph supports Cypher queries so agents can answer structural questions — "which modules depend on this function?" — without reading every file.

The knowledge graph is populated by the `llm_extract` processor in the ingestion pipeline (see write path below) and queried via `graph_view_read` steps in persistent memory retrieval pipelines.

### Vector store

Semantic embeddings stored at `.codebolt/vectordb/`. Any text — code chunks, conversation summaries, document passages — can be embedded and stored. At retrieval time the agent's current query is embedded and the nearest neighbours are fetched. This is the primary mechanism for "recall something relevant I encountered before" queries.

### Event log

An append-only structured log of every significant event in the agent's lifetime: tool calls, errors, user messages, task transitions, memory writes. Used primarily for auditing and for `log_search` queries in retrieval pipelines. Also the source that drives the ingestion pipeline's `onAction` trigger.

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

The Context Assembly Engine discovers all persistent memory definitions, executes their pipelines concurrently, and merges the formatted outputs into the context window. This makes it easy to add a new class of recalled knowledge without touching the assembly engine itself — just add a definition file.

## The read path: Context Assembly Engine

<ContextAssembly />

The assembly pipeline runs once per turn, before the LLM call:

### 1 — Validate

The incoming task and any explicit `@mention` references are parsed and validated. Invalid memory references are surfaced as warnings rather than silently dropped so the agent knows its context is incomplete.

### 2 — Evaluate context rules

Context rules are JSON documents in `.codebolt/ContextRuleEngine/`. Each rule is a condition → action pair: if the condition matches the current task, the action adds or suppresses specific memory references.

Rules are evaluated with a small DSL that supports 12 operators:

| Operator | Matches when… |
|---|---|
| `contains` | Field string contains the value |
| `startsWith` | Field string starts with the value |
| `endsWith` | Field string ends with the value |
| `matches` | Field matches a regex |
| `equals` | Field equals the value exactly |
| `not_equals` | Field does not equal the value |
| `in` | Field value is in a set |
| `not_in` | Field value is not in a set |
| `gt` / `lt` / `gte` / `lte` | Numeric comparison |
| `exists` | Field is present |

Multiple conditions within a rule combine with AND logic. Rules are evaluated in definition order; the first matching rule wins.

Example: a rule that injects the project's architecture notes whenever the task mentions "refactor":

```json
{
  "condition": { "field": "task.text", "op": "contains", "value": "refactor" },
  "action": { "include": "markdown://architecture-notes" }
}
```

### 3 — Execute persistent memory pipelines

All enabled persistent memory definitions are executed concurrently. Each pipeline resolves its steps against the current query derived from the task, returning a ranked, formatted list of relevant chunks. Steps like `vector_search` and `graph_view_read` can be expensive; results are cached with a short TTL so repeated turns on the same topic don't re-run identical queries.

### 4 — Merge and deduplicate

Outputs from all persistent memory pipelines, plus explicitly-included KV/JSON/Markdown references, are merged. Duplicate content (same chunk appearing in both a vector search result and an explicit `@mention`) is deduplicated by content hash.

### 5 — Apply contribution rules

Each memory source has a maximum contribution — a cap on how many tokens it can contribute to the final context. Contribution rules prevent a single noisy source (e.g., a verbose event log) from crowding out everything else. The rules are also stored in `.codebolt/ContextRuleEngine/`.

### 6 — Enforce token budget

The merged context is ordered by a fixed section priority:

```
state → warnings → constraints → knowledge → history → suggestions → working_memory
```

Sections are packed into the budget in order. If the budget is exhausted before all sections are included, lower-priority sections (suggestions, working_memory) are truncated first. The assembly engine emits a structured trace of which sections were included, how many tokens each consumed, and which were truncated — visible via WebSocket assembly events.

### 7 — Hand off to LLM

The packed context window is passed to the LLM along with the current turn's user message.

## The write path: Memory Ingestion

<MemoryIngestion />

Memory is written by the **Ingestion Pipeline** — a configurable sequence of processors triggered by agent lifecycle events and routed to one or more storage backends.

### Triggers

| Trigger | Fires when… |
|---|---|
| `onConversationEnd` | The agent's current conversation completes |
| `onTaskCompleted` | A task transitions to the completed state |
| `onTaskFailure` | A task fails or times out |
| `onAction` | A tool call or significant action is logged |
| `manual` | An agent or human explicitly calls the ingestion API |

Multiple triggers can activate the same pipeline. Triggers are defined in `.codebolt/MemoryIngestion/` alongside the pipeline configuration.

### Processors

Once triggered, the raw input passes through a sequence of processors in order. Each processor transforms or augments the data:

| Processor | What it does |
|---|---|
| `chunker` | Splits large inputs into overlapping chunks of a configured token size |
| `vector_embed` | Embeds each chunk and writes the embeddings to the vector store |
| `llm_extract` | Calls the LLM to extract structured entities and relationships; writes to the knowledge graph |
| `normalizer` | Cleans, trims, and standardises text (whitespace, encoding, PII redaction) |
| `parser` | Parses structured input formats (code AST, JSON, Markdown) into normalised records |
| `custom` | An arbitrary TypeScript function registered via the SDK — full access to the pipeline context |

Processors run **in sequence**; later processors see the output of earlier ones. A pipeline that both embeds and graph-extracts will run `chunker → normalizer → vector_embed → llm_extract` so the graph extractor operates on already-normalised chunks.

### Routing rules

After processing, routing rules decide where to write. A routing rule is a `foreach · condition · write_to` triple:

- `foreach` — iterate over items (e.g., each chunk produced by the chunker)
- `condition` — only write if a predicate is true (e.g., `score > 0.7`)
- `write_to` — a destination reference with optional template variables resolved at runtime (e.g., `kv://sessions/{{sessionId}}`)

One pipeline run can write to multiple destinations simultaneously.

### Destinations

| Destination | Storage backend |
|---|---|
| **Knowledge Graph** | Kuzu embedded graph (`graph://`) |
| **Vector DB** | Vector store (`vector://`) |
| **KV Store** | Key-value store (`kv://`) |
| **Event Log** | Append-only event log (`log://`) |
| **Blob** | Raw file storage (`blob://`) |

## Storage locations on disk

All memory configuration and data lives inside the project's `.codebolt/` directory:

| Path | Contents |
|---|---|
| `.codebolt/PersistentMemory/` | Declarative retrieval pipeline definitions |
| `.codebolt/MemoryIngestion/` | Ingestion pipeline and trigger configuration |
| `.codebolt/ContextRuleEngine/` | Context rules (conditions, contribution caps) |
| `.codebolt/memory/episodic/` | Per-run turn history |
| `.codebolt/memory/context/` | Assembled context snapshots (debug) |
| `.codebolt/vectordb/` | Vector embeddings |
| `.codebolt/knowledgegraph/kuzu/` | Kuzu graph database |

Because everything is inside the project directory, memory configuration is **version-controlled** alongside code. Checking out a branch gives you that branch's memory rules, ingestion pipelines, and persistent memory definitions — not just its code.

## Observability

The Context Assembly Engine emits structured WebSocket events during assembly. Each event carries:

- which memory sources were queried
- how many tokens each contributed
- which sections were truncated and why
- the total assembly latency

These events are surfaced in the Codebolt UI as an "assembly trace" alongside the turn — useful for diagnosing why an agent made an unexpected decision.

## Why this matters

Bad context = bad answers. A confused agent is almost always a context problem — too much, too little, or the wrong information at the wrong moment. The fix is rarely the prompt; it's usually the context rules or the ingestion pipeline. Understanding the read/write duality gives you the right lever to pull.

## See also

- [Context Assembly subsystem](../../04_build-on-codebolt/07b_subsystems/07_context-assembly.md)
- [Memory subsystems](../../04_build-on-codebolt/07b_subsystems/04_memory.md)
- [Chat: context and @-mentions](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md)
