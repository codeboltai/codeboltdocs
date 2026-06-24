---
sidebar_position: 12
title: Persistence & Event Log
description: The storage floor. Every other subsystem eventually writes here, and the event log is what makes Codebolt runs replayable, auditable, and queryable after the.
---

# Persistence & Event Log Subsystem

The storage floor. Every other subsystem eventually writes here, and the event log is what makes Codebolt runs replayable, auditable, and queryable after the fact.

> **Source code:** `database/`, `models/`, `stores/`, `sharedTypes/`, `types/`, `common/`, `utils/`, `factoryValidator/`, `pluginLib/`, `controllers/{users,profile,theme,templates,history,eventLog,jsonMemory,kvStore,controllk,capability}`, `services/{databaseSeederService,themeSeederService,eventLogDataService,eventLogInstanceService,eventLogQueryCompiler,eventDataResolverService,historyService,settingService,globalSettingsService,profileService,userService,themeService,templateService}`.

## What's stored, at a glance

| Category | Stored in | Services |
|---|---|---|
| Agent runs & phases | DB tables | `agentExecutionPhaseDataService` (in Agent subsystem) |
| Event log | Append-only table + query compiler | `eventLog*` |
| Memory layers | Multiple — relational, vector, graph | See [Memory](./04_memory.md) |
| KV store | Dedicated store with query compiler | `kvStore*` |
| JSON memory | Dedicated store | `jsonMemoryService` |
| Settings & profiles | Relational | `settingService`, `globalSettingsService`, `profileService` |
| Users & auth | Relational | `userService` |
| Themes & templates | Relational | `themeService`, `templateService` |
| History | Relational | `historyService` |
| Capabilities | Relational + file store | `capability` controller |

## The event log: why it's a subsystem of its own

The event log is not "logging". It's the **authoritative causal record** of everything the server does. Every meaningful event on the `applicationEventBus` is persisted here with:

- A stable ID
- Causal parents (what event(s) caused this one)
- The actor (user / agent / system)
- A typed payload
- A timestamp

Because it's append-only and causally linked, you can:

1. **Replay a run** — start with the initial event and feed each event into a fresh server to reproduce the exact trajectory.
2. **Audit** — "what exactly did this agent do last Tuesday?" — answerable without guessing.
3. **Debug multi-agent races** — the causal links show which agent saw what first.
4. **Train future agents** — the log is the training corpus for eval and regression suites.

### `eventLogQueryCompiler`
A small domain-specific query language for asking questions like:

```
events where
  actor.agent == "reviewer-bot"
  and type == "tool_call"
  and payload.tool starts with "codebolt_git"
  within last 7 days
  causally after event <ID>
```

The compiler translates that into efficient SQL against the log table. Exposed to users in the [event log query guide](../../03_guides/07_advanced/query-the-event-log.md).

### `eventDataResolverService`
Dereferences event payload IDs into full records on demand, so the log itself stays compact while still being useful for deep inspection.

## KV store with its own query compiler

`kvStoreQueryCompiler` is the same idea on a different store — a small query DSL for KV data, so extensions can store structured data and query it without reaching for SQL. Keeps extensions portable.

## Settings hierarchy

- `globalSettingsService` — server-wide settings
- `settingService` — workspace / project settings
- `profileService` — per-user preferences

Settings are resolved in order: user > project > global. Every setting read goes through the hierarchy so extensions don't each reimplement precedence.

## Seeders

- `databaseSeederService` — initial schema + reference data
- `themeSeederService` — default themes
- `problemMatcherSeederService` — default lint/LSP problem matchers

Seeders run on first boot and on upgrade.

## See also

- [Memory](./04_memory.md) — the memory layers land on top of the storage described here
- [Process Model](../02_architecture/03_process-model.md) — how the bus feeds the event log
- [Query the event log](../../03_guides/07_advanced/query-the-event-log.md) — user-facing how-to
