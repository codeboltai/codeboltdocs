---
sidebar_position: 5
title: Building a Channel Plugin
description: Learn when a custom channel plugin is needed and where to find the implementation guide.
---

# Building a Channel Plugin

Use a custom channel plugin when you want Codebolt agents to receive messages from an external platform and send replies back, but that platform is not available in your installed channel plugins.

For implementation steps, use the **Build on Codebolt** guides:

- [Custom Channel Plugins](../../04_build-on-codebolt/05_plugins/04_chat-gateway/03_custom-channel-plugins.md)
- [Chat Gateway Overview](../../04_build-on-codebolt/05_plugins/04_chat-gateway/01_overview.md)
- [Routing and Persistence](../../04_build-on-codebolt/05_plugins/04_chat-gateway/02_routing-and-persistence.md)

## When to use a custom channel plugin

Create a custom channel plugin when:

- The platform you want is not available in your installed plugins or marketplace.
- The platform sends messages through its own API, webhook, socket, bot SDK, or event stream.
- You want platform users to send messages to a Codebolt agent and receive replies in the same external system.
- You need operator controls for credentials, connection status, agent selection, or routing strategy.

## User workflow

After a channel plugin exists, the setup flow is:

1. Install or enable the channel plugin.
2. Configure the channel credentials and routing options.
3. Choose the agent and thread strategy.
4. Start the plugin and confirm it appears in the Routing Gateway.
5. Monitor status, activity, and replies from the Plugins panel and Routing Gateway.

For plugin code, manifests, SDK calls, lifecycle hooks, dynamic panels, and packaging, use the Build on Codebolt guides above.
