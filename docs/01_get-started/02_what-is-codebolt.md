---
sidebar_position: 1.5
title: What is Codebolt
description: Codebolt is an AI-native coding environment
---

# What is Codebolt

Codebolt is an AI-native coding environment. You can use it the way you'd use a traditional editor — open a project, chat with an AI, let it make changes, review, commit — or you can push much further, running swarms of specialised agents that plan, execute, review, and merge changes across a codebase while you watch.

## The short version

- **For end users** — a desktop app and CLI that let you work with AI agents on real projects. The CLI includes the interactive terminal interface, command mode, and headless modes. Think of it as an editor where "run an agent" is as first-class as "open a file".
- **For developers** — an extensible agent runtime. Every piece is designed to be replaced: custom agents, custom tools, custom providers, custom orchestration, custom memory. The server is open for you to build on.
- **For teams** — a self-hostable server with full audit trails, guardrails, human-in-the-loop review, and a marketplace of agents and tools.

## What makes it different

A lot of "AI coding tools" are an autocomplete plus a chat box. Codebolt is a different shape:

1. **Agents are real processes, not loops.** Each agent runs in its own OS process, supervised by a process manager, with heartbeats and restart policies. Crashes are contained. Long-running work is durable.

2. **Multi-layer memory, not "a context window".** Working memory, episodic memory, persistent memory, KV store, knowledge graph (Kuzu), vector DB, narrative threads — with a context assembler that picks what goes into the prompt. See [Memory](../04_build-on-codebolt/07b_subsystems/04_memory.md).

3. **Shadow git.** Every agent edit is committed to a parallel git repo automatically, so you can roll back any change instantly without touching your real git history. See [Checkpoints](../04_build-on-codebolt/02_architecture/04_data-flow-walkthroughs/checkpoint-and-rollback.md).

4. **Guardrails as a sidecar.** Rule-based and LLM-based checks run before every tool call. See [Guardrails](../04_build-on-codebolt/07b_subsystems/09_guardrails-and-eval.md).

5. **Multi-agent is first-class.** Swarms, agent flows, roles, teams, plan-execute-review, debate, stigmergy — all supported, with a graph runtime and a full event log. See [Multi-Agent Orchestration](../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md).

6. **Everything is replayable.** The event log is the authoritative causal record. You can replay any run, audit any decision, query the history. See [Persistence & Event Log](../04_build-on-codebolt/07b_subsystems/12_persistence-and-eventlog.md).

## What you can do with it

Quick sampling, from easiest to most ambitious:

- **Chat-assisted editing.** Open a project, talk to an agent, let it make changes with checkpoints so you can undo anything.
- **Task delegation.** Hand an agent a concrete task ("add a rate limiter to this endpoint, write tests"), walk away, come back to a reviewable diff.
- **Custom agents.** Build an agent specialised for your codebase — your coding conventions, your internal APIs, your review standards. See [Build Agents](../04_build-on-codebolt/02_creating-agents/01_overview.md).
- **Custom tools.** Write an MCP server that gives agents access to your internal systems. See [MCP Tools](../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md).
- **Multi-agent workflows.** Set up a plan-execute-review flow for high-risk changes, or a map-reduce for embarrassingly parallel work. See [Multi-Agent Orchestration](../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md).
- **Self-hosting for a team.** Run the server yourself, with shared memory, guardrails, and audit trails across your organisation. See [Agent Infrastructure](../04_build-on-codebolt/11_agent-infrastructure/01_overview.md).

## What it is NOT

So you don't build the wrong mental model:

- **Not an autocomplete.** There is inline edit (Ctrl+K), but the core unit is an agent run, not a keystroke completion.
- **Not cloud-locked.** Local models work. Self-hosting works. Your code doesn't have to leave your machine.
- **Not magic.** Agents make mistakes, hit dead ends, and produce bad code just like humans. The design assumption is that you review the output, not that you don't have to.

## Where to next

- **Want to try it now?** → [Get Started](./03_quickstart.md) (~5–10 min per client)
- **Want to understand how it works first?** → [Architecture Overview](../04_build-on-codebolt/02_architecture/02_architecture-overview.md)
- **Already running it, want to do something specific?** → [Guides & Tutorials](../03_guides/01_overview.md)
