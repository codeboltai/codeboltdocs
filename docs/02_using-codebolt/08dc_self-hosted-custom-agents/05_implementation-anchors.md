---
sidebar_position: 5
title: Implementation Anchors
description: Connect the infrastructure positioning to real Codebolt packages and examples, including the server runtime, codeboltjs, plugin SDK, remote providers, and channel-style plugins.
---

# Implementation Anchors

This page ties the architecture ideas in this section to concrete pieces of the platform so that solution teams can see that the patterns are backed by real implementation surfaces.

## 1. `packages/server`: the runtime and orchestration layer

The `server` package is the clearest proof point that Codebolt is not just an interface.

It provides the underlying runtime layer that:

- initializes services and state
- exposes routes and sockets
- manages project and environment context
- starts supporting systems such as plugin loading, LLM services, task services, and indexes

This is the package to reference when describing Codebolt as an **agent backend or agent gateway server**.

## 2. `packages/codeboltjs`: the agent execution surface

The `codeboltjs` package exposes the capabilities an agent can use:

- file operations
- browser operations
- terminal execution
- git operations
- chat
- MCP access
- vector and knowledge access

This is the right proof point when explaining that Codebolt agents are not only text responders. They can operate with tools and interact with real systems.

## 3. `packages/pluginSdk`: the extension and interface surface

The `pluginSdk` package shows that Codebolt can be extended in several directions:

- plugin lifecycle hooks
- Dynamic Panel communication
- gateway integration
- execution gateway integration
- HTTP API access
- custom provider and integration surfaces

This matters for customers who want:

- a custom operational UI
- an embedded web interface
- system-specific adapters
- plugins that receive events and push work into Codebolt

## 4. Dynamic Panels: web-style interfaces on top of the runtime

Dynamic Panels are especially important because they show that Codebolt is not locked to a single built-in interface.

They let teams build:

- plugin-backed operator consoles
- workflow dashboards
- custom interaction surfaces
- business-specific panels for setup, review, and control

This is one of the reasons Codebolt can act both as infrastructure and as an application platform.

## 5. External gateway model: channel and system integrations

The plugin-to-chat and gateway documentation in the server package shows that plugins can:

- observe incoming and outgoing chat traffic
- send messages into threads
- act as bridges between Codebolt and external systems

This is the foundation for architectures where Codebolt sits behind Slack, Telegram, email-style systems, or internal workflow tools.

## 6. Remote execution providers: sandboxes and isolated runtimes

The `e2b` provider example shows a remote-provider shape where Codebolt delegates execution into an external sandbox environment.

That is important because it demonstrates:

- remote runtime provisioning
- file and project operations against a separate execution target
- lifecycle hooks for starting and stopping provider-backed environments

This is useful when positioning Codebolt for customers who need stronger execution isolation or cloud-hosted runtime pools.

## 7. Linear agent plugin: event-driven business workflow integration

The `linear-agent-plugin` example is a strong business-facing reference because it shows several infrastructure ideas at once:

- a plugin-backed control surface through a Dynamic Panel
- a WebSocket connection to an external worker
- event-driven session handling
- forwarding work into Codebolt agents
- sending responses and state updates back to the originating system

Architecturally, this is very close to how many enterprise workflow integrations are built.

## How to explain these anchors to customers

If the audience is business-facing, the message can stay simple:

- `server` proves Codebolt can run as backend infrastructure
- `codeboltjs` proves agents can work with real tools and environments
- `pluginSdk` proves interfaces and integrations can be customized
- remote providers prove execution can be separated from control
- plugins such as the Linear integration prove Codebolt can sit inside real operational workflows

## Positioning summary

Taken together, these implementation anchors support a stronger market statement:

**Codebolt is not only an editor that can write code. It is a runtime, orchestration layer, integration layer, and interface platform for agentic systems.**

## See also

- [External Integrations](../08e_external-integrations/01_overview.md)
- [Custom Agentic Application](../08da_custom-agentic-application/01_overview.md)
- [Headless Mode](../02_surfaces/05_headless.md)
- [Cloud](../02_surfaces/06_cloud/00_get-started.md)
