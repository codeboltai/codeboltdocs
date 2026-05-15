---
sidebar_position: 2
title: Built-in Agents
description: The default agents currently available from Codebolt's hosted agent list.
---

# Built-in Agents

Codebolt's built-in agents are the default agents exposed through the hosted agent list:

```text
https://api.codebolt.ai/api/agents/list
```

The available set can change over time. The list below matches the hosted API on **April 27, 2026**.

![Built-in Agents](/productImages/agents/builtin_agents.png)

## Current built-in agents

### `act`

General Codebolt development agent for broad code-generation tasks.

- **Best for:** general development tasks and website creation prompts.
- **Routing:** works on blank codebases.
- **Remix support:** yes.

### `orchestrator`

Multi-phase coordination agent that plans work, creates specifications, breaks them into jobs, and coordinates worker agents.

- **Best for:** larger tasks that benefit from planning and parallel execution.
- **Routing:** works on blank and existing codebases.
- **Remix support:** no.

### `claude-pty`

Code-focused agent exposed as `Claude PTY`.

- **Best for:** terminal-oriented development workflows.
- **Routing:** works on blank codebases.
- **Remix support:** yes.

### `agent-optimizer`

Meta-agent that improves other agents using evaluation results and targeted source changes.

- **Best for:** iterating on agent quality and fixing weak agent behavior.
- **Routing:** works on existing codebases.
- **Remix support:** no.

### `claude-thirdpartywithmcp`

Shown in the UI as `Claude Code`. This agent runs Claude Code with Codebolt tools exposed through MCP.

- **Best for:** coding workflows that need Claude Code plus Codebolt filesystem, terminal, git, browser, and related tools.
- **Routing:** works on blank and existing codebases.
- **Remix support:** yes.

## Notes

- The hosted list is the source of truth for what is currently available.
- Titles shown in the UI can differ from internal IDs. For example, `claude-thirdpartywithmcp` is shown as `Claude Code`.
- Agent metadata such as supported languages, frameworks, actions, and remix support comes from the hosted agent manifest.

## See also

- [What is an agent](./01_what-is-an-agent.md)
- [Running agents](./03_running-agents.md)
- [The Marketplace](./04_the-marketplace.md)
- [Build your first agent](../../03_guides/02_first-steps/build-your-first-agent.md)
