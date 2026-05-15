---
sidebar_position: 2
title: Logs and Diagnostics
description: Where to look when something's wrong and Common Issues doesn't cover it.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Logs and Diagnostics

Where to look when something's wrong and [Common Issues](./01_common-issues.md) doesn't cover it.

## The log sources

Codebolt writes several streams of diagnostic output:

| Source | What | Where |
|---|---|---|
| **Server logs** | Main server output | `~/.codebolt/logs/server.log`, or stdout (headless) |
| **Agent logs** | Per-run, per-agent | Product observability surfaces and deployment-specific tracing |
| **Plugin logs** | Per MCP server / capability | `~/.codebolt/logs/plugins/<name>.log` |
| **System events** | DB, heartbeat, lifecycle | Product observability surfaces and server-side logging |
| **Guardrail decisions** | Every verdict | Event log |
| **Audit trail** | Security-relevant actions | Event log + optional SIEM sink |

## Viewing server logs

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

**Settings → Logs.** Has a search box, level filter, component filter, and a live-tail toggle. The most discoverable surface for log work.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older log-viewing commands from previous drafts. Read raw log files directly or use the desktop log viewer.

</TabItem>
<TabItem value="tui" label="TUI">

Press `l` to open the logs pane. `/` to filter, `f` to follow, `0-5` to set level (TRACE to ERROR).

</TabItem>
<TabItem value="api" label="HTTP API">

```http
GET /api/logs?tail=500&level=warn&component=agentService
GET /api/logs/stream    # SSE
```

</TabItem>
<TabItem value="raw" label="Raw files">

Server logs live on disk for direct access (e.g. for tailing with `tail -f` or shipping to a collector):

```
~/.codebolt/logs/server.log
~/.codebolt/logs/plugins/<name>.log
```

Rotated daily by default. See **Log rotation and retention** below.

</TabItem>
</Tabs>

## Log levels

Codebolt emits five levels:

- **TRACE** — extremely verbose. Usually off.
- **DEBUG** — diagnostic detail. On when debugging.
- **INFO** — normal operation. Default.
- **WARN** — something's off but not broken.
- **ERROR** — something broke.

Change the level through logging configuration or the runtime surface your build exposes rather than the removed CLI examples from older drafts.

Or for specific components in `codebolt-server.yaml`:

```yaml
logging:
  level: info
  components:
    agentService: debug
    memoryIngestionService: warn
```

## Reading a stack trace

When you see an error with a stack trace:

```
ERROR [agentService] Failed to spawn agent: spawn my-agent ENOENT
    at ChildProcess._handle.onexit (node:internal/child_process:...)
    at onErrorNT (node:internal/child_process:...)
```

The key parts:

- **Component** in brackets — where in Codebolt the error happened.
- **Error message** — the "what".
- **Cause** (if chained) — the underlying reason.
- **Stack frames** — the "where", often just internal Node frames; the Codebolt frames are the interesting ones.

For "how do I fix it" — usually the error message itself tells you (ENOENT = file not found, EADDRINUSE = port taken, EACCES = permission).

## The run trace

For anything related to an agent run, use the run-detail and observability surfaces your build exposes. The current CLI does not expose the older dedicated run-trace command from previous drafts.

## Running diagnostics

The current CLI does not expose the older diagnostic command from previous drafts. Equivalent diagnostics depend on the desktop or self-hosted surface you are using.

Typical diagnostics still include:

- Database connectivity and schema version
- Disk space
- Shadow git repo integrity
- Plugin process health
- Port conflicts
- Expired credentials
- Corrupted cache
- Unused / orphaned resources

Safe to run any time — it's read-only by default. Add `--fix` to auto-repair certain issues (confirmed separately).

## Collecting diagnostics for a bug report

Use the desktop diagnostic export or collect the relevant logs and environment details manually. Useful report contents still include:

- Codebolt version (server, CLI, protocol)
- OS and hardware info
- Config summary (secrets redacted)
- Recent logs (last 500 lines)
- Database info (version, size)
- Active tools and capabilities
- Doctor output
- Recent run failures

Attach this to bug reports. It's designed to be safe to share — secrets are stripped. Review before sending if you're paranoid.

## Event log and observability

In current builds, use the observability and logging surfaces exposed by your product or deployment rather than the removed event-query CLI examples from older drafts.

## Log rotation and retention

Server logs are rotated daily by default. Old logs are compressed and kept for 30 days.

```yaml
logging:
  retention_days: 30
  max_file_size_mb: 100
  rotate: daily
```

For self-hosted production, ship logs to a centralised aggregator rather than relying on local files. See [Self-hosting](../../04_build-on-codebolt/10_self-hosting/01_overview.md).

## Live metrics

For real-time observability (counts, rates, percentiles), use the Prometheus endpoint if enabled:

```
http://localhost:9091/metrics
```

See [Self-hosting → Scaling](../../04_build-on-codebolt/10_self-hosting/05_scaling-and-workers.md) for configuration.

## See also

- [Common Issues](./01_common-issues.md)
- [Reporting Bugs](./03_reporting-bugs.md)
- [Agent Debug](../05c_agent-observability/02_agent-debug.md)
- [Query the event log](../../03_guides/07_advanced/query-the-event-log.md)
