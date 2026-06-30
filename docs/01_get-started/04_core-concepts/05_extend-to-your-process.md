---
sidebar_position: 5
title: Extend To Your Process
description: "When to use custom plugins, custom clients, and custom agentic applications on top of Codebolt."
---

# Extend To Your Process

Customization changes how Codebolt behaves. Extension changes where Codebolt fits in your organization.

Use this layer when the work should appear inside your existing process, not only inside the default Codebolt interface.

## Custom plugins

Plugins are the right fit when you want to extend the Codebolt product itself. A plugin can package UI, integrations, commands, workflows, or debugging tools for repeated use.

Use plugins for:

- team-specific panels
- custom dashboards
- integrations with internal services
- packaged agent workflows
- marketplace-distributed extensions
- custom debugging or observability surfaces

Plugins are especially useful when users should stay in Codebolt but need extra product surface area.

## Custom clients

A custom client is the right fit when another interface should drive Codebolt.

Examples:

- a support console that starts an agent from a ticket
- an internal developer portal that launches refactor runs
- a chat platform integration that creates threads
- a lightweight review UI for non-developers
- a workflow system that starts Codebolt jobs from events

The client owns the user experience. Codebolt owns the agent runtime, tools, state, and execution model.

## Build an app on Codebolt

Some teams need a full agentic application, not just an extension. In that case, Codebolt becomes the runtime layer behind a domain-specific app.

Common shapes include:

| App shape | What Codebolt provides |
|---|---|
| **Inside Codebolt** | Existing UI plus custom agents, plugins, and capabilities. |
| **Separate local app** | A custom UI that talks to local Codebolt services and environments. |
| **Hosted runtime app** | A cloud or server deployment using Codebolt concepts for agents, tools, memory, and providers. |

The right shape depends on who the users are, where data must live, and how much control you need over the UI.

## Extension decision guide

| Need | Choose |
|---|---|
| Add a panel or workflow to Codebolt | Custom plugin |
| Start Codebolt work from another product | Custom client |
| Package a repeated agent behavior | Custom agent or capability |
| Build a domain-specific agent product | Custom agentic application |
| Integrate external systems | MCP server or plugin |

## See also

- [Plugins](../../02_using-codebolt/07z_plugins/01_overview.md)
- [Custom Agentic Applications](../../04_build-on-codebolt/04b_custom-agentic-applications/01_overview.md)
- [External Integrations](../../02_using-codebolt/08e_external-integrations/01_overview.md)
