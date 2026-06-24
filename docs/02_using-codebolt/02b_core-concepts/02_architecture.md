---
sidebar_position: 1
title: Architecture
description: "How Codebolt's web app interfaces connect to the agent runtime, tools, providers, and storage."
---

import CodeboltWebAppArchitecture from '@site/src/components/diagrams/CodeboltWebAppArchitecture';
import UserMessageProcessingSwimlane from '@site/src/components/diagrams/UserMessageProcessingSwimlane';

# Architecture

Codebolt sits between the interfaces people use and the agents that do the work. The core product receives work from web, CLI, and plugins, then routes that work into agents and the runtime services behind them.

<CodeboltWebAppArchitecture />

## User message processing

This swimlane shows how a user message moves from the application surface into the selected agent, then back through Codebolt runtime services when the agent needs context, a model call, or a tool call.

<UserMessageProcessingSwimlane />

## Web app interfaces

The architecture starts with the surfaces that create or control work:

| Interface | What it is for |
|---|---|
| **Web** | The browser or desktop-hosted web interface for chat, code, settings, agents, and project state. |
| **CLI** | Terminal-first access for starting work, selecting providers, inspecting logs, and integrating Codebolt into scripts. |
| **Plugins** | Extension points that can add UI, commands, integrations, workflows, or provider behavior. |
| **Agents** | The workers that execute tasks through models, tools, memory, and runtime services. |

The interface captures intent and displays state. Codebolt coordinates the run. Agents decide and act within the permissions, tools, providers, and environments configured for that run.

## Codebolt as the center

The center of the diagram is Codebolt itself. It is responsible for:

| Responsibility | What it means |
|---|---|
| **Threads and state** | Tracks conversations, active runs, events, checkpoints, and user-visible history. |
| **Agent routing** | Starts the selected agent with the right task, model, permissions, and context. |
| **Tool access** | Exposes built-in tools and MCP tools under the agent's allowlist. |
| **Provider access** | Connects the run to model providers and execution environments. |
| **Guardrails** | Applies policy before actions take effect. |
| **Extension points** | Lets plugins add product behavior without replacing the core runtime. |

## Plugins and agents are bidirectional

The canvas shows plugins and agents connected both ways with Codebolt.

Plugins can send work into Codebolt and receive state back for custom panels, commands, or integrations. Agents receive tasks from Codebolt, call back through Codebolt for tools and context, and return observations, events, and results.

## Request flow

A message usually follows this path:

1. The UI or CLI sends the user message, selected agent, thread, and project state into the runtime over sockets.
2. The runtime attaches the message to the active thread and starts the selected agent for the task.
3. The agent process connects back to the runtime through `codeboltjs` and receives the message as `messageResponse`.
4. The agent uses `codeboltjs` APIs to gather project context before calling the configured model.
5. Model requests and responses pass through the runtime so providers, guardrails, and run state stay centralized.
6. When the model requests a tool, the agent calls the Codebolt tool API through `codeboltjs`.
7. Tool requests travel over the agent socket into `server/src/cliLib`, where runtime services execute the requested operation.
8. Tool results return to the agent, the agent continues or finishes, and the runtime streams events and final state back to the UI or CLI.

## Why this shape matters

This shape keeps interfaces, extensions, and agents separate. You can add a plugin, run from the CLI, switch model providers, or customize an agent without changing the whole product architecture.

## See also

- [Clients](../02_surfaces/01_overview.md)
- [Start Simple](./03_start-simple.md)
- [Full architecture concept](../../02_concepts/02_foundation/01_architecture.md)
