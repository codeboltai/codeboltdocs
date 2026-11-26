---
sidebar_position: 2
title: Layout Modes and Presets
description: Switch between Docked and Focus, apply an existing layout, and save a new layout in Codebolt Desktop.
---

# Layout Modes and Presets

Use the mode switch in the top bar to choose how you work with panels. In **Docked**, use **Change Layout** to apply or save a named arrangement.

## Switch between Docked and Focus

| Mode | When to use it |
|---|---|
| **Docked** | Keep multiple panels in view, such as Code beside Chat and Terminal below them. Group panels as tabs, split them, or resize them. |
| **Focus** | Give the current section the workspace. Use the left panel rail to switch sections. |

1. To enter **Focus**, select the panel you want to work in and click **Docked** in the top bar. Codebolt opens that panel in a focused section.
2. To return to the docked workspace, click **Focus** in the top bar. **Change Layout** appears beside the switch.

## Apply an existing layout {#switch-layouts}

1. Switch to **Docked**.
2. Click the current layout name or its arrow in the top bar. This is the **Change Layout** control.
3. Under **Select Layout**, choose a built-in preset or a layout you saved. Codebolt applies that arrangement and shows its name in the top bar.

![Select Layout menu in Docked mode with the preset list and the Save Current button](/img/desktop/layout-menu.png)

### Available layouts

| Layout | What opens |
|---|---|
| **Develop Mode** | Code beside Chat. |
| **Agent Mode** | The thread list, a thread detail pane, and Environment. |
| **Chat Mode** | Chat with the side pane closed. |
| **Orchestrator Mode** | Chat with the side pane already open. |
| **Terminal Mode** | Three terminal panels. |
| **Chat Canvas Mode** | Chat Canvas. |
| **Plan Mode** | Roadmap, Project Structure, Feature Plan, Notes, Canvas, and Chat. |
| **Agent Builder Mode** | Customize, Policy Profiles, Proxy Execution, Agent Flow, Code, Evaluation, and Chat. |
| **Normal Mode** | Code beside Chat. This layout may carry over from an earlier version. |
| **Task Mode** | Tasks beside Chat. This layout may carry over from an earlier version. |

### Default layout

**Develop Mode** is the default on a fresh install. In app mode, the default workspace opens **Chat** on the left and **Preview** on the right.

## Create and save a layout {#create-a-layout}

1. In **Docked**, open the panels you want in your layout. For example, start with **Develop Mode**, then open **New Panel Selection → Free → Bottom** and select **Terminal**.
2. Drag tabs to move them into groups or create splits. Drag the dividers to resize the groups.
3. Open **Change Layout** in the top bar and select **Save Current**.
4. Enter a new **Layout Name**, then click **Add**.

The new layout becomes active and appears in **Select Layout**. You can apply it again after restarting Codebolt.

### Update a saved layout {#save-a-layout}

Apply the saved layout, rearrange its panels, then select **Save Current** and enter the same name. Clicking **Add** replaces the saved arrangement with your current one.

## Workspace zones

Codebolt's desktop interface is divided into three persistent zones:

```
┌──────────────────────────────────────────────────┐
│                   Top Navbar                     │
├──────────────────────────────────────────────────┤
│                                                  │
│              Main Workspace                      │
│         (panels, tabs, split views)              │
│                                                  │
├──────────────────────────────────────────────────┤
│                  Bottom Bar                      │
└──────────────────────────────────────────────────┘
```

| Zone | What it contains |
|---|---|
| **Top Navbar** | Back navigation, edge sidebar toggles, layout picker, project name, settings, project settings, command palette, panel picker, user menu, update chip, and OS window controls where applicable. |
| **Main Workspace** | Dockview panel groups, tabs, splits, and resizable panes. |
| **Bottom Bar** | Quick panel launchers and grouped panel menus for tools, agents, planning, execution, debugging, context, and settings. |

## Managing panel views with drag and drop

Panels are Dockview tabs. Drag and drop is the main way to manage the view:

| Action | Result |
|---|---|
| Drag a tab within the same tab bar | Reorder panels inside that group. |
| Drag a tab onto another group's tab bar | Move the panel into that group as a tab. |
| Drag a tab to the left or right edge of a group | Create a side-by-side split. |
| Drag a tab to the bottom edge of a group | Create a stacked bottom split. |
| Drag a panel border | Resize the neighboring panel groups. |
| Close a tab | Remove that panel from the current layout. |

Use tabs when you want several related panels in one place. Use splits when you need to compare two surfaces at the same time, such as **Code** beside **Chat**, **Preview** beside **Terminal**, or **Agent Debug** under a running workflow.

## See also

- [Panels](./01_panels.md)
- [Themes](../Settings/08_themes.md)
