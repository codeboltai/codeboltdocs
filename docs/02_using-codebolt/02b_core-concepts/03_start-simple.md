---
sidebar_position: 2
title: Start Simple
description: "The smallest useful Codebolt model: one thread, one agent, one model, and a controlled set of tools."
---

# Start Simple

The smallest useful Codebolt setup is a thread, an agent, a model, and a set of tools. Most daily work starts here.

## Threads

A **thread** is the working conversation around a task. It contains the user request, the agent responses, tool results, context references, and the history needed to continue later.

Threads matter because they make work durable. You can come back to a task, inspect what happened, continue from the current state, or roll back to an earlier checkpoint.

## Agents

An **agent** is the worker assigned to a thread. It has instructions, model settings, tool permissions, budgets, and sometimes custom code.

An agent is not the same thing as a model. The model produces reasoning and candidate actions; the agent configuration decides what context is available, what tools can be called, and what constraints apply.

## Models

A **model** is the LLM the agent calls during the run. You can choose different providers and models depending on the job:

| Need | Model choice usually optimizes for |
|---|---|
| Quick edits | Speed and cost |
| Architecture or debugging | Reasoning depth |
| Large codebase work | Context size and retrieval quality |
| Sensitive or local-only work | Provider and environment control |

See [model selection](../03_chat/06_model-selection.md) and [LLM providers](../08_integrations/01_llm-providers.md) for setup details.

## Tools

Tools let the agent act. A thread without tools is only a conversation; a thread with tools can read files, edit code, run commands, inspect a browser, work with git, or call external systems.

Start with the minimum useful tool set. Give the agent more tools when the task needs them, not by default.

## Context

Context is what the model sees on a given turn. It can include:

- the system instructions
- the current thread history
- selected files and mentions
- retrieved memory
- tool results
- project settings and constraints

Good results usually come from a narrow, relevant context window rather than dumping the whole project into every turn.

## The first working loop

For simple use, the loop is straightforward:

1. Start or open a thread.
2. Select an agent and model.
3. Attach the relevant file, folder, or instruction context.
4. Let the agent call tools.
5. Review the result.
6. Continue, accept, or roll back.

## See also

- [Chat](../03_chat/01_overview.md)
- [Running agents](../04_agents/03_running-agents.md)
- [Checkpoints and rollback](../03_chat/04_checkpoints-and-rollback.md)
