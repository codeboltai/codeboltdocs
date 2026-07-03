---
sidebar_position: 1
title: Overview
description: Plugins extend Codebolt by adding app-level capabilities such as model providers, tools, external channels, artifact previews, and custom panels.
---

# What are Plugins?

A **plugin** is an extension that adds new capabilities to Codebolt itself. An agent uses Codebolt to do work; a plugin changes what Codebolt can connect to, show, route, preview, or make available to agents.

Plugins run as separate Node.js processes beside the Codebolt server. When Codebolt starts a plugin, the plugin connects back over a plugin WebSocket and registers what it can do.

```text
Codebolt app
  -> starts plugin process
  -> plugin connects back to Codebolt
  -> plugin registers capabilities
  -> agents and UI can use those capabilities
```

## Why plugins exist

Plugins let Codebolt grow without putting every integration into the core app.

Use plugins when you need to:

- Add a custom LLM or internal model provider.
- Add a tool that agents can call.
- Add a web search or research provider.
- Connect agents to Slack, Telegram, Discord, or another external channel.
- Preview artifacts with a custom preview system.
- Proxy execution to a remote runtime or provider.
- Add a custom UI panel inside Codebolt.
- Integrate company-specific systems, credentials, or workflows.

Without plugins, every model provider, channel, preview engine, and workflow integration would need to be built directly into Codebolt.

## Plugins compared with other extensions

| Concept | What it means | Example |
|---|---|---|
| **Agent** | The worker that plans and acts on a user request. | A coding agent that edits files. |
| **Plugin** | App-level extension that adds capabilities to Codebolt. | A custom LLM provider or Slack channel bridge. |
| **Tool** | A callable action available to agents. | A plugin-registered greeting tool or API lookup. |
| **MCP server** | A tool server agents can call through MCP. | Database query tools or file search tools. |
| **Provider** | Adapter to a runtime, model, search backend, or other service. | A cloud runtime provider or plugin LLM provider. |
| **Environment** | Where work happens. | Local project, cloud sandbox, runner, or child workspace. |

The short version:

```text
Agent = who works
Environment = where work happens
Plugin = what new capability Codebolt gains
Provider/tool = one kind of capability a plugin can register
```

## Where plugins live

Codebolt discovers installed plugins from two places:

| Location | Scope |
|---|---|
| `~/.codebolt/plugins` | App-level plugin available across projects. |
| `<project>/.codebolt/plugins` | Project plugin available only for that project. |

If the same plugin ID exists in both places, the project plugin takes priority for that project.

## How Codebolt recognizes a plugin

A plugin folder must contain a `package.json` with a `codebolt.plugin` field.

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "scope": "project",
      "triggers": [
        { "type": "startup" }
      ]
    }
  }
}
```

Codebolt uses `package.json` for runtime discovery. `codeboltplugin.yaml` is used for extension publishing and marketplace metadata.

## How plugin startup works

At a high level:

1. Codebolt scans the plugin folders.
2. Codebolt finds plugin packages with `codebolt.plugin`.
3. A startup trigger, manual action, or UI action starts the plugin.
4. Codebolt launches the plugin as a child process.
5. The plugin connects back to Codebolt over the `/plugin` WebSocket.
6. Codebolt sends a start message.
7. The plugin registers capabilities such as tools, providers, channels, or UI.

Project plugins start after a project is selected, because they often need the active project path and project `.codebolt` storage.

## LLM provider plugins

Some plugins add a **custom LLM provider**. This is how Codebolt can support model backends that are not built directly into the core app.

For example, a provider plugin can:

- register a new provider name and provider ID
- publish the list of models it supports
- handle normal completion requests
- handle streaming requests
- run a login or OAuth flow when the provider does not use a normal API key
- translate Codebolt's request shape into the provider's API shape
- translate the provider response back into the shape agents expect

After the plugin is installed and started, Codebolt treats the registered provider like a selectable model provider. Users can choose it in provider settings or model selection flows, and agents can use it without knowing that a plugin is handling the backend.

This is the pattern used by custom provider plugins such as the Codex provider plugin and the Anthropic provider plugin. Those plugins start on launch, register themselves as `llmProvider` plugins, and then listen for completion, streaming, and login requests from Codebolt.

Use this type of plugin when:

- the provider needs custom authentication
- the provider needs OAuth instead of an API key
- the provider has a non-standard API format
- you need to connect Codebolt to an internal model gateway
- you want Codebolt to expose a subscription-backed or organization-specific model provider

If you want to build one, start with [Custom LLM Provider](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md) in **Build on Codebolt**.

## UI plugins

A **UI plugin** adds a plugin-owned panel inside Codebolt. Use this when a plugin needs a visible interface for setup, connection controls, status, dashboards, or custom workflows.

For example, a channel plugin might use a UI panel where you enter a bot token, connect or disconnect the external service, and inspect connection status. A preview plugin might use a panel to show a running preview. An internal workflow plugin might use a panel as a small dashboard.

When a plugin has UI, Codebolt can show an **open UI** action in the Plugins panel. Opening it starts the plugin if needed, serves the plugin's HTML from the plugin folder, injects a bridge script, and opens the UI inside a Codebolt panel.

For building details, see:

- [Dynamic Panel Plugins](../../04_build-on-codebolt/05_plugins/05_dynamic-panel-plugins.md)
- [Dynamic Panels](../../04_build-on-codebolt/04_custom-uis/05_dynamic-panels.md)
- [Build Your First Dynamic Panel](../../04_build-on-codebolt/04_custom-uis/07_build-your-first-dynamic-panel.md)

## See also

- [Install Plugins](./02_installing-plugins.md)
- [Plugin Marketplace](./03_plugin-marketplace.md)
- [Build a Plugin](./04_building-plugins.md)
