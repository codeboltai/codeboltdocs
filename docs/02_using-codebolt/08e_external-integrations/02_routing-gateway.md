---
sidebar_position: 2
title: Routing Gateway
description: Route incoming webhook and channel messages to Codebolt agents.
---

# Routing Gateway

Open **System → Routing Gateway** to view how webhooks and channel plugins route incoming messages. Each source supplies an agent and a thread strategy. The gateway resolves a thread, delivers the message to an active agent or starts a run, and can forward the reply to the source's configured destination.

## Gateway panels

### Routing Rules tab

A unified view of every active integration — webhooks and channel plugins side by side. Each row shows:
![Routing Gateway](/productImages/externalintegrations/routinggateway.png)

| Column | Description |
|---|---|
| **Source** | `webhook` or `channel` |
| **Name** | The integration name |
| **Agent** | Which agent handles messages from this source |
| **Thread strategy** | How threads are assigned |
| **Status** | Active or disabled |

### Webhooks tab

Create and manage HTTP webhook endpoints. See [Automation → Webhooks](../08d_auto-interactivity/02_webhooks.md) for the full reference.

### Activity Log tab

The activity log lists recent routing attempts. Use **Refresh** to reload it.

| Column | Description |
|---|---|
| **Timestamp** | When the message arrived |
| **Source** | The integration that sent the message |
| **Action** | `routed-to-running`, `spawned-new`, or `failed` |
| **Thread ID** | Which thread received the message |
| **Agent** | Which agent handled it |
| **Duration** | How long routing took |
| **Error** | Failure reason, if any |

Filter by source type to focus on a specific integration. Clear the log with the **Clear** button.

## Routing rules

The **Routing Rules** tab summarizes assignments configured on webhooks and channel plugins. Edit a webhook in **Webhooks**. For a channel, configure routing in the channel integration. Use a [routing profile](#routing-profiles) to set environment and thread reuse for a Virtual Worker.

## Routing Profiles

A routing profile defines which values an integration sends with each message and how those values determine its environment and thread. For example, partition threads by channel to keep conversations separate while sharing an execution environment.

Open **Routing Profiles** in the desktop panel selector. Define the accepted scopes, set the environment and thread policies, and choose **Save revision**. A policy can share resources, partition them by scope, allocate a new resource per message, or reuse a resource until it is idle. [Virtual Workers](../07a_parallel-agents/06_virtual-workers.md) can accept messages routed through these profiles.

## Thread strategies

The thread strategy tells the gateway how to map incoming messages to Codebolt threads.

| Strategy | When to use |
|---|---|
| `single` | All messages from this source share one thread — good for a single-user bot |
| `per-user` | One thread per `userId` in the message — good for multi-user chat bots |
| `per-conversation` | One thread per `externalThreadId` — maps a Slack channel or Telegram chat to one thread |
| `per-message` | Fresh thread for every message — stateless, fire-and-forget tasks |
| `existing` | Route to a specific known thread ID |

## Gateway message format

Every source produces a `GatewayMessage` in the same format:

```json
{
  "source": "channel",
  "sourceId": "my-telegram-bot",
  "agentId": "agent-uuid",
  "threadStrategy": "per-user",
  "userId": "telegram-user-123",
  "externalThreadId": "chat-456",
  "text": "Can you review PR #42?",
  "metadata": { "platform": "telegram", "senderName": "Alice" },
  "replyTo": {
    "channelId": "my-telegram-bot",
    "externalThreadId": "chat-456",
    "userId": "telegram-user-123"
  }
}
```

## Manual routing for testing

Send a test message through the gateway without an external source by calling `POST /gateway/route` directly with a `GatewayMessage` body. This is useful for verifying a new integration before connecting the live platform.

## Response delivery

When an agent produces a reply on a gateway-managed thread, the Response Router intercepts the message and delivers it back through `replyTo`:

- For **webhooks** with a `targetUrl` — POSTs the reply with an HMAC signature
- For **channel plugins** — sends a `gateway.reply` WebSocket message to the plugin, which forwards it to the platform
- Listeners expire after **30 minutes** to prevent stale delivery

## Proactive messages

The gateway provides a send endpoint for an initialized channel plugin. The sender specifies the destination and the text to send. Use [Automations](../08d_auto-interactivity/01_overview.md) for scheduled work.

## Proxy Execution

The **Proxy Execution** panel controls agent execution routing for multi-environment setups — directing specific agents to run on specific machines or containers rather than locally. See [Multi-Environment Orchestration](../../04_build-on-codebolt/08a_multi-environment-orchestration/01_overview.md) for full details.
