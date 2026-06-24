---
sidebar_position: 3
title: Agents
description: An agent is a configured loop — take a task, ask an LLM, call tools, observe, repeat until done.
---

import AgentLoop from '@site/src/components/diagrams/AgentLoop';
import CreationLevels from '@site/src/components/diagrams/CreationLevels';

# Agents

An **agent** is a configured loop: take a task, ask an LLM what to do next, call tools, observe results, and repeat until the task is done (or a budget is hit). Everything else — system prompts, allowed tools, memory, budgets — is configuration on top of that loop.

<AgentLoop />

## What an agent is *not*

- **Not a chatbot.** A chat tab is a UI; the agent behind it is what does the work.
- **Not a workflow.** Workflows are deterministic; agents decide the next step turn by turn.
- **Not a model.** The model is one component the agent calls.

## The four creation levels

Agents can be authored at four levels of abstraction — pick the lowest one that fits.

<CreationLevels />

| Level | What you write | When to use |
|---|---|---|
| **0 — Remix** | A YAML file inheriting from an existing agent | Tweaking prompts, restricting tools, branding |
| **1 — Framework** | A YAML manifest + a handler function | Most custom agents |
| **2 — codeboltjs** | TypeScript using the `@codebolt/codeboltjs` SDK | Fine-grained control over the loop |
| **3 — Raw WebSocket** | Speak the wire protocol yourself | Non-JS runtimes, brand-new frameworks |

Most teams stay at level 0 or 1.

## What's inside an agent

- **Manifest** (`agent.yaml`) — name, version, model, allowed tools, budgets, inputs, outputs
- **System prompt** — the agent's instructions and constraints
- **Handler** — the code that runs each turn (level 1+ only)
- **Memory access rules** — what the agent can read/write across memory layers

## The deliberation loop, per turn

1. **Assemble context** — system prompt, conversation, relevant memory, file snippets
2. **Call the LLM** — get back text + optional tool calls
3. **Vet tool calls** — the guardrails plane checks each one
4. **Execute tools** — observe results
5. **Record everything** — append to the event log
6. Repeat until a final answer or an exhausted budget

![Built-in agents](/productImages/agents/builtin_agents.png)

→ **Read the full concept page: [Agents](../../02_concepts/03_the-agent/01_agents.md)**

## See also

- [Tools and MCP](./04_tools-and-mcp.md)
- [Guardrails](../../02_concepts/06_quality/01_guardrails.md)
