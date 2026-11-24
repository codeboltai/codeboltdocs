---
sidebar_position: 1
title: Build with Agents
description: Create your first Codebolt agent, choose an approach, and find guides for tools, plugins, interfaces, integrations, and agent internals.
---

import BuildTopicIndex from '@site/src/components/BuildTopicIndex';
import SystemArchitecture from '@site/src/components/diagrams/SystemArchitecture';

# Build with Agents

**Building your first agent?** Open a project in Codebolt Desktop, open the agent picker in Chat, and select **Create Agent**. The quickstart walks you through creating an agent, sending it a message, and checking its reply. [Create your first agent](./02_creating-agents/02_quickstart.md)

## Choose how to build {#which-one-do-i-need}

| What you want to do | Where to start |
|---|---|
| Adapt an existing agent’s instructions for your project | Choose **Remix Agent**. [Remix walkthrough](./02_creating-agents/03_agent-types/level-3-remix.md) |
| Write a TypeScript handler and let the framework run the model and tools | Choose **Create Custom Agent**. [Unified Agent walkthrough](./02_creating-agents/06_patterns/unified-agent.md) |
| Connect steps on a visual canvas | Choose **Create Flow Agent**. [Build a flow](./02_creating-agents/03_agent-types/level-4-flow-visual.md#creating-a-flow-agent) |
| Use an existing agent from another folder, or launch its process yourself | Choose **Create Remote Agent**. [Remote agent setup](./02_creating-agents/11_remote-agent.md) |
| Implement your own agent loop or protocol client | Start with [CodeBoltJS](./02_creating-agents/03_agent-types/level-1-codeboltjs.md) or the [WebSocket protocol](./02_creating-agents/03_agent-types/level-0-raw-websocket.md). |

## After the first run {#the-level-zero-mindset}

- **Add a tool.** Give the agent an operation it can call, define its inputs, and try it with a prompt that needs that operation. [Tools and MCP](./03_agent-extensions/04_mcp-tools/01_overview.md)
- **Test a change.** Send a known input and inspect the agent’s response and tool calls. For repeated comparisons across versions, use an evaluation task. [Testing and debugging](./02_creating-agents/09_testing-and-debugging.md) · [Evaluation and optimization](./07_eval-and-optimization/01_overview.md)
- **Share the agent.** Package and publish the agent when you are ready for other people to install it. [Publishing an agent](./02_creating-agents/99_publishing.md)

## Browse all topics {#the-extension-surface-at-a-glance}

Open a group to see its guides. **Tools & Extensions** covers skills, capabilities, action blocks, and subagents. **Custom Interfaces** covers standalone apps and desktop panels. Under **Advanced Topics**, learn how to manage agent memory and context or evaluate changes to an agent.

<BuildTopicIndex />

## How the pieces fit together {#the-system-at-a-glance}

The client sends a message to the Codebolt server. The agent handles the request and calls tools through the server. Plugins and providers extend the services available to that workflow. [Architecture for builders](./02_architecture/01_architecture-for-builders.md)

<SystemArchitecture />

### Designing tools for agents {#writing-for-agents-vs-writing-for-humans}

Describe when to call each tool, give its inputs clear names, and return errors that explain how to recover. If a tool changes state, account for a retry after a partial failure. [Custom tools](./03_agent-extensions/04_mcp-tools/01_overview.md)

## Related guides {#see-also}

For a product-specific application, start with [Custom Agentic Applications](./04b_custom-agentic-applications/01_overview.md). For work across agents or environments, see [Multi-Agent Orchestration](./08_multi-agent-orchestration/01_overview.md), [Multi-Environment Orchestration](./08a_multi-environment-orchestration/01_overview.md), and [Agent Infrastructure](./11_agent-infrastructure/01_overview.md).
