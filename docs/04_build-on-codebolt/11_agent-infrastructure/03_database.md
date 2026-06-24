---
sidebar_position: 3
title: Database
description: Codebolt's relational store. Holds user accounts, settings, agent runs, phases, event log, persistent memory, kvStore, and more
---

# Database

Codebolt's relational store. Holds user accounts, settings, agent runs, phases, event log, persistent memory, kvStore, and more. Everything queryable lives here except the knowledge graph (Kuzu) and vectors (vectordb).

## Supported backends

| Backend | Good for | Defaults |
|---|---|---|
| **SQLite** | Single-user, desktop app, small team (under 5 users) | Used by desktop app |
| **PostgreSQL 14+** | Team self-hosting, production | Recommended for self-hosting |
| **MySQL 8+** | Supported, less tested than Postgres | If you already have MySQL |

SQLite is simplest: one file, no separate service. Postgres is the right choice when you need shared access, backups, replication, or more than a handful of concurrent users.

## Configuring the database

```bash
# SQLite
export CODEBOLT_DB_URL=sqlite:///var/lib/codebolt/db/main.db

# Postgres
export CODEBOLT_DB_URL=postgresql://codebolt:password@localhost:5432/codebolt

# Postgres with SSL
export CODEBOLT_DB_URL=postgresql://codebolt@pg.internal/codebolt?sslmode=require
```

Or in `codebolt-server.yaml`:

```yaml
database:
  url: postgresql://codebolt@localhost/codebolt
  pool_size: 20
  pool_timeout_seconds: 30
  statement_timeout_seconds: 300
```

## First-time setup

For a fresh Postgres database:

```bash
# Create the database and user
sudo -u postgres psql <<SQL
CREATE USER codebolt WITH PASSWORD 'strong-password';
CREATE DATABASE codebolt OWNER codebolt;
GRANT ALL PRIVILEGES ON DATABASE codebolt TO codebolt;
SQL

# Point Codebolt at it
export CODEBOLT_DB_URL=postgresql://codebolt:strong-password@localhost/codebolt

# Run migrations (on first start)
codebolt-server start
```

The server runs migrations automatically on startup. Watch the logs for "migrations applied: N" on first run.

## Schema and migrations

Migrations are owned by `databaseSeederService`. On every server start:

1. Check the current schema version.
2. Apply any pending migrations in order.
3. Run seeders for new default data (themes, problem matchers).

Migrations are forward-only and transactional where the backend supports it. If a migration fails midway, the transaction rolls back and the server refuses to start. Fix the underlying issue (usually a data problem) and retry.

**Never edit the schema directly.** Changes made outside migrations will be wiped by the next upgrade.

## Main tables

| Table | Contents |
|---|---|
| `users`, `profiles` | Account info, per-user settings |
| `workspaces`, `projects` | Workspace and project metadata |
| `agents`, `agent_portfolios` | Installed agents, per-workspace curated sets |
| `agent_runs` | One row per run, with status and timing |
| `agent_execution_phases` | Per-phase rows for every run — the fine-grained trace |
| `event_log` | Append-only event log (often partitioned at scale) |
| `chat_threads`, `chat_messages` | Chat conversations |
| `persistent_memory` | Long-lived memory entries |
| `kv_store` | Structured KV data |
| `json_memory`, `markdown_memory` | Notebook-style memory |
| `capabilities`, `mcp_servers` | Installed extensions |
| `settings`, `global_settings` | Configuration layers |
| `history` | User-visible history entries |

The event log and `agent_execution_phases` are typically the largest tables. Partitioning them by time is a standard scaling move for long-running deployments.

## Partitioning (large deployments)

For deployments with > 1 million runs/year:

```sql
-- Partition event_log by month
CREATE TABLE event_log_y2026m04 PARTITION OF event_log
  FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
```

Codebolt can do this automatically if you enable it:

```yaml
database:
  partitioning:
    enabled: true
    tables:
      - event_log
      - agent_execution_phases
    interval: monthly
```

The server creates new partitions ahead of time and drops old ones per retention policy.

## Retention

Not everything should live forever. Set retention per category:

```yaml
retention:
  event_log_days: 365
  phase_rows_days: 90
  completed_runs_days: 365
  killed_runs_days: 30
  checkpoints_days: 30
```

A background job (`log-ingest-worker`, see [Scaling](./05_scaling-and-workers.md)) prunes old rows. Retention deletes are soft by default — the data is marked and cleaned up in batches to avoid table locks.

Pinned checkpoints and runs with explicit `keep: true` tags are never auto-deleted.

## Backups

For SQLite: copy the DB file while the server is stopped, or use `.backup` from sqlite3:

```bash
sqlite3 /var/lib/codebolt/db/main.db ".backup /backups/main-$(date +%Y%m%d).db"
```

For Postgres: use standard `pg_dump` / `pg_basebackup`:

```bash
pg_dump -Fc codebolt > /backups/codebolt-$(date +%Y%m%d).dump
```

Schedule daily, verify restore on a separate machine at least monthly.

See [Backup and restore](./07_backup-and-restore.md) for the full procedure including shadow git and storage backends.

## Connection pool

The default pool (20 connections) is fine for teams up to ~50 users. For more, increase:

```yaml
database:
  pool_size: 50
  pool_timeout_seconds: 30
```

Watch for pool exhaustion — if you see "timeout acquiring connection" in logs, either raise the pool size or reduce the statement timeout to prevent long-running queries from holding connections.

## Slow queries

Enable query logging for debugging:

```yaml
database:
  log_slow_queries_ms: 1000    # log any query > 1 second
```

The most common slow queries are on `event_log` without a proper index hint. Codebolt's built-in indexes cover the common access patterns, but custom queries via `eventLogQueryCompiler` can occasionally miss them.

## Reset (nuclear option)

To wipe the database and start fresh:

```bash
sudo systemctl stop codebolt
# Postgres
sudo -u postgres psql -c "DROP DATABASE codebolt;"
sudo -u postgres psql -c "CREATE DATABASE codebolt OWNER codebolt;"
# or SQLite
rm /var/lib/codebolt/db/main.db
sudo systemctl start codebolt
```

You lose all runs, memory, history, settings. User-facing project files (actual code) are not stored in the DB, so they're safe. Shadow git repos in `$DATA_DIR/shadow-git/` are also not in the DB — they survive a DB reset unless you delete them separately.

## See also

- [Self-Hosting Overview](./01_overview.md)
- [Storage Backends](./04_storage-backends.md) — vectors, KG, files
- [Backup and Restore](./07_backup-and-restore.md)
- [Persistence & Event Log (internals)](../07b_subsystems/12_persistence-and-eventlog.md)
