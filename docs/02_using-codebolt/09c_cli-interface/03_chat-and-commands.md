---
sidebar_position: 3
title: Chat and Commands
description: The Chat tab is the primary working surface in gotui, combining free-form prompting, structured runtime messages, command-style input, and overlay controls.
---

# Chat and Commands

The `Chat` tab is the primary way you use the CLI interface. It is where prompts are sent, runtime events appear, and most agent-driven work happens.

## Anatomy of the chat tab

![Chat tab with inline runtime messages, input composer, status line, and context hint](/productImages/cliinterface/chatwindow.png)

The chat page is made of:

- the conversation stream
- the input composer
- a model status widget
- a bottom status bar
- a toggleable context drawer

The context drawer groups these information panels:

- `Subagents`
- `Todo`
- `MCP`
- `Modified Files`
- `Next Scheduled Tasks`
- `Context`

Open and close that drawer with `Ctrl+S`. It is part of the terminal UI itself, not a separate shell command.

## What appears in the message stream

The stream can render far more than plain user and assistant text. It includes structured templates for:

- tool execution
- file operations
- file reads and searches
- command execution
- review and merge request output
- event log queries
- action plan and requirement plan widgets
- guardrail violations
- orchestrator and subagent status
- memory and knowledge graph entries

This is one of the key differences between `gotui` and a basic terminal chatbot. The stream is a structured runtime view.

## Sending input

Default input behavior:

- `Enter`: send the current message
- `Ctrl+J`: insert a newline
- `Ctrl+Enter`: add the next step
- `Tab`: switch focus between input and scroll-oriented interaction

The interface keeps chat input and navigation separate so you can read long output without accidentally editing text.

## Command-style input

The README and startup logs expose a small set of direct command-style patterns in the input:

| Command | Purpose |
|---|---|
| `read` | Read file content |
| `write` | Create or update a file |
| `ask` | Ask the AI a question |
| `test` | Send a test message |
| `help` | Show help |
| `clear` | Clear the current chat input or interaction context |

Examples:

```text
read package.json
write notes.txt "Draft release notes"
ask explain the current git state
```

These are command-shaped interactions inside the chat experience, not a separate binary command tree.

## Palette commands and overlays

![Slash command palette with the built-in model, agent, theme, settings, and help actions](/productImages/cliinterface/slashcommands.png)

The interface also has a slash-command palette with built-in actions:

- `/models`
- `/agents`
- `/theme`
- `/settings`
- `/help`

These do not behave like shell commands. They open or drive overlays such as:

- model picker
- agent picker
- theme picker
- settings dialog
- keybindings dialog

## Model and agent switching

From the chat surface, you can switch:

- the active model
- the active agent

Those changes are applied to the active conversation. They can also optionally be written back as defaults through the settings flow.

When a model or agent changes, the interface posts a system message confirming the change. This makes the thread self-describing instead of leaving state changes invisible.

## Confirmation flows

Some operations are deliberately interactive. The chat surface supports confirmation dialogs for operations such as read or write approval. That means the terminal UI can pause and ask for a choice instead of blindly executing.

This is important for:

- safer file access
- guardrail-compatible workflows
- interactive review of sensitive actions

## Steps and todos

The chat subsystem also exposes thread-level overlays for:

- thread steps
- thread todos

These are tied to the active thread rather than being static notes. In practice, they turn the conversation into a lightweight task cockpit.

## Streaming behavior

While an agent is producing output, the UI forces re-renders even when the visible content changes only subtly. That is a terminal rendering detail, but it matters from a user perspective because:

- spinners keep moving
- incremental output feels live
- status changes remain visible during long operations

## When to stay in Chat

Use the `Chat` tab for:

- prompting the agent
- observing tool activity
- adjusting the active model or agent
- following multi-step execution
- reviewing structured runtime output

Switch away only when you need a dedicated operational view such as logs, git, or files.

## See also

- [CLI Interface](./01_overview.md)
- [Conversations and Tabs](./02_conversations-and-tabs.md)
- [Logs and Connection](./04_logs-and-connection.md)
