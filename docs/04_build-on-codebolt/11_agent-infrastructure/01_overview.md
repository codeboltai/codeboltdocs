---
sidebar_position: 1
title: Self-Hosting Overview
description: Running the Codebolt server yourself instead of as an embedded local process
---

# Self-Hosting Overview

Running the Codebolt server yourself instead of as an embedded local process. For teams, self-hosting gives you shared state, shared memory, shared audit trails, and central policy enforcement across all users.

If you're a single user, you're already self-hosting — the desktop app runs the server locally. This section is about running the server as a **shared service** for multiple people.

## What you get by self-hosting

1. **Shared memory and knowledge.** The knowledge graph, vector DB, persistent memory, and narrative threads are shared across the team. Agents learn from everyone's work, not just the individual user's.
2. **Central audit trail.** The event log is in one place. "Who made this change and why" is answerable across the whole team.
3. **Central policy.** Guardrails, hooks, and capability allowlists are enforced once, centrally, not per-laptop.
4. **Shared integrations.** One place to configure provider keys, internal MCP servers, and custom tools. Users don't each paste their own.
5. **Scale.** Agent runs happen on your server, not on user laptops. You can size the machine to the workload.

## What you take on

- **Running a service.** A database, a process, backups, upgrades, security patching.
- **Choosing backends.** Database, vector DB, knowledge graph — defaults work; tuning takes effort at scale.
- **User management.** Auth, roles, permissions.
- **Capacity planning.** LLM spend is still yours; agent runs use real compute.

Don't self-host for a team of 1-3 people unless you need it. The overhead is real. The break-even is somewhere around "enough users that shared memory and central policy are paying for themselves".

For business-facing and solution-architecture framing, use the self-hosting pages in this Build on Codebolt section.

## What's in this section

- **[Running the server](./02_running-the-server.md)** — process management, env vars, ports, first-boot.
- **[Database](./03_database.md)** — schema, migrations, seeders, choice of backend.
- **[Storage backends](./04_storage-backends.md)** — vector DB, Kuzu knowledge graph, persistent memory, file storage.
- **[Scaling and workers](./05_scaling-and-workers.md)** — when and how to split out workers like `log-ingest-worker`.
- **[Security hardening](./06_security-hardening.md)** — auth, network, secrets, hook/plugin sandboxing.
- **[Backup and restore](./07_backup-and-restore.md)** — what to back up, how to restore, what's recoverable vs. not.
- **[Upgrade guide](./08_upgrade-guide.md)** — safe upgrade procedures, rollbacks, compatibility matrix.

## Architecture for a team deployment

The minimum shape:

```
┌─────────────────────────────────────────┐
│            codebolt-server              │
│  ┌────────────────────────────────────┐ │
│  │  all subsystems (single process)   │ │
│  │  agent processes (N at runtime)    │ │
│  │  plugin processes (M at runtime)   │ │
│  └────────────────────────────────────┘ │
└─────────────┬─────────────┬─────────────┘
              │             │
        database         storage
        (Postgres)       (local FS or S3)
              │             │
              ▼             ▼
           backups       backups
```

At larger scale, the `log-ingest-worker` is split out to its own process so the main server doesn't slow down during bursts. See [Scaling and workers](./05_scaling-and-workers.md).

## Users connect how?

- **Desktop app** — configure a server URL in the app's settings; it connects over WebSocket instead of spawning a local server.
- **CLI** — same, via `codebolt config set server <url>`.
- **Web app** (`packages/web`) — optional; a browser-based client if your users don't want to install anything.

All three clients speak the same protocol. A single user can use the desktop app on their laptop and the web app from another machine; the server doesn't care.

## Data model — what lives where

| Data | Storage |
|---|---|
| Users, settings, profiles, themes | Main relational DB |
| Agent runs, phases, event log | Main relational DB (partitioned tables at scale) |
| Persistent memory | Main relational DB + vector DB for embeddings |
| Vector DB | Embedded by default, external (pgvector / dedicated) at scale |
| Knowledge graph | Kuzu (embedded) |
| Project files | Local FS on the server (or mounted volume) |
| Shadow git repos | Local FS, one per project |
| Plugin / capability bundles | Local FS, with a registry pointer |

All of these are discussed individually under [Storage backends](./04_storage-backends.md).

## Security model in one paragraph

Auth is the boundary; everything else is defence in depth. A self-hosted server expects every request to be authenticated (JWT or session) and every tool call to pass through the guardrail engine. Plugin processes and hook workers are sandboxed by `PluginProcessManager` — a malicious or buggy plugin can't break out. LLM provider keys are stored encrypted at rest. Full detail at [Security hardening](./06_security-hardening.md).

## See also

- [Remote Execution](./09_remote-execution.md) for business-facing deployment patterns and use-case framing
- [Architecture Overview](../02_architecture/02_architecture-overview.md) — understand the system before hosting it
- [Process Model](../02_architecture/03_process-model.md) — what runs where
- [Persistence & Event Log](../07b_subsystems/12_persistence-and-eventlog.md) — the storage floor
- [Guide: self-host for a team](../../03_guides/07_advanced/self-host-for-a-team.md)
