---
sidebar_position: 6
title: Telegram
description: The telegram-channel plugin connects a Telegram bot to Codebolt using grammy
---

# Telegram Integration

The `telegram-channel` plugin connects a Telegram bot to Codebolt using [`grammy`](https://grammy.dev). It supports text messages, photos, documents, voice, and video — with mention filtering for group text messages and saved connection settings.

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
| `agentId` | No | Agent ID to pass to the gateway when routing messages. |
| `threadStrategy` | No | The panel initially selects `per-user`. Alternatives are `per-conversation`, `per-message`, and `single`. |

Start the plugin and click **Connect** after entering the bot token. It saves the connection settings in the KV store.

## Message routing

**Groups and supergroups**: Only text messages that `@mention` the bot by username are forwarded. Other messages are ignored.

**Private chats (DMs)**: Text messages do not require a mention.

```
User in group: @MyBot what's the weather?
  → forwarded (mention present)

User in group: what's the weather?
  → ignored (no mention)

User in private chat: what's the weather?
  → forwarded (DM, no mention required)
```

## Media support

The media handler forwards the caption, or a short attachment label, along with attachment metadata. It leaves the URL empty and does not apply the group-text mention filter.

| Media type | Forwarded as |
|---|---|
| Photo | `{ type: 'image', url: '' }` |
| Document | `{ type: 'file', url: '', name: fileName }` |
| Voice | `{ type: 'file', url: '' }` |
| Video | `{ type: 'file', url: '' }` |

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

  const registration = await plugin.gateway.registerChannel({
    name: 'Telegram',
    platform: 'telegram',
    agentId: config.agentId,
    threadStrategy: config.threadStrategy ?? 'per-conversation',
  });
  const channelId = registration.data?.channelId;
  if (!registration.success || !channelId) throw new Error(registration.error || 'Channel registration failed');

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
        channelId,
        externalThreadId: String(ctx.chat.id),
        userId: String(ctx.from.id),
      },
    });
  });

  plugin.gateway.onReply(async (reply) => {
    if (!reply.externalThreadId) return;
    const chatId = Number(reply.externalThreadId);
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
await plugin.kvStore.set('telegram-channel-plugin', 'config', 'connection', config, true);
```

The plugin has a manual start trigger. When you start it again, it reads the saved settings and tries to reconnect to Telegram.

## See also

- [Gateway](./02_gateway.md)
- [Discord integration](./04_discord.md)
- [Slack integration](./05_slack.md)
