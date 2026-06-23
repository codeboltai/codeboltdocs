---
sidebar_position: 2.2
title: CLI
description: The command-line entry point for running the Codebolt server, launching the TUI, connecting to a server, and running headless prompts.
---

# CLI

The `codebolt` CLI is the command-line entry point to Codebolt. With it you run the server, launch the TUI, connect to an existing server, fire off one-shot headless prompts, and drive extension authoring. It is ideal for scripting, CI, remote SSH, and one-off commands.

> Already have the desktop app? The CLI is already installed — no separate setup needed. Otherwise see **[Get Started](./02_surfaces/03_cli/00_get-started.md)**.

## How to launch

```bash
codebolt                  # start server + launch the TUI
codebolt --server         # start the server only (headless)
codebolt --prompt "..."   # run a one-shot agent prompt
```

## In this section

| Page | What it covers |
|---|---|
| **[Get Started](./02_surfaces/03_cli/00_get-started.md)** | Install the CLI, authenticate, configure a provider, and run your first task |
| **[CLI Overview](./02_surfaces/03_cli/01_overview.md)** | The root command, runtime modes, root flags, and command groups |
| **[Agent Commands](./02_surfaces/03_cli/02_agent-commands.md)** | One-shot prompts, inspecting installed agents, and authoring agent extensions |
| **[Tool Commands](./02_surfaces/03_cli/03_tool-commands.md)** | Building and publishing tool extensions |
| **[Provider Commands](./02_surfaces/03_cli/04_provider-commands.md)** | Inspecting LLMs, setting defaults and keys, and authoring provider extensions |
| **[App Commands](./02_surfaces/03_cli/05_app-commands.md)** | Root runtime modes and `command system` subcommands |

## When to use the CLI

- Shell-native workflows and simple scripting
- CI pipelines and automation
- Remote command execution over SSH
- Server administration and command-style inspection

For an interactive terminal UI, use the **[TUI](./02e_tui.md)**. For server-only startup or one-shot prompts without a UI, use **[Headless mode](./02_surfaces/05_headless.md)**.

## See also

- [Platform Overview](./02_surfaces/01_overview.md)
- [Headless Mode](./02_surfaces/05_headless.md)
- [Reference → Codebolt CLI](../05_reference/06_codebolt-cli/01_overview.md)
