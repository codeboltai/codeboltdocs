---
sidebar_position: 2
title: Deployment Modes and Topologies
description: Understand the main ways Codebolt can be deployed as self-hosted agent infrastructure across local systems, servers, sandboxes, and cloud runtimes.
---

# Deployment Modes and Topologies

One of Codebolt's strongest infrastructure advantages is that the same core system can be deployed in multiple ways without changing the overall product idea.

That means customers can start small and evolve their architecture over time instead of replacing the platform whenever requirements change.

## The main deployment modes

| Mode | What it means | Best for |
|---|---|---|
| **Local desktop or terminal** | Codebolt runs on the user's own machine | Personal assistants, developer workflows, secure local context |
| **Headless local server** | Codebolt runs without UI and is controlled by CLI, jobs, or other software | Automation, background services, CI, internal tools |
| **Server behind a custom interface** | Codebolt provides runtime capability while another UI or application owns the experience | Internal portals, custom web apps, embedded AI products |
| **Plugin-backed web interface** | Codebolt Dynamic Panels and plugins provide a web-style operational surface | Team dashboards, operator consoles, workflow UIs |
| **Remote sandbox or container runtime** | Codebolt runs in Docker, a sandbox, or a remote execution environment | Isolated execution, multi-tenant setups, safe experimentation |
| **Cloud-connected runtime** | Codebolt is hosted remotely and accessed through desktop, web, or other clients | Shared enterprise deployments, distributed teams, managed operations |

## Interfaces are optional

The key architectural point is that **the interface is not the system**.

Codebolt can run:

- with a desktop interface
- with a terminal interface
- with no interface at all
- with a custom web UI
- behind another conversational product such as Slack or another chat surface

This makes Codebolt useful in environments where the visible experience is only one small part of the overall solution.

## Common topology patterns

### 1. Personal local runtime

The agent runs on the user's laptop or workstation, with access to local projects, local credentials, and personal context.

This is the right shape for:

- a personal assistant running continuously on a user's own system
- a local "OpenClaw-like" agent experience
- an agent that can inspect files, terminals, browser sessions, or developer tools

### 2. Shared company runtime

A team or company hosts Codebolt centrally and connects users through managed clients, plugins, or remote channels.

This is the right shape for:

- a shared internal agent platform
- a support or operations assistant used by many employees
- managed governance, shared models, shared plugins, and shared routing rules

### 3. Embedded runtime behind another application

Codebolt runs as the agent backend while another product owns the user relationship.

This is the right shape for:

- custom portals
- workflow tools
- embedded assistants inside SaaS products
- internal apps with a focused user experience

### 4. Isolated execution runtime

Each agent or workload runs in a separate sandbox, container, or remote environment.

This is the right shape for:

- stronger isolation
- running untrusted or variable workloads
- temporary task environments
- customer-specific execution boundaries

## Why the sandbox and remote-provider model matters

In the platform codebase, the `e2b` provider shows that Codebolt can delegate runtime execution to a remote sandbox provider instead of assuming all work happens in the local process.

That matters for customers who want:

- stronger isolation between workloads
- disposable environments
- remote execution close to cloud resources
- more control over how agents are provisioned and stopped

This makes Codebolt suitable for infrastructure patterns where the agent control plane and the execution plane are separated.

## How to choose a starting topology

| If your priority is... | Start with... |
|---|---|
| Fastest personal adoption | Local desktop or terminal runtime |
| Low-friction automation | [Headless Mode](../02_surfaces/05_headless.md) |
| Custom product UX | [Custom Agentic Application](../08da_custom-agentic-application/01_overview.md) |
| External channel access | [External Integrations](../08e_external-integrations/01_overview.md) |
| Shared enterprise control | Central server plus managed plugins and policies |
| Safer remote execution | Remote sandboxes, Docker, or hosted runtimes |

## What usually changes as teams mature

Teams often progress through a sequence like this:

1. Start with one user running Codebolt locally.
2. Move to headless or server-based operation for repeatable workflows.
3. Add external channels, custom capabilities, or business-system plugins.
4. Split the architecture into control plane, execution plane, and interface surfaces.
5. Add orchestration, governance, and multi-agent coordination.

Because Codebolt can operate across local, sandbox, Docker, and cloud setups, this migration path is much smoother than in tools that assume a single fixed deployment model.

## See also

- [Headless Mode](../02_surfaces/05_headless.md)
- [Environments](../08a_environments/01_overview.md)
- [Cloud](../02_surfaces/06_cloud/00_get-started.md)
- [Self-Host for a Team](../../03_guides/07_advanced/self-host-for-a-team.md)
