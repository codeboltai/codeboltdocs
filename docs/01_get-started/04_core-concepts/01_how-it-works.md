---
sidebar_position: 1
title: How It Works
description: "How Codebolt's runtime exposes platform features to agents while keeping the agentic loop under your control."
---

import UserMessageProcessingSwimlane from '@site/src/components/diagrams/UserMessageProcessingSwimlane';

# How Codebolt Works

Open a project and ask an agent in Chat, “Which command runs the tests in this project?” The thread keeps the conversation together. The selected agent decides how to answer, and the Codebolt runtime gives it access to the project, model providers and tools.

## Follow one request

1. **You send a message.** Codebolt routes it to the selected agent with the thread and project context.
2. **The agent decides what it needs.** To find the test command, it might ask the model to choose a file-reading tool and inspect the project’s README or package scripts.
3. **The runtime handles the tool request.** The active policy profile can allow the request, deny it or ask for approval. The tool result goes back to the agent.
4. **The answer appears in the thread.** You can ask a follow-up question using the same conversation.

<UserMessageProcessingSwimlane />

## What changes when you build your own agent?

Your agent chooses its instructions, how to assemble context, which available tools to offer the model, and when to finish. CodeBoltJS exposes runtime APIs. The Agent SDK provides a loop that you can configure or extend. See the [Custom Agent Quickstart](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md) to write a handler and try it in Chat.

## See also

- [Clients](../../02_using-codebolt/02_surfaces/01_overview.md)
- [Start Simple](./02_start-simple.md)
- [Full architecture concept](../../02_concepts/02_foundation/01_architecture.md)
