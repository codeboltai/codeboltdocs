---
sidebar_position: 3
title: WebSocket Protocol
description: Every channel plugin connects to the Codebolt server over a single persistent WebSocket connection on the /plugin endpoint
---

# Plugin WebSocket Protocol

Every channel plugin connects to the Codebolt server over a single persistent WebSocket connection on the `/plugin` endpoint. This connection carries all messages in both directions: gateway routing, replies, proactive messages, and lifecycle events.

## Connecting

```
ws://<server>/plugin?pluginId=<id>&pluginToken=<token>
```

The Plugin SDK handles this automatically. When your plugin starts, the SDK establishes the connection and authenticates using the `pluginId` and `pluginToken` assigned by the server when it spawns the plugin process.

You do not need to open or manage this connection manually — it is part of `@codebolt/plugin-sdk`.

## Message flow overview

```
Plugin process                 Server (pluginSocket.ts)
    │                               │
    │── connect /plugin?id=X ──────▶│ token validation
    │◀── pluginStartMessage ────────│ sends manifest + config
    │                               │
    │── gateway.route ─────────────▶│ routeMessage()
    │◀── gatewayRouteResponse ──────────│ RoutingResult
    │                               │
    │── gateway.registerChannel ───▶│ ChannelStore.create()
    │◀── gateway.registerAck ───────│ channelId
    │                               │
    │         (agent runs…)         │
    │                               │
    │◀── gateway.reply ─────────────│ agent sendMessage() → plugin
    │◀── gateway.messageToChannel ──│ proactive message → plugin
    │                               │
    │── disconnect ─────────────────│ cleanup + unregister
```

## Message types

All messages are JSON objects with a `type` field.

### Plugin → Server

| Type | Payload | Description |
|---|---|---|
| `gateway.route` | `GatewayMessage` | Route an incoming platform message to an agent |
| `gateway.registerChannel` | `ChannelConfig` | Register this plugin as a channel |
| `gateway.unregisterChannel` | `{}` | Mark channel as disconnected |
| `gatewayRouteResponse` | — | Acknowledge a received reply (internal) |

### Server → Plugin

| Type | Payload | Description |
|---|---|---|
| `pluginStartMessage` | manifest + config | Sent immediately after connect |
| `gateway.reply` | `GatewayReply` | Agent reply for the plugin to forward to the platform |
| `gateway.messageToChannel` | `{ targetId, text, metadata }` | Proactive message from an agent |
| `gatewayRouteResponse` | `RoutingResult` | Result of a `gateway.route` call |

## GatewayReply format

The SDK unwraps `gateway.reply` and passes `{ text, externalThreadId? }` to your callback.

## Receiving replies in your plugin

```ts
plugin.gateway.onReply(async ({ text, externalThreadId }) => {
  if (!externalThreadId) return;
  await platformApi.sendMessage(externalThreadId, text);
});
```

## Connection lifecycle

The server tracks one WebSocket connection per plugin instance. On disconnect:

1. The server removes the connection from `pluginConnections`
2. Any channels registered by this plugin are marked `disconnected` in `ChannelStore`
3. Pending replies to those channels are dropped
4. The plugin process may be restarted by `PluginProcessManager` depending on its restart policy

## Chunking long messages

Platform APIs impose character limits. The plugin (not the server) is responsible for chunking:

- Discord: 2,000 characters per message
- Slack: 4,000 characters per message block
- Telegram: 4,096 characters per message

The first-party plugins handle chunking automatically. If you write a custom plugin, split on the platform's limit before calling the platform API.

## See also

- [Gateway](./02_gateway.md) — thread resolution and routing logic
- [Plugin SDK — gateway API](../../../05_reference/03_plugin-sdk/02_api-reference/gateway/index.md)
- [Plugin System overview](../../05_plugins/01_overview.md)
