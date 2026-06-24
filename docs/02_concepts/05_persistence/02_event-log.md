---
sidebar_position: 9
title: Event Log
description: The event log is Codebolt's source of truth
---

import EventStream from '@site/src/components/diagrams/EventStream';

# Event Log

The **event log** is Codebolt's source of truth. Every meaningful thing that happens — a tool call, an LLM request, a guardrail decision, a memory write — is appended to it as an immutable event.

<EventStream />

If a piece of state in Codebolt is not derivable from the event log, that's a bug.

## Why event-sourced

- **Replayability.** Any agent run can be replayed from its events. Used for debugging, regression tests, and provenance.
- **Auditability.** Every action has a "who, what, when, why" record. No silent state.
- **Decoupling.** Subsystems publish to the log; consumers (memory ingestion, observability, guardrails post-hoc analysis) subscribe.
- **Time travel.** Roll back to any past point because the entire history is there.

## What's in an event

Every event has:
- `id` — unique
- `type` — e.g. `tool.call`, `llm.response`, `guardrail.deny`
- `timestamp`
- `run_id`, `agent`, `thread_id` — context
- `payload` — type-specific data

## Querying the log

Codebolt ships an event log query DSL — small, composable predicates over events. Example:

```
codebolt events query 'type == tool.call and run_id == "abc"'
```

You can filter by type, agent, time, payload fields. Output as text, JSON, or feed into another tool.

## Replay

Because the log is complete, an agent run can be **replayed** — re-executing each turn against fixed events. This is how regression testing works: record a known-good run, replay later, diff the outcomes.

## What this is *not*

- Not a metrics system. (Metrics are derived from the log, not stored in it.)
- Not a database. (Memory layers are separate; the log is append-only events.)
- Not a chat history. (Chat is one of many event sources.)

## See also

- [Query the event log (guide)](../../03_guides/07_advanced/query-the-event-log.md)
- [Replay an agent run (guide)](../../03_guides/07_advanced/replay-an-agent-run.md)
- [Event Log subsystem](../../04_build-on-codebolt/07b_subsystems/12_persistence-and-eventlog.md)
