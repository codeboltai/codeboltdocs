---
sidebar_position: 3
title: Tabs, Panels, and Layout Modes
description: The CLI interface is built around four top-level tabs defined in packages/gotui/internal/app/app_model.go.
---

# Tabs, Panels, and Layout Modes

The CLI interface is built around four top-level tabs defined in `packages/gotui/internal/app/app_model.go`.

## Chat tab

The Chat tab is the primary interactive surface.

It contains:

- the main chat area
- the conversation bar
- dialogs such as the conversation tree, keybindings, settings, and pickers
- optional sidebar panels on the right

### Right sidebar panels

The Chat tab currently wires in these sidebar panels:

| Panel | Purpose |
|---|---|
| **Subagents** | Running or related sub-agent context |
| **Todo** | Task checklist / todo context |
| **MCP** | MCP-related status |
| **Modified Files** | Changed file summary |
| **Next Scheduled Tasks** | Upcoming tasks |
| **Context** | Context/token-related status |

### Conversation tree

The conversation tree dialog supports two modes:

- single-select behavior in the normal chat layout
- multi-select behavior in window mode

In multi-select mode, the tree allows toggling multiple conversations before confirming.

### Layout modes

The Chat tab supports more than one layout mode:

- default panel-oriented chat layout
- window mode
- orchestrator mode

Window mode is managed by the internal window manager. When it is active, auto-tiling can be toggled to keep conversation windows arranged automatically.

## Logs tab

The Logs tab is a three-panel status surface:

| Panel | Purpose |
|---|---|
| **Connection** | Host, port, retry state, last error |
| **CLI Interface Logs** | Client-side log output and UI/system messages |
| **Server Logs** | Server-side log stream |

This is the best place to diagnose connection problems, retry loops, or startup issues.

## Git tab

The Git tab is split into two stacked panels:

| Panel | Purpose |
|---|---|
| **Status** | Current git working tree state |
| **Commits** | Recent commit history |

When you switch to the Git tab, the CLI interface refreshes git status and fetches the latest short log view from the current project.

## Files tab

The Files tab is a two-pane layout:

| Pane | Purpose |
|---|---|
| **Tree** | Lazy-loaded file tree backed by server requests |
| **Preview** | File content preview |

Behavior:

- the root tree is loaded on first entry to the Files tab
- directories are expanded lazily
- opening a file fetches file content from the server
- both mouse and keyboard navigation are supported

## Top bar and status bars

The CLI interface renders a top tab bar and per-tab status bars. The active tab changes the central content region, but the overall shell remains the same.

## Relationship to the desktop app

The desktop app exposes a richer docked surface model. The CLI interface does not mirror that exact panel layout. Instead, it concentrates the terminal experience into the Chat, Logs, Git, and Files tabs and uses dialogs and sidebars where a full GUI would use additional panels.

## See also

- [Navigation and Keybindings](./02_navigation-and-keybindings.md)
- [Onboarding and Settings](./04_onboarding-and-settings.md)
