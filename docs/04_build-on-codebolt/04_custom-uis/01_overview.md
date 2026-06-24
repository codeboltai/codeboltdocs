---
sidebar_position: 1
title: Custom Interfaces Overview
description: "Build your own interface on top of Codebolt: a chat panel, a CLI, an IDE extension, a web dashboard, a mobile companion, or a product-specific front-end."
---

# Custom Interfaces

Build your own interface on top of Codebolt: a chat panel, a CLI, an IDE extension, a web dashboard, a mobile companion, or a product-specific front-end.

If you want to *use* an existing UI (desktop app, web app, IDE extensions), see [Get Started](../../01_get-started/01_overview.md). This section is for *building new ones*.

## When to build a custom UI

- The built-in interfaces don't fit your workflow — an ops dashboard, a game interface, a custom CLI shape.
- You're embedding Codebolt in a larger application (your internal portal, a bespoke editor).
- You want agent interaction from a device or context the built-ins don't cover.
- You're building a vertical product on top of Codebolt — a "Codebolt for X" app.

## In This Section

| Page | What it covers |
|---|---|
| [Client SDK](./02_client-sdk.md) | Full typed TypeScript client — 72 HTTP API modules, 34 WebSocket modules |
| [Existing UIs](./03_existing-uis.md) | Reference implementations you can study or fork (desktop, web, TUI) |
| [Chat Widget](./04_chat-widget.md) | Reusable React chat components from `@codebolt/ui` |
| [Dynamic Panels](./05_dynamic-panels.md) | Inject UI surfaces inside the existing Codebolt app |
| [Custom UI](./06_custom-ui.md) | Standalone app that connects to Codebolt via the Client SDK |
| [Build Your First Custom UI](./06_build-your-first-custom-ui.md) | Step-by-step: build a standalone UI |
| [Build Your First Dynamic Panel](./07_build-your-first-dynamic-panel.md) | Step-by-step: build a plugin panel inside the existing app |

## Two shapes of client

| Shape | What it is | When |
|---|---|---|
| **Full-control UI** | Your app speaks directly to the server over WebSocket + routes | You own the whole UX — branding, layout, device |
| **Panel / widget** | A UI surface embedded *inside* Codebolt via [dynamic panels](./05_dynamic-panels.md) | You want to extend the existing app with a new view |

Build a panel if your UI should appear *inside* the Codebolt desktop app. Build a full UI if it runs somewhere else entirely.

If your goal is not just "a UI" but a full product shell that combines a custom front-end with direct server access or a plugin backend, see [Custom Agentic Applications](../04b_custom-agentic-applications/01_overview.md).

## Recommended paths

Pick the lightest starting point that matches your needs:

- **I want a complete custom application**: start with [Client SDK](./02_client-sdk.md).
- **I want a custom chat experience in React**: start with [Chat Widget](./04_chat-widget.md).
- **I want to understand how the existing clients work**: start with [Existing UIs](./03_existing-uis.md).
- **I want UI inside the existing app**: start with [Dynamic Panels](./05_dynamic-panels.md).

## Quickstart

Minimal shape:

1. Start the backend with `codebolt --server`.
2. Connect a client using `@codebolt/client-sdk`.
3. If you need chat UI quickly, use [Chat Widget](./04_chat-widget.md).
4. If you need UI inside the existing app, use [Dynamic Panels](./05_dynamic-panels.md).

## See also

- [Custom Agents](../02_creating-agents/01_overview.md) — the other side of the agent-UI boundary
- [Plugins](../05_plugins/01_overview.md) — for backend runtime extensions that can also open embedded panels
- [Custom Agentic Applications](../04b_custom-agentic-applications/01_overview.md) — for application-level patterns that combine UI and plugin/backend layers
- [Internals → Communication](../09_internals/03_subsystems/11_communication.md) — the protocol underneath
