---
sidebar_position: 1
sidebar_label: Using Panels
title: Panels and Layout
description: "Codebolt's desktop app uses dockable panels for code, chat, terminals, previews, settings, environments, and debugging tools."
---

# Panels and Layout

The Desktop App uses dockable panels. The default development layout opens the **Code** panel with **Chat** beside it. Other panels can be added when you need them, and saved layouts can restore your preferred arrangement.

## Default layout

When you open a project, the normal development layout starts with:

- **Code** — the editor surface for project files.
- **Chat** — the agent conversation panel.

Panels are docked, so you can resize them by dragging panel borders and place newly opened panels beside existing ones.

## Available panels

Use the new panel picker to open additional panels:

| Panel | Use it for |
|---|---|
| **Code Editor** | Edit and review project files. |
| **Chat** | Talk to agents. |
| **Terminal** | Run shell commands. |
| **Git** | Work with source control. |
| **Browser** | Open a built-in browser panel. |
| **Preview** | Preview apps and websites. |
| **Debug** | Open debugging tools. |
| **Agent Debug** | Inspect agent behavior. |
| **ActionBlock Debug** | Inspect ActionBlock execution logs. |
| **Console** | View application logs. |
| **Memory** | Review task planning and memory-related surfaces. |
| **Tasks** | Track task state. |
| **Kanban Board** | Use a board-style task view. |
| **Marketplace** | Browse and install extensions. |
| **Settings** | Open application settings. |
| **Project Settings** | Open project-specific settings. |
| **Event Actions** | Manage event-driven automation actions. |
| **Running Agents** | Monitor running agents. |
| **Environment** | Manage local, cloud, runner, and child environments. |
| **Task Environment** | Inspect a task environment. |
| **Swarm Management** | Manage and monitor agent swarms. |

## Opening panels

Open the panel picker from the top navigation, then choose the panel you want. Common panel shortcuts include:

| Shortcut | Action |
|---|---|
| `Ctrl+Shift+C` | Open Code Editor |
| `Ctrl+Shift+A` | Open Chat |
| `Ctrl+Backtick` | Open Terminal |
| `Ctrl+Shift+G` | Open Git |
| `Ctrl+Shift+B` | Open Browser |
| `F5` | Open Debug |
| `Ctrl+,` | Open Settings |

On macOS, use `Cmd` where the app shows the macOS shortcut variant.

## Command palette

`Ctrl+Shift+P` opens the command palette. Use it for editor and agent actions when you prefer keyboard-driven navigation.

`Ctrl+P` opens the quick file picker.

## Layouts

Use the layout control in the top navigation to switch between saved layouts or save the current panel arrangement:

![Layout Selection](/productImages/applicationfeatures/layout.png)

The app stores saved layouts and can reapply them later. Save the current layout after arranging the panels the way you want.

## Themes

Open **Settings -> Appearance** to customize the app theme and edit custom theme colors.

## Keyboard-first usage

Useful defaults:

| Shortcut | Action |
|---|---|
| `Ctrl+P` | Quick file open |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+Shift+N` | New panel picker |
| `Ctrl+Shift+C` | Code Editor panel |
| `Ctrl+Shift+A` | Chat panel |
| `Ctrl+Backtick` | Terminal panel |
| `Ctrl+Shift+G` | Git panel |
| `Ctrl+Shift+B` | Browser panel |
| `Ctrl+,` | Settings panel |
| `F5` | Debug panel |

Some editor and chat actions have their own shortcuts inside those panels.

## What the CLI interface looks like

If you're using the [CLI interface](../../04_tui/01_cli-interface/01_overview.md) instead of the desktop app, the layout is not the same docked panel grid as the desktop surface.

The current CLI interface is organized around four top-level tabs:

- Chat
- Logs
- Git
- Files

Within the Chat tab, additional context appears through sidebars and dialogs rather than separate desktop-style panels. See [CLI Interface - Tabs, Panels, and Layout Modes](../../04_tui/01_cli-interface/03_tabs-and-panels.md) and [CLI Interface - Navigation and Keybindings](../../04_tui/01_cli-interface/02_navigation-and-keybindings.md).

## See also

- [Workspace and Projects](../01_workspace-and-projects/02_workspace-and-projects.md)
- [Chat Overview](../../../03_chat/01_overview.md)
- [Settings](../03_settings-and-profiles/02_settings-and-profiles.md)
- [CLI Interface Overview](../../04_tui/01_cli-interface/01_overview.md)
