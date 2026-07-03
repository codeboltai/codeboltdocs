---
sidebar_position: 7
title: Plugin Debug
description: The Plugin Debug panel shows the WebSocket connection state, incoming/outgoing messages, and errors for every installed plugin — chat-platform plugins, custom.
---

# Plugin Debug

The **Plugin Debug** panel shows the WebSocket connection state, incoming/outgoing messages, and errors for every installed plugin — chat-platform plugins, custom node plugins, embedding-provider plugins, and any others connected through the plugin framework.

Open via: **Debug Tools dropdown → Plugin Debug**

## What it shows

Each plugin appears as a collapsible section with:

| Field | Description |
|---|---|
| **Plugin name** | The plugin's identifier |
| **Status** | `connected`, `disconnected`, `error` |
| **Connection time** | When the plugin connected |
| **Message count** | Total messages exchanged this session |
| **Last message** | Timestamp and type of the most recent message |

Expand a plugin section to see the live WebSocket message stream:

- **Outgoing** (→) — messages sent from Codebolt to the plugin
- **Incoming** (←) — messages received from the plugin
- Each message shows the type, payload (collapsed), and timestamp

## Debugging a disconnected plugin

If a plugin shows `disconnected` or `error`:

1. Check the **error message** in the plugin's section (shown in red).
2. Look for connection refusals (the plugin process crashed or isn't running).
3. Check the plugin's own log output in the Console panel.
4. Verify the plugin's configuration in **System Settings → Plugins**.

## Message filtering

Use the **Type** filter to show only specific message types (e.g., only `chatMessage` events from a chat-platform plugin). Reduces noise when diagnosing a specific interaction.

## Related

- [Chat Widget](./06_chat-widget.md) — a common plugin that shows up here
- [Chat Platforms](../08e_external-integrations/03_chat-platforms.md) — plugin-backed integrations routed through the gateway
- [Building a Channel Plugin](../08e_external-integrations/05_building-a-channel-plugin.md) — when to build a custom channel plugin and where to find the implementation guide
- [Environment Debug](../08a_environments/04_environment-debug.md) — companion panel for resolved environment variables
