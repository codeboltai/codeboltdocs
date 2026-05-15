---
sidebar_position: 0
title: Quickstart
description: If you have the desktop app installed you already have the CLI. Use it to launch the TUI, run server-only mode, or send one-shot prompts.
---

# CLI Quickstart

Get the Codebolt CLI running and use the current command surface correctly.

> If you have the desktop app installed you already have the CLI.

## 1. Install

```bash
npm install -g codebolt
```

Verify:

```bash
codebolt --version
```

## 2. Open a project

```bash
cd my-project
```

## 3. Start Codebolt

The default CLI behavior starts the server and launches the TUI:

```bash
codebolt
```

If you want server-only mode:

```bash
codebolt --server
```

## 4. Run a one-shot prompt

Use headless prompt mode when you want a single task from the terminal:

```bash
codebolt --prompt "Explain what this codebase does in 3 bullet points"
codebolt --prompt "Add a /health endpoint" --agent generalist
```

You can point the prompt at a specific project:

```bash
codebolt --prompt "Summarize the repo" --project /path/to/project
```

## 5. Inspect the running server

Use `codebolt command ...` for server-backed inspection:

```bash
codebolt command system health
codebolt command agents list
codebolt command threads list
codebolt command git status
```

## Useful commands

```bash
codebolt                           # start server + TUI
codebolt --server                  # start server only
codebolt --connect 2719            # connect TUI to an existing server
codebolt --prompt "<task>"         # run a one-shot prompt
codebolt command agents list       # list installed agents
codebolt command threads list      # inspect chat threads
codebolt command git status        # inspect git state through the server
codebolt --help                    # full command reference
```

## See also

- [CLI Overview](./01_overview.md)
- [Agent Commands](./02_agent-commands.md)
