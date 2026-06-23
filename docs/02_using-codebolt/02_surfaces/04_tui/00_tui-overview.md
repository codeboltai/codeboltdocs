---
sidebar_position: 0.5
title: TUI
description: Codebolt's keyboard-driven terminal UI — a full-screen interface for chat, logs, git, and files without leaving the terminal.
---

# TUI

The Codebolt **TUI** (Terminal UI) is a keyboard-driven, full-screen interface that runs inside your terminal. It gives you chat, logs, git status, and a file browser without leaving the shell. Use it over SSH, in terminal-only environments, or whenever you prefer a keyboard-first workflow. The TUI is bundled with the CLI.

> The TUI launches automatically when you run `codebolt`. To get set up, see **[Get Started](./00_get-started.md)**.

## How to launch

```bash
codebolt                             # start server + launch the TUI
codebolt --connect 2719              # attach the TUI to an already-running server
codebolt --project /path/to/project  # launch against a specific project
```

## In this section

| Page | What it covers |
|---|---|
| **[Get Started](./00_get-started.md)** | Install, authenticate, configure a provider, and send your first message |
| **[TUI Overview](./01_overview.md)** | How the TUI launches and the four top-level tabs (Chat, Logs, Git, Files) |
| **[Navigation and Keybindings](./02_navigation-and-keybindings.md)** | Core navigation, chat input, conversation, layout, and leader-key chords |
| **[Tabs, Panels, and Layout Modes](./03_tabs-and-panels.md)** | What each tab contains, sidebar panels, and window/orchestrator layout modes |
| **[Onboarding and Settings](./04_onboarding-and-settings.md)** | The onboarding flow, application settings, and the keybindings dialog |
| **[Remote Use and Requirements](./05_remote-and-requirements.md)** | SSH workflows, running `gotui` directly, and terminal requirements |

## When to use the TUI

- Interactive work over SSH or in terminal-only environments
- A keyboard-first workflow without a full GUI
- The same chat / git / files loop as the desktop app, lighter weight

If you need the fullest panel ecosystem or richer visual affordances (`@mentions`, inline editing, multi-pane diffs), use the **[Desktop App](../02_desktop-app/00_desktop-app-overview.md)**.

## See also

- [Platform Overview](../01_overview.md)
- [CLI Overview](../03_cli/01_overview.md)
- [Headless Mode](../05_headless.md)
