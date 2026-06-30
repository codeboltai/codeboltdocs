---
sidebar_position: 4
title: Architecture Patterns
description: Use these repeatable patterns to design self-hosted Codebolt deployments for personal assistants, channel agents, monitoring systems, and multi-agent operations.
---

import SelfHostedAgentInfrastructureDiagram from '@site/src/components/diagrams/SelfHostedAgentInfrastructureDiagram';

# Architecture Patterns

The goal of this page is not to present one "correct" architecture. It is to give customers a set of practical patterns they can adapt.

The diagram below is a compact reference model for the patterns that follow.

<SelfHostedAgentInfrastructureDiagram />

## Pattern 1: Personal agent on a local machine

**Shape:** one user, one runtime, local context, optional UI.

```text
User
  -> Desktop / TUI / CLI
  -> Local Codebolt runtime
  -> Local tools, files, browser, terminal, MCP
```

Best for:

- personal productivity
- developer assistance
- private local-first workflows

Why customers like it:

- minimal setup
- strong local context access
- no central infrastructure required

## Pattern 2: Headless business worker

**Shape:** no interactive UI, just a long-running runtime receiving tasks and triggers.

```text
Schedule / Webhook / Internal app
  -> Headless Codebolt server
  -> Agents and capabilities
  -> Business systems, files, APIs, MCP
```

Best for:

- scheduled work
- background automations
- CI or internal operations

Why customers like it:

- operationally simple
- easy to run under `systemd`, Docker, or a job runner
- clean separation between runtime and interface

## Pattern 3: Channel-based agent gateway

**Shape:** external channels feed messages into Codebolt, which routes work to agents and sends replies back.

```text
Slack / Telegram / Email / Other channels
  -> Channel plugin
  -> Routing Gateway
  -> Codebolt agent runtime
  -> Reply back to the original channel
```

Best for:

- meeting users where they already work
- shared assistants for teams
- business workflows that begin in chat tools

Why customers like it:

- one runtime can support many channels
- easier rollout than asking everyone to install a new interface

## Pattern 4: Monitoring and reaction loop

**Shape:** external systems emit signals, Codebolt analyzes context, then acts or escalates.

```text
Sentry / Logs / Alerts / Linear / Webhooks
  -> Plugin or hook
  -> Codebolt runtime
  -> Analysis, action, coordination, escalation
```

Best for:

- reliability workflows
- support triage
- operational monitoring

Why customers like it:

- turns passive monitoring into active response
- can attach reasoning and tool use to every alert

## Pattern 5: Embedded web application with agent backend

**Shape:** another product or internal web app owns the interface while Codebolt provides the agent runtime.

```text
Custom web app / portal
  -> Server or plugin SDK integration
  -> Codebolt runtime
  -> Agents, tasks, memory, tools, orchestration
```

Best for:

- internal AI products
- domain-specific assistants
- workflow apps with embedded AI operations

Why customers like it:

- Codebolt handles runtime complexity
- the product team keeps full control of UX

## Pattern 6: Multi-agent coordinator

**Shape:** one supervisory layer manages multiple specialized agents and longer work programs.

```text
User / Trigger / Business event
  -> Coordinator agent or orchestration flow
  -> Specialist agents
  -> Shared tasks, jobs, memory, tools, event streams
```

Best for:

- structured multi-step work
- virtual team models
- longer-running delivery or operations processes

Why customers like it:

- more scalable than one giant general-purpose agent
- easier to reason about responsibilities and escalation paths

## Pattern 7: Split control plane and execution plane

**Shape:** one layer manages agents and routing, another layer executes work in sandboxes or remote runtimes.

```text
Users / Apps / Channels
  -> Control plane
  -> Codebolt routing and orchestration
  -> Remote execution provider / containers / sandboxes
```

Best for:

- stronger isolation
- tenant separation
- ephemeral workloads
- cloud execution near customer systems

Why customers like it:

- better security boundaries
- easier resource management
- cleaner scaling for heavier workloads

## Choosing between the patterns

The best architecture usually depends on four decisions:

1. Where should the runtime live: local, server, sandbox, or cloud?
2. What should be the visible interface: Codebolt UI, another UI, or no UI?
3. What starts the work: human prompts, schedules, events, or all three?
4. How autonomous should the system be: assistant, worker, monitor, or coordinator?

## See also

- [Headless Mode](../02_surfaces/04_tui/03_cli-headless/01_overview.md)
- [Custom Agentic Application](../08da_custom-agentic-application/01_overview.md)
- [Autonomous Companies](../08db_autonomous-companies/01_overview.md)
- [Cloud](../02_surfaces/06_cloud/00_get-started.md)
- [Agent Infrastructure](../../04_build-on-codebolt/11_agent-infrastructure/01_overview.md)
