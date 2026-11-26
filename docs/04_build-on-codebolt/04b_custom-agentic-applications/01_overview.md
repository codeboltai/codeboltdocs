---
sidebar_position: 1
title: Overview
description: Custom agentic applications are product-specific applications built on top of the Codebolt server
---

import CustomAgenticApplicationsArchitecture from '@site/src/components/diagrams/CustomAgenticApplicationsArchitecture';

# Custom Agentic Applications

Custom agentic applications are product-specific applications built on top of the Codebolt server. Instead of using the stock desktop or web UI, you create your own interface and workflow shell, while Codebolt still provides the agent runtime underneath.

This section is about applications that combine:

- a custom front-end or workflow shell
- direct server access or a plugin bridge
- Codebolt agents, tools, threads, and memory as the execution backend

That is different from:

- [Custom Interfaces](../04_custom-uis/01_overview.md), which explains the client-side connection model in general
- [Plugins](../05_plugins/01_overview.md), which explains plugin lifecycle and runtime APIs

This section explains how those pieces come together into an actual application.

<CustomAgenticApplicationsArchitecture />

## The Core Idea

A custom agentic application is not just "a UI that can chat". It is an application where the UX, workflow, and business context are yours, while Codebolt remains the execution engine for:

- agent runs
- threads and conversation state
- tools and MCP access
- memory and event history
- jobs, tasks, and background execution

In practice, that means your app is usually one of three shapes:

1. a standalone front-end that talks directly to the server
2. a UI that is packaged and hosted by a plugin
3. a plugin-backed UI where the plugin acts as the backend bridge for the interface

In the plugin-backed shape, there are two valid communication patterns over the panel bridge:

- request/response:
  - UI: `codeboltPlugin.fetch('/path', { method, json })`
  - plugin: `plugin.dynamicPanel.router(panelId).post('/path', handler)`
- async/event messaging:
  - UI: `codeboltPlugin.sendMessage(...)` and `codeboltPlugin.onMessage(...)`
  - plugin: `plugin.dynamicPanel.send(...)` and `plugin.dynamicPanel.onMessage(...)`

Use the request/response model for app-like actions such as forms, saves, and commands. Use the async/event model for streaming, live updates, multi-turn exchanges, and custom protocols.

## Real Examples In The Codebase

This documentation is based on three concrete examples:

- `packages/simpleui` — a standalone React application that calls server APIs and subscribes to sockets directly
- `sample-plugins/simpleui-plugin` — a plugin that wraps and serves the built Simple UI as a plugin UI
- `sample-plugins/feedback-form-plugin` — a minimal example where the plugin is the backend for the UI and the UI talks through the injected `codeboltPlugin` bridge

## Page Guide

- [Application Shapes](./02_application-shapes.md) compares the main ways to structure these apps
- [Standalone Server-Connected Apps](./03_standalone-server-connected-apps.md) explains the `simpleui` pattern
- [Plugin-Backed UIs](./04_plugin-backed-uis.md) explains the plugin bridge pattern used by `feedback-form-plugin` and `simpleui-plugin`
- [Build a MiniApp](./06_build-a-miniapp.md) walks through building a web app that opens in Codebolt and can expose tools to agents

## See Also

- [Custom Interfaces](../04_custom-uis/01_overview.md)
- [Custom UI](../04_custom-uis/06_custom-ui.md)
- [Dynamic Panels](../04_custom-uis/05_dynamic-panels.md)
- [Plugins](../05_plugins/01_overview.md)
