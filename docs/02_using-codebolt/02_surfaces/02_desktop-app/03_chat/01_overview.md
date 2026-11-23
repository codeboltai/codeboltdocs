---
sidebar_position: 1
title:  Overview
description: Start a chat thread, send work to an agent, and inspect the result.
---

# Chat Overview

![Chat Overview](/productImages/chat/overview.gif)

Open **Chat**, choose an agent in the composer, and send a request. The thread displays messages and the activity the agent reports while it works.

## Anatomy of the chat panel

- **Tabs** open separate conversation threads. See [Tabs and History](./02_tabs-and-history.md).
- **Agent picker** selects which agent handles your request.
- **Select AI Model** opens the application default and available role settings. See [Model Selection](./06_model-selection.md).
- **Composer** accepts text, mentions, and dropped files or images.
- **Message stream** shows chat messages and recorded tool activity.

## The context window

Use [Context and @-mentions](./03_context-and-at-mentions.md) to attach the files or other project material the agent should consider. The agent determines what history, memory, and tools it requests. See [AI Requests](./08_ai-requests.md) to inspect recorded model requests.

## Checkpoints

Codebolt attempts to create a project checkpoint before sending a chat message. When a message has a checkpoint, use **Restore checkpoint** to restore the workspace snapshot. See [Checkpoints and Rollback](./04_checkpoints-and-rollback.md).

## Mentions and action popovers

Type `@` for file and context suggestions, or `/` for available actions. See [Context and @-mentions](./03_context-and-at-mentions.md#chat-box-triggers) for the other triggers.

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| Enter | Send message |
| Shift+Enter | Insert a new line |
| Ctrl/Cmd+X | Stop the current agent turn |
