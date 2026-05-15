---
sidebar_position: 5
title: Files and Git
description: The Files and Git tabs give gotui dedicated project inspection views instead of forcing everything through chat output.
---

# Files and Git

The CLI interface includes dedicated `Files` and `Git` tabs so you do not have to overload the chat stream with every inspection task.

## Files tab

![Files tab with a lazily loaded project tree and file preview pane](/productImages/cliinterface/fileviewer.png)

The `Files` tab is a two-pane browser:

- a file tree on the left
- a file preview pane on the right

It is backed by server APIs rather than local shell parsing.

## How the file tree works

The tree page fetches children lazily from the server. When you expand a node:

- folder children are requested from the server
- the tree updates in place
- selecting a file triggers a file content fetch

This keeps the file browser responsive without needing to preload the whole project.

## File preview

When you select a file, the preview pane fetches and renders its contents. If the fetch fails, the preview shows an error instead of silently failing.

The preview pane supports scrolling separately from the tree, which matters on larger files.

## Files tab controls

Supported interactions include:

- `Tab`: switch focus between tree and preview
- `Up` / `Down` or `k` / `j`: move in the focused pane
- `Enter`, `Right`, or `l`: expand folders or open files
- `Left` or `h`: collapse folders
- mouse click: select nodes
- mouse wheel: scroll tree or preview depending on where the cursor is

This makes the Files tab a real inspection tool, not a static project listing.

## Why use Files instead of chat

Use the Files tab when:

- you want to browse structure quickly
- you need to inspect file contents without generating agent chatter
- you are orienting yourself in a new project

Use chat when:

- you want the agent to interpret what it finds
- the inspection needs reasoning or follow-up actions

## Git tab

![Git tab with repository status and recent commit history](/productImages/cliinterface/git.png)

The `Git` tab is a dedicated status view composed of two panels:

- git status
- git commits

It is a narrower view than a full graphical SCM client, but it gives the terminal interface a stable place for repository state.

## What the Git tab is good for

Use it to:

- check whether the workspace is clean
- inspect modified files at a glance
- review recent commit history
- stay aware of project state while chatting with the agent

## What it is not

The Git tab is not currently the place for deep interactive history editing or complex source control workflows. It is an awareness surface, not a complete replacement for every git tool.

## Relationship to Chat

The `Chat` tab can still talk about files and git, but the dedicated tabs reduce cognitive load:

- Chat is for interaction and execution
- Files is for structural browsing
- Git is for repository awareness

That separation is one of the biggest reasons the CLI interface feels like a real TUI rather than a shell wrapper.

## See also

- [CLI Interface](./01_overview.md)
- [Chat and Commands](./03_chat-and-commands.md)
- [Keybindings and Layout](./07_keybindings-and-layout.md)
