---
displayed_sidebar: getStartedSidebar
sidebar_position: 3
title: Agents
description: An agent is a configured loop that takes a task, asks an LLM what to do next, calls tools, observes results, and repeats until the task is done or a configured limit is reached.
---

import AgentLoop from '@site/src/components/diagrams/AgentLoop';
import CreationLevels from '@site/src/components/diagrams/CreationLevels';

# Agents

An **agent** is a configured loop that takes a task, asks an LLM what to do next, calls tools, observes results, and repeats until the task is done (or a budget is hit).

<AgentLoop />

That's it. Everything else — system prompts, allowed tools, memory, budgets — is configuration on top of that loop.

## What an agent is *not*

- Not a chatbot. A chat tab is a UI; the agent behind it is what does the work.
- Not a workflow. Workflows are deterministic; agents decide the next step turn by turn.
- Not a model. The model is one component the agent calls.

## Agent creation paths {#the-four-creation-levels}

Choose a path based on how you want to define the agent’s behavior.

<CreationLevels />

| Level | What you write | When to use |
|---|---|---|
| **0 — Remix** | A Markdown file with frontmatter and instructions for an existing agent | Tweaking prompts, restricting tools, branding |
| **1 — Framework** | A YAML manifest + a handler function from the agent framework | Most custom agents |
| **2 — codeboltjs** | TypeScript using the `@codebolt/codeboltjs` SDK directly | Need fine-grained control over the loop |
| **3 — Raw WebSocket** | Speak the wire protocol yourself | Building a non-JS runtime, or a brand-new framework |
| **4 — Visual flow** | A graph of nodes and connections in a `.agentflow` file | Building a workflow in the [visual agent editor](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-4-flow-visual.md) |

Start with the [framework quickstart](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md) to write your first custom handler. Codebolt also supports adapters for third-party agents.

## What's inside an agent

- **Package manifest** (`codeboltagent.yaml`) — identifies the packaged agent. In a framework agent, pass loop options such as `allowedTools` and `maxTurns` to `createAgent`.
- **System prompt** — the agent's instructions and constraints.
- **Message handler** — receives the incoming task. A framework handler can pass it to `agent.run`, which manages subsequent model and tool turns.
- **Memory access rules** — what the agent can read/write across memory layers.

## The deliberation loop

Each turn:
1. **Assemble context** — pull system prompt, conversation, relevant memory, file snippets (see [Context and memory](../04_runtime/02_context-and-memory.md)).
2. **Call the LLM** — get back text + optional tool calls.
3. **Vet tool calls** — guardrails plane checks each one (see [Guardrails](../06_quality/01_guardrails.md)).
4. **Execute tools** — observe results.
5. **Record workflow events** — if the agent needs an audit trail, it can append an entry to an Event Log instance.
6. Repeat until the LLM produces a final answer or a budget is exhausted.

## See also

- [Agents in Using Codebolt](../../02_using-codebolt/04_agents/01_what-is-an-agent.md)
- [Custom Agents](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
- [Agent patterns](../../04_build-on-codebolt/02_creating-agents/06_patterns/overview.md)
