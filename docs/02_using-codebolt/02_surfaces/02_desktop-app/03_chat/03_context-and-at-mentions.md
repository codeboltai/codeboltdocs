---
sidebar_position: 3
title: Context and @-mentions
description: Attach project context to a chat message with the desktop composer.
---

# Context and @-mentions

![Context and @-mentions](/productImages/chat/mentions.gif)

Use mentions and attachments to tell the agent which project material to consider. Codebolt sends these selections with the message. The selected agent determines how it uses them when building its prompt or calling tools.

## Chat box triggers

| Input | What it opens |
|---|---|
| `@` | File and context suggestions, including available participants and connectors |
| `%` | Folder suggestions |
| `#` | Agent and other project suggestions |
| `/` | Available actions |
| `$` | MCP suggestions |
| `&` | Flags |

Type the trigger and choose an item from the suggestions. For example, type `@session`, pick the intended file, and ask the agent to review its validation logic. You can also drag files or images into the composer.

## Viewing the assembled context

Which history, memory, and tools are included depends on the agent. Use [AI Requests](./08_ai-requests.md) to inspect recorded model requests, or use the [Context Assembly panel](../03c_panels/04e_memory-features/04_context-assembly.md) to test a context assembly request with selected memory types and rules.

## Budget and compression

Each model has a context window. See [Context Compaction](../../../05b_guardrails-and-settings/02_context-compaction.md) for how supported runs handle long conversations.
