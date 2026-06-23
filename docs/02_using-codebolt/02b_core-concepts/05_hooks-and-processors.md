---
sidebar_position: 5
title: Hooks and Processors
description: Two mechanisms for intercepting and transforming what flows through an agent.
---

import HookPhases from '@site/src/components/diagrams/HookPhases';

# Hooks and Processors

Two related but distinct mechanisms for **intercepting** and **transforming** what flows through an agent.

<HookPhases />

## Hooks

A **hook** is a function that runs at a defined **phase** of the agent loop and can:

- **observe** what's happening (logging, metrics)
- **mutate** the data (rewrite a prompt, redact a secret)
- **veto** the action (deny a tool call, abort a turn)

Hook phases include `before_llm_call`, `after_llm_call`, `before_tool_call`, `after_tool_call`, `on_error`, and `before_finalize`. Hooks are how guardrails are enforced and how you add cross-cutting behaviour (audit logging, custom rate limiting) without modifying agent code.

## Processors

A **processor** is a transformation in the **context assembly** pipeline. Where a hook intercepts a single event, a processor walks over a stream of context items and rewrites them. They run in a defined order (a pipeline) every time context is assembled for an LLM call.

| Processor | What it does |
|---|---|
| **Compaction** | Summarize old turns when context gets too large |
| **Redaction** | Strip secrets, PII, credentials before they reach the LLM |
| **Reranking** | Reorder retrieved chunks by relevance to the current query |
| **Loop detection** | Notice when the agent calls the same tool with the same args repeatedly |

## Hook vs processor — when to use which

| Use a **hook** when… | Use a **processor** when… |
|---|---|
| You want to react to a specific event (`tool.call`, `llm.response`) | You want to transform the context fed into every LLM call |
| You need to allow / deny | You need to compress or filter |
| The behaviour is per-turn | The behaviour is per-context-assembly |

→ **Read the full concept page: [Hooks and Processors](../../02_concepts/04_runtime/01_hooks-and-processors.md)**

## See also

- [Context and Memory](./06_context-and-memory.md)
- [Guardrails](./08_guardrails.md)
