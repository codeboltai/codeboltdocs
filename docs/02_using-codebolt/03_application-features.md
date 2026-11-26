---
title: Using Codebolt Desktop
description: Explore the Codebolt Desktop workspace, arrange panels, work with code and Chat, and find Terminal, Preview, and Source Control.
---

# Using Codebolt

In Codebolt Desktop, you can edit files, work with agents in Chat, and run commands in the same project workspace. Open the panels you need, arrange them side by side, and save the layout to use again.

## Explore the workspace {#get-oriented}

Open a project to follow along. If you’re new to Codebolt Desktop, the Quickstart walks through setup and your first agent task. [Desktop Quickstart](../01_get-started/03_quickstart.md)

![Docked Codebolt workspace showing the top bar, left panel rail, Code and Chat panels, and bottom bar](/img/desktop/workspace.webp)

| Area | Use it to |
|---|---|
| **Top bar** | Switch between Docked and Focus, choose a layout, search for a panel, or open settings. |
| **Left panel rail** | Open common panels from groups such as **Quick Action** and **Plan**. |
| **Workspace** | Work in panels such as **Code** and **Chat**. In the Code panel, the file sidebar provides **Files**, **Search**, and **Source Control**. |
| **Bottom bar** | Open **Terminal** or **Chat**, check your Git branch, or open **Graph**. |

For more on the workspace controls and opening or switching projects, see [Application Navigation](./02_surfaces/02_desktop-app/02_application-navigation/00_overview.md) and [Workspace and Project Management](./02_surfaces/02_desktop-app/01_workspace-and-project-management/01_overview.md).

## Workspace & Layout {#layout-modes}

For step-by-step instructions, see [Layout Modes and Presets](./02_surfaces/02_desktop-app/02_application-navigation/02_layout.md).

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

### Open and arrange panels

Try a workspace with **Code** beside **Chat** and a **Terminal** below them.

1. In **Docked**, choose **Develop Mode** to start with **Code** beside **Chat**.
2. Open **New Panel Selection** in the top bar. Choose **Free → Bottom**, then select **Terminal** from the results.
3. Drag the dividers to give the editor, Chat, and Terminal the space you need.

Use **Group** in the panel picker for the default placement. Use **Free** to choose **Tab**, **Right**, or **Bottom**. To move an existing panel, drag its tab onto another tab bar or to the edge of a group to create a split. [Browse panels by category](./02_surfaces/02_desktop-app/02_application-navigation/01_panels.md#bottom-bar-menus) · [Panel shortcuts](./02_surfaces/02_desktop-app/02_application-navigation/01_panels.md#panel-shortcuts)

### Create a layout

With your panels arranged in **Docked**, choose **Change Layout → Save Current**. Enter a **Layout Name** and select **Add**. The layout becomes active and appears under **Select Layout**.

### Show or hide a sidebar

Use the **Left sidebar**, **Right sidebar**, or **Bottom sidebar** button in the top bar to hide or reopen that area in **Docked**.

## Code Editor {#find-and-work-with-code}

Open `README.md` or another file in **Files** in the **Code** panel. Use **Go to File** in the top bar when you know part of a filename. Use **Search** in the Code panel’s file sidebar to find text in the project and open a matching line. [Code Editor](./02_surfaces/02_desktop-app/03b_code-and-terminal/02_code-editor.md#opening-files)

## Chat

Open **Chat** from the bottom bar if it’s hidden. Type `@` and select the file you just opened to reference it in a message. For example, ask the agent where a new contributor should start based on that file. [Context and @-mentions](./02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md)

Use tabs to work on separate conversations, or use history to return to an earlier one. [Tabs and History](./02_surfaces/02_desktop-app/03_chat/02_tabs-and-history.md) · [Chat overview](./02_surfaces/02_desktop-app/03_chat/01_overview.md)

## Terminal & Preview {#run-and-preview}

### Open a Terminal

Select **Code**, then click **Terminal** in the bottom bar to open a shell for your project. If **Chat** is active, the bottom bar opens the terminal inside that conversation. [Terminal guide](./02_surfaces/02_desktop-app/03b_code-and-terminal/03_terminal.md)

### Preview a Running App

For a web project, start its development server in **Terminal**. In the bottom bar, open **Debug → Preview** and select the port reported by the server. To enter a different port, select **Custom Port**, enter the number, and press **Enter**.

Use **Tools → Browser** to open the full URL directly. Use **Debug → Problems** to inspect file diagnostics. [Preview & Browser](./02_surfaces/02_desktop-app/03b_code-and-terminal/05_preview-browser.md) · [Problems panel](./02_surfaces/02_desktop-app/03b_code-and-terminal/02_code-editor.md#problems-panel)

## Source Control {#review-changes-and-git-history}

### Review changes {#source-control}

In a Git project, open **Source Control** from the branch icon in the **Code** panel’s file sidebar. Select a file under **Changes** to inspect its diff. To include the edit in your next commit, hover over the file and click **+** (**Stage Changes**), then check **Staged Changes**.

### Git Graph

Click **Graph** near the branch controls in the bottom bar. Codebolt opens a **Git Graph** tab in the Code panel. Select a commit to see its details and changed files. Select a file to inspect its diff for that commit. [Git guide](./02_surfaces/02_desktop-app/03b_code-and-terminal/04_git-panel.md#commit-history-git-graph)

## Explore more features {#next-steps}

| What you want to do | Where to go |
|---|---|
| Write a spec, sketch a flow, or track tasks. | [Planning](./06_planning/01_overview.md) |
| Find and inspect files and other outputs from an agent run. | [Artifacts](./06b_deposition-features/01_artifact.md) |
| Trace agent activity and follow changes to files. | [Code Observability](./07_multi-agent-usage/05_observability-and-tracing.md) |
| See how Codebolt assembles context and stores memory. | [Memory & Context](./05d_memory/01_overview.md) |
| Change models, providers, appearance, or project settings. | [Settings](./02_surfaces/02_desktop-app/Settings/01_overview.md) · [App & Project Settings](./02_surfaces/02_desktop-app/Settings/02_app-and-project-settings.md) |

For terminal and browser workflows, see the [Platform Overview](./02_surfaces/01_overview.md). Browse the [Features overview](./01_features-overview.md) for the full list.
