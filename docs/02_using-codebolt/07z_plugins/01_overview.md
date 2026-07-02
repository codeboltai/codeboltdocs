---
sidebar_position: 1
title: Plugins Overview
---

# What are Plugins

Plugins extend the Codebolt application itself — not just what agents can do, but what the application can do. They run as separate Node.js processes alongside the server and connect via WebSocket, so they can add entirely new capabilities without modifying Codebolt's core.

## Plugins vs agent extensions

It helps to know where plugins sit relative to other extension points:

| | What it extends | Examples |
|---|---|---|
| **Plugins** | The application | New AI providers, messaging platform connections, remote execution environments, custom UI panels |
| **Agent extensions** (skills, action blocks) | What an individual agent can do | Slash commands, parallel side-executions |
| **MCP servers** | Tools available to agents | File search, database queries, external APIs |

## Types of plugins

### LLM Provider plugins

Add a new AI provider to Codebolt's model selector. Once installed and configured, it appears alongside OpenAI, Anthropic, and others in **Settings → LLMs**. Useful for connecting to private model deployments, niche providers, or internal inference servers.

### Chat Gateway plugins

Connect an external messaging platform to Codebolt agents. Messages coming in from Slack, Telegram, Discord, or any custom channel are routed to an agent; the agent's replies are sent back. Each platform needs its own gateway plugin.

### Execution plugins

Intercept all code execution and proxy it to a remote environment — a cloud VM, a container, an SSH host. The agent keeps working normally; the execution plugin transparently handles where commands actually run. Only one execution plugin can be active at a time.

### Generic plugins

Any other application extension — custom UI panels, background automation, event-driven integrations. These use the same SDK but don't claim a specific gateway role.

## Where plugins live

Plugins are installed into one of two directories:

| Location | Scope |
|---|---|
| `~/.codebolt/plugins/` | Global — available in every project |
| `<project>/.codeboltPlugins/` | Per-project — overrides global, only active in that project |

Codebolt discovers and starts plugins from these directories automatically at launch, or on demand from the Plugins panel.

## See also

- [Installing Plugins](./02_installing-plugins.md)
- [Plugin Marketplace](./03_plugin-marketplace.md)
- [Building Plugins](./04_building-plugins.md)
