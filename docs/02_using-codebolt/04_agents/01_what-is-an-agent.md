---
sidebar_position: 1
title: What is an Agent
description: From a user's point of view, an agent is the "who" that handles your chat
---

# What is an Agent

From a user's point of view, an agent is the "who" that handles your chat. When you type a message, an agent receives it, reads the code, decides what to do, calls tools, and reports back. Different agents are good at different things.

For agent development, see [Codebolt as an Agent Framework](./01c_codebolt-as-agent-framework.md) and [Build on Codebolt → Custom Agents](../../04_build-on-codebolt/02_creating-agents/01_overview.md). For runtime internals, see [Agent Subsystem](../../04_build-on-codebolt/09_internals/03_subsystems/01_agent-subsystem.md).

## Mental model

Think of an agent as a teammate with a specific role. A **generalist** agent is a mid-level engineer who can work on anything. A **reviewer** agent is someone who reads code critically but doesn't write it. A **planner** agent is a tech lead who sketches approaches without implementing them.

The agent has:

- **A system prompt** — its instructions on how to behave.
- **A set of tools** — what it's allowed to do (read files, write files, run shells, call APIs).
- **A default model** — which LLM it uses.
- **Limits** — how many tool calls, how many tokens, how long it can run.

When you send a message, the agent uses all of these to decide what to do.

## Where agents come from

Four sources:

| Source | Examples | Notes |
|---|---|---|
| **Built-in** | `generalist`, `planner`, `reviewer` | Ship with Codebolt. Always available. Maintained by the Codebolt team. |
| **Marketplace** | Community-published | Install from the marketplace with one click. See [The Marketplace](./04_the-marketplace.md). |
| **Custom (project-local)** | Anything in your `.codebolt/agents/` | Project-specific. Travels with the codebase if committed. |
| **Custom (user-wide)** | Anything in `~/.codebolt/agents/` | Available in all your projects. |

All four kinds of agent work identically from your point of view — they appear in the agent picker and handle chat the same way.

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

The default set that ships with Codebolt:

| Agent | Role | Read | Write | Best for |
|---|---|---|---|---|
| **generalist** | Does anything | ✓ | ✓ | Your default; when you're not sure which to pick |
| **planner** | Plans without acting | ✓ | ✗ | Breaking down a big task before execution |
| **reviewer** | Reads critically | ✓ | ✗ | Code review, "is this correct?" questions |
| **refactor** | Bulk code changes | ✓ | ✓ | Large mechanical refactors |
| **debugger** | Runs and inspects | ✓ | ✓ | Tracking down a failing test or bug |
| **explainer** | Reads and narrates | ✓ | ✗ | "What does this code do?", onboarding |

The exact lineup may change in newer versions — check `codebolt command agents list` for what's installed on the current server.

## Picking an agent for a task

Rough guide:

- **"Help me understand this code"** → `explainer` or `generalist`
- **"Plan how to add X"** → `planner`
- **"Add X"** (having already planned it) → `generalist` or `refactor`
- **"Review this diff for bugs"** → `reviewer`
- **"Fix this failing test"** → `debugger`
- **"Mechanically rename Y to Z everywhere"** → `refactor`
- **"I'm not sure"** → `generalist`

When in doubt, `generalist` is usually fine. The specialised agents are optimisations — they're better at one thing and worse at others.

## How agents interact with your project

Every agent sees:

- **The codemap** — a compressed architectural summary.
- **The project structure** — file tree, git state.
- **Open files** in your editor.
- **Recent chat turns** in the current thread.
- **Persistent memory** about this project (decisions, conventions, history).
- **Context rules** you've defined.

What it *does* depends on its tool allowlist. A read-only agent can search, read, analyze, and talk. A write-capable agent can additionally edit files, run commands, and call git.

## Parallel agents

Multiple agents can run at the same time in different tabs — or even as children of each other in a flow. Each one runs in its own process, with its own memory, and can't interfere with the others.

This is why you can have a planner tab, a coder tab, and a reviewer tab all active at once on the same project. They share the workspace files but have independent conversation state.

## Agents that run on their own

Not every agent is chat-driven. **Background agents** fire on triggers:

- **Scheduled** — run every Monday morning
- **File change** — run when a specific path changes
- **Webhook** — run when an external system posts

Background agents have a dedicated tab in the UI showing their recent runs. See [Built-in agents](./02_built-in-agents.md) and custom `triggers:` in [agent.yaml](../../04_build-on-codebolt/02_creating-agents/05_agent-anatomy/agent-yaml.md).

## When an agent fails

Agents fail in a few different ways:

- **Stuck in a loop.** Loop detection should catch this; if it doesn't, stop with Esc and tell the agent what it was missing.
- **Hit a budget.** Token, tool-call, or time limit. Raise the limit in agent settings (per-agent) or the agent's yaml.
- **Denied by a guardrail.** The agent tried to do something policy disallows. Check the denial reason — the agent will tell you what was blocked.
- **Provider error.** Rate limit, bad credential, network. Check Settings → Providers → Test.
- **Abnormal exit.** Crashed. Rare; file a bug via [Reporting bugs](../10_troubleshooting/03_reporting-bugs.md).

See [Agent Debug](../05c_agent-observability/02_agent-debug.md).

## See also

- [Codebolt as an Agent Framework](./01c_codebolt-as-agent-framework.md) — the LangChain / Mastra / Vercel-AI-SDK comparison
- [Running agents](./03_running-agents.md)
- [Built-in agents](./02_built-in-agents.md)
- [The marketplace](./04_the-marketplace.md)
- [Agent Debug](../05c_agent-observability/02_agent-debug.md)
- [Custom Agents (for builders)](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
- [Agent Subsystem (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/01_agent-subsystem.md)
