---
sidebar_position: 1.5
title: Codebolt as an Agent Framework
description: Codebolt isn't only an app you chat with — it is also an agent framework. Define agents in code with @codebolt/agent and call them from any application using @codebolt/client-sdk.
---

import FrameworkComparison from '@site/src/components/diagrams/FrameworkComparison';
import AgentPipeline from '@site/src/components/diagrams/AgentPipeline';

# Codebolt as an Agent Framework

Codebolt is most visible as the desktop / CLI / TUI you chat with — but underneath, it is also an **agent framework**. If you have used [LangChain](https://js.langchain.com), [Mastra](https://mastra.ai), the [Vercel AI SDK](https://sdk.vercel.ai), or AutoGen, the mental model is familiar: you define an agent in code with instructions, tools, and processors, then call it from your application.

The difference is that Codebolt agents don't run *inside* your application process. They run inside a **Codebolt server** — local, in a container, or in the cloud — and your application talks to that server through a typed client SDK. You keep the same flexibility a framework gives you, plus everything else Codebolt provides: persistent memory, multi-agent coordination, MCP tools, observability, and the marketplace.

<FrameworkComparison />

## The two packages

| Package | What it is | Where it runs |
|---|---|---|
| **[`@codebolt/agent`](https://www.npmjs.com/package/@codebolt/agent)** | The unified agent framework — `CodeboltAgent`, `Agent`, `createTool`, `Workflow`, processors, compaction | Inside the Codebolt server (your laptop, a container, or a cloud sandbox) |
| **[`@codebolt/client-sdk`](https://www.npmjs.com/package/@codebolt/client-sdk)** | The client you call agents from — REST + WebSocket modules typed end-to-end, can also spawn the server as a child process | Your application (Next.js, Express, a CLI, a worker) |

You can use them together (define agent + drive it from a Next.js app), or independently — every marketplace agent is built on `@codebolt/agent`, and the client SDK works against any Codebolt server regardless of which agents are installed.

## Side-by-side: defining an agent

The shape that LangChain and Mastra teach is essentially the shape Codebolt uses.

**Mastra**

```ts
import { Agent } from '@mastra/core/agent';

export const testAgent = new Agent({
  id: 'test-agent',
  name: 'Test Agent',
  instructions: 'You are a helpful assistant.',
  model: 'openai/gpt-5.4',
});
```

**LangChain**

```ts
import { createAgent, tool } from 'langchain';
import * as z from 'zod';

const getWeather = tool(
  (input) => `It's always sunny in ${input.city}!`,
  {
    name: 'get_weather',
    description: 'Get the weather for a given city',
    schema: z.object({ city: z.string().describe('The city to get the weather for') }),
  }
);

const agent = createAgent({
  model: 'gpt-5.4',
  tools: [getWeather],
});
```

**Codebolt** (`@codebolt/agent/unified`)

```ts
import { createCodeboltAgent, createTool } from '@codebolt/agent/unified';
import { z } from 'zod';

const getWeather = createTool({
  id: 'get_weather',
  description: 'Get the weather for a given city',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ summary: z.string() }),
  execute: async ({ input }) => ({ summary: `It's always sunny in ${input.city}!` }),
});

export const testAgent = createCodeboltAgent({
  systemPrompt: 'You are a helpful assistant.',
  allowedTools: ['get_weather'],
  maxTurns: 10,
});

const result = await testAgent.processMessage('What is the weather in New York?');
if (result.success) {
  console.log(result.finalMessage ?? result.result);
}
```

If you have a Mastra or LangChain agent you want to port, the migration is largely the same primitives — `Agent` → `CodeboltAgent`, `tool(...)` → `createTool(...)`. The model is selected by your provider configuration in the server, so you don't pass it into the agent definition; instructions, tools, and turn limits are what you express in code.

## Two entry points, one runtime

`@codebolt/agent/unified` exposes two entry points into the same pipeline. Pick by how much of the default behaviour you want.

| Entry point | What you get | When to use |
|---|---|---|
| **`createCodeboltAgent({...})`** / **`new CodeboltAgent({...})`** | Codebolt-aware defaults: chat history, environment context, IDE context, system prompt, tool injection, `@file` resolution all wired in | Most agents — you only need to set instructions, tools, and turn limits |
| **`new Agent({...})`** | The raw runtime — you pass every processor in `processors.*` yourself | Custom prompt assembly, headless / non-IDE agents, deliberation flows, anything where the defaults are noise |

`CodeboltAgent` *is* an `Agent` underneath; the only difference is the seven default message modifiers it preinstalls (`ChatHistoryMessageModifier`, `EnvironmentContextModifier`, `DirectoryContextModifier`, `IdeContextModifier`, `CoreSystemPromptModifier`, `ToolInjectionModifier`, `AtFileProcessorModifier`). Override `processors.messageModifiers` and the defaults are dropped.

## The runtime pipeline

Both entry points run the same pipeline per turn. Knowing it makes the processor hook points obvious.

<AgentPipeline />

You inject behaviour by inserting processors into any of the five hook arrays:

```ts
import {
  CodeboltAgent,
  ChatCompressionModifier,
  LoopDetectionModifier,
  ToolValidationModifier,
  ShellProcessorModifier,
} from '@codebolt/agent/unified';

const agent = new CodeboltAgent({
  instructions: 'Help safely with repository maintenance.',
  processors: {
    preInferenceProcessors: [new ChatCompressionModifier()],
    postInferenceProcessors: [new LoopDetectionModifier()],
    preToolCallProcessors: [new ToolValidationModifier()],
    postToolCallProcessors: [new ShellProcessorModifier()],
  },
  maxTurns: 20,
});
```

The runtime also runs a layered **compaction pipeline** (`SnipCompact`, `MicroCompact`, `ContextCollapse`, `AutoCompact`, `ReactiveCompact`, `PostCompactCleanup`) to keep the transcript inside the model's token window across long runs. Reactive compaction can retry recoverable token-limit failures by shrinking the transcript and rerunning the step, so agents don't fail mid-task on overflow.

## Workflows

For multi-step processes that aren't a single agent loop, use `Workflow`:

```ts
import { Workflow } from '@codebolt/agent/unified';

const workflow = new Workflow({
  name: 'Documentation Check',
  steps: [
    {
      id: 'inspect-docs',
      name: 'Inspect Docs',
      type: 'custom',
      execute: async () => ({
        stepId: 'inspect-docs',
        success: true,
        result: 'Docs inspected',
      }),
    },
  ],
});

const result = await workflow.executeAsync();
```

Steps can be agents, tool calls, or arbitrary `custom` functions; results are passed forward through `stepResults`.

## Calling agents from your application

This is where Codebolt diverges from "framework runs in your process." Your Next.js route, your Express server, or your worker doesn't import the agent — it imports the **client SDK** and talks to a Codebolt server, which is the runtime that holds agents, memory, and tools.

The client SDK can either **spawn the server as a child process** on the same machine, or **attach to a remote one** (Docker, E2B, a Daytona workspace, or any cloud Codebolt instance):

```ts
// app/api/chat/route.ts
import { CodeBoltClient } from '@codebolt/client-sdk';

const client = new CodeBoltClient({
  host: 'localhost',
  port: 12345,
  defaultPreset: 'minimal',
});

export async function POST(req: Request) {
  const { message } = await req.json();

  // Subscribe to streaming agent output before kicking off the run
  client.addConnections(['chat']);
  const chunks: string[] = [];
  client.onEvents('chat.message', (data) => chunks.push(data.text));

  // Drive the agent
  const thread = await client.threads.create({ agentId: 'test-agent' });
  await client.sockets.chat.sendMessage({ threadId: thread.id, content: message });

  return new Response(chunks.join(''));
}
```

The same SDK exposes everything else the server runs: tasks, jobs, swarms, vector store, knowledge graph, browser automation, terminal, git — see the [client SDK README](https://www.npmjs.com/package/@codebolt/client-sdk) for the full module list.

### What the server gives your app

When your Next.js app talks to a Codebolt server, it inherits — without writing any of it — the runtime features the desktop and CLI use:

- **Persistent memory** — KV, JSON, vector, knowledge graph, episodic, [event log](../07_memory/07_event-log.md) ([Memory & Context](../07_memory/01_overview.md)).
- **Tools and MCP** — built-in tool families plus any [MCP server](../05a_tools-and-mcp/01_overview.md) you install.
- **Multi-agent coordination** — [jobs, swarms, deliberation, stigmergic primitives](../07c_agent-coordination/01_overview.md).
- **Observability** — [Agent Debug](../05c_agent-observability/02_agent-debug.md), [AI Debug](../05c_agent-observability/03_ai-debug-and-console.md), [event log](../07_memory/07_event-log.md).
- **Environments** — run agent code [locally, in Docker, E2B, Daytona, or remote](../08a_environments/01_overview.md).
- **Marketplace** — install, publish, version any agent built on `@codebolt/agent` ([Marketplace Publishing](../02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md)).

## How this is different from "framework in your process"

| Concern | LangChain / Mastra in your app | Codebolt agent + client SDK |
|---|---|---|
| Where the LLM call originates | Your Next.js process | Codebolt server (local child process or remote) |
| Where memory lives | Wherever you wire it (Redis, Postgres, …) | Built-in memory layers, scoped per agent / project |
| Adding a tool | Edit your app code, redeploy | Edit the agent in the server, optionally publish to marketplace |
| Switching execution environment | App-level concern | Pick an [environment](../08a_environments/01_overview.md); agent code unchanged |
| Sharing the agent across apps | Re-import the package, re-wire memory | One server, many client apps via the SDK |
| Long-running runs / queues | Build it yourself | [Jobs](../07c_agent-coordination/02_jobs.md) and [background agents](./03_running-agents.md) ship with the runtime |
| Observability of a run | Wire OpenTelemetry / LangSmith / etc. | [Agent Debug](../05c_agent-observability/02_agent-debug.md) and [event log](../07_memory/07_event-log.md) work out of the box |
| Token-overflow on long runs | You handle compaction | Built-in layered compaction with reactive recovery |

The cost is one extra hop: your app → Codebolt server → LLM provider, instead of your app → LLM provider. The win is everything in the right column.

## When to use which surface

- **You're building an internal AI feature in a Next.js / SaaS product.** Use `@codebolt/agent` to define the agent and `@codebolt/client-sdk` to call it. Run a Codebolt server alongside your app, or let the SDK spawn one.
- **You're building a developer tool.** Same as above, plus consider publishing the agent to the marketplace so users install it inside their own Codebolt.
- **You don't need custom code, just a configured assistant.** Skip the framework — use the [marketplace](./04_the-marketplace.md) and configure with [agent.yaml](../../04_build-on-codebolt/02_creating-agents/05_agent-anatomy/agent-yaml.md).
- **You're embedding agents into a CLI / job runner / cron.** Use `@codebolt/client-sdk` against a [headless Codebolt server](../02_surfaces/04_tui/03_cli-headless/01_overview.md).

## See also

- [What is an Agent](./01_what-is-an-agent.md) — the user view
- [Build on Codebolt → Custom Agents](../../04_build-on-codebolt/02_creating-agents/01_overview.md) — full builder docs
- [Creating Agents → Quickstart](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md) — first agent in 10 minutes
- [Agent Subsystem (internals)](../../04_build-on-codebolt/07b_subsystems/01_agent-subsystem.md) — how the server runs agents
- [Marketplace Publishing](../02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md) — ship the agent you built
