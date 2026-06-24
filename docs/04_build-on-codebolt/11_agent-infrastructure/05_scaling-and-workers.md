---
sidebar_position: 5
title: Scaling and Workers
description: When your self-hosted Codebolt starts feeling slow, you have a few levers
---

# Scaling and Workers

When your self-hosted Codebolt starts feeling slow, you have a few levers. This page covers what to tune, when, and how to split workloads into separate processes.

## When you need to scale

Symptoms that mean you're outgrowing the default single-process setup:

- **Slow UI on a shared server.** Chat messages take seconds to appear.
- **Event log ingestion lagging.** New events take minutes to appear in queries.
- **DB connection pool exhaustion.** Logs show "timeout acquiring connection".
- **Memory pressure.** Server RSS growing without bound.
- **Tool call latency variance.** Tool calls normally fast, but sometimes spike to seconds.

Each has a specific fix below.

## The default topology

```
┌─────────────────────────────────────┐
│        codebolt-server              │
│  ┌────────────────────────────────┐ │
│  │  HTTP + WebSocket              │ │
│  │  All subsystems in one process │ │
│  │  ↑                             │ │
│  │  agent processes (N)           │ │
│  │  plugin processes (M)          │ │
│  └────────────────────────────────┘ │
└───────────┬─────────────────────────┘
            │
       database
```

Everything in one Node process plus agent/plugin children. Fine for teams up to ~20-30 concurrent users.

## Splitting out the log-ingest worker

The first thing to split. The event log is append-only and high-volume — during bursts, ingestion can back up and slow the main server.

```yaml
# codebolt-server.yaml on the main server
workers:
  log_ingest:
    mode: external
```

```bash
# On a separate machine (or same machine, separate process)
codebolt-worker log-ingest start \
  --db-url=postgresql://codebolt@db.internal/codebolt \
  --master-key-file=/etc/codebolt/master.key
```

The main server now publishes events to a queue (by default Postgres LISTEN/NOTIFY, or Redis if configured) and the worker consumes them asynchronously. The main server is no longer waiting on log writes.

Source: `packages/log-ingest-worker` — actual package that ships alongside the server.

## Splitting out memory ingestion

Memory ingestion (chunking, embedding, writing to vector DB) is the second-biggest async workload. Default is in-process; at scale, move it out:

```yaml
workers:
  memory_ingest:
    mode: external
    concurrency: 4
```

```bash
codebolt-worker memory-ingest start --db-url=...
```

This lets you scale memory ingestion horizontally (multiple workers) without touching the main server.

## Splitting out indexing

Project indexing (codemap, codebase index, KG updates) is CPU-intensive and bursty:

```yaml
workers:
  indexing:
    mode: external
```

The first-time index of a large project can take minutes of CPU time — offloading this prevents UI stalls.

## Multiple Codebolt servers behind a load balancer

For teams >50 users, a single server becomes the bottleneck. Scale horizontally:

```
       Load Balancer (sticky by user ID)
           │
     ┌─────┴─────┐
     │           │
  server-1   server-2
     │           │
     └─────┬─────┘
           │
     shared Postgres
           │
     shared object storage (shadow git, capabilities)
```

Requirements:

- **Shared database.** Postgres, not SQLite.
- **Shared shadow git storage.** S3-compatible object storage, or an NFS mount.
- **Shared capabilities directory.** Same — object storage or NFS.
- **Sticky sessions.** A user's WebSocket connection should land on the same server for its lifetime. Load balancer stickiness by user ID or cookie.
- **A shared message bus** for cross-server events. Postgres LISTEN/NOTIFY works for small clusters; Redis or NATS for larger ones.

This is where self-hosting gets non-trivial. Start simple — a single big server is often cheaper than a cluster up to surprising scales.

## Database tuning

For Postgres, the common tunings:

```sql
-- In postgresql.conf
shared_buffers = 25% of RAM
effective_cache_size = 75% of RAM
work_mem = 32MB
maintenance_work_mem = 512MB
max_connections = 200
```

Specific to Codebolt:

- **Partition `event_log` and `agent_execution_phases`** by month if the server has been running > 3 months. See [Database → Partitioning](./03_database.md).
- **VACUUM and ANALYZE** on schedule. Auto-vacuum is usually fine.
- **Index hints** for custom queries. Inspect `EXPLAIN` output on slow queries.

## Agent process limits

Each running agent is a separate process. Without limits, a runaway can spawn hundreds:

```yaml
agent_process_manager:
  max_concurrent: 50
  max_per_user: 10
  max_per_workspace: 20
  spawn_rate_per_second: 5
```

Hitting a limit queues new runs rather than failing them. The queue drains as existing runs finish.

For a medium team (~20 users), `max_concurrent: 50` is a reasonable default. Bump it if you see queueing; lower it if the machine is thrashing.

## Plugin process limits

MCP servers and capability plugins also run as separate processes:

```yaml
plugin_process_manager:
  max_concurrent: 100
  restart_backoff_seconds: [1, 5, 15, 60]
  circuit_break_after_failures: 5
```

Fewer than agents because plugins are long-lived (start once, used many times).

## Caching

Several caches worth tuning at scale:

| Cache | Tuning |
|---|---|
| **Codemap cache** | In-memory LRU, configurable size. Default 500 MB. |
| **Vector search cache** | Hot query cache. Default 100 MB. Raise if many agents share queries. |
| **LLM response cache** | Disabled by default. Enable for deterministic agents with repeatable prompts. |
| **Tool schema cache** | Always on; no tuning needed. |

```yaml
cache:
  codemap_mb: 2000
  vector_mb: 500
  llm_response: enabled
```

## Monitoring

For anything but tiny deployments, you want metrics. Codebolt exposes Prometheus metrics:

```yaml
metrics:
  prometheus:
    enabled: true
    path: /metrics
    port: 9091
```

Key metrics to dashboard:

- `codebolt_http_request_duration_seconds` — by route
- `codebolt_llm_request_duration_seconds` — by provider, model
- `codebolt_tool_call_duration_seconds` — by tool
- `codebolt_agent_runs_total` — by agent, status
- `codebolt_db_pool_in_use` — connection pool usage
- `codebolt_event_log_ingest_lag_seconds` — ingest backlog

Trace-level observability is available via OpenTelemetry; configure an OTLP endpoint and traces show up in your tracing backend.

## When to stop scaling

Some problems aren't solved by more infrastructure:

- **Slow LLM responses** — that's the provider, not Codebolt. Use a faster model or provider.
- **Slow tool calls** — usually the tool, not Codebolt. Optimise the tool or pick a different one.
- **Huge single projects** — indexing scales with project size. Split monorepos, exclude generated code, constrain the codemap scope.

Scale Codebolt; don't try to scale away upstream bottlenecks.

## See also

- [Self-Hosting Overview](./01_overview.md)
- [Database](./03_database.md)
- [Storage Backends](./04_storage-backends.md)
- [Security Hardening](./06_security-hardening.md)
- [Process Model (internals)](../02_architecture/03_process-model.md)
