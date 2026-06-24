---
sidebar_position: 4
title: Storage Backends
description: Codebolt uses several storage systems beyond the main database. Each has its own backend choice, its own scaling properties, and its own backup story.
---

# Storage Backends

Codebolt uses several storage systems beyond the main database. Each has its own backend choice, its own scaling properties, and its own backup story.

## Overview

| Store | Data | Default backend | Alternatives at scale |
|---|---|---|---|
| Main DB | Runs, events, memory, settings | SQLite (desktop) / Postgres (team) | — |
| **Vector DB** | Embeddings for semantic search | Embedded (LanceDB-style) | pgvector, dedicated vector DB |
| **Knowledge graph** | Typed entities + edges | Kuzu (embedded) | — |
| **Shadow git** | Rollback-able file history | Local filesystem | Object storage (S3-compatible) |
| **Project files** | Real user files | Local filesystem | Network filesystem |
| **Capability bundles** | Installed extensions | Local filesystem | — |
| **Logs** | Server logs | Local files / stdout | Centralised log aggregator |

## Vector DB

Stores chunks of code, docs, and chat content with their embeddings. Used for semantic search and the memory ingestion pipeline.

### Embedded (default)

Codebolt ships an embedded vector store that lives in `$DATA_DIR/vectordb/`. No separate service, no configuration. Good for:

- Single project up to ~500k chunks.
- Team deployments with modest memory usage.

### pgvector (at scale)

For large projects or multi-user deployments with heavy vector workloads, move to pgvector:

```yaml
vector:
  backend: pgvector
  table: vectors
  # Uses the main Postgres database
```

Advantages:
- Same DB = same backup.
- Postgres's ecosystem (extensions, tools, replication).
- Scales to millions of vectors with proper indexing.

Make sure to create appropriate indexes (`CREATE INDEX ON vectors USING hnsw (embedding vector_cosine_ops)`). The migration runs them for you.

### Dedicated vector DB

For very large deployments, point at an external vector DB:

```yaml
vector:
  backend: custom
  url: https://vectordb.internal:8080
  api_key_env: VECTORDB_KEY
```

Codebolt supports drivers for several; check the provider list in `codebolt-server.yaml` schema.

### Index rebuilds

If you switch embedding providers or the embedding model changes, the existing vectors become stale (different models produce incompatible vectors). A full rebuild is required:

```bash
codebolt project reindex --full --project all
```

This is slow — it re-reads every file, re-chunks, re-embeds, re-writes. Do it overnight.

## Knowledge graph (Kuzu)

Kuzu is an embedded graph database. Stores typed entities (files, functions, runs, decisions) and edges (calls, imports, caused-by).

```
$DATA_DIR/kg/
├── schema.cypher
└── <project-id>/
    ├── nodes.db
    └── edges.db
```

No external service. One Kuzu DB per project (or per workspace, depending on config).

### Sizing

Rough sizes for a medium project (~10k files, ~100k symbols):

- Nodes: 100-500k
- Edges: 500k-5M
- Disk: 500 MB - 2 GB

Large monorepos (100k+ files) can have KGs in the tens of GB. Plan disk accordingly.

### Backup

Kuzu DBs are file-based. Backup by copying the directory while the server is stopped, or use Kuzu's export:

```bash
codebolt admin kg-export --project <id> --output /backups/kg-<id>.zip
```

### Reindexing

If the KG drifts from the actual code (rare, usually after a crash during indexing):

```bash
codebolt project reindex --kg --project <id>
```

Rebuilds the KG from the codebase. Does not touch other storage.

## Shadow git

Per-project rollback history. Each project has its own shadow git repo under `$DATA_DIR/shadow-git/<project-id>/`.

### Local filesystem (default)

Uses the server's local disk. Fastest. Most common.

### Object storage

For teams, you can back shadow git with S3-compatible storage:

```yaml
shadow_git:
  backend: s3
  bucket: codebolt-shadow-git
  region: us-east-1
  endpoint: https://s3.amazonaws.com       # optional, for S3-compatible services
  access_key_env: AWS_ACCESS_KEY_ID
  secret_key_env: AWS_SECRET_ACCESS_KEY
```

Slower per-operation than local disk but scales infinitely. Good for:
- Long-running team deployments.
- Backup / DR (S3 versioning + lifecycle).
- Shared storage across multiple Codebolt servers.

### Pruning

Shadow git grows with every agent write. Pruning is controlled by retention:

```yaml
shadow_git:
  retention_days: 90
  pinned_checkpoints_kept: true
```

Pruning runs in the background, deleting commits older than the retention cutoff while preserving pinned checkpoints.

## Project files

The user's actual code. **Not stored by Codebolt** — they live where the user put them. Codebolt reads and writes them through `fileReadService` and `fileUpdateIntentService`, but doesn't manage the storage itself.

For self-hosted deployments, the server needs read/write access to the project directories. Two patterns:

1. **Users work on a bastion.** Projects live on the server machine itself. Users SSH in or use remote editors. Server has direct FS access.
2. **Mounted workspace.** Each user has a dedicated workspace directory on the server. Tools like `sshfs` or NFS can mount remote directories if users want to sync with local checkouts.

Pattern 1 is simpler; pattern 2 is more flexible.

## Capability bundles

Installed capabilities live in `$DATA_DIR/capabilities/`. Each capability is a directory matching its `capability.yaml` layout.

Doesn't need special backup treatment — capabilities can always be reinstalled from their registry.

## Logs

By default, logs go to files under `$DATA_DIR/logs/`. For production, ship them to a log aggregator:

```yaml
logging:
  format: json
  output: stdout
```

Then pipe stdout to whatever your log infrastructure expects (Fluent Bit, Vector, Filebeat, etc.). Codebolt emits structured JSON with run IDs, trace IDs, and component names for easy filtering.

## Backup strategy (combined)

A complete backup needs:

1. **Main DB** — `pg_dump` or SQLite file copy.
2. **Vector DB** — if using pgvector, it's in the DB backup; if using embedded, copy `$DATA_DIR/vectordb/`.
3. **Knowledge graph** — copy `$DATA_DIR/kg/` or use `kg-export`.
4. **Shadow git** — copy `$DATA_DIR/shadow-git/` or snapshot the S3 bucket.
5. **Capability bundles** — copy `$DATA_DIR/capabilities/` (optional; can be reinstalled).
6. **Config** — copy `codebolt-server.yaml` and env var values.
7. **Master key** — backup the OS keychain entry or key file (without this, encrypted secrets are unrecoverable).

See [Backup and Restore](./07_backup-and-restore.md) for the scripted version.

## See also

- [Database](./03_database.md)
- [Memory (internals)](../07b_subsystems/04_memory.md)
- [Knowledge & Vector (internals)](../07b_subsystems/05_knowledge-and-vector.md)
- [Backup and Restore](./07_backup-and-restore.md)
