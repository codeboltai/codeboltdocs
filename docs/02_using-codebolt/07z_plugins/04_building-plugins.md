---
sidebar_position: 4
title: Building Plugins
---

# Building Plugins

Building a plugin means writing a Node.js package that connects to the Codebolt server via WebSocket and registers capabilities using the `@codebolt/plugin-sdk`. This page is a brief orientation — the full developer documentation lives in **Build on Codebolt**.

## What you can build

| Plugin type | What it does | Guide |
|---|---|---|
| **LLM Provider** | Adds a custom AI provider to the model selector | [Custom AI Providers →](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/01_overview.md) |
| **Chat Gateway** | Connects an external messaging platform to agents | [Chat Gateway →](../../04_build-on-codebolt/05_plugins/04_chat-gateway/01_overview.md) |
| **Execution** | Proxies code execution to a remote environment | [Proxy Execution Gateway →](../../04_build-on-codebolt/05_plugins/08_proxy-execution-gateway/01_overview.md) |
| **UI Panel** | Adds a custom panel inside the Codebolt desktop app | [Dynamic Panel Plugins →](../../04_build-on-codebolt/05_plugins/05_dynamic-panel-plugins.md) |
| **Generic** | Any other application extension | [Plugins Overview →](../../04_build-on-codebolt/05_plugins/01_overview.md) |

## Quick start

```bash
# 1. Create a plugin folder
mkdir my-plugin && cd my-plugin
npm init -y
npm install @codebolt/plugin-sdk typescript

# 2. Add the codebolt.plugin field to package.json
# (see Build on Codebolt → Plugins for the full manifest reference)

# 3. Write src/index.ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async (ctx) => {
  console.log('Plugin started:', ctx.pluginId);
  // register capabilities here
});

plugin.onStop(async () => {
  // clean up
});

# 4. Build and install locally for testing
npx tsc
cp -r . ~/.codebolt/plugins/my-plugin

# 5. In Codebolt: Plugins panel → Reload → Start
```

## Developer documentation

Everything you need to build and publish a plugin:

- [Plugins Overview](../../04_build-on-codebolt/05_plugins/01_overview.md) — architecture, plugin types, manifest reference, full SDK module list
- [SDK and Lifecycle](../../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md) — lifecycle hooks, environment variables, start triggers
- [Major Functionalities](../../04_build-on-codebolt/05_plugins/03_functionalities.md) — filesystem, chat, LLM, knowledge, UI, and storage modules
- [Dynamic Panel Plugins](../../04_build-on-codebolt/05_plugins/05_dynamic-panel-plugins.md) — building custom UI panels
- [Packaging and Publishing](../../04_build-on-codebolt/05_plugins/99_packaging-and-publishing.md) — pre-publish checklist, local dev loop, `codebolt action plugin publish`

## Publishing to the marketplace

When your plugin is ready:

```bash
codebolt action plugin publish --path ./my-plugin
```

After publishing, it appears in the [Plugin Marketplace](./03_plugin-marketplace.md) and can be installed by others. See the [Packaging and Publishing](../../04_build-on-codebolt/05_plugins/99_packaging-and-publishing.md) guide for the full checklist.
