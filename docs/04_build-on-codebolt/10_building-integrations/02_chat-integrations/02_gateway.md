---
sidebar_position: 2
title: Gateway
description: The Gateway is the server component that sits between incoming channel messages and the agent that handles them
---

# Gateway

The Gateway is the server component that sits between incoming channel messages and the agent that handles them. It resolves threads, selects agents, manages conversation state, and routes replies back to the originating platform.

## What the Gateway does

When a plugin calls `gateway.routeMessage()`, the server runs this sequence:

```
GatewayMessage arrives
  │
  ├─ 1. Thread resolution
  │     Build a lookup key from (sourceId + strategy-specific field)
  │     Look up threadId in the persisted thread map
  │     Create a new thread if none exists
  │
  ├─ 2. Agent resolution
  │     Use the agentId from the message, or the channel's default agent
  │
  ├─ 3. Process check
  │     Is an agent already RUNNING on this thread?
  │     ├─ Yes → queue the message as a PENDING step
  │     └─ No  → spawn a new agent process and send the message
  │
  └─ 4. Reply registration
        Register a ResponseListener (30 min TTL) with a callback
        Callback: send agent reply back to the plugin over WebSocket
```

Thread maps are persisted to `.codebolt/gateway-thread-map.json` so conversation history survives server restarts.

## Thread strategies

The `threadStrategy` field in `GatewayMessage` controls how the Gateway maps platform conversations to Codebolt threads.

| Strategy | Lookup key | Use when |
|---|---|---|
| `per-user` | `sourceId + userId` | One persistent conversation per user (DMs, personal bots) |
| `per-conversation` | `sourceId + externalThreadId` | One thread per group chat or channel thread |
| `per-message` | `sourceId + timestamp` | Stateless — each message starts fresh |
| `single` | `sourceId` | All messages on one shared thread (rare) |
| `existing` | Use `threadId` directly | Manual thread assignment |

Example — choosing a strategy in a Discord plugin:

```ts
plugin.gateway.routeMessage({
  source: 'channel',
  sourceId: plugin.pluginId,
  threadStrategy: 'per-conversation',   // one thread per Discord channel
  externalThreadId: message.channelId,  // Discord channel ID as thread key
  userId: message.author.id,
  text: message.content,
  replyTo: {
    channelId: registeredChannelId,
    externalThreadId: message.channelId,
    userId: message.author.id,
  },
});
```

## GatewayMessage format

```ts
interface GatewayMessage {
  source: 'channel';
  sourceId: string;              // plugin ID or webhook ID
  threadStrategy: ThreadStrategy;
  threadId?: string;             // set only when strategy is 'existing'
  agentId?: string;              // use channel default if omitted
  text: string;
  userId?: string;               // required for per-user strategy
  externalThreadId?: string;     // required for per-conversation strategy
  metadata?: Record<string, any>;
  replyTo?: {
    channelId: string;
    externalThreadId?: string;
    userId?: string;
    pluginId?: string;           // filled in by server from plugin connection
  };
  timestamp?: string;
}
```

## RoutingResult

Read the routing outcome from `data` after checking the response.

```ts
const result = await plugin.gateway.routeMessage(message);
if (!result.success || !result.data) throw new Error(result.error || 'Routing failed');
const { action, threadId } = result.data;
```

- `spawned-new` — a new agent process was started for this thread
- `routed-to-running` — the message was delivered to an already-running agent
- `queued` — agent is busy (stopping), message queued as PENDING step

## Channel registration

Plugins register their channels with the Gateway so they appear in the Routing Rules UI:

```ts
const registration = await plugin.gateway.registerChannel({
  name: 'Discord — My Server',
  platform: 'discord',
  agentId: config.agentId,
  threadStrategy: config.threadStrategy,
});
```

Read the assigned channel ID from `registration.data?.channelId` after checking `registration.success`. Registration persists to `.codebolt/channels.json`. On disconnect, call `plugin.gateway.unregisterChannel()` to mark it as disconnected.

## Response routing

The **Response Router** runs inside the server and intercepts all `sendMessage()` calls from agents on gateway-managed threads. When it finds a registered listener for the thread, it calls the listener's callback, which sends the reply back to the plugin over WebSocket.

Listeners expire after 30 minutes of inactivity. The TTL resets each time a message arrives on the thread.

## Proactive messages

Handle a proactive message in the channel plugin with `onMessageToChannel`. Forward the supplied target ID and text through the platform’s client.

```ts
plugin.gateway.onMessageToChannel(({ targetId, text }) => {
  platformApi.sendMessage(targetId, text);
});
```

## See also

- [WebSocket protocol](./03_websocket.md) — how plugins connect and send messages
- [Plugin SDK — gateway API](../../../05_reference/03_plugin-sdk/02_api-reference/gateway/index.md)
