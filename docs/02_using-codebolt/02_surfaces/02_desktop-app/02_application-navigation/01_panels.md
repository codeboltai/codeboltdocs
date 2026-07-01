---
sidebar_position: 1
title: Panels
description: "Open, search, and switch panels in the Codebolt desktop app."
---

# Panels

The Desktop App uses dockable panels for code, chat, terminals, previews, settings, environments, debugging tools, and workflow-specific views.

## Opening panels from the UI

You can open panels from the bottom bar, the panel-header **+** menu, or the top navigation panel picker.

### Bottom bar menus

The bottom bar is the fastest mouse path for common panels. It has direct buttons for **Git**, **Code**, **Chat**, and **Terminal**, followed by grouped menus.

| Bottom bar item | Type | Contains |
|---|---|---|
| **Git** | Quick access | Branch controls and Git graph. |
| **Code** | Quick access | Code editor panel. |
| **Chat** | Quick access | Chat panel. |
| **Terminal** | Quick access | Terminal panel. |
| **Agents** | Group menu | Agent List, Capabilities, Action Block, MCP, Plugins, Eval. |
| **Plan** | Group menu | Tasks, Action Plan, Specs, UI Flow, Requirement Plan, Roadmap. |
| **Tools** | Group menu | Chat, Browser, Terminal, Code, Jobs, Inbox, Calendar. |
| **Execution** | Group menu | Tracking and orchestration panels such as Thread Panel, Environment, Running Agent, Chat Canvas, Background Agents, Artifacts, Auto Testing, Orchestrator Management, Swarm Management, Review Merge Request, Agent Deliberation, and Update Project Structure Request. |
| **Debug** | Group menu | Agent Debug, Environment Debug, Plugin Debug, ActionBlock Debug, AI Debug, Preview, Console, Codemap, Problems, Narrative Graph. |
| **Context** | Group menu | Vector DB, Knowledge, Knowledge Graph, Persistent Memory, KV Store, Event Log, Memory Ingestion, Context Assembly, Context Compaction, Memory. |
| **System** | Group menu | Settings, App Settings, Project Structure, Guardrails, Proxy Execution, Routing Gateway, Extensions. |
| **Notifications** | Utility | System alerts and progress notifications. |
| **Support** | Utility | Report an issue and feedback actions. |

To open a panel from the bottom bar:

1. Move to the bottom bar.
2. Open the category that contains the panel. For example, use **Tools** for Chat, Browser, Terminal, Code, Jobs, Inbox, and Calendar.
3. Use the search field at the top of the menu if the list is long.
4. Select the panel.

The selected panel opens in the Dockview workspace. If the panel is already open and is not a multi-instance panel, Codebolt focuses the existing panel instead of creating a duplicate. **Chat** and **Terminal** can open multiple instances.

### Panel-header plus menu

Each Dockview panel group has a **+** button in its tab header. Use it when you want to add a panel near the panel group you are already working in.

To add a panel with the **+** menu:

1. Click **+** in the panel group's tab/header area.
2. Type in **Search panels...** to filter the registered panels.
3. Use the arrow keys or mouse to choose a panel.
4. Press `Enter` or click the panel name.

The menu hides panels that are already open, except for multi-instance panels such as **Chat** and **Terminal**.

### Top navigation panel picker

The top navigation includes a panel picker button. Use it when you want more control over where a panel opens.

The picker has:

| Control | What it does |
|---|---|
| **Search panels...** | Filters panels by label and description. |
| **Group** | Places panels into Codebolt's default groups: Environment/Tasks on the left, Chat on the right, Terminal/Debug at the bottom, Code and most other panels in the center. |
| **Free** | Opens the selected panel using the split type you choose. |
| **Tab** | Adds the panel as a tab. |
| **Right** | Opens the panel in a right-side split. |
| **Bottom** | Opens the panel in a bottom split. |

Some entries show an **Open** badge when that panel already exists.

## Panel Selector

The **Panel Selector** is an in-workspace panel for replacing the selector tab with another panel.

To use it:

1. Open it with `Ctrl+Shift+N` / `Cmd+Shift+N`, or from any UI path that opens **Panel Selector**.
2. Search for a panel by name or description.
3. Select the panel.

The selector closes itself and opens the chosen panel in the same Dockview group.

## Command palette

`Ctrl+Shift+P` / `Cmd+Shift+P` opens the command palette. Use it for editor and agent actions when you prefer keyboard-driven navigation.

![Command Palette](/layout/command_Palette.png)

`Ctrl+P` / `Cmd+P` opens the quick file picker.

## Panel shortcuts

The application currently registers these global panel-related shortcuts:

| Shortcut | Action |
|---|---|
| `Ctrl+D` / `Cmd+D` | Open the new panel picker in group mode. |
| `Ctrl+Shift+D` / `Cmd+Shift+D` | Open the new panel picker in free mode. |
| `Ctrl+Shift+T` / `Cmd+Shift+T` | Open a Terminal panel as a tab. |
| `Ctrl+Shift+R` / `Cmd+Shift+R` | Open a Terminal panel split to the right. |
| `Ctrl+Shift+B` / `Cmd+Shift+B` | Open a Terminal panel split at the bottom. |
| `Ctrl+Shift+N` / `Cmd+Shift+N` | Open the in-workspace Panel Selector panel. |
| `Ctrl+Shift+F` / `Cmd+Shift+F` | Focus the Code panel and open project search. |

When the new panel picker is open, the UI also registers these picker-only sequence shortcuts:

| Shortcut sequence | Action |
|---|---|
| `Ctrl+D`, then `,` / `Cmd+D`, then `,` | Switch the picker to free mode. |
| `Ctrl+D`, then `;` / `Cmd+D`, then `;` | Switch the picker to group mode. |
| `Ctrl+Shift+D`, then `]` / `Cmd+Shift+D`, then `]` | Set the selected panel to open as a tab. |
| `Ctrl+Shift+D`, then `-` / `Cmd+Shift+D`, then `-` | Set the selected panel to open at the bottom. |
| `Ctrl+Shift+D`, then `\\` / `Cmd+Shift+D`, then `\\` | Set the selected panel to open to the right. |

Some panel picker entries show shortcut labels such as `Ctrl+Shift+C`, `Ctrl+Shift+A`, `Ctrl+\``, `Ctrl+Shift+G`, `F5`, `Ctrl+,`, or `Ctrl+Shift+I`. In the current UI code, those are displayed as panel metadata, but they are not all registered as global panel-opening hotkeys.

## See also

- [Layout](./02_layout.md)
- [Workspace and Project Management](../01_workspace-and-project-management/01_overview.md)
- [Chat Overview](../../../03_chat/01_overview.md)
