---
sidebar_position: 3
title: Chat Platforms
description: Codebolt connects agents to chat platforms through channel plugins. Available platforms depend on which channel plugins are installed.
---

# Chat Platform Integrations

Codebolt connects agents to external chat platforms through **channel plugins**. Each plugin bridges a platform's SDK or API to the Codebolt Routing Gateway, so messages from users can reach your agent and replies can go back automatically.

The gateway itself is not limited to one fixed platform list. Chat platforms are provided by channel plugins, so your available platforms depend on which plugins are installed in your Codebolt setup. You can also build a custom channel plugin for any platform that has an API, webhook, socket connection, or SDK.

## How it works

A channel plugin is a separate process that:

1. Connects to the chat platform using the platform's SDK or API
2. Receives user messages and forwards them to Codebolt via `gateway.route`
3. Listens for `gateway.reply` messages from Codebolt and sends them back to the user

![Chat platform channel plugin flow](/diagrams/chat-platform-channel-plugin-flow.svg)

## Finding available channel plugins

Open **System Settings -> Plugins** to see which channel plugins are installed in your Codebolt setup. If your setup includes a marketplace tab, use it to install additional channel plugins. The exact platform list can differ between installations.

If the platform you need is not available as an installed plugin, see [Building a Channel Plugin](./05_building-a-channel-plugin.md). That page links to the builder documentation for creating a custom channel plugin.

## Configuring a channel

Each channel plugin stores its configuration in `.codebolt/channels.json`:

```json
{
  "id": "my-support-channel",
  "name": "Support Bot",
  "platform": "chat-platform-name",
  "agentId": "agent-uuid",
  "threadStrategy": "per-user",
  "autoConnect": true,
  "credentials": {
    "token": "platform-token-or-secret"
  }
}
```

The `credentials` object is plugin-specific. Use the setup instructions shown by the installed channel plugin, because each platform expects different keys, tokens, secrets, callback URLs, or auth files.

## Thread strategies for chat platforms

| Platform scenario | Recommended strategy |
|---|---|
| Personal assistant bot (one user) | `single` |
| Multi-user support bot | `per-user` |
| One agent per conversation or room | `per-conversation` |
| Stateless Q&A bot | `per-message` |

## Managing channel plugins

Installed channel plugins appear in **System Settings → Plugins**. Each plugin shows its connection status (`connected`, `disconnected`, `error`). Start and stop plugins from the Plugins panel.

The **Routing Gateway → Routing Rules tab** shows all active channels alongside webhooks, so you can see every integration at a glance.

## Proactive messages

To have an agent send a message to a platform user *without* a user initiating it, use:

```
POST /gateway/channels/{channelId}/send
{ "targetId": "platform-user-or-room-id", "text": "Your task is complete." }
```

Useful for sending scheduled reports, alerts, or completing a long-running task that started from a webhook.
