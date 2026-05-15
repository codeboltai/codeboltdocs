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

When a server is already running, use:

```bash
codebolt command system health
codebolt command system check-cli
codebolt command system open-folder /path/to/folder
```

## Current limitation

The current `packages/cli` implementation does not expose the older app lifecycle, logs, diagnostics, reporting, or upgrade subcommands from previous drafts.

For long-running headless operation, start `codebolt --server` under your process manager of choice. For observability and richer administration, use the desktop UI or your own server/runtime monitoring.

## See also

- [CLI Overview](./01_overview.md)
- [Headless Mode](../05_headless.md)
