---
sidebar_position: 1
sidebar_label: Overview
title: Overview
description: Find your way around the Codebolt terminal interface, from Chat and conversations to Logs, Git, and Files.
---

# Overview

Use the Codebolt terminal interface to work with agents, switch between conversations, and check your project from a local terminal or an SSH session.

## How it launches

Run `codebolt` in your project directory to start a local Codebolt server and open the terminal interface.

```bash
codebolt
```

Use `--project` to open a different folder.

```bash
codebolt --project /path/to/project
```

## What the CLI interface contains

Click a tab icon in the top bar, or use `Ctrl+]` and `Ctrl+[` to switch tabs.

| Tab | Purpose |
|---|---|
| **Chat** | Send prompts, review approval requests, and switch conversations or layouts. |
| **Logs** | Check connection status and read TUI and server logs. |
| **Git** | View the working tree status and the five most recent commits. |
| **Files** | Browse the project tree and preview files from the server. |

In **Chat**, the top bar also shows open conversations. The status bar shows the current layout and shortcut hints. Press `Ctrl+E` to open **Conversations**, or type `/` in the composer to find commands.

## Startup behavior

The terminal interface loads your project and defaults from the server. It opens [onboarding](./04_onboarding-and-settings.md) if you’re signed out or if neither a default model nor a default agent is configured.

## Rendering model

The interface uses the terminal’s alternate screen and supports mouse input and true color. To select and copy terminal text, press `Ctrl+B` then `m` to switch to **Text Mode**. Repeat the shortcut to return to **Click Mode**.

## Connect to an existing server {#direct-gotui-execution}

Use `codebolt --connect 2719` to use a server already running on your machine. Replace `2719` with the server’s port.

For SSH and explicit server host settings, see [Remote Use and Requirements](./05_remote-and-requirements.md).

## See also

- [Navigation and Keybindings](./02_navigation-and-keybindings.md)
- [Tabs, Panels, and Layout Modes](./03_tabs-and-panels.md)
- [Chat, Attachments & Approvals](./06_chat-attachments-and-approvals.md)
- [Conversations & Slash Commands](./07_conversations-and-slash-commands.md)
- [Onboarding and Settings](./04_onboarding-and-settings.md)
- [Remote Use and Requirements](./05_remote-and-requirements.md)
- [Command Mode Overview](../02_cli-commands/01_overview.md)
