---
sidebar_position: 1
title: Tiled View
description: "Open, search, and switch panels in the Codebolt desktop app."
---

# Tiled View

The Desktop App uses dockable panels for code, chat, terminals, previews, settings, environments, debugging tools, and workflow-specific views.

## Opening panels from the UI

You can open panels from the bottom bar, the panel-header **+** menu, or the top navigation panel picker.

### Bottom bar menus

The bottom bar is the fastest mouse path for common panels. It has direct buttons for **Git**, **Code**, **Chat**, and **Terminal**, followed by grouped menus.

| Bottom bar item | Type | Contains |
|---|---|---|
| **Git** | Quick access | [Branch controls](../03b_code-and-terminal/04_git-panel.md#branches) and [Git Graph](../03b_code-and-terminal/04_git-panel.md#commit-history-git-graph). |
| **Code** | Quick access | [Code Editor](../03b_code-and-terminal/02_code-editor.md). |
| **Chat** | Quick access | [Chat](../03_chat/01_overview.md). |
| **Terminal** | Quick access | [Terminal](../03b_code-and-terminal/03_terminal.md). |
| **Agents** | Group menu | Customize, [Agents](../../../../04_build-on-codebolt/02_creating-agents/02_quickstart.md#step-1--create-the-project), [MCP](../Settings/06_mcp-servers.md), Cloud Connectors, Providers, [Plugins](../../../07z_plugins/02_installing-plugins.md), [Capabilities](../03c_panels/04b_agent-management-features/04_capabilities.md), [ActionBlocks](../03c_panels/04b_agent-management-features/05_action-block.md), [Hooks](../../../08d_auto-interactivity/04_hooks.md), [Eval](../03c_panels/04b_agent-management-features/09_eval.md). |
| **Plan** | Group menu | [Tasks](../03c_panels/04a_application-planning-features/01_tasks.md), [Execution Plan](../03c_panels/04a_application-planning-features/05_action-plans.md), [Note](../../../06_planning/01_overview.md#notes--canvas), [Canvas](../../../06_planning/01_overview.md#notes--canvas), [Feature Plan](../../../06_planning/01_overview.md#feature-plans), [Roadmap](../03c_panels/04a_application-planning-features/02_roadmap.md). |
| **Tools** | Group menu | [Chat](../03_chat/01_overview.md), [Browser](../03b_code-and-terminal/05_preview-browser.md#browser-panel), [Terminal](../03b_code-and-terminal/03_terminal.md), [Code](../03b_code-and-terminal/02_code-editor.md), [Jobs](../03c_panels/04b_agent-management-features/06_jobs.md), [Inbox](../03c_panels/04c_deposition-framework-features/02_inbox.md), [Calendar](../03c_panels/04c_deposition-framework-features/03_calendar.md). |
| **Execution** | Group menu | [Thread Panel](../../../04_agents/08_thread-panel.md), [Thread Coordination](../03c_panels/04b_agent-management-features/08_orchestrator-management.md), [Environment](../03c_panels/04d_agent-orchestrations/03_environments.md), [Running Agent](../03c_panels/04b_agent-management-features/01_running-agents.md), [Chat Canvas](../../../07a_parallel-agents/03_chat-canvas.md), [Background Agents](../03c_panels/04b_agent-management-features/02_background-agents.md), [Artifacts](../03c_panels/04c_deposition-framework-features/05_artifacts.md), [Auto Testing](../03c_panels/04c_deposition-framework-features/04_auto-testing.md), [Distributed Swarm Management](../03c_panels/04b_agent-management-features/07_swarm-management.md), [Review Merge Request](../03c_panels/04c_deposition-framework-features/01_review-merge-requests.md), [Agent Deliberation](../03c_panels/04c_deposition-framework-features/02_agent-deliberation.md), [Update Project Structure Request](../03c_panels/04c_deposition-framework-features/07_update-project-structure-request.md). |
| **Debug** | Group menu | [Agent Debug](../../../04_agents/08_agent-debug.md), [Environment Debug](../../../../03_guides/trubleshooting/09_environment-debug.md), [Plugin Debug](../../../08_integrations/07_plugin-debug.md#plugin-debug), [ActionBlock Debug](../../../08_integrations/07_plugin-debug.md#actionblock-debug), [AI Debug](../../../04_agents/09_ai-debug-and-console.md#ai-debug), [Preview](../03b_code-and-terminal/05_preview-browser.md#preview-panel), [Console](../../../04_agents/09_ai-debug-and-console.md#console), [Codemap](../03b_code-and-terminal/06_codemap.md), [Problems](../03b_code-and-terminal/02_code-editor.md#problems-panel), [Narrative Graph](../03b_code-and-terminal/07_narrative-graph.md). |
| **Context** | Group menu | [Vector DB](../03c_panels/04e_memory-features/06_vector-db.md), [Knowledge](../03c_panels/04e_memory-features/07_knowledge.md), [Knowledge Graph](../03c_panels/04e_memory-features/08_knowledge-graph.md), [Persistent Memory](../03c_panels/04e_memory-features/02_persistent-memory.md), [KV Store](../03c_panels/04e_memory-features/09_kv-store.md), [MiniApps](../../../../04_build-on-codebolt/04b_custom-agentic-applications/05_mini-apps.md), [Event Log](../03c_panels/04c_deposition-framework-features/06_event-log.md), [Memory Ingestion](../03c_panels/04e_memory-features/03_memory-ingestion.md), [Context Assembly](../03c_panels/04e_memory-features/04_context-assembly.md), [Context Compaction](../03c_panels/04e_memory-features/05_context-compaction.md), [Memory](../03c_panels/04e_memory-features/01_memory.md). |
| **System** | Group menu | [Settings](../Settings/01_overview.md), [App Settings](../Settings/02_app-and-project-settings.md#app-settings), [Project Structure](../03c_panels/04a_application-planning-features/07_project-structure.md), [Guardrails](../03c_panels/04b_agent-management-features/11_guardrails.md), [Proxy Execution](../03c_panels/04d_agent-orchestrations/01_proxy-execution.md), [Routing Gateway](../03c_panels/04d_agent-orchestrations/02_routing-gateway.md), [Virtual Workers](../../../07a_parallel-agents/06_virtual-workers.md), [Routing Profiles](../../../08e_external-integrations/02_routing-gateway.md#routing-profiles), [Marketplace](../../../09_marketplace.md). |
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

`Ctrl+Shift+P` / `Cmd+Shift+P` opens the Command Palette. Search for an editor action such as **Format Document** or **Toggle Line Comment**.

![Command Palette search field and editor actions with their keyboard shortcuts](/img/desktop/command-palette.png)

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
- [Chat Overview](../03_chat/01_overview.md)
