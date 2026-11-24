---
sidebar_position: 1
title: Custom Interfaces Overview
description: Embed Chat in a React application, add a desktop panel, or build a standalone client.
---

# Custom Interfaces

Where should your interface appear?

| What you want to do | Where to start |
| --- | --- |
| Inside your React app | [Embed Chat](./04_chat-widget.md) with `@codebolt/chat-widget`. Send a message and read the agent’s reply inside your app. |
| Inside Codebolt Desktop | [Build a plugin panel](./07_build-your-first-dynamic-panel.md). Open it and send a value from its controls to the plugin. For a panel opened by an agent during a task, see [Dynamic panels](./05_dynamic-panels.md). |
| In a standalone app | [Build your first custom UI](./06_build-your-first-custom-ui.md) with the [Client SDK](./02_client-sdk.md). Connect to the project server and display project data. |
| In a full product interface | Explore the [existing interfaces](./03_existing-uis.md) and [custom agentic applications](../04b_custom-agentic-applications/01_overview.md). |

## See also

- [Custom Agents](../02_creating-agents/01_overview.md) — the other side of the agent-UI boundary
- [Plugins](../05_plugins/01_overview.md) — for backend runtime extensions that can also open embedded panels
- [Custom Agentic Applications](../04b_custom-agentic-applications/01_overview.md) — for application-level patterns that combine UI and plugin/backend layers
- [Internals → Communication](../07b_subsystems/11_communication.md) — the protocol underneath
