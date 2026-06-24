---
sidebar_position: 1
title: Creating Agents
description: This subsection is about authoring agents. If you want an AI specialised for your codebase, your domain, your coding conventions — this is where you build it.
---

# Creating Agents

This subsection is about *authoring* agents. If you want an AI specialised for your codebase, your domain, your coding conventions — this is where you build it.

For *extending* existing agents without writing a new one, see [Agent Extensions](../03_agent-extensions/01_overview.md).

## What a custom agent is

An agent is a program the server spawns when there's work to do. It:

1. Receives a task (a chat message, a delegation from another agent, a trigger from a flow).
2. Runs a loop: assemble context → call the LLM → execute tool calls → reflect → repeat.
3. Eventually reports done, fails, or gets interrupted.

Every agent runs in its own process, supervised by [`AgentProcessManager`](../07b_subsystems/01_agent-subsystem.md). This isolation means your agent can crash, hang, or leak memory without affecting anything else.

## Agent lifecycle

import AgentLifecycle from '@site/src/components/diagrams/AgentLifecycle';

<AgentLifecycle />

For the full breakdown of each stage, see [Lifecycle](./05_agent-anatomy/lifecycle.md).

## How a run works end-to-end

import AgentSequence from '@site/src/components/diagrams/AgentSequence';

<AgentSequence />

The **Server** is the execution hub. When the agent process connects, the server auto-pushes the user message immediately — the agent never polls for it. Every LLM call is proxied through `llmService` to the **LLM Provider**; every tool call runs on the server via `executeToolService`. After each operation, `sendResponseAndNotify` fires both at once: the result goes to the **Agent** over WebSocket, and a broadcast goes to the **Client** UI — so tool activity and streaming output appear in the chat panel in real time.

## Six creation paths

There are six ways to bring an agent into Codebolt, from lowest to highest authorship cost:

| Path | What you write | Good for |
|---|---|---|
| **[Level 0 — Remix](./03_creation-levels/level-0-remix.md)** | A YAML file overriding an existing agent's prompt, model, or tools | Most use cases. Start here. |
| **[Level 1 — Framework](./03_creation-levels/level-1-framework.md)** | A small TypeScript file using the Codebolt agent framework | Custom behaviour with batteries included |
| **[Level 2 — codeboltjs](./03_creation-levels/level-2-codeboltjs.md)** | Code directly against the `codeboltjs` SDK | Non-standard loop shape |
| **[Level 3 — Raw WebSocket](./03_creation-levels/level-3-raw-websocket.md)** | The wire protocol directly | Languages the SDK doesn't cover |
| **[Flow — Visual Builder](./03_creation-levels/level-flow-visual.md)** | A drag-and-drop node graph in the Agent Flow editor | Prototyping, pipeline agents, non-engineer authoring |
| **[Third-Party Wrapping](./04_third-party-agents.md)** | An adapter around an existing external agent | Running Claude Code / Codex / Cursor etc. as a Codebolt agent |

**The most important thing to know:** level 0 and level 1 cover the vast majority of real use cases. Level 2 is for people building infrastructure on top of Codebolt. Level 3 is for people writing Codebolt agents in Go, Rust, or Python. The visual flow builder is best for pipeline-style agents or rapid prototyping. Don't start higher than you need.

## Hello World agent

The simplest possible agent — listens for a user message and replies:

```bash
codebolt agent create --framework --name hello-world
```

Open `hello-world/src/index.ts` and replace its contents with:

```ts
import codebolt from '@codebolt/codeboltjs';

codebolt.onMessage(async (reqMessage) => {
  codebolt.chat.sendMessage(`Hello World! You said: ${reqMessage.userMessage}`);
});
```

Build and run:

```bash
cd hello-world
npm install
npm run build
```

Send any message from the chat — you'll see the echo in reply.

`codebolt.onMessage()` is the standard entry point for all agents. It registers a handler that fires when the user sends a message. The WebSocket connection is handled automatically — you don't need to call any connection method yourself.

For a real agent with LLM loop, use level 1 with `CodeboltAgent`:

```ts
import codebolt from '@codebolt/codeboltjs';
import { CodeboltAgent } from '@codebolt/agent/unified';

const agent = new CodeboltAgent({
  instructions: 'You are a helpful coding assistant.',
});

codebolt.onMessage(async (reqMessage) => {
  const result = await agent.processMessage(reqMessage);
  return result.finalMessage;
});
```

## The framework (level 1) in one paragraph

At level 1 you write a small TypeScript file that:

- Declares a `codeboltagent.yaml` with metadata (name, description, default model, allowed tools).
- Exports a handler that receives a typed input and returns a typed output.
- Optionally uses `CodeboltAgent` or `Agent` from `@codebolt/agent/unified` (see [Patterns](./06_patterns/overview.md)) to get the full agent loop without writing boilerplate.
- Optionally registers **processors** that modify the prompt assembly, tool calling, or response handling (see [Processors](./07_processors/01_what-are-processors.md)).

The framework handles: the agent loop, context assembly, tool validation, memory writes, event log integration, heartbeats. You handle: what makes your agent different from the default.

Then your agent consumes [Agent Extensions](../03_agent-extensions/01_overview.md) — skills, action blocks, MCP tools — the same way every other agent does.

## Agent patterns

You don't write the agent loop from scratch at level 1. You pick a pattern:

- **[CodeboltAgent](./06_patterns/unified-agent.md)** — the recommended default. Batteries-included with a default message modifier pipeline, compaction, and tool management. Start here.
- **[Processor Pattern](./06_patterns/processor-pattern.md)** — customize the pipeline by plugging processors from `@codebolt/agent/processor-pieces` into CodeboltAgent's five slots.
- **[Agent](./06_patterns/overview.md)** — the bare class with no default modifiers. Use when you need full control over which processors run.
- **Building blocks** — `InitialPromptGenerator`, `AgentStep`, `ResponseExecutor` can be used directly when you need a custom loop shape.

Pick `CodeboltAgent` unless you have a specific reason not to.

## The anatomy of an agent

Every agent has:

- **A `codeboltagent.yaml`** — metadata, manifest, entry points. See [agent.yaml reference](./05_agent-anatomy/agent-yaml.md).
- **A lifecycle** — start, deliberate, execute, reflect, terminate. See [Lifecycle](./05_agent-anatomy/lifecycle.md).
- **A context** — the working state carried across phases. See [Context](./05_agent-anatomy/context.md).

These are the same for every agent regardless of level. The levels differ in *how much code you write to express them*.

## Testing and debugging

Agents are programs; test them like programs.

- **Agent Debug Panel** — real-time logs for all running agents, with full history. See [Testing and debugging](./09_testing-and-debugging.md).
- **Unit tests** — processors and tools are plain objects with a `modify` or `execute` method. Test them directly.
- **Console logging** — everything your agent writes to stdout/stderr is captured and shown in the debug panel.
- **Dynamic agent events** — emit named runtime events that hooks, plugins, and context assembly rules can react to. See [Dynamic Agent Events](./08_dynamic-agent-events.md).

## Publishing

When you're ready, your agent can be:

- **Private to your project** — lives in `.codebolt/agents/`. No publishing needed.
- **Published to the CodeBolt registry** — `codebolt agent publish`. See [Publishing](./10_publishing.md).

## See also

- [Quickstart](./02_quickstart.md) — walk through level 0 and level 1 in ~15 min
- [Agent Extensions](../03_agent-extensions/01_overview.md) — what any agent can consume
- [Dynamic Agent Events](./08_dynamic-agent-events.md) — publish named events from an agent
- [Auto-Optimize Agents](./10_auto-optimize-agents.md) — improve quality systematically
- [Agent Subsystem internals](../07b_subsystems/01_agent-subsystem.md) — what happens under the hood
- [Multi-Agent Orchestration](../08_multi-agent-orchestration/01_overview.md) — multi-agent patterns
