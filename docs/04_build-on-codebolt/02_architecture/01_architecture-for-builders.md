---
sidebar_position: 2
title: Architecture for Builders
description: "If you are building on Codebolt, start with this mental model:"
---

# Architecture for Builders

If you are building on Codebolt, start with this mental model:

- `packages/server` is the central execution and stateful core.
- clients connect to that server
- agents run outside that server
- plugins run outside that server
- the server owns the system of record

That split is the reason Codebolt has multiple SDKs. Each SDK serves a different boundary around the same server.

## The core idea

Codebolt is built around a **central execution server** in [`packages/server`](D:/Codeboltapps/CodeBolt/packages/server).

The server owns:

- files and project access
- memory and retrieval
- tool execution and MCP integration
- event logs and replay
- orchestration, delegation, and run state
- guardrails and evaluation

Everything else connects to or extends that server.

## The builder-facing pieces

| Piece | What it is | Use it when |
|---|---|---|
| **Server** | The central execution runtime in `packages/server` | You are reasoning about how Codebolt works overall |
| **Client SDK** | [`@codebolt/client-sdk`](D:/Codeboltapps/CodeBolt/packages/clientsdk) | You are building a custom UI, CLI, dashboard, widget, or editor client |
| **Agent SDK** | [`@codebolt/codeboltjs`](D:/Codeboltapps/CodeBolt/packages/codeboltjs) | You are building an agent that runs as its own process and connects back to the server |
| **Plugin SDK** | [`@codebolt/plugin-sdk`](D:/Codeboltapps/CodeBolt/packages/pluginSdk) | You are extending the application runtime with providers, gateways, hooks, or embedded panels |
| **Agent extensions** | Capabilities, skills, MCP tools, blocks | You want to extend what agents can do without building a new runtime |

## What runs where

```
custom client / desktop / CLI
          │
          │  WebSocket + HTTP
          ▼
codebolt server  (packages/server)
      │        │
      │        ├── plugin processes
      │        │      ↑
      │        │      plugin-sdk
      │        │
      │        └── agent processes
      │               ↑
      │               codeboltjs / raw protocol
      │
      └── state, tools, memory, orchestration, event log
```

The key boundary is simple:

- the **server** owns execution state
- **clients** present interfaces to users
- **agents** contain agent logic and run separately
- **plugins** extend the runtime around the server

## Why the agent logic lives outside the server

Codebolt no longer needs to embed all agent logic inside the main execution environment.

Instead, an agent can run as its own process and connect to the server. That gives you:

- isolation: one broken agent does not take down the server
- flexibility: agents can be written and versioned independently
- multiple runtimes: native Codebolt agents, wrapped third-party agents, and non-JS agents can all connect to the same system
- cleaner architecture: the server remains the control and execution core, while agent behavior lives at the edge

This is the reason [`@codebolt/codeboltjs`](D:/Codeboltapps/CodeBolt/packages/codeboltjs) matters so much: it is the main SDK for building those external agent runtimes.

## Which SDK should I choose?

- Build a **custom UI**: use [`@codebolt/client-sdk`](D:/Codeboltapps/CodeBolt/packages/clientsdk) and start at [Custom Interfaces](./04_custom-uis/01_overview.md).
- Build a **custom agent**: use [`@codebolt/codeboltjs`](D:/Codeboltapps/CodeBolt/packages/codeboltjs) and start at [Creating Agents](./02_creating-agents/01_overview.md).
- Extend the **application runtime**: use [`@codebolt/plugin-sdk`](D:/Codeboltapps/CodeBolt/packages/pluginSdk) and start at [Plugins](./05_plugins/01_overview.md).
- Extend **agent capabilities without a new runtime**: start at [Agent Extensions](./03_agent-extensions/01_overview.md).

## How this relates to Internals

This page is the builder's mental model.

[Internals](./02_architecture-overview.md) is the deeper system view:

- the five planes
- process ownership and restart policy
- subsystem boundaries
- detailed end-to-end flows

Read this page first. Read Internals when you need to understand how the server implements the model.

## See also

- [Build on Codebolt](./01_overview.md)
- [Architecture Overview](./02_architecture-overview.md)
- [Process Model](./03_process-model.md)
- [Creating Agents](./02_creating-agents/01_overview.md)
- [Custom Interfaces](./04_custom-uis/01_overview.md)
- [Plugins](./05_plugins/01_overview.md)
