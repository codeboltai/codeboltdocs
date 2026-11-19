---
sidebar_position: 5
title: App Commands
description: The current CLI uses root runtime flags and the `command system` subcommands instead of the older app-management command family.
---

# App Commands

The current CLI does not expose the older app-management command family from previous drafts.

Instead, runtime control is split between:

- root `codebolt` modes
- the `command system` subcommands

## Start the runtime

Root runtime patterns:

```bash
codebolt
codebolt --server
codebolt --connect 2719
codebolt --project /path/to/project
codebolt --port 3457 --server
```

## Run headless work

For one-shot headless execution:

```bash
codebolt --prompt "Explain this repo"
codebolt --prompt "Review the project" --agent generalist
```

## System commands

Use `codebolt command project get-path` to inspect the project a running server is serving. For the available namespaces, run `codebolt command --help`.

## Current limitation

The current `packages/cli` implementation does not expose the older app lifecycle, logs, diagnostics, reporting, or upgrade subcommands from previous drafts.

For long-running headless operation, start `codebolt --server` under your process manager of choice. For observability and richer administration, use the desktop UI or your own server/runtime monitoring.

## See also

- [Command Mode Overview](./01_overview.md)
- [Headless CLI](../03_cli-headless/01_overview.md)
