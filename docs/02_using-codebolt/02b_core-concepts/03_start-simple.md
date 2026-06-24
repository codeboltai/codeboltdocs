---
sidebar_position: 2
title: Start Simple
description: "The smallest useful Codebolt model: one thread, one agent, one model, and a controlled set of tools."
---

import ThreadStepsFlow from '@site/src/components/diagrams/ThreadStepsFlow';

# Start Simple

You can start with Codebolt the same way you would use a normal coding agent: open the app or run the CLI, describe the task, choose an agent, and let it work in your project.

Use the [desktop app](../02_surfaces/02_desktop-app/00_get-started.md) when you want chat, files, panels, settings, and project state in one interface. Use the [CLI](../02_surfaces/03_cli/00_get-started.md) when you want terminal-first agent runs, scripts, logs, or automation.

Under that simple experience, the smallest useful Codebolt setup is a thread, an agent, a model, and a set of tools. Most daily work starts here.

## Threads

Many coding agents are organized around a single chat conversation. Codebolt uses **threads** instead. A thread is the working conversation around one task, and you can run multiple threads in parallel.

Each thread can have its own agent, model, context, tool activity, and history. That means one thread can run a quick fix with a lightweight agent while another thread runs a deeper investigation or background task with a different agent.

The diagram below keeps the main chat thread on the left and explains thread steps, steering, sub-agents, sub-threads, and background threads on the right.

<ThreadStepsFlow />

Inside a thread, each step is one agent loop or run. Step 1 can run with one agent, finish, and then the runtime can start Step 2 in the same thread with another agent. If a new message arrives while an agent is already running, Codebolt can queue it as a pending step and start it after the active step completes.

Steering is how you guide work without starting a separate conversation. A steering message is sent into the same thread and current agent context so the running agent can adjust direction, add a constraint, or handle a correction while the step is still active. Steering is different from a queued next step: it is guidance for the current loop, not a separate future run to replay after the agent finishes.

An agent can also branch work. It can start a sub-agent as a child run under the same parent agent instance, or start a child/background thread when the delegated work needs its own thread, environment, or lifecycle.

Threads matter because they make work durable. You can come back to a task, inspect what happened, continue from the current state, or roll back to an earlier checkpoint.

Related details: [Chat Overview](../03_chat/01_overview.md), [Tabs and History](../03_chat/02_tabs-and-history.md), [Running Parallel Agents](../07a_parallel-agents/02_running-parallel-agents.md), [Sub Agent](../07a_parallel-agents/05_sub-agent.md), [Background Agent](../07a_parallel-agents/04_background-agent.md), and [Thread Panel](../04_agents/08_thread-panel.md).

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
