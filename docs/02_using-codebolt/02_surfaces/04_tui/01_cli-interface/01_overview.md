---
sidebar_position: 1
sidebar_label: Overview
title: Overview
description: Codebolt's terminal UI is powered by @codebolt/gotui
---

# Overview

Codebolt's terminal UI is powered by `@codebolt/gotui`. It gives you an interactive full-screen interface for chat, logs, git status, and file browsing without leaving the terminal.

Use the CLI interface when you want an interactive surface but you are working over SSH, in a terminal-only environment, or simply prefer a keyboard-first workflow.

## How it launches

For most users, the CLI interface is launched by the main Codebolt command:

```bash
codebolt
```

When you run `codebolt` with no flags, Codebolt starts the server and then launches `gotui`, passing the server host, port, and current project path into the CLI interface process.

You can also start it against a specific project:

```bash
codebolt --project /path/to/project
```

## What the CLI interface contains

The current CLI interface is organized around four top-level tabs:

| Tab | Purpose |
|---|---|
| **Chat** | Main conversation surface, conversation switching, context sidebars, dialogs |
| **Logs** | Connection status, interface logs, and server logs |
| **Git** | Working tree status and recent commits |
| **Files** | File tree plus text preview |

This is different from the desktop app layout. The desktop app is a docked multi-panel GUI; the CLI interface is a tabbed terminal interface built around these four areas.

## Startup behavior

On startup, the CLI interface:

- reads the server host and port from CLI-provided environment variables when launched through `codebolt`
- fetches project and default model/agent information from the running server
- connects to the server over WebSocket
- enters onboarding if login or default model/agent setup is still incomplete

## Rendering model

The CLI interface runs in the terminal alternate screen, enables mouse support, and requests true-color rendering. It is designed for a real terminal session rather than plain line-by-line shell output.

## Direct `gotui` execution

Most people should use `codebolt`, not `gotui`, because the CLI handles server startup and passes the right connection environment automatically.

If you run `gotui` directly, it can connect to an existing server:

```bash
gotui -host localhost -port 2719
```

The direct binary also has its own built-in defaults, which are documented in [Remote Use, Direct `gotui`, and Requirements](./05_remote-and-requirements.md).

## See also

- [Navigation and Keybindings](./02_navigation-and-keybindings.md)
- [Tabs, Panels, and Layout Modes](./03_tabs-and-panels.md)
- [Onboarding and Settings](./04_onboarding-and-settings.md)
- [Remote Use, Direct `gotui`, and Requirements](./05_remote-and-requirements.md)
- [CLI Commands Overview](../02_cli-commands/01_overview.md)
