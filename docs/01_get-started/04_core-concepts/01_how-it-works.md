---
sidebar_position: 1
title: How It Works
description: "How Codebolt's runtime exposes platform features to agents while keeping the agentic loop under your control."
---

import CodeboltWebAppArchitecture from '@site/src/components/diagrams/CodeboltWebAppArchitecture';
import RuntimeComparison from '@site/src/components/diagrams/RuntimeComparison';
import RuntimeCapabilityControl from '@site/src/components/diagrams/RuntimeCapabilityControl';
import UserMessageProcessingSwimlane from '@site/src/components/diagrams/UserMessageProcessingSwimlane';

# How It Works

Codebolt is a platform runtime for building and running coding agents. The core runtime handles the operational layer: interfaces, sockets, threads, project context, model providers, tools, permissions, memory, guardrails, storage, and execution environments.

Agents and agent scripts sit on top of that runtime. They receive work from Codebolt, use the runtime features through `codeboltjs`, and decide how to run the agentic loop for the task.

<CodeboltWebAppArchitecture />

## Runtime Flow

This swimlane shows how a user message moves from the application surface into the selected agent, then back through Codebolt runtime services when the agent needs context, a model call, or a tool call.

<UserMessageProcessingSwimlane />

## Runtime vs agent loop

Codebolt separates the platform from the agent loop. The runtime owns the shared product behavior, while the selected agent owns the reasoning process for a task.

<RuntimeComparison />

| Layer | Codebolt runtime owns | Agent script owns |
|---|---|---|
| **Entry point** | Web, CLI, plugins, sockets, threads, selected project, selected agent | How the incoming message is interpreted |
| **Context access** | Project path, files, repo map, settings, history, environment state | Which context to request, compress, prioritize, or ignore |
| **Model access** | Provider routing, credentials, request transport, event tracking | Prompting strategy, model call order, stop conditions |
| **Tool access** | Built-in tools, MCP tools, service routing, permissions, execution surface | Which tools to call, when to call them, and how to use results |
| **Run state** | Events, thread updates, memory, checkpoints, guardrails | Loop policy, planning style, retries, delegation, final response |

This is different from agent applications where the agent loop is built directly into the application. In those systems, the app usually defines one fixed loop and the agent operates inside it.

In Codebolt, the application and runtime expose capabilities to agents, but the complete agentic loop can remain under your control. The `codeboltjs` SDK includes reference implementations and helpers for a loop, context assembly, model calls, and tool execution, but an agent does not have to follow that exact implementation. You can write a simple script, use the reference loop, replace parts of it, or build a completely custom loop around the same runtime APIs.

## Runtime capabilities and process control

Many workflows that agent applications usually assemble outside the app are already built into the Codebolt runtime. Environment scaling, verification loops, tool execution, and code merging flows such as GitHub PR creation are runtime features that custom agents can use instead of rebuilding those concerns externally.

<RuntimeCapabilityControl />

Custom agents decide what to run and how to run it. A custom agent can use deterministic process code for steps that should be predictable, such as setup, validation, retries, or merge policy. It can also use an agent-driven loop for steps that need model reasoning, such as planning, code changes, tool selection, and interpreting verification results.

## Web app interfaces

The architecture starts with the surfaces that create or control work:

| Interface | What it is for |
|---|---|
| **Web** | The browser or desktop-hosted web interface for chat, code, settings, agents, and project state. |
| **CLI** | Terminal-first access for starting work, selecting providers, inspecting logs, and integrating Codebolt into scripts. |
| **Plugins** | Extension points that can add UI, commands, integrations, workflows, or provider behavior. |
| **Agents** | Scripts or workers that execute tasks through models, tools, memory, and runtime services. |

The interface captures intent and displays state. Codebolt coordinates the platform run. Agents decide and act within the permissions, tools, providers, and environments configured for that run.

## Codebolt as the runtime

The center of the diagram is Codebolt itself. It is responsible for the platform features every agent can use:

| Responsibility | What it means |
|---|---|
| **Threads and state** | Tracks conversations, active runs, events, checkpoints, and user-visible history. |
| **Agent routing** | Starts the selected agent with the right task, permissions, environment, and project state. |
| **Tool access** | Exposes built-in tools and MCP tools through runtime services and the agent socket. |
| **Provider access** | Connects agent requests to model providers and execution environments. |
| **Guardrails** | Applies policy before actions take effect. |
| **Extension points** | Lets plugins add product behavior without replacing the core runtime. |

## Plugins and agents are bidirectional

The canvas shows plugins and agents connected both ways with Codebolt.

Plugins can send work into Codebolt and receive state back for custom panels, commands, or integrations. Agents receive tasks from Codebolt, call back through Codebolt for tools, context, and model access, then return observations, events, and results.

## What this structure unlocks

This structure means custom agents do not need to recreate the operational system around them. Codebolt handles the runtime layer: threads, tools, MCP access, context, memory, environments, verification, guardrails, review flows, and merge flows such as GitHub PRs.

The agent script controls the process. It decides what to ask the model, which runtime capability to call, when to use deterministic code, and when to let the model drive the next step. The runtime provides the shared features; the custom agent defines the behavior.

That unlocks a different way to build agents:

| Instead of building this into every agent app | Codebolt provides it through the runtime | Your agent controls |
|---|---|---|
| Tool runners, MCP wiring, and service routing | [Tools and MCP](../../02_using-codebolt/05a_tools-and-mcp/01_overview.md), [MCP servers](../../02_using-codebolt/04b_agent-extensions/06_installing-mcp-servers.md) | Which tools to call and how to interpret results |
| Project context, history, memory, and event state | [Memory](../../02_using-codebolt/07_memory/01_overview.md), [Context Assembly](../../02_using-codebolt/07_memory/03_context-assembly.md) | What context to request, compress, or ignore |
| Verification, guardrails, evals, and approval checks | [Guardrails](../../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md), [Eval and Optimization](../../02_using-codebolt/05e_eval-and-optimization/01_overview.md) | When to continue, retry, stop, or ask for help |
| Local and remote execution environments | [Local Scaling](./06_local-scaling.md), [Cloud Scaling](./07_cloud-scaling.md), [Environment Providers](../../02_using-codebolt/08a_environments/03_environment-providers.md) | Where the work should run for a task |
| Review and merge workflows | [Review and Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md), [Git and Shadow Git](../../02_using-codebolt/08_integrations/03_git-and-shadow-git.md) | What change to propose and what policy to follow |
| Plugin, client, and custom app surfaces | [Extend To Your Process](./05_extend-to-your-process.md), [Building Plugins](../../02_using-codebolt/07z_plugins/04_building-plugins.md), [Custom Agentic Applications](../../02_using-codebolt/08da_custom-agentic-application/01_overview.md) | How users and external systems interact with the agent |

## See also

- [Clients](../../02_using-codebolt/02_surfaces/01_overview.md)
- [Start Simple](./02_start-simple.md)
- [Full architecture concept](../../02_concepts/02_foundation/01_architecture.md)
