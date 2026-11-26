---
title: Using Codebolt Desktop
description: Arrange panels, find and edit files, preview a running app, and review Git changes in Codebolt Desktop.
---

# Using Codebolt 

In Codebolt Desktop, the editor, Chat, Terminal, and other tools open as panels in your project workspace. Arrange the panels for the task at hand, then use the walkthrough below to find a file, run your project, and review a change.

## Explore the workspace {#get-oriented}

Open a project to follow along. Choose a Git repository with at least one commit for the Git examples. [Open a project](../01_get-started/03_quickstart.md#open-a-project)

| Area | Use it to |
|---|---|
| **Top bar** | Switch between Docked and Focus, choose a layout, search for a panel, or open settings. |
| **Left panel rail** | Open common panels from groups such as **Quick Action** and **Plan**. |
| **Workspace** | Work in panels such as **Code** and **Chat**. In the Code panel, the file sidebar provides **Files**, **Search**, and **Source Control**. |
| **Bottom bar** | Open **Terminal** or **Chat**, check your Git branch, or open **Graph**. |

See [Application Navigation](./02_surfaces/02_desktop-app/02_application-navigation/00_overview.md) for the full tour.

## Workspace Modes and Layouts {#layout-modes}

### Switch between Docked and Focus

Use **Docked** to arrange panels in tabs and splits, such as Code beside Chat. Use **Focus** to give one section the workspace. In Focus, use the left panel rail to switch sections.

Click the mode switch in the top bar to toggle between **Docked** and **Focus**. The switch shows the current mode.

### Choose a layout {#change-to-a-saved-layout}

In **Docked**, open **Change Layout** beside the mode switch. **Select Layout** lists the built-in layouts and any layouts you’ve saved. Choose one to apply its panel arrangement.

If you upgraded from an earlier version, **Normal Mode** and **Task Mode** may also appear in the picker.

| Layout | What opens |
|---|---|
| **Develop Mode** | Code beside Chat. This is the default on a fresh install. |
| **Normal Mode** | Code beside Chat. |
| **Task Mode** | Tasks beside Chat. |
| **Agent Mode** | The thread list, a thread detail pane, and Environment. |
| **Chat Mode** | Chat with the side pane closed. |
| **Orchestrator Mode** | Chat with the side pane already open. |
| **Terminal Mode** | Three terminal panels. |
| **Chat Canvas Mode** | Chat Canvas. |
| **Plan Mode** | Roadmap, Project Structure, Feature Plan, Notes, Canvas, and Chat. |
| **Agent Builder Mode** | Customize, Policy Profiles, Proxy Execution, Agent Flow, Code, Evaluation, and Chat. |

### Create a layout

1. In **Docked**, arrange your panels. For example, put **Chat** beside **Code** and **Terminal** below them.
2. Choose **Change Layout → Save Current**, enter a **Layout Name**, then select **Add**. The layout becomes active and appears under **Select Layout**.

### Show or hide a sidebar

Use the **Left sidebar**, **Right sidebar**, or **Bottom sidebar** button in the top bar to hide or reopen that area in **Docked**. [Layout guide](./02_surfaces/02_desktop-app/02_application-navigation/02_layout.md)

## Open and Arrange Panels

In **Docked**, open **New Panel Selection** in the top bar and search for **Tasks**. Choose **Group** for the default placement, or choose **Free** and select **Tab**, **Right**, or **Bottom**. Select **Tasks** to open it. You can also open a panel from the left rail or the **+** in a panel group’s tab bar.

Drag a panel tab to another group’s tab bar to move it there, or to an edge to create a split. Drag the divider to resize the groups. [Panel controls and shortcuts](./02_surfaces/02_desktop-app/02_application-navigation/01_panels.md)

## Find and Work with Code

Open `README.md` or another file in **Files** in the **Code** panel. Use **Go to File** in the top bar when you know part of a filename. Use **Search** in the Code panel’s file sidebar to find text in the project and open a matching line. [Code Editor](./02_surfaces/02_desktop-app/03b_code-and-terminal/02_code-editor.md#opening-files)

In **Chat**, type `@` and choose the same file. Ask the agent what that file tells a new contributor about the project. [Context and @-mentions](./02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md)

## Run and Preview

### Open a Terminal

Select **Code**, then click **Terminal** in the bottom bar. If **Chat** is active, the bottom bar opens the terminal inside that conversation. Run `git status --short` in a Git project to see which files have changed.

To place a terminal below other panels in **Docked**, choose **New Panel Selection → Free → Bottom** and open **Terminal**. [Terminal guide](./02_surfaces/02_desktop-app/03b_code-and-terminal/03_terminal.md)

### Preview a Running App

For a web project, start its development server in **Terminal**. In the bottom bar, open **Debug → Preview** and select the port reported by the server. To enter a different port, select **Custom Port**, enter the number, and press **Enter**.

Use **Tools → Browser** to open the full URL directly. Use **Debug → Problems** to inspect file diagnostics. [Preview & Browser](./02_surfaces/02_desktop-app/03b_code-and-terminal/05_preview-browser.md) · [Problems panel](./02_surfaces/02_desktop-app/03b_code-and-terminal/02_code-editor.md#problems-panel)

## Review Changes and Git History

### Source Control

Open **Source Control** from the branch icon in the **Code** panel’s file sidebar. Select a file under **Changes** to inspect its diff. If the list is empty, save a small edit to the file you opened earlier. To include the edit in your next commit, hover over the file and click **+** (**Stage Changes**), then check **Staged Changes**.

### Git Graph

Click **Graph** near the branch controls in the bottom bar. Codebolt opens a **Git Graph** tab in the Code panel. Select a commit to see its details and changed files. Select a file to inspect its diff for that commit. [Git guide](./02_surfaces/02_desktop-app/03b_code-and-terminal/04_git-panel.md#commit-history-git-graph)

## Next Steps

- **Switch projects.** Select **Back to Projects** in the top bar to open another project or **Reveal in Folder** beside the project name to locate it on disk. [Workspace and Project Management](./02_surfaces/02_desktop-app/01_workspace-and-project-management/01_overview.md)
- **Configure the workspace.** Open **Settings** for models, providers, and appearance or **Project Settings** for the current project’s configuration. [Settings](./02_surfaces/02_desktop-app/Settings/01_overview.md) · [App & Project Settings](./02_surfaces/02_desktop-app/Settings/02_app-and-project-settings.md)
- **Plan your work.** Collect requirements, sketch screens, and track implementation with plans and tasks. [Planning](./06_planning/01_overview.md)
- **Try a first agent task.** Ask about a project, request a small edit, and review the result. [Desktop Quickstart](../01_get-started/03_quickstart.md)

For terminal and browser workflows, see the [Platform Overview](./02_surfaces/01_overview.md). Browse the [Features overview](./01_features-overview.md) for the full list.
