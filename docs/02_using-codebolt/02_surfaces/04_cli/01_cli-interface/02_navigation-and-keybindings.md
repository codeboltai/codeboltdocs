---
sidebar_position: 2
title: Navigation and Keybindings
description: The current keybindings come from packages/gotui/internal/keybindings/keybindings.go.
---

# Navigation and Keybindings

The current keybindings come from `packages/gotui/internal/keybindings/keybindings.go`.

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
| `Ctrl+O` | Open keybindings dialog |

## Chat input and message flow

| Key | Action |
|---|---|
| `Enter` | Send message |
| `Ctrl+Enter` | Add next step |
| `Ctrl+J` | Insert newline |
| `Tab` | Toggle focus between chat input and scroll area |
| `Up` / `k` | Scroll up |
| `Down` / `j` | Scroll down |

## Conversations

| Key | Action |
|---|---|
| `Ctrl+N` | New conversation |
| `Ctrl+W` | Close current conversation |
| `Ctrl+E` | Toggle conversation tree |
| `Ctrl+P` | Toggle command palette |
| `Ctrl+S` | Toggle context panel |

## Layout controls

| Key | Action |
|---|---|
| `Ctrl+T` | Toggle chat layout mode |
| `Ctrl+U` | Toggle auto-tiling in window mode |

The chat tab can switch out of its default panel-oriented layout into a window-oriented layout manager. Auto-tiling only matters when the window layout is active.

## Files tab navigation

The Files tab has two focusable areas: the tree on the left and the preview on the right.

### General

| Key | Action |
|---|---|
| `Tab` | Switch focus between tree and preview |

### File tree

| Key | Action |
|---|---|
| `Up` / `k` | Move up |
| `Down` / `j` | Move down |
| `Enter`, `Right`, or `l` | Expand or open selected item |
| `Left` or `h` | Collapse selected directory |

### File preview

| Key | Action |
|---|---|
| `Up` / `k` | Scroll up |
| `Down` / `j` | Scroll down |
| `Home` or `g` | Jump to top |
| `End` or `G` | Jump to bottom |
| `PgUp` | Page up |
| `PgDn` | Page down |

Mouse click and wheel scrolling are also supported in the Files tab.

## Leader key

The CLI interface also has a leader-key system. The default leader key is:

```text
Ctrl+B
```

After pressing `Ctrl+B`, you can trigger a second key to run an action.

### Common leader chords

| Chord | Action |
|---|---|
| `Ctrl+B`, `g` | Open keybindings |
| `Ctrl+B`, `n` | New conversation |
| `Ctrl+B`, `w` | Close conversation |
| `Ctrl+B`, `e` | Conversation tree |
| `Ctrl+B`, `t` | Toggle layout mode |
| `Ctrl+B`, `s` | Context panel |
| `Ctrl+B`, `p` | Command palette |
| `Ctrl+B`, `u` | Toggle auto-tiling |
| `Ctrl+B`, `f` | Files tab |
| `Ctrl+B`, `l` | Logs tab |
| `Ctrl+B`, `d` | Open steps panel |
| `Ctrl+B`, `o` | Open todos panel |
| `Ctrl+B`, `m` | Toggle text mode / click mode |
| `Ctrl+B`, `r` | Retry connection |
| `Ctrl+B`, `q` | Quit |

## Custom keybindings

The CLI interface keybinding dialog allows rebinding keys, and the shared keymap loads persisted overrides from the user's config directory under `codebolt/keybindings.json`.

See [Onboarding and Settings](./04_onboarding-and-settings.md) for the settings dialogs.
