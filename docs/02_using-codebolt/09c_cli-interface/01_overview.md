---
sidebar_position: 1
title: CLI Interface
description: The gotui terminal interface is the main command-line surface for Codebolt, combining chat, logs, git, files, and onboarding in one full-screen TUI.
---

# CLI Interface

The current CLI interface is the `gotui` terminal application in `packages/gotui`. It is a full-screen terminal UI, not just a flat command runner. It connects to a Codebolt server over WebSocket and gives you chat, logs, git, and file navigation in one terminal surface.

## Anatomy of the terminal UI

![Codebolt CLI chat tab with conversation chips, message stream, input box, and context drawer](/productImages/cliinterface/chatwindow.png)

Main areas:

- **Top bar**: tab icons for `Chat`, `Logs`, `Git`, and `Files`
- **Conversation chip row**: the active chat thread plus sibling conversations
- **Main content pane**: whichever tab you are on
- **Chat overlays**: command palette, model picker, agent picker, theme picker, settings, keybindings, and conversation tree
- **Bottom surfaces**: input box, per-conversation model and agent status, context drawer, and status bar

## What it is built to do

- Built with Bubble Tea and Lip Gloss
- Starts with a full-screen alternate-screen terminal session
- Connects to a server using `-host` and `-port`, with env overrides from `AGENT_SERVER_HOST`, `AGENT_SERVER_PORT`, and `AGENT_SERVER_PROTOCOL`
- Uses `CURRENT_PROJECT_PATH` when provided to bind the active project
- Writes debug logs to the OS temp directory as `gotui-debug.log`

## Main tabs

The terminal interface is organized into four main tabs:

- `Chat`: the primary conversation surface, with a toggleable context drawer that shows subagents, todos, MCP, modified files, next scheduled tasks, and context
- `Logs`: connection status, TUI logs, and server logs
- `Git`: git status and recent commits
- `Files`: a tree view plus file preview pane

## What a normal session looks like

1. Launch `gotui`.
2. If needed, finish onboarding.
3. Land in the `Chat` tab with a conversation ready.
4. Send a prompt in the input box.
5. Watch agent activity stream into the conversation.
6. Open overlays or switch tabs when you need settings, files, git state, or logs.
7. Create or switch conversations as the work branches.

## Onboarding

When the server has no active user or no configured model or agent, `gotui` starts an onboarding flow. The flow handles:

- login
- theme selection
- provider selection
- model selection
- agent selection

See [Onboarding and Settings](./06_onboarding-and-settings.md).

## Chat interaction model

The chat tab is the main interaction mode. You send prompts directly in the input box and the interface renders:

- user messages
- AI responses
- system messages
- tool execution messages
- confirmation prompts
- structured widgets for plans, tasks, reviews, and other runtime events

The active conversation also carries its own selected model and agent. Those values are stored per conversation, not just globally.

## Two command layers

There are two different command concepts in the CLI interface:

- **Chat commands** typed into the input, such as `read`, `write`, `ask`, `test`, `help`, and `clear`
- **Command palette actions** exposed through the slash-style menu and overlays, such as switching models, switching agents, opening settings, and changing themes

That distinction matters. The input box is for talking to the running system. The palette and overlays are for controlling the interface itself.

## Built-in palette actions

The interface exposes a slash-command style palette rather than a large shell subcommand tree. The default palette includes:

- `/models`
- `/agents`
- `/theme`
- `/settings`
- `/help`

You can open it from chat input with slash-style interaction or by using the command palette shortcut.

See [Chat and Commands](./03_chat-and-commands.md).

## Conversations and persistence

The chat tab is not single-threaded. `gotui` maintains multiple conversations, each with:

- its own title
- its own message history
- its own selected model
- its own selected agent
- its own server thread identifier

The conversation store can also create child conversations, so the conversation tree is a first-class part of the UI rather than a fake label.

See [Conversations and Tabs](./02_conversations-and-tabs.md).

## Key navigation

Default keybindings from `internal/keybindings/keybindings.go` include:

- `Enter`: send message
- `Ctrl+Enter`: add next step
- `Ctrl+J`: insert newline
- `Tab`: switch focus between chat input and scroll state
- `Ctrl+1` to `Ctrl+4`: jump to Chat, Logs, Git, and Files
- `Shift+1` to `Shift+4`: alternate bindings for the same tab jumps
- `Ctrl+]` and `Ctrl+[` : move between tabs
- `Ctrl+P`: open command palette
- `Ctrl+O`: show keybindings
- `Ctrl+E`: toggle conversation tree
- `Ctrl+N`: new conversation
- `Ctrl+W`: close conversation
- `Ctrl+S`: toggle context panel
- `Ctrl+T`: toggle layout mode
- `Ctrl+U`: toggle auto-tiling
- `Ctrl+R`: retry connection
- `Ctrl+C` or `Ctrl+Q`: quit

There is also a leader-key flow on `Ctrl+B` for follow-up shortcuts such as conversation tree, command palette, files tab, logs tab, steps, todos, retry, text selection mode, and quit.

See [Keybindings and Layout](./07_keybindings-and-layout.md).

## Operational notes

- The interface prefers true-color rendering and sets `COLORTERM=truecolor` when missing
- It runs in the alternate screen buffer by default
- Mouse support is enabled
- If startup fails, it retries with a minimal terminal mode
- The package recommends `TERM=xterm-256color` for rendering compatibility

## See also

- [Conversations and Tabs](./02_conversations-and-tabs.md)
- [Chat and Commands](./03_chat-and-commands.md)
- [Logs and Connection](./04_logs-and-connection.md)
- [Files and Git](./05_files-and-git.md)
- [Onboarding and Settings](./06_onboarding-and-settings.md)
- [Keybindings and Layout](./07_keybindings-and-layout.md)
