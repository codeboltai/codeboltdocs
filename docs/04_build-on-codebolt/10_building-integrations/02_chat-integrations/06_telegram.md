---
sidebar_position: 6
title: Telegram
description: The telegram-channel plugin connects a Telegram bot to Codebolt using grammy
---

# Telegram Integration

The `telegram-channel` plugin connects a Telegram bot to Codebolt using [`grammy`](https://grammy.dev). It supports text messages, photos, documents, voice, and video — with optional group filtering and config persistence for auto-reconnect.

## Prerequisites

1. Message `@BotFather` on Telegram
2. Send `/newbot` and follow the prompts
3. Copy the **Bot Token** (`123456:ABCdef...`)

## Installation

Open **Marketplace → Plugins** and select the Telegram channel plugin if it is available for your workspace.

## Configuration

| Field | Required | Description |
|---|---|---|
| `botToken` | Yes | Token from `@BotFather` |
| `agentId` | No | Default agent. Uses project default if omitted. |
| `threadStrategy` | No | `per-conversation` (default) · `per-user` · `per-message` · `single` |

The plugin persists config to the KV store and **auto-reconnects** on server restart if a valid config was previously saved.

## Message routing

**Groups and supergroups**: Only messages that `@mention` the bot by username are forwarded. Other messages are ignored.

**Private chats (DMs)**: All messages are forwarded.

```
User in group: @MyBot what's the weather?
  → forwarded (mention present)

User in group: what's the weather?
  → ignored (no mention)

User in private chat: what's the weather?
  → forwarded (DM, no mention required)
```

## Media support

The plugin forwards media messages as attachment metadata:

| Media type | Forwarded as |
|---|---|
| Photo | `{ type: 'image', url: fileUrl }` |
| Document | `{ type: 'file', url: fileUrl, name: fileName }` |
| Voice | `{ type: 'file', url: fileUrl }` |
| Video | `{ type: 'file', url: fileUrl }` |

Agent replies with image attachments are sent via `bot.api.sendPhoto()`. File attachments are sent via `bot.api.sendDocument()`.

## Reply format

Agent text replies are sent with `HTML` parse mode where possible, falling back to plain text if the HTML parse fails:

```ts
try {
  await bot.api.sendMessage(chatId, reply.text, { parse_mode: 'HTML' });
} catch {
  await bot.api.sendMessage(chatId, reply.text);
}
```

## Minimal custom implementation

```ts
import { Bot } from 'grammy';

export async function connect(plugin, config) {
  const bot = new Bot(config.botToken);
  const me = await bot.api.getMe();

  await plugin.gateway.registerChannel({
    channelId: 'my-telegram',
    name: 'Telegram',
    platform: 'telegram',
    agentId: config.agentId,
    threadStrategy: config.threadStrategy ?? 'per-conversation',
  });

  bot.on('message:text', async (ctx) => {
    const isGroup = ctx.chat.type !== 'private';
    const mentionedBot = ctx.message.text.includes(`@${me.username}`);

    if (isGroup && !mentionedBot) return;

    const text = ctx.message.text.replace(`@${me.username}`, '').trim();

    await plugin.gateway.routeMessage({
      source: 'channel',
      sourceId: plugin.pluginId,
      threadStrategy: config.threadStrategy ?? 'per-conversation',
      agentId: config.agentId,
      userId: String(ctx.from.id),
      externalThreadId: String(ctx.chat.id),
      text,
      metadata: {
        senderName: ctx.from.first_name,
        externalMessageId: String(ctx.message.message_id),
      },
      replyTo: {
        channelId: 'my-telegram',
        externalThreadId: String(ctx.chat.id),
        userId: String(ctx.from.id),
      },
    });
  });

  plugin.gateway.onReply(async (reply) => {
    const chatId = Number(reply.replyTo.externalThreadId);
    try {
      await bot.api.sendMessage(chatId, reply.text, { parse_mode: 'HTML' });
    } catch {
      await bot.api.sendMessage(chatId, reply.text);
    }
  });

  bot.start();
}
```

## Auto-reconnect

The first-party plugin saves its config to the KV store on successful connect:

```ts
await plugin.kvStore.set('config', config);
```

On plugin startup, it reads this config and reconnects automatically — no manual intervention needed after a server restart.

## See also

- [Gateway](./02_gateway.md)
- [Discord integration](./04_discord.md)
- [Slack integration](./05_slack.md)
