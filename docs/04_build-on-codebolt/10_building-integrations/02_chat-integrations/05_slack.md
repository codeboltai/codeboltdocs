---
sidebar_position: 5
title: Slack
description: The slack-channel plugin connects a Slack app to Codebolt using @slack/bolt in Socket Mode
---

# Slack Integration

The `slack-channel` plugin connects a Slack app to Codebolt using [`@slack/bolt`](https://slack.dev/bolt-js) in Socket Mode. It supports channel messages (`@mention` required), DMs, file uploads, and threaded replies.

## Prerequisites

1. Create a Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable **Socket Mode** and generate an **App-Level Token** (`xapp-...`)
3. Add the following Bot Token scopes: `channels:history`, `chat:write`, `files:write`, `im:history`, `im:write`
4. Enable the **messages.im** and **app_mention** event subscriptions
5. Install the app to your workspace and copy the **Bot Token** (`xoxb-...`)

## Installation

Open **Marketplace → Plugins** and select the Slack channel plugin if it is available for your workspace.

## Configuration

| Field | Required | Description |
|---|---|---|
| `appToken` | Yes | App-level token starting with `xapp-` |
| `botToken` | Yes | Bot user token starting with `xoxb-` |
| `agentId` | No | Default agent to route messages to |
| `threadStrategy` | No | `per-user` (default) · `per-conversation` · `per-message` · `single` |

## Message routing

**Channels**: The bot only responds to `app_mention` events — messages where the bot is `@mentioned`.

**DMs (Direct Messages)**: All messages are forwarded without requiring a mention.

```
User in #general: @MyBot summarise the PR
  → routes via app_mention event

User in DM: summarise the PR
  → routes via message event (no mention needed)
```

## Thread support

This example routes replies to the Slack channel identified by `externalThreadId`. For threaded replies, preserve the Slack channel and `thread_ts` together in your plugin’s reply routing data.

```ts
// Reply arrives from agent
plugin.gateway.onReply(async (reply) => {
  if (!reply.externalThreadId) return;
  await app.client.chat.postMessage({
    token: botToken,
    channel: reply.externalThreadId,
    text: reply.text,
  });
});
```

## File handling

Incoming files are forwarded as attachment metadata. Outgoing files from the agent are uploaded via `files.uploadV2`:

```ts
await app.client.files.uploadV2({
  token: botToken,
  channel_id: channelId,
  file: fileBuffer,
  filename: attachment.name,
});
```

## Message chunking

Slack limits message blocks to 4,000 characters. The plugin splits long replies automatically.

## Minimal custom implementation

```ts
import { App } from '@slack/bolt';

export async function connect(plugin, config) {
  const app = new App({
    appToken: config.appToken,
    token: config.botToken,
    socketMode: true,
  });

  // Get the bot user ID for mention filtering
  const auth = await app.client.auth.test({ token: config.botToken });
  const botUserId = auth.user_id as string;

  const registration = await plugin.gateway.registerChannel({
    name: 'Slack',
    platform: 'slack',
    agentId: config.agentId,
    threadStrategy: config.threadStrategy ?? 'per-user',
  });
  const channelId = registration.data?.channelId;
  if (!registration.success || !channelId) throw new Error(registration.error || 'Channel registration failed');

  const handleMessage = async ({ message, say }) => {
    if (message.bot_id || message.subtype) return;

    await plugin.gateway.routeMessage({
      source: 'channel',
      sourceId: plugin.pluginId,
      threadStrategy: config.threadStrategy ?? 'per-user',
      agentId: config.agentId,
      userId: message.user,
      externalThreadId: message.channel,
      text: message.text ?? '',
      metadata: { thread_ts: message.thread_ts ?? message.ts },
      replyTo: {
        channelId,
        externalThreadId: message.channel,
        userId: message.user,
      },
    });
  };

  app.message(handleMessage);
  app.event('app_mention', ({ event }) => handleMessage({ message: event, say: null }));

  plugin.gateway.onReply(async (reply) => {
    if (!reply.externalThreadId) return;
    const chunks = reply.text.match(/.{1,4000}/gs) ?? [reply.text];
    for (const chunk of chunks) {
      await app.client.chat.postMessage({
        token: config.botToken,
        channel: reply.externalThreadId,
        text: chunk,
      });
    }
  });

  await app.start();
}
```

## See also

- [Gateway](./02_gateway.md)
- [Discord integration](./04_discord.md)
- [Telegram integration](./06_telegram.md)
