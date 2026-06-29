---
sidebar_position: 1
title: Self Hosted Agent Infrastructure Overview
description: Use Codebolt as self-hosted agent infrastructure across local machines, company environments, sandboxes, cloud runtimes, and external channels.
---

import SelfHostedAgentInfrastructureDiagram from '@site/src/components/diagrams/SelfHostedAgentInfrastructureDiagram';

# Self Hosted Agent Infrastructure

Many teams first meet Codebolt as an editor experience. That is real, but incomplete.

Codebolt is also **agent infrastructure**:

- a runtime for agents
- a server that can sit behind different interfaces
- a way to attach tools, MCP servers, plugins, and custom capabilities
- a platform for long-running and event-driven workflows
- a coordination layer for one agent or many agents working over time

That matters because many customer problems are not "we need an editor that writes code." The real need is closer to:

- "We need an always-on assistant on our own machines."
- "We need an agent gateway behind Slack, Linear, email, or internal tools."
- "We need background monitoring that notices events and acts."
- "We need agents that can coordinate structured work over hours or days."
- "We need to run the same system locally, in Docker, in sandboxes, or in cloud runtimes."

Codebolt supports that broader framing because it can run in multiple shapes:

- as a desktop product
- as a terminal experience
- as a CLI-driven headless runtime
- as a server behind custom interfaces
- as a plugin-hosted web UI through Dynamic Panels
- as a remote runtime in sandboxes or cloud environments

This section is written for buyers, technical leaders, and implementation teams who want to think about **how Codebolt can fit into their own infrastructure**.

<SelfHostedAgentInfrastructureDiagram />

## The core idea

Codebolt is not only a place where users type prompts. It can also be the underlying system that:

- receives work from people, systems, or schedules
- routes work to the right agent or workflow
- gives those agents access to files, tools, browsers, terminals, and MCP servers
- keeps context and state across longer-running work
- exposes results back through chat, dashboards, plugins, or other systems

In other words: **Codebolt can be the infrastructure layer for the agentic world**, not only the interface layer.

## What this section covers

| Page | What it covers |
|---|---|
| [Deployment Modes and Topologies](./02_deployment-modes-and-topologies.md) | How Codebolt can run locally, headlessly, in Docker, in remote sandboxes, and behind custom interfaces |
| [Business and Customer Use Cases](./03_business-and-customer-use-cases.md) | The main ways customers can use Codebolt as an always-on assistant, coworker, monitor, or orchestration layer |
| [Architecture Patterns](./04_architecture-patterns.md) | Repeatable architecture shapes for personal, team, embedded, and multi-agent deployments |
| [Implementation Anchors](./05_implementation-anchors.md) | How the platform packages map to these architectures, including server, SDK, plugin, gateway, and sandbox examples |

## How this connects to the deeper infrastructure docs

This section is the **customer-facing architecture layer**.

It explains how to think about Codebolt as agent infrastructure:

- what business problems it can solve
- what architectural shapes it can take
- how buyers and solution teams should frame the platform

The deeper implementation and operations material lives in [Agent Infrastructure](../../04_build-on-codebolt/11_agent-infrastructure/01_overview.md), including:

- [Running the Server](../../04_build-on-codebolt/11_agent-infrastructure/02_running-the-server.md)
- [Database](../../04_build-on-codebolt/11_agent-infrastructure/03_database.md)
- [Storage Backends](../../04_build-on-codebolt/11_agent-infrastructure/04_storage-backends.md)
- [Scaling and Workers](../../04_build-on-codebolt/11_agent-infrastructure/05_scaling-and-workers.md)
- [Security Hardening](../../04_build-on-codebolt/11_agent-infrastructure/06_security-hardening.md)
- [Remote Execution](../../04_build-on-codebolt/11_agent-infrastructure/09_remote-execution.md)

## Why this framing helps

If customers only think of Codebolt as a coding editor, they will underuse it.

If they understand it as **agent infrastructure with multiple interfaces**, they can reason about:

- where the runtime should live
- which interface should be exposed
- which systems should trigger work
- which plugins or capabilities should be added
- how much autonomy and coordination they want
- what security and control boundaries they need

That leads to much better architecture decisions, especially for companies that want to build internal AI operations instead of isolated chatbot experiments.

## See also

- [Headless Mode](../02_surfaces/05_headless.md)
- [Agents](../04_agents/01_what-is-an-agent.md)
- [Agent Extensions](../04b_agent-extensions/01_overview.md)
- [External Integrations](../08e_external-integrations/01_overview.md)
- [Custom Agentic Application](../08da_custom-agentic-application/01_overview.md)
- [Autonomous Companies](../08db_autonomous-companies/01_overview.md)
- [Cloud](../02_surfaces/06_cloud/00_get-started.md)
- [Agent Infrastructure](../../04_build-on-codebolt/11_agent-infrastructure/01_overview.md)
