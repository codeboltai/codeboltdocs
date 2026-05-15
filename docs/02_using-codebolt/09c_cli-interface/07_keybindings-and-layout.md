---
sidebar_position: 7
title: Keybindings and Layout
description: gotui is designed around keyboard-first control, tabbed navigation, leader-key actions, overlays, and a full-screen terminal layout.
---

# Keybindings and Layout

The CLI interface is keyboard-first. You can use the mouse, but the design assumes you should be able to navigate the whole interface quickly from the keyboard.

## Top-level layout

The full-screen layout has two layers of navigation:

1. **surface tabs** across the top: `Chat`, `Logs`, `Git`, `Files`
2. **conversation navigation** inside the `Chat` tab

This gives the interface both app-level structure and thread-level structure.

## Main tab switching

![Keybindings dialog showing the current chat, navigation, panel, command, and system shortcuts](/productImages/cliinterface/keybindings.png)

Default bindings:

| Shortcut | Action |
|---|---|
| `Ctrl+1` | Chat tab |
| `Ctrl+2` | Logs tab |
| `Ctrl+3` | Git tab |
| `Ctrl+4` | Files tab |
| `Shift+1` | Chat tab |
| `Shift+2` | Logs tab |
| `Shift+3` | Git tab |
| `Shift+4` | Files tab |
| `Ctrl+]` | Next tab |
| `Ctrl+[` | Previous tab |

This is the primary navigation system for moving between major surfaces.

## Chat input and navigation

| Shortcut | Action |
|---|---|
| `Enter` | Send message |
| `Ctrl+Enter` | Add next step |
| `Ctrl+J` | New line |
| `Tab` | Focus chat or scroll mode |
| `Up` / `k` | Scroll up |
| `Down` / `j` | Scroll down |

This split is important because terminal chat UIs often become frustrating when typing and scrolling fight over the same keys.

## Conversations

| Shortcut | Action |
|---|---|
| `Ctrl+N` | New conversation |
| `Ctrl+W` | Close conversation |
| `Ctrl+E` | Conversation tree |

These are conversation-level controls, not app-level tab controls.

## Overlays and commands

| Shortcut | Action |
|---|---|
| `Ctrl+P` | Command palette |
| `Ctrl+O` | Keybindings dialog |
| `Ctrl+S` | Context panel |

These shortcuts open or toggle UI overlays rather than sending messages into the chat.

## Layout controls

| Shortcut | Action |
|---|---|
| `Ctrl+T` | Toggle layout mode |
| `Ctrl+U` | Toggle auto-tiling |

These are especially relevant in chat window mode, where the terminal UI can shift between different layout behaviors instead of staying fixed forever.

## System controls

| Shortcut | Action |
|---|---|
| `Ctrl+R` | Retry connection |
| `Ctrl+C` | Quit |
| `Ctrl+Q` | Quit |

## Leader key

The interface also supports a leader-key flow on `Ctrl+B`. After pressing it, a second key triggers an action. The default follow-ups include:

- `g`: keybindings
- `n`: new conversation
- `w`: close conversation
- `e`: conversation tree
- `t`: toggle layout mode
- `s`: context panel
- `p`: command palette
- `u`: toggle auto-tiling
- `f`: files tab
- `l`: logs tab
- `d`: steps
- `o`: todos
- `m`: toggle text or click mode
- `r`: retry
- `q`: quit

This gives the CLI interface a terminal-native control style closer to modal tools and multiplexers.

## Mouse support

Keyboard is primary, but mouse support is enabled. It is used for:

- clicking top-level tab icons
- interacting with conversation chips
- selecting file tree entries
- scrolling content in the Files tab

This hybrid model is useful when the terminal is local and interactive, but the interface does not depend on it.

## Terminal rendering model

The layout uses:

- alternate screen mode
- mouse cell motion
- true-color rendering
- responsive width and height handling

If terminal capability detection fails, the application falls back to simpler behavior instead of refusing to run outright.

## Practical advice

If you are learning the CLI interface:

1. memorize `Ctrl+1` to `Ctrl+4`
2. use `Ctrl+P` for palette-driven actions
3. use `Ctrl+O` whenever you forget a binding
4. use `Ctrl+R` immediately when connection state looks wrong

That covers most day-to-day navigation without needing to remember the entire keymap up front.

## See also

- [CLI Interface](./01_overview.md)
- [Chat and Commands](./03_chat-and-commands.md)
- [Files and Git](./05_files-and-git.md)
- [Onboarding and Settings](./06_onboarding-and-settings.md)
