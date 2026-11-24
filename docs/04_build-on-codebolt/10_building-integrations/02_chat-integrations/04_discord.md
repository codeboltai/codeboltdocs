---
sidebar_position: 4
title: Discord
description: The discord-channel plugin connects a Discord bot to Codebolt. It uses discord
---

# Discord Integration

The `discord-channel` plugin connects a Discord bot to Codebolt. It uses [`discord.js`](https://discord.js.org) v14 and supports text messages, file attachments, `@mention` routing in guild channels, and full DM support.

## Prerequisites

1. Create a Discord application at [discord.com/developers](https://discord.com/developers/applications)
2. Add a Bot to the application and copy the **Bot Token**
3. Enable the **Message Content Intent** in the Bot settings
4. Invite the bot to your server with `bot` + `applications.commands` scopes

## Installation

Install the plugin from the Codebolt registry:

Open **Marketplace → Plugins** and select the Discord channel plugin if it is available for your workspace.

Or add it to your project's `.codebolt/plugins.yaml`:

```yaml
plugins:
  - id: discord-channel
```

## Configuration

| Field | Required | Description |
|---|---|---|
| `botToken` | Yes | Bot token from the Discord Developer Portal |
| `agentId` | No | Default agent to route messages to. Uses project default if omitted. |
| `threadStrategy` | No | `per-user` (default) · `per-conversation` · `per-message` · `single` |

Configure via the Codebolt UI (Settings → Plugins → discord-channel → Configure) or in `.codebolt/channels.json`.

## Message routing

**Guild channels** (servers): The bot only responds to messages that `@mention` it. Other messages are ignored.

**DMs**: All messages are forwarded to the agent.

```
User in #general: @MyBot what's the status?
  → plugin.gateway.routeMessage({ threadStrategy: 'per-user', userId: user.id, … })

User in DM: what's the status?
  → same path, no mention required
```

## Thread strategies

| Strategy | Recommended for |
|---|---|
| `per-user` | Personal assistants — one conversation per Discord user |
| `per-conversation` | Server bots — one thread per Discord channel |
| `per-message` | Stateless Q&A — no memory between messages |

## Attachment handling

The plugin maps Discord attachments to Codebolt's normalized format:

```ts
// Discord attachment → GatewayMessage metadata
{
  metadata: {
    attachments: [
      { type: 'image', url: attachment.url, name: attachment.name },
      { type: 'file',  url: attachment.url, name: attachment.name },
    ]
  }
}
```

Agent replies with attachments are sent back using `channel.send()` with a file buffer.

## Message chunking

Discord has a 2,000-character limit per message. The plugin automatically splits long agent replies into multiple messages.

## Minimal custom implementation

If you need custom behavior beyond the first-party plugin, here is the core pattern:

```ts
import { Client, GatewayIntentBits } from 'discord.js';

export async function connect(plugin, config) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
  });

  // Register the channel with the gateway
  const registration = await plugin.gateway.registerChannel({
    name: 'Discord',
    platform: 'discord',
    agentId: config.agentId,
    threadStrategy: config.threadStrategy ?? 'per-user',
  });
  const channelId = registration.data?.channelId;
  if (!registration.success || !channelId) throw new Error(registration.error || 'Channel registration failed');

  // Forward incoming messages
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Guild channels require @mention
    if (message.guild && !message.mentions.has(client.user!)) return;

    await plugin.gateway.routeMessage({
      source: 'channel',
      sourceId: plugin.pluginId,
      threadStrategy: config.threadStrategy ?? 'per-user',
      agentId: config.agentId,
      userId: message.author.id,
      externalThreadId: message.channelId,
      text: message.content.replace(/<@!?\d+>/g, '').trim(),
      replyTo: {
        channelId,
        externalThreadId: message.channelId,
        userId: message.author.id,
      },
    });
  });

  // Send agent replies back to Discord
  plugin.gateway.onReply(async (reply) => {
    if (!reply.externalThreadId) return;
    const channel = await client.channels.fetch(reply.externalThreadId);
    if (channel?.isTextBased()) {
      // Chunk at 2000 chars
      const chunks = reply.text.match(/.{1,2000}/gs) ?? [reply.text];
      for (const chunk of chunks) {
        await channel.send(chunk);
      }
    }
  });

  await client.login(config.botToken);
}
```

## See also

- [Gateway](./02_gateway.md) — thread strategies and routing
- [WebSocket protocol](./03_websocket.md) — plugin connection details
- [Slack integration](./05_slack.md)
- [Telegram integration](./06_telegram.md)
