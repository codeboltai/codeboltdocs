---
sidebar_position: 4
title: Build a Plugin
description: Start here if you want to create a plugin, then move into the full Build on Codebolt plugin documentation.
---

# Build a Plugin

This section is only a short orientation for users who want to create plugins. The full creation workflow lives in **Build on Codebolt**.

## Creation docs

Use these pages when you are ready to build:

- [Build on Codebolt: Plugins Overview](../../04_build-on-codebolt/05_plugins/01_overview.md)
- [SDK and Lifecycle](../../04_build-on-codebolt/05_plugins/02_sdk-and-lifecycle.md)
- [Plugin Functionalities](../../04_build-on-codebolt/05_plugins/03_functionalities.md)
- [Packaging and Publishing](../../04_build-on-codebolt/05_plugins/99_packaging-and-publishing.md)

For specific plugin types:

- [Chat Gateway Plugins](../../04_build-on-codebolt/05_plugins/04_chat-gateway/01_overview.md)
- [Dynamic Panel Plugins](../../04_build-on-codebolt/05_plugins/05_dynamic-panel-plugins.md)
- [Custom AI Providers](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/01_overview.md)
- [Proxy Execution Gateway](../../04_build-on-codebolt/05_plugins/08_proxy-execution-gateway/01_overview.md)

## Minimal plugin shape

A plugin is a Node.js package with a `package.json` that includes `codebolt.plugin`.

At minimum, a plugin package needs:

- `package.json`
- a `codebolt.plugin` field in `package.json`
- a valid `main` entrypoint
- runtime dependencies installed or bundled

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "main": "dist/index.js",
  "codebolt": {
    "plugin": {
      "scope": "project",
      "triggers": [{ "type": "startup" }]
    }
  }
}
```

The runtime plugin ID is the `name` from `package.json`.

## Minimal SDK example

Most plugins use `@codebolt/plugin-sdk`.

```ts
import plugin from '@codebolt/plugin-sdk';

plugin.onStart(async (context) => {
  console.log('Plugin started:', context.pluginId);
});

plugin.onStop(async () => {
  console.log('Plugin stopped');
});
```

Inside `onStart`, a real plugin usually registers one or more capabilities:

- plugin tools
- custom LLM providers
- web search providers
- artifact preview providers
- execution gateway behavior
- external channel routing
- UI panels
- event listeners

For LLM provider plugins, the plugin registers a provider manifest and then handles completion, streaming, and login requests from Codebolt. Build details are covered in [Custom LLM Provider](../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md).

## Local development loop

The typical local loop is:

1. Create the plugin package.
2. Add the `codebolt.plugin` field.
3. Write the plugin with `@codebolt/plugin-sdk`.
4. Build it.
5. Copy it into `~/.codebolt/plugins` or `<project>/.codebolt/plugins`.
6. Open the **Plugins** panel.
7. Select **Reload**.
8. Start the plugin.
9. Use **Plugin Debug** to inspect logs.

```bash
cp -R ./my-plugin ~/.codebolt/plugins/my-plugin
```

## Publishing

Publishing uses the marketplace extension flow. The publishing metadata is described by `codeboltplugin.yaml`, while runtime discovery uses `package.json`.

Start with:

- [Packaging and Publishing](../../04_build-on-codebolt/05_plugins/99_packaging-and-publishing.md)
- [Plugin Marketplace](./03_plugin-marketplace.md)
