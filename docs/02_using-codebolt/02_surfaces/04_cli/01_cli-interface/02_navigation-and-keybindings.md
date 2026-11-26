---
sidebar_position: 2
title: Navigation and Keybindings
description: Open menus, switch tabs, and use the default keyboard shortcuts in the Codebolt terminal interface.
---

# Navigation and Keybindings

Press `Ctrl+O` in Chat to see your current keybindings. The shortcuts below are the defaults.

## Menus and pickers

| To open | Use |
|---|---|
| **Chat**, **Logs**, **Git**, or **Files** | Click the tab icon in the top bar. |
| **Conversations** | Press `Ctrl+E` in Chat. To switch directly to an open conversation, click its name in the top bar. |
| Slash suggestions | Type `/` at the start of the Chat composer. |
| **Command Palette** | Press `Ctrl+P` in Chat. |
| File suggestions | Type `@` at the start of a word in the composer. |
| **Keybindings** | Press `Ctrl+O`. |

## Core navigation

| Key | Action |
|---|---|
| `Ctrl+]` | Next top-level tab |
| `Ctrl+[` | Previous top-level tab |
| `Ctrl+1` | Open Chat tab |
| `Ctrl+2` | Open Logs tab |
| `Ctrl+3` | Open Git tab |
| `Ctrl+4` | Open Files tab |
| `Ctrl+R` | Retry connection |
| `Ctrl+C` or `Ctrl+Q` | Quit |

If your terminal passes modified number keys through, `Shift+1` through `Shift+4` also select the corresponding tabs.

## Chat input and message flow

| Key | Action |
|---|---|
| `Enter` | Send a prompt or steer the agent while a run is active |
| `Ctrl+Enter` | Queue the next step while a run is active |
| `Ctrl+J` | Insert newline |
| `Esc` | Stop the active run after closing any open menus or dialogs |
| `Up` / `Down` | Recall sent prompts when the composer is focused and its menus are closed |

See [Chat, Attachments & Approvals](./06_chat-attachments-and-approvals.md) for the full composer workflow.

## Conversations

| Key | Action |
|---|---|
| `Ctrl+N` | New conversation |
| `Ctrl+W` | Close current conversation |
| `Ctrl+E` | Open or close **Conversations** |
| `Ctrl+P` | Open or close the **Command Palette** |
| `Ctrl+S` | Open or close the **Context** drawer |

See [Conversations & Slash Commands](./07_conversations-and-slash-commands.md) to manage threads and change models or agents.

## Layout controls

| Key | Action |
|---|---|
| `Ctrl+T` | Cycle through **Single Chat**, **Window Mode**, and **Orchestrator** |
| `Ctrl+U` | Toggle auto-tiling in window mode |

See [Layout modes](./03_tabs-and-panels.md#layout-modes) for how each view arranges conversations.

## Files tab navigation

### General

Browse the tree on the left. Opening a file loads its contents in the read-only preview on the right.

### File tree

| Key | Action |
|---|---|
| `Up` / `k` | Move up |
| `Down` / `j` | Move down |
| `Enter`, `Right`, or `l` | Expand or open selected item |
| `Left` or `h` | Collapse selected directory |

### File preview

Use the mouse wheel over the preview to scroll through a file.

## Leader key

Press and release `Ctrl+B`, then press the second key within 1.5 seconds.

### Common leader chords

| Chord | Action |
|---|---|
| `Ctrl+B`, `g` | Open keybindings |
| `Ctrl+B`, `n` | New conversation |
| `Ctrl+B`, `w` | Close conversation |
| `Ctrl+B`, `e` | Open Conversations |
| `Ctrl+B`, `t` | Cycle through layouts |
| `Ctrl+B`, `s` | Toggle the Context drawer |
| `Ctrl+B`, `p` | Command palette |
| `Ctrl+B`, `u` | Toggle auto-tiling |
| `Ctrl+B`, `f` | Files tab |
| `Ctrl+B`, `l` | Logs tab |
| `Ctrl+B`, `d` | Open steps panel |
| `Ctrl+B`, `o` | Open todos panel |
| `Ctrl+B`, `m` | Switch between Text Mode for selecting terminal text and Click Mode for using the mouse in the app |
| `Ctrl+B`, `r` | Retry connection |
| `Ctrl+B`, `q` | Quit |

## Custom keybindings

In **Keybindings**, select an action and press `Enter` to rebind it or `D` to restore its default. Codebolt saves changes in `codebolt/keybindings.json` in your user config directory.

See [Onboarding and Settings](./04_onboarding-and-settings.md) for the settings dialogs.
