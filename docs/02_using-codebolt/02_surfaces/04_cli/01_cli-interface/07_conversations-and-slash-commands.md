---
sidebar_position: 5
title: "Conversations & Slash Commands"
description: Switch conversations and use the Codebolt terminal command palette to pick an agent or manage a thread.
---

# Conversations & Slash Commands

Use **Conversations** to pick up an existing thread and the **Command Palette** to change models or agents, fork a conversation, or export it.

## Manage conversations

| To | Use |
|---|---|
| Start a conversation | Press `Ctrl+N` or click the plus button on the conversation bar. |
| Switch to an open conversation | Click its name in the top bar. |
| Find a conversation | Press `Ctrl+E` to open **Conversations**. Highlight a thread and press `Enter`. |
| Close the current conversation | Press `Ctrl+W` when more than one conversation is open. |

In [Window Mode](./03_tabs-and-panels.md#conversation-tree), use **Conversations** to pick several threads to display together. In **Orchestrator**, use it to choose the parent thread whose children you want to see.

## Open the Command Palette

Press `Ctrl+P` in Chat to open the palette. You can also type `/` at the start of the composer to see inline suggestions. Type to filter, use the arrow keys to highlight a command, then press `Enter` to select it. Press `Esc` to close the menu.

| Command | What it opens |
|---|---|
| `/models` | Provider and model pickers |
| `/agents` | Agent Palette |
| `/guardrail` | Enabled policy profiles for the current thread |
| `/theme` | Theme picker |
| `/settings` | Application settings for defaults, providers, agents, and appearance |

## Switch models and agents

- **Model.** Select `/models`, choose a provider, then select a model with `Enter`.
- **Agent.** Select `/agents` and press `Enter` on an installed agent to use it in this conversation. Selecting an available agent that requires installation starts the install. Open the palette again after it completes to select the agent.

For a change that should apply to future conversations, open [Application settings](./04_onboarding-and-settings.md#application-settings-dialog) and update the defaults there.

## Fork, resume, export, and compact

Select one of these commands from the menu to run it with its default behavior. To pass an argument, type the full command and argument in the Chat composer, then press `Enter`.

| Command | Behavior |
|---|---|
| `/fork` | Copy the active server thread into a new child thread and switch to it. Use `/fork Compare approaches` to name the new thread. |
| `/resume` | Open **Conversations**. Use `/resume <thread-id>` with a specific server thread ID to open that thread directly. |
| `/export` | Save the current conversation as Markdown in `.codebolt/exports` inside the project. Chat shows the saved path. Codebolt also tries to copy the Markdown to the clipboard. |
| `/compact` | Ask the server to compact the active thread’s context. You can add instructions, such as `/compact Keep the unresolved errors and next steps`. |
