---
sidebar_position: 3
title: Custom Channel Plugins
description: If you want to connect Telegram, Slack, Discord, a support inbox, or another message surface to Codebolt, you build a plugin with manifest type "channel" and.
---

# Custom Channel Plugins

If you want to connect Telegram, Slack, Discord, a support inbox, or another message surface to Codebolt, you build a plugin with manifest type `"channel"` and use the `plugin.gateway` module.

## Minimal Manifest

```json
{
  "name": "my-channel-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "type": "channel",
      "triggers": [{ "type": "manual" }],
      "ui": {
        "path": "./ui/default/index.html"
      }
    }
  }
}
```

Why this shape:

- `"type": "channel"` enables the chat-gateway plugin pattern
- `manual` is usually the right trigger because channel plugins often need credentials or operator settings first
- `ui.path` gives you a dynamic panel for connection setup and status

## Minimal Runtime Structure

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async () => {
  plugin.gateway.onReply(async (reply) => {
    if (!reply.externalThreadId) return;
    await sendReplyToPlatform(reply.externalThreadId, reply.text);
  });

  plugin.gateway.onMessageToChannel(async (message) => {
    await sendOutboundMessage(message.targetId, message.text);
  });
});

async function connect(config: {
  agentId: string;
  threadStrategy: 'single' | 'per-user' | 'per-conversation' | 'per-message';
}) {
  const registration = await plugin.gateway.registerChannel({
    name: 'My Platform',
    platform: 'my-platform',
    agentId: config.agentId,
    threadStrategy: config.threadStrategy,
  });

  const channelId = registration.data?.channelId;
  if (!registration.success || !channelId) throw new Error(registration.error || "Registration failed");

  platformClient.onMessage(async (incoming) => {
    await plugin.gateway.routeMessage({
      source: 'channel',
      sourceId: 'plugin-my-platform',
      threadStrategy: config.threadStrategy,
      agentId: config.agentId,
      text: incoming.text,
      userId: incoming.userId,
      externalThreadId: incoming.threadId,
      replyTo: {
        channelId,
        externalThreadId: incoming.threadId,
        userId: incoming.userId,
      },
      metadata: {
        senderName: incoming.senderName,
        rawPayload: incoming.rawPayload,
      },
      timestamp: incoming.timestamp,
    });
  });
}

plugin.onStop(async () => {
  await plugin.gateway.unregisterChannel();
});
```

## What Each Gateway Method Is For

| Method | Use it for |
|---|---|
| `registerChannel(...)` | create or refresh the routing-rule entry for the connected platform |
| `routeMessage(...)` | hand an inbound external message to the server gateway |
| `onReply(...)` | receive agent replies tied to a routed conversation |
| `onMessageToChannel(...)` | receive proactive outbound messages from Codebolt |
| `unregisterChannel()` | mark the channel disconnected when the plugin stops |

## Recommended Plugin Shape

In practice, a production channel plugin usually has four layers:

1. **platform adapter**: Slack SDK, Telegram bot, Discord client, webhook listener, or another transport
2. **gateway bridge**: converts external messages into `plugin.gateway.routeMessage(...)`
3. **config and persistence**: stores tokens, agent choice, and strategy in `plugin.kvStore`
4. **dynamic panel UI**: lets operators connect, disconnect, inspect status, and choose routing settings

That is the exact pattern used by the Telegram plugin.

## Telegram Plugin Pattern

The built-in Telegram plugin is a good reference because it does not try to own routing itself. It lets the server do that work.

Its core structure is:

- load saved config from `plugin.kvStore`
- open the Telegram bot connection
- call `plugin.gateway.registerChannel(...)`
- forward inbound messages with `plugin.gateway.routeMessage(...)`
- send replies back with `plugin.gateway.onReply(...)`
- accept proactive outbound messages with `plugin.gateway.onMessageToChannel(...)`
- expose operator controls through a dynamic panel

It also does a few practical things you should copy:

- ignore messages from the bot itself
- keep `sourceId` stable
- use `threadStrategy` from saved config rather than hardcoding it
- keep raw platform payload in `metadata` when debugging or auditing matters

## Channel Registration Data

When you register a channel, the server persists a channel config record. The important fields are:

| Field | Meaning |
|---|---|
| `name` | operator-facing channel name in routing rules |
| `platform` | external platform identifier such as `telegram` or `discord` |
| `agentId` | default agent to run for inbound messages from this channel |
| `threadStrategy` | how external identity is mapped to Codebolt threads |
| `environmentId` | optional environment selection for the agent |
| `autoConnect` | whether the channel should be treated as automatically connectable |

## When To Use A Dynamic Panel

Use a plugin UI if the integration needs:

- tokens, secrets, or connection metadata
- selection of `agentId` or `threadStrategy`
- connect and disconnect controls
- status and validation feedback

For many channel plugins, the UI is not optional in practice. Operators need a reliable place to manage credentials and routing choices.

## Common Mistakes

| Mistake | Better approach |
|---|---|
| generating a fresh `sourceId` every time | keep a stable `sourceId` for the logical channel |
| storing thread maps in the plugin | let the server own routing persistence |
| replying directly from platform callbacks before routing completes | route first, then let `onReply(...)` handle the return path |
| using `startup` when operator config is required | use `manual`, then auto-load saved config in `onStart()` if present |
| skipping `unregisterChannel()` on shutdown | mark the channel disconnected cleanly |

## See Also

- [Chat Gateway Overview](./01_overview.md)
- [Routing and Persistence](./02_routing-and-persistence.md)
- [Persistent Agent Characters](./04_persistent-agent-characters.md)
- [Dynamic Panel Plugins](../05_dynamic-panel-plugins.md)
