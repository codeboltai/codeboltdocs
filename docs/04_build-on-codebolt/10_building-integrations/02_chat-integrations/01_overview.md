---
sidebar_position: 1
title: Overview
description: Connect any chat platform — Discord, Slack, Telegram, or your own — to Codebolt
---

# Chat Integrations

Connect any chat platform — Discord, Slack, Telegram, or your own — to Codebolt. Users send messages on their platform; Codebolt routes them to the right agent; replies flow back to the same chat automatically.

## Architecture

import ChatIntegrationArch from '@site/src/components/diagrams/ChatIntegrationArch';

<ChatIntegrationArch />

The system has four layers:

| Layer | What it is |
|---|---|
| **External Platform** | Discord, Slack, Telegram, or any platform with a bot API or webhook |
| **Channel Plugin** | A Codebolt plugin that speaks the platform's protocol and bridges to the server |
| **Codebolt Server** | Routes messages to agents, manages threads, routes replies back |
| **Agent Process** | Your agent handler — receives the message, runs the loop, calls `sendMessage()` |

The left arrows (↓) are the **request path**: a platform event arrives, the plugin calls `gateway.routeMessage()`, the server spawns or routes to a running agent.

The right arrows (↑) are the **reply path**: the agent calls `sendMessage()`, the Response Router intercepts it, pushes it back through the Gateway Handler, over WebSocket to the plugin, and the plugin delivers it to the platform.

## Two ways to build an integration

### 1. Use an existing plugin (recommended)

Codebolt ships first-party plugins for the major platforms. Install them from the registry, configure credentials, and they work:

- [Discord](./04_discord.md) — full message, thread, and attachment support
- [Slack](./05_slack.md) — Socket Mode, DMs, `@mention` routing, file uploads
- [Telegram](./06_telegram.md) — polling, media messages, group filtering, auto-reconnect

### 2. Write a custom plugin

If your platform isn't covered, implement the plugin yourself. See [Plugin SDK — gateway API](../../../05_reference/03_plugin-sdk/02_api-reference/gateway/index.md) for the full `plugin.gateway.*` surface.

The core interface every channel plugin implements:

```ts
// Incoming: translate platform event → gateway message
plugin.gateway.routeMessage({
  source: 'channel',
  sourceId: plugin.pluginId,
  threadStrategy: 'per-user',  // or per-conversation, per-message, single
  agentId: config.agentId,
  userId: externalUserId,
  externalThreadId: externalChatId,
  text: messageText,
  replyTo: { channelId, externalThreadId: externalChatId, userId: externalUserId },
});

// Outgoing: receive agent reply → send to platform
plugin.gateway.onReply((reply) => {
  if (!reply.externalThreadId) return;
  platformApi.send(reply.externalThreadId, reply.text);
});
```

## Key concepts

- **[Gateway](./02_gateway.md)** — how thread resolution, agent routing, and reply dispatch work
- **[WebSocket protocol](./03_websocket.md)** — the `/plugin` WebSocket that connects plugins to the server

## See also

- [Plugin System](../../05_plugins/01_overview.md) — writing plugins
- [Agent Extensions](../../03_agent-extensions/01_overview.md) — what agents can consume
