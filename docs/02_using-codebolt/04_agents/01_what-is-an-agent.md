---
sidebar_position: 1
title: What is an Agent
description: From a user's point of view, an agent is the "who" that handles your chat
---

# What is an Agent

From a user's point of view, an agent is the "who" that handles your chat. When you type a message, an agent receives it, reads the code, decides what to do, calls tools, and reports back. Different agents are good at different things.

For agent development, see [Codebolt as an Agent Framework](./01c_codebolt-as-agent-framework.md) and [Build on Codebolt → Custom Agents](../../04_build-on-codebolt/02_creating-agents/01_overview.md). For runtime internals, see [Agent Subsystem](../../04_build-on-codebolt/07b_subsystems/01_agent-subsystem.md).

## Mental model

Think of an agent as a teammate with a specific role. A **generalist** agent is a mid-level engineer who can work on anything. A **reviewer** agent is someone who reads code critically but doesn't write it. A **planner** agent is a tech lead who sketches approaches without implementing them.

The agent has:

- **A system prompt** — its instructions on how to behave.
- **A set of tools** — what it's allowed to do (read files, write files, run shells, call APIs).
- **A default model** — which LLM it uses.

When you send a message, the agent uses all of these to decide what to do.

## Where agents come from

Use the desktop chat agent picker to choose from **Installed**, **Marketplace**, or **Local**. **Local** finds agents defined in the open project's `.codebolt/agents/` directory. See [Installing an Agent](./05_installing-an-agent.md) for details.

## What makes agents different from each other

Three levers:

### 1. System prompt
The instructions that shape everything. A system prompt like "you review code for runtime bugs only, never style" produces a very different agent from "you are a helpful coding assistant".

### 2. Tool allowlist
What the agent can do. A reviewer agent with only read tools can't accidentally break anything. A coder agent with write tools can refactor at scale. The difference is fundamental — not just prompt wording.

### 3. Default model
A flagship model for planning; a mid-tier for execution; a fast one for high-volume tasks. Matching model to agent role affects both quality and cost.

Other knobs (temperature, processors, limits) matter less in practice.

## The built-in agents

Check the in-app agent picker or [Built-in Agents](./02_built-in-agents.md) for Codebolt-provided agents. To list agents visible to the connected server, run `codebolt command agent list`.

## Picking an agent for a task

Read the agent's description and choose one suited to the work. For example, choose a reviewing agent to inspect a diff, or a development agent to implement a change.

## How agents interact with your project

The agent receives the request and the context selections from the composer. Its implementation determines which history or memory it reads and which tools it can call. See [Context and @-mentions](../02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md).

## Parallel agents

Run agents concurrently in separate chat threads or delegate work to child agents. Threads have separate conversation state. Agents running in the same project may work on the same files. See [Parallel Agents](../07a_parallel-agents/01_overview.md).

## Agents that run on their own

Use [Background Agents](../07a_parallel-agents/04_background-agent.md) to launch and track a background run. For scheduled or event-driven work, configure an [automation](../08d_auto-interactivity/01_overview.md) with the appropriate trigger.

## When an agent fails

Open [Agent Debug](./08_agent-debug.md) to inspect its process logs. For a provider error, check the configured provider and model in [LLM Settings](../02_surfaces/02_desktop-app/Settings/02_llm-settings.md).

## See also

- [Codebolt as an Agent Framework](./01c_codebolt-as-agent-framework.md) — the LangChain / Mastra / Vercel-AI-SDK comparison
- [Running agents](./03_running-agents.md)
- [Built-in agents](./02_built-in-agents.md)
- [The marketplace](./04_the-marketplace.md)
- [Agent Debug](./08_agent-debug.md)
- [Custom Agents (for builders)](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
- [Agent Subsystem (internals)](../../04_build-on-codebolt/07b_subsystems/01_agent-subsystem.md)
