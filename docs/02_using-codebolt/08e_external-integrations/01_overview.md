---
sidebar_position: 1
title: Overview
description: External Integrations connect your agents to the outside world through channel plugins, webhooks, and project tool integrations.
---

# Agent External Integrations

External Integrations connect your agents to the outside world through channel plugins, webhooks, and project tool integrations.

## Architecture

All external communication flows through the **Routing Gateway** — a central message router that receives messages from any external source, resolves the right agent and thread, and delivers the agent's reply back to the originating platform.

![External integrations routing gateway](/diagrams/external-integrations-routing-gateway.svg)

Platform-specific integrations are implemented as **channel plugins** — lightweight adapters that bridge a platform's SDK to the gateway protocol. This means Codebolt can connect to any platform that has a programmable API, without those platforms being hardcoded into the core.

## What's in this section

| Page | What it covers |
|---|---|
| [Routing Gateway](./02_routing-gateway.md) | The central message router — rules, activity log, thread strategies |
| [Chat Platforms](./03_chat-platforms.md) | Connect chat and message platforms through installed channel plugins |
| [Project Tools](./04_project-tools.md) | Linear, Jira, GitHub, GitLab — agents that read and write to your tools |
| [Building a Channel Plugin](./05_building-a-channel-plugin.md) | When to build a custom channel plugin and where to find the implementation guide |
