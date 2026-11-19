---
sidebar_position: 0
title: Get Started
description: Start the CodeBolt server and use its current gateway commands.
---

# Command Mode Quickstart

With `codebolt` on your PATH, open a terminal in your project directory. Verify the CLI with `codebolt --version`.

## Start the server

```bash
codebolt --server --project /path/to/project --port 2719
```

Use **Settings → LLMs** in the desktop app for saved provider settings. For a one-shot CLI run, pass `--provider` and `--model` and supply the provider credential through `CODEBOLT_API_KEY` when required.

## Inspect the project

In a second terminal:

```bash
codebolt command --cli-connect-port 2719 agent list
codebolt command --cli-connect-port 2719 thread list
codebolt command --cli-connect-port 2719 git status
```

Run `codebolt command --help` for the available namespaces. Use `--help` with a specific subcommand to see its arguments and flags.

## Run one task

Run a headless prompt in a terminal:

```bash
codebolt --project /path/to/project --prompt "Summarize this project"
```

See [Headless Prompt](../03_cli-headless/03_headless-prompt.md) and [CLI Reference](../../../../05_reference/06_codebolt-cli/01_overview.md).
