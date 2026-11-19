---
sidebar_position: 2
title: Root Command
description: Top-level codebolt CLI options and runtime modes.
---

# Root Command

The root command is defined in `packages/cli/src/index.ts`.

## Syntax

```text
codebolt [options] [command]
```

## Runtime Modes

The root command supports four main operating modes:

- Default mode: starts the CodeBolt server and launches the TUI
- Server-only mode: starts the server without the TUI via `--server`
- Connect mode: attaches the TUI to an already running server via `--connect`
- Headless prompt mode: runs an agent prompt over WebSocket without the TUI via `--prompt`

## Global Options

| Flags | Description | Notes |
|---|---|---|
| `-p, --port <number>` | Port to listen on | Defaults to `2719`, otherwise the next free port |
| `-d, --project <path>` | Project directory | Defaults to the current working directory. Also supported through `CODEBOLT_PROJECT_PATH` |
| `-s, --server` | Server-only mode | Does not launch the TUI |
| `-w, --web` | Require the web frontend | Exits if the web build is not available |
| `-c, --connect <port>` | Connect the TUI to an existing server | Uses the specified port instead of starting a server |
| `--prompt <text>` | Run an agent with the given prompt | Headless mode |
| `--agent <name>` | Agent to use with `--prompt` | Defaults to the built-in default agent |
| `--provider <name>` | LLM provider | Also supported through `CODEBOLT_LLM_PROVIDER` |
| `--model <name>` | LLM model | Also supported through `CODEBOLT_LLM_MODEL` |
| `--api-key <key>` | API key for the LLM provider | Also supported through `CODEBOLT_API_KEY` |
| `--api-url <url>` | Custom API base URL | Also supported through `CODEBOLT_API_URL` |
| `--embedding-provider <name>` | Embedding provider | Also supported through `CODEBOLT_EMBEDDING_PROVIDER` |
| `--embedding-model <name>` | Embedding model | Also supported through `CODEBOLT_EMBEDDING_MODEL` |
| `--team <username>` | Scope cloud sync to a team workspace | The `team:` prefix is optional |
| `--debug` | Enable debug mode | Exposes additional debug behavior in the launched runtime |
| `-v, --version` | Show CLI version | Provided by Commander |

## Top-Level Commands

| Command | Purpose |
|---|---|
| [`codebolt action`](./actions/index.md) | Manage extensions such as agents, tools, providers, plugins, skills, capabilities, executors, and action blocks |
| [`codebolt mcp start`](../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/03_tool-commands.md) | Start the external MCP server |
| [`codebolt command`](./commands/index.md) | Connect to a running server and execute server-backed command modules |

## Examples

```bash
codebolt
codebolt --project /path/to/project
codebolt --server
codebolt --connect 2719
codebolt --prompt "fix the login bug"
```
