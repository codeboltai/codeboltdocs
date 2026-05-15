---
sidebar_position: 5
title: Observability and Tracing
description: Multi-agent observability is currently centered on desktop execution views, with only limited supporting inspection available from the CLI.
---

# Observability and Tracing

For multi-agent work, the current product exposes its richest observability through desktop execution and run-detail surfaces.

## What the current CLI can do

The current CLI offers limited supporting inspection through `codebolt command ...`, for example:

```bash
codebolt command agents running
codebolt command threads list
codebolt command threads messages <threadId>
codebolt command threads steps <threadId>
codebolt command jobs list
codebolt command jobs get <id>
codebolt command todos list
codebolt command projects history
```

These commands help you inspect surrounding runtime state, but they are not a replacement for the older dedicated tracing commands from previous docs.

## What the current CLI does not expose

The current `packages/cli` implementation does not expose the older run-tree, run-trace, event-query, event-watch, or aggregate provider-usage command families from previous drafts.

If your deployment exposes server-side observability APIs or external telemetry, document those deployment-specific surfaces separately.

## Practical debugging approach

1. Start with the desktop execution or run-detail view.
2. Identify the thread, stage, or run that looks wrong.
3. Use `codebolt command threads ...`, `jobs ...`, or `agents ...` to inspect supporting state.
4. Use your deployment’s server logs, tracing stack, or self-hosted observability if you need deeper internals.

## See also

- [Multi-Agent Usage Overview](./01_overview.md)
- [Reading a Flow](./03_reading-a-flow.md)
