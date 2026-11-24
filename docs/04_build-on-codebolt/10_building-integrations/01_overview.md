---
sidebar_position: 1
title: Building Integrations
description: "Patterns for connecting Codebolt to external services and platforms. Each pattern covers: which mechanism to use, how it's wired, and a minimal working example."
---

# Building Integrations

Patterns for connecting Codebolt to external services and platforms. Each pattern covers: which mechanism to use, how it's wired, and a minimal working example.

This is distinct from [Extending Codebolt](../06_extending-codebolt/01_overview.md) (adding features *inside* the Codebolt app) and from [Plugins](../05_plugins/01_overview.md) (the SDK reference). This section is about *what to build* when you need Codebolt to talk to the outside world.

## Integration patterns

| Pattern | Mechanism | Section |
|---|---|---|
| **Chat platform** (Telegram, Discord, Slack) | Channel plugin via plugin gateway | [Chat Integrations](./02_chat-integrations/01_overview.md) |
| **Project management** (Linear, Jira, GitHub Issues) | Webhooks + plugin | [Project Tool Integration](./04_project-tool-integration.md) |
| **Custom API gateway** | Plugin gateway hook | [API Gateway](./06_api-gateway.md) |

## Picking the right mechanism

```
Does your integration drive agent runs from outside Codebolt?
  → Custom client (clientsdk). You own the interface; the server handles the run.

Does your integration react to agent events or intercept them?
  → Plugin hook. Lightweight, event-driven, stays inside the server's lifecycle.

Does your integration expose Codebolt over a new protocol or platform?
  → Custom client + gateway plugin. The client translates the platform protocol;
    the plugin handles auth and routing inside the server.
```

## See also

- [Custom UIs](../04_custom-uis/01_overview.md) — clientsdk reference
- [Plugins](../05_plugins/01_overview.md) — hook and plugin bus reference
- [Extending Codebolt](../06_extending-codebolt/01_overview.md) — adding features inside the app
