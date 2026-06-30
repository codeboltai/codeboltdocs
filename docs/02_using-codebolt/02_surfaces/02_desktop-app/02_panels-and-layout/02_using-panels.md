---
sidebar_position: 1
sidebar_label: Application Navigations
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

Use the new panel picker to open additional panels. The desktop app currently exposes these user-selectable panels:

| Panel | Category | Use it for |
|---|---|---|
| **Code Editor** | Development | Open the editor for writing, editing, and reviewing project files. |
| **Terminal** | Development | Run shell commands in an integrated terminal. |
| **Git** | Development | Work with source control and Git operations. |
| **Chat** | Tools | Talk to agents in the AI assistant chat interface. |
| **Browser** | Tools | Open a built-in web browser. |
| **Preview** | Tools | Preview applications and websites. |
| **Agent List** | Tools | Browse and install agents and extensions. |
| **Settings** | Tools | Open application settings and preferences. |
| **MCP** | Tools | Manage MCP servers and installations. |
| **Plugins** | Tools | View and manage installed plugins. |
| **Extensions** | Tools | Create, publish, and manage extensions such as agents, tools, and skills. |
| **Context Compaction** | Tools | Configure workflow-driven compaction for thread context. |
| **Memory** | Management | Review task planning and todo management. |
| **Tasks** | Management | Track task state and task work. |
| **Kanban Board** | Management | Use a board-style task view. |
| **Project Settings** | Management | Open project-specific settings and configuration. |
| **Event Actions** | Management | Manage event-driven automation actions. |
| **Hooks** | Management | Configure agent lifecycle hooks for tools, sessions, compaction, and subprocesses. |
| **Running Agents** | Management | Monitor and manage running agents. |
| **Inbox** | Management | Review escalation messages from AI agents. |
| **Environment** | Management | Manage local, cloud, runner, and child environments. |
| **Task Environment** | Management | Inspect task environment details. |
| **Debug** | Debug | Open debugging tools and utilities. |
| **Agent Debug** | Debug | Inspect agent behavior and processes. |
| **ActionBlock Debug** | Debug | Inspect ActionBlock execution logs. |
| **Console** | Debug | View the application console and logs. |
| **Problems** | Debug | View build errors, warnings, and code issues. |

The Dockview runtime also registers internal and detail panels, such as environment details, running-agent details, action plans, jobs, artifacts, knowledge stores, evals, and narrative graph views. Those panels usually open from workflows, deep links, or other panels rather than directly from the panel picker.

## Opening panels

Open the panel picker from the top navigation, then choose the panel you want.

The application currently registers these global panel-related shortcuts:

| Shortcut | Action |
|---|---|
| `Ctrl+D` / `Cmd+D` | Open the new panel picker in group mode. |
| `Ctrl+Shift+D` / `Cmd+Shift+D` | Open the new panel picker in free mode. |
| `Ctrl+Shift+T` / `Cmd+Shift+T` | Open a Terminal panel as a tab. |
| `Ctrl+Shift+R` / `Cmd+Shift+R` | Open a Terminal panel split to the right. |
| `Ctrl+Shift+B` / `Cmd+Shift+B` | Open a Terminal panel split at the bottom. |
| `Ctrl+Shift+F` / `Cmd+Shift+F` | Focus the Code panel and open project search. |

When the new panel picker is open, the UI also registers these picker-only sequence shortcuts:

| Shortcut sequence | Action |
|---|---|
| `Ctrl+D`, then `,` / `Cmd+D`, then `,` | Switch the picker to free mode. |
| `Ctrl+D`, then `;` / `Cmd+D`, then `;` | Switch the picker to group mode. |
| `Ctrl+Shift+D`, then `]` / `Cmd+Shift+D`, then `]` | Set the selected panel to open as a tab. |
| `Ctrl+Shift+D`, then `-` / `Cmd+Shift+D`, then `-` | Set the selected panel to open at the bottom. |
| `Ctrl+Shift+D`, then `\\` / `Cmd+Shift+D`, then `\\` | Set the selected panel to open to the right. |

Some panel picker entries show shortcut labels such as `Ctrl+Shift+C`, `Ctrl+Shift+A`, `Ctrl+\``, `Ctrl+Shift+G`, `F5`, `Ctrl+,`, or `Ctrl+Shift+I`. In the current UI code, those are displayed as panel metadata, but they are not registered as global panel-opening hotkeys. The top-navigation tooltip also mentions `Ctrl+Shift+N`, but the current UI source does not register that shortcut for opening the panel picker.

## Command palette

`Ctrl+Shift+P` / `Cmd+Shift+P` opens the command palette. Use it for editor and agent actions when you prefer keyboard-driven navigation.

`Ctrl+P` / `Cmd+P` opens the quick file picker.

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
| `Ctrl+P` / `Cmd+P` | Quick file open |
| `Ctrl+Shift+P` / `Cmd+Shift+P` | Command palette |
| `Ctrl+Shift+F` | Focus Code and open project search |
| `Ctrl+D` | New panel picker, group mode |
| `Ctrl+Shift+D` | New panel picker, free mode |
| `Ctrl+Shift+T` | New Terminal tab |
| `Ctrl+Shift+R` | New Terminal panel to the right |
| `Ctrl+Shift+B` | New Terminal panel at the bottom |

Some editor and chat actions have their own shortcuts inside those panels.

## What the CLI interface looks like

If you're using the [CLI interface](../../04_cli/01_cli-interface/01_overview.md) instead of the desktop app, the layout is not the same docked panel grid as the desktop surface.

The current CLI interface is organized around four top-level tabs:

- Chat
- Logs
- Git
- Files

Within the Chat tab, additional context appears through sidebars and dialogs rather than separate desktop-style panels. See [CLI Interface - Tabs, Panels, and Layout Modes](../../04_cli/01_cli-interface/03_tabs-and-panels.md) and [CLI Interface - Navigation and Keybindings](../../04_cli/01_cli-interface/02_navigation-and-keybindings.md).

## See also

- [Workspace and Projects](../01_workspace-and-projects/02_workspace-and-projects.md)
- [Chat Overview](../../../03_chat/01_overview.md)
- [Settings](../03_settings-and-profiles/02_settings-and-profiles.md)
- [CLI Interface Overview](../../04_cli/01_cli-interface/01_overview.md)
