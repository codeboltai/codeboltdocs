---
sidebar_position: 7
title: Context Assembly
description: "Source code: controllers/{contextAssembly,contextRuleEngine}, services/contextAssemblyService, services/contextRuleEngineService,."
---

# Context Assembly

The context assembly subsystem is the librarian of the agent loop. Every time the LLM is about to be called, it assembles a prompt from a dozen different sources and decides what actually makes it into the context window.

> **Source code:** `controllers/{contextAssembly,contextRuleEngine}`, `services/contextAssemblyService`, `services/contextRuleEngineService`, `services/contextRuleEngineDataService`.

## The problem it solves

A naive agent dumps everything into the prompt: system message, full history, all open files, all tools, recent tool results, relevant memory, project rules. This hits three walls immediately:

1. **Budget.** Context windows are finite and tokens cost money.
2. **Relevance.** The LLM's attention degrades as the prompt grows; more isn't better.
3. **Staleness.** Files change, memory updates, the previous step's "relevant" isn't the current step's "relevant".

`contextAssemblyService` exists to solve all three deterministically, so agent authors don't each reinvent it (badly).

## What it assembles

For a single step, the assembler gathers:

| Source | Provided by | Typical share of budget |
|---|---|---|
| System prompt | Agent config | fixed |
| Active rules | `contextRuleEngineService` | small, high priority |
| Recent turns | `episodicMemoryDataService` | medium, sliding window |
| Relevant long-term memory | `persistentMemoryDataService`, query-filtered | medium |
| Knowledge graph traversal | `kgDataService`, entity-seeded | medium |
| Vector hits | `vectordbService`, top-k semantic | medium |
| Narrative threads | `narrativeService`, active-thread filter | small |
| Open files / live project state | `projectStructureService`, `fileReadService` | small-medium |
| Tool schemas | `toolService`, filtered by relevance | varies |
| Previous tool results | Working memory | small |

Each source is budget-capped independently, then the full prompt is budget-capped as a whole, then the assembler falls back to compression/truncation strategies if still over.

## The rule engine

`contextRuleEngineService` is how projects customise what ends up in the prompt *without writing code*. A rule looks like:

```yaml
when:
  task_contains: ["auth", "login", "session"]
then:
  always_include:
    - path: "docs/security-decisions.md"
  boost:
    - kg_entity: "AuthService"
      weight: 2.0
  exclude:
    - path: "generated/**"
```

Rules are evaluated every step. This is the reason two agents working on the same project can share institutional context without each being hand-coded for it.

## Compression and truncation strategies

When the budget is tight (common), the assembler applies strategies in order:

1. **Drop the lowest-relevance hits** from each source.
2. **Compress** older turns (`ConversationCompactorModifier` from the processor pipeline).
3. **Summarise** long tool outputs.
4. **Hard-truncate** as a last resort, with a clear marker so the LLM knows data was cut.

Every decision is recorded so you can replay an assembly and see exactly what was included, what was dropped, and why.

## How it plugs into the agent loop

```
agent step begins
   │
   ▼
contextAssemblyService.build({ task, history, budget })
   │
   ├── rule engine fires
   ├── each source queried + budget-capped
   ├── merged, deduped, compressed
   │
   ▼
LLM request with assembled messages
```

`llmService` never calls the assembler itself — it only receives the finished message list. This separation is what lets different agents use different assembly strategies while still using the same LLM path.

## See also

- [Memory](./04_memory.md)
- [Knowledge & Vector](./05_knowledge-and-vector.md)
- [LLM & Inference](./03_llm-and-inference.md)
- [Processors](../02_creating-agents/07_processors/01_what-are-processors.md) — several context concerns are implemented as processors
