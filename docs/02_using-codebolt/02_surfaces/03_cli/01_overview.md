---
sidebar_position: 1
title: CLI Overview
description: The codebolt CLI is the command-line entry point for running the Codebolt server, launching the TUI, connecting to an existing server, running headless prompts,.
---

# CLI Overview

The `codebolt` CLI is the command-line entry point for running the Codebolt server, launching the TUI, connecting to an existing server, running headless prompts, and executing command groups like `action`, `agent`, and `command`.

This page is about the CLI itself. The TUI is documented separately under [TUI Overview](../04_tui/01_overview.md).

## Root command

```text
codebolt [options] [command]
```

Without a subcommand, the CLI runs one of its runtime modes depending on the flags you pass.

## Runtime modes

| Mode | How to start it | What it does |
|---|---|---|
| Default interactive mode | `codebolt` | Starts the server and launches the TUI |
| Server-only mode | `codebolt --server` | Starts the server without the TUI |
| Connect mode | `codebolt --connect <port>` | Launches the TUI against an already running server |
| Headless prompt mode | `codebolt --prompt "..."` | Runs an agent prompt over the server WebSocket and exits |

## Root options

| Flag | What it does |
|---|---|
| `--project <path>` | Set project directory |
| `--port <number>` | Set server port. The base default in `packages/cli` is `2719` |
| `--server` | Start server only |
| `--connect <port>` | Connect the TUI to an existing server |
| `--prompt "text"` | Run an agent with a prompt |
| `--agent <name>` | Select the agent used with `--prompt` |
| `--provider <name>` | Select an LLM provider |
| `--model <name>` | Select an LLM model |
| `--api-key <key>` | API key for the selected provider |
| `--api-url <url>` | Custom provider API base URL |
| `--embedding-provider <name>` | Embedding provider override |
| `--embedding-model <name>` | Embedding model override |
| `--auth-token <token>` | Authentication token |
| `--web` | Require the web frontend to be present |
| `--debug` | Enable debug mode |
| `--version` / `-v` | Print version |
| `--help` / `-h` | Show help |

## Command groups

The CLI also mounts separate command groups:

| Command | Purpose |
|---|---|
| `codebolt action ...` | Create, publish, and list extension types like tools, providers, plugins, skills, capabilities, executors, and action blocks |
| `codebolt agent ...` | Top-level agent extension commands. This same group is also mounted under `codebolt action agent ...` |
| `codebolt command ...` | Connect to a running server and run modules like `threads`, `tasks`, `jobs`, `agents`, `git`, `system`, `projects`, `chat`, `todos`, and `llm` |

For the exact subcommand and flag reference, use [Reference → Codebolt CLI](../../../05_reference/06_codebolt-cli/01_overview.md).

## Common patterns

### Start the default server + TUI flow

```bash
codebolt
```

### Start server only

```bash
codebolt --server
```

### Connect to an existing server

```bash
codebolt --connect 2719
```

### Run a one-shot prompt

```bash
codebolt --prompt "add a /health endpoint" --agent generalist
```

### Manage extensions

```bash
codebolt action tool create --name my-tool
codebolt action plugin list
codebolt agent create --name my-agent --framework
```

### Query a running server

```bash
codebolt command threads list
codebolt command git status
codebolt command llm providers
```

## CLI vs neighboring surfaces

Use the CLI when you want:

- shell-native workflows
- simple scripting and CI
- remote command execution
- server administration and command-style inspection

Use the TUI when you want an interactive terminal interface instead of plain command output. Use Headless mode when you want server-only startup or one-shot prompts without launching the TUI.

## See also

- [TUI Overview](../04_tui/01_overview.md)
- [Headless Mode](../05_headless.md)
- [Agent commands](./02_agent-commands.md)
- [Tool commands](./03_tool-commands.md)
- [Provider commands](./04_provider-commands.md)
- [Reference → Codebolt CLI](../../../05_reference/06_codebolt-cli/01_overview.md)
