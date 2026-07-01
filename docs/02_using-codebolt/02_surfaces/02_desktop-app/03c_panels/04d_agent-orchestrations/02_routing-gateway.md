---
sidebar_position: 2
title: Routing Gateway
description: Use Routing Gateway to understand how messages, channels, and agent responses are routed across Codebolt.
---

# Routing Gateway

Routing Gateway coordinates message flow between the desktop app, agents, plugins, webhooks, and external channels. It is the orchestration layer that decides which agent receives work and where responses should go.

Open via: **System menu -> Routing Gateway**, the panel-header **+** menu, or the Panel Selector.

## What you can do

- Inspect routing behavior for agent messages and responses.
- Understand how external channels can deliver work into agents.
- Track routing across chat, plugin, webhook, and channel sources.
- Use routing context when debugging why an agent response went to a specific target.

## Routing concepts

| Concept | What it means |
|---|---|
| Source | The origin of the message, such as chat, plugin, webhook, or channel. |
| Target agent | The agent selected to handle the request. |
| Reply target | Where the response should be delivered after the agent completes work. |
| Channel config | The saved configuration that connects external platforms to agent routing. |

## See also

- [Proxy Execution](./01_proxy-execution.md)
- [Environments](./03_environments.md)
- [Background Agents](../04b_agent-management-features/02_background-agents.md)
