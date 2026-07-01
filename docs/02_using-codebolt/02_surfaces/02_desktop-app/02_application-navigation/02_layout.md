---
sidebar_position: 2
title: Layout
description: "Create, save, switch, and manage panel layouts in the Codebolt desktop app."
---

# Layout

Codebolt's desktop workspace is a Dockview layout. Panels can be opened as tabs, split into separate groups, resized, and saved as named layouts.

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

## Default layout

When you open a project, the normal development layout starts with:

- **Code** — the editor surface for project files.
- **Chat** — the agent conversation panel.

Panels are docked, so you can resize them by dragging panel borders and place newly opened panels beside existing ones.

In app mode, when running a published agent app, the default workspace opens **Chat** on the left and **Preview** on the right.

## Create a layout

Create a layout by arranging panels in the workspace:

1. Open the panels you need.
2. Drag panel tabs into the positions you want.
3. Resize panes by dragging the borders between groups.
4. Keep related panels as tabs in the same group, or split them into separate groups when you need to see them side by side.

## Save a layout

Use the layout control in the top navigation to switch between saved layouts or save the current panel arrangement:

![Layout Selection](/productImages/applicationfeatures/layout.png)

To save the current arrangement:

1. Open the layout picker in the top navigation.
2. Click **Save Current**.
3. Enter a layout name.
4. Click **Add**.

Codebolt serializes the Dockview layout and stores it in application state as a named layout. The same control also sets the saved layout as the active layout.

## Switch layouts

To switch layouts, open the layout picker in the top navigation and select a saved layout name. Codebolt reapplies the saved Dockview layout and updates the active layout.

The server persists layout state through the application state endpoints, so saved layouts survive app restarts.

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
