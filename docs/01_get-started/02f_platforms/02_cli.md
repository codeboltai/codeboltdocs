---
sidebar_position: 2
title: CLI
description: The terminal entry point for Codebolt, including the interactive CLI interface, command mode, headless server, and one-shot prompts.
---

# CLI

The `codebolt` CLI is the terminal entry point to Codebolt. It now groups the interactive CLI interface, command mode, headless server, and one-shot prompts in one place. Use it for scripting, CI, remote SSH, keyboard-first interactive work, and automation.

> Already have the desktop app? The CLI is already installed - no separate setup needed. Otherwise see **[CLI Interface Get Started](../../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md)**.

## How to launch

```bash
codebolt                  # start server + launch the interactive CLI interface
codebolt --server         # start the server only (headless)
codebolt --prompt "..."   # run a one-shot agent prompt
```

## In this section

| Page | What it covers |
|---|---|
| **[CLI Interface Get Started](../../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md)** | Install, authenticate, configure a provider, and send your first interactive terminal message |
| **[CLI Interface Overview](../../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/01_overview.md)** | How the interactive terminal interface launches and what it contains |
| **[Command Mode Overview](../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/01_overview.md)** | Command mode, root flags, runtime modes, and command groups |
| **[Agent Commands](../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/02_agent-commands.md)** | One-shot prompts, inspecting installed agents, and authoring agent extensions |
| **[Headless CLI](../../02_using-codebolt/02_surfaces/04_cli/03_cli-headless/01_overview.md)** | Headless server mode and headless prompt mode |

## When to use the CLI

- Interactive terminal work over SSH or in terminal-only environments
- Shell-native workflows and simple scripting
- CI pipelines and automation
- Server administration and command-style inspection
- One-shot prompts or long-running headless server workflows

For the detailed merged docs, start at **[Using Codebolt -> CLI](../../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md)**, then choose **[Command Mode](../../02_using-codebolt/02_surfaces/04_cli/02_cli-commands/01_overview.md)** or **[Headless CLI](../../02_using-codebolt/02_surfaces/04_cli/03_cli-headless/01_overview.md)** as needed.

## See also

- [Platform Overview](../../02_using-codebolt/02_surfaces/01_overview.md)
- [Headless CLI](../../02_using-codebolt/02_surfaces/04_cli/03_cli-headless/01_overview.md)
- [Reference → Codebolt CLI](../../05_reference/06_codebolt-cli/01_overview.md)
