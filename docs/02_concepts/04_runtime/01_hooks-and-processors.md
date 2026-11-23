---
sidebar_position: 6
title: Hooks and Processors
description: Two related but distinct mechanisms for intercepting and transforming what flows through an agent.
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

Hook phases include `before_llm_call`, `after_llm_call`, `before_tool_call`, `after_tool_call`, `on_error`, `before_finalize`, etc.

Hooks are how guardrails are enforced. They're also how you add cross-cutting behaviour (audit logging, custom rate limiting) without modifying agent code.

## Processors

A **processor** is a transformation in the **context assembly** pipeline. Where a hook intercepts a single event, a processor walks over a stream of context items and rewrites them.

Common processors:
- **Compaction** — summarize old turns when context gets too large
- **Redaction** — strip secrets, PII, credentials before they reach the LLM
- **Reranking** — reorder retrieved chunks by relevance to the current query
- **Loop detection** — notice when the agent is calling the same tool with the same args repeatedly

Processors run in a defined order (a pipeline) every time context is assembled for an LLM call.

## Hook vs processor — when to use which

| Use a hook when… | Use a processor when… |
|---|---|
| You want to react to a specific event (`tool.call`, `llm.response`) | You want to transform the context fed into every LLM call |
| You need to allow/deny | You need to compress or filter |
| The behaviour is per-turn | The behaviour is per-context-assembly |

## See also

- [Hooks overview (build)](../../04_build-on-codebolt/05_plugins/01_overview.md)
- [Processors (build)](../../04_build-on-codebolt/02_creating-agents/07_processors/01_what-are-processors.md)
- [Guardrails](../06_quality/01_guardrails.md)
