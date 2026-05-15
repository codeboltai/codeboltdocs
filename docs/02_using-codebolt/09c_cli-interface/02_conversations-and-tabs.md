---
sidebar_position: 2
title: Conversations and Tabs
description: The gotui CLI interface supports multiple conversations, per-thread model and agent state, and a conversation tree for branching work.
---

# Conversations and Tabs

The `gotui` interface is not a single prompt box with one rolling log. The `Chat` tab contains a conversation system with multiple threads, per-conversation state, and a conversation tree overlay.

## What a conversation contains

Each conversation in the internal store carries:

- a local conversation ID
- a title
- a message list
- created and updated timestamps
- selected model
- selected agent
- a server thread ID
- an optional parent thread ID

That means the CLI interface can preserve multiple active workstreams instead of flattening everything into one transcript.

## The conversation bar

When you are on the `Chat` tab, the top bar shows a horizontal conversation strip to the right of the main tab label.

It behaves like a compact terminal version of GUI tabs:

- the active conversation is highlighted
- sibling conversations appear as chips
- a new conversation button is available
- overflow can be scrolled left and right

This is why the `Chat` tab can stay focused on one thread without losing the others.

## Creating and switching conversations

Default actions:

- `Ctrl+N`: create a new conversation
- `Ctrl+W`: close the current conversation
- mouse click on a conversation chip: switch to that conversation

A new conversation inherits the current defaults and then becomes its own independent thread.

## Per-conversation state

Conversation state is not just visual. Each conversation can hold its own:

- selected model
- selected agent

This is useful for running one conversation with a coding-focused agent and another with a planning or review-focused agent.

Changing the model or agent updates the active conversation rather than blindly overwriting all threads.

## Message history

Each conversation stores a structured message history, not just plain text. The message stream can contain:

- user messages
- assistant messages
- system notices
- agent lifecycle messages
- tool execution entries
- confirmation prompts
- richer widgets such as plans, tasks, and status blocks

Because history is structured, the interface can render different message types differently and can also sync them to the server.

## Parent and child conversations

The conversation store supports parent-child relationships through `ParentThreadID`. In practice, that means the interface can represent branching work:

- a base conversation for the main task
- child conversations for alternate approaches or follow-up investigations

This is surfaced through the conversation tree overlay rather than being hidden as internal metadata.

## Conversation tree

The conversation tree is opened with `Ctrl+E`. It is the CLI surface for understanding how related conversations connect.

Use it when:

- you want to navigate between related threads
- you have split work into branches
- you need to recover the structure of a longer session

## Persistence and remote sync

The conversation store is connected to the agent server through remote sync. When sync is enabled:

- the active project path is included in remote persistence setup
- the active conversation can be synced to the server
- the current server thread ID is wired back into chat execution

This is how the terminal UI keeps working with real server-backed threads instead of behaving like a disposable local transcript.

## Active thread behavior

When the connection subsystem reports a successful connection, `gotui` tries to bind the active conversation's server thread ID back into the running chat session. That matters because:

- later prompts continue the same thread
- server-originated messages can be attached correctly
- the conversation tree and history stay coherent

## Closing conversations

Closing a conversation removes it from the active session, but the important thing conceptually is that conversations are first-class objects, not just screen buffers. If you are working across multiple tasks, think in terms of threads, not just messages.

## When to start a new conversation

Good reasons:

- switching to a different task
- trying a different agent approach
- exploring an alternative without polluting the main thread
- separating planning from implementation

Bad reason:

- expecting it to behave like a checkpoint or rollback mechanism for files

Conversations organize interaction history. They do not replace project state management.

## See also

- [CLI Interface](./01_overview.md)
- [Chat and Commands](./03_chat-and-commands.md)
- [Onboarding and Settings](./06_onboarding-and-settings.md)
