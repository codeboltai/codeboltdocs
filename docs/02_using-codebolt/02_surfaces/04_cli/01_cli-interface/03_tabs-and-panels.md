---
sidebar_position: 3
title: Tabs, Panels, and Layout Modes
description: Arrange conversations in the Codebolt terminal interface and use the Chat, Logs, Git, and Files tabs.
---

# Tabs, Panels, and Layout Modes

Use the four tab icons in the top bar to move between **Chat**, **Logs**, **Git**, and **Files**. Press `Ctrl+]` or `Ctrl+[` to switch tabs from the keyboard.

## Chat tab

In **Chat**, click a conversation in the top bar or press `Ctrl+E` to select one from **Conversations**. To open a new conversation, press `Ctrl+N`.

### Context drawer {#right-sidebar-panels}

Press `Ctrl+S` to toggle the **Context** drawer at the bottom of Chat. Its panels currently display sample data. To see the active thread’s steps or todos, press `Ctrl+B` then `d` for **Steps** or `o` for **Todos**. Open **Git** to check which files have changed.

### Conversation tree

In **Single Chat**, select a conversation with `Up` or `Down` and press `Enter`. In **Orchestrator**, choosing a parent thread sets it as the base conversation.

In **Window Mode**, highlight a conversation and press `Space` to toggle its selection, or press `A` to toggle all. Press `Enter` to show the selected conversations or `Esc` to close the picker.

### Layout modes

Press `Ctrl+T` in Chat to cycle through these layouts. The status bar shows the current mode.

| Mode | How it arranges conversations |
|---|---|
| **Single Chat** | Shows one conversation at a time. This is the default on launch. |
| **Window Mode** | Shows multiple conversations in separate windows. Codebolt tiles them automatically when you first enter the mode. Press `Ctrl+U` to turn off auto-tiling and arrange the windows by dragging their title bars. |
| **Orchestrator** | Shows the base conversation on the left and its child conversations on the right so you can follow their progress together. |

![Window Mode with two conversations tiled side by side](/img/terminal-interface/window-mode.png)

## Logs tab

| Panel | What you can see |
|---|---|
| **Connection** | Server host and port, connection state, retries, and the last error. |
| **TUI Logs** | Terminal interface activity. |
| **Server Logs** | Log output from the connected Codebolt server. |

Open **Logs** to diagnose a startup or connection problem. Press `Ctrl+R` to retry the connection.

## Git tab

Open **Git** after an agent changes files to check the working tree. The tab refreshes when you enter it.

| Panel | What you can see |
|---|---|
| **Status** | Current branch and working tree status for the project. |
| **Commits** | Up to five recent commits. |

![Git tab with the working tree status above the recent commits](/img/terminal-interface/git.png)

Git runs on the machine where the terminal interface is running. See [Remote and SSH workflows](./05_remote-and-requirements.md#remote-and-ssh-workflows) when working on a remote checkout.

## Files tab

Select a directory in the tree and press `Enter` or `Right` to expand it. Select a file and press `Enter` to load it from the connected server into the read-only preview. Scroll the preview with the mouse wheel.

![Files tab with README.md selected in the file tree and open in the preview](/img/terminal-interface/files.png)

To send a file reference to an agent, use an [@-mention in Chat](./06_chat-attachments-and-approvals.md#reference-a-file).

## Top bar and status bars

The top bar shows tab icons and, in Chat, open conversations. Look at the bottom status bar for shortcuts for the active view.

## Relationship to the desktop app

For desktop projects and docked panels, see the [Desktop workspace overview](../../02_desktop-app/01_workspace-and-project-management/01_overview.md).

## See also

- [Navigation and Keybindings](./02_navigation-and-keybindings.md)
- [Conversations & Slash Commands](./07_conversations-and-slash-commands.md)
- [Onboarding and Settings](./04_onboarding-and-settings.md)
