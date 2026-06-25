---
sidebar_position: 2
title: Query the Event Log
description: The event log is Codebolt's authoritative causal record of every meaningful thing that happens. You can inspect it through the Codebolt UI
---

# Query the Event Log

The event log is Codebolt's authoritative causal record of every meaningful thing that happens. You can inspect it through the Codebolt UI. This guide covers how to access and interpret event log data.

**You'll need:** a Codebolt project with some run history. Any recent install will have plenty.

## Accessing the event log

The event log is available in the Codebolt UI under **Settings → Event Log** or via the run history panel for individual agent runs.

## What's in the log

Each event includes:

- Timestamp
- Type (e.g., run started, tool call, LLM request, phase transition)
- Run ID
- Agent name
- Key fields relevant to that event type

## Inspecting a specific run

Open the run in the UI's run history. You'll see a chronological list of events:

- LLM requests and responses
- Tool calls and their results
- Phase transitions
- Errors and warnings

Each event can be expanded to see its full details.

## Common patterns

### Failed runs

Filter the run history by status `failed` to find runs that encountered errors. Examine the last few events to understand what went wrong.

### Slow runs

Sort runs by duration to find the slowest ones. Look for:
- Slow LLM calls (large contexts, slow providers)
- Slow tool calls (network-dependent tools, large file operations)
- Many retries or loops

### Cost tracking

**Settings → Usage** shows cost breakdowns by agent, provider, and time period. Use this to identify expensive agents or runaway costs.

### Tool usage patterns

The run history shows which tools each agent used. Look for:
- Tools called excessively (potential loops)
- Tools never called (unused capabilities)
- Tool errors (misconfiguration or bugs)

## Causal relationships

Events carry causal parent IDs. In the UI, you can trace:
- Which tool calls were triggered by which LLM response
- How a swarm run's sub-runs relate to the parent
- What led to a specific error

## Performance

The event log is indexed on common fields. Browsing recent history in the UI is fast even with many runs. For very large projects, use the time range filters to narrow your view.

## Exporting data

For analysis outside the UI, the event log data can be exported. See [Persistence & Event Log (internals)](../../04_build-on-codebolt/07b_subsystems/12_persistence-and-eventlog.md) for details on the underlying storage format.

## See also

- [Persistence & Event Log (internals)](../../04_build-on-codebolt/07b_subsystems/12_persistence-and-eventlog.md)
- [Observability and Tracing](../../02_using-codebolt/07_multi-agent-usage/05_observability-and-tracing.md)
- [Logs and Diagnostics](../../02_using-codebolt/10_troubleshooting/02_logs-and-diagnostics.md)
