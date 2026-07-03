---
sidebar_position: 2
title: Install Plugins
description: Install plugins from the Extensions panel and choose whether they are available app-wide or only inside one project.
---

# Install Plugins

You can install and update plugins from the **Extensions** panel. After installation, the plugin appears in the **Plugins** panel, where you can reload, start, stop, and open plugin UI if it has one.

![Extensions panel showing installed plugins](/productImages/plugins/install-plugin.png)

The **Installed** tab shows plugins already available in your app or project.

## Choose an install scope

Before installing, decide where the plugin should live.

| Scope | Install location | Use it when |
|---|---|---|
| **App** | `~/.codebolt/plugins` | You want the plugin available across projects. |
| **Project** | `<project>/.codebolt/plugins` | The plugin belongs to one project, workspace, or repository. |

Project plugins take priority over app-level plugins with the same plugin ID.

## Install from the Extensions panel

Use the Extensions panel when you want Codebolt to download and install a marketplace plugin for you.

1. Open the **Extensions** panel.
2. Select the **Plugin** extension type.
3. Use **Installed** to see plugins already available.
4. Use **Marketplace** to browse plugins you can install.
5. Choose **Install to App** or **Install to Project** when installing from marketplace.
6. Click **Install** or **Update**.

When you install a plugin from the marketplace, Codebolt:

1. Downloads the plugin archive.
2. Extracts it into the selected app or project plugin folder.
3. Replaces an older installed copy if this is an update.
4. Runs `npm install --production` for plugin dependencies.
5. Reloads the plugin list.
6. Starts the plugin when possible.
7. Refreshes provider lists so plugin LLM and web search providers can appear without restarting Codebolt.

## After install

After installation:

1. Open the **Plugins** panel.
2. Select **Reload** if the plugin does not appear.
3. Check the plugin state.
4. Select **Start** if it is not already started.
5. Open the plugin UI if the plugin provides one.

If the plugin registers an LLM provider or web search provider, open settings and refresh the provider list if it does not appear immediately.

## Manage installed plugins

Use the **Plugins** panel to manage plugins that are already installed on disk. The Plugins panel is for runtime management: discovery, state, start, stop, and plugin UI.

> **Image placeholder:** Add a screenshot of the Plugins panel showing installed plugins, state badges, reload, start, stop, and open UI buttons.

Each plugin card shows:

- Plugin name
- Version
- Description
- Current state
- Install folder
- Error message, if startup failed
- Open UI button, if the plugin provides a UI
- Start or stop action

## Reload plugins

Use **Reload** when:

- You installed a plugin manually.
- You updated plugin files while developing.
- A plugin does not appear after installation.
- You changed active project and want to refresh project plugins.

Reload scans:

- `~/.codebolt/plugins`
- `<project>/.codebolt/plugins`

## Start and stop plugins

Starting a plugin launches its `main` entrypoint as a child process. The plugin then connects back to Codebolt and registers its capabilities.

Stopping a plugin asks it to shut down and then terminates the child process if needed. Codebolt also cleans up plugin UI panels, event subscriptions, registered tools, plugin providers, preview providers, and execution gateway claims.

## Plugin states

| State | Meaning |
|---|---|
| `loaded` | Codebolt discovered the plugin on disk. |
| `initialized` | Legacy initialization state; most child-process plugins start directly. |
| `started` | Plugin process is running and connected. |
| `stopped` | Plugin is installed but not running. |
| `error` | Plugin failed to start, crashed, or exited unexpectedly. |

## Open plugin UI

Some plugins include a UI file. If a plugin has UI, the Plugins panel shows an open UI action.

When you open a plugin UI, Codebolt:

1. Starts the plugin if it is not already running.
2. Serves the plugin HTML from the plugin folder.
3. Injects a small bridge script.
4. Opens the plugin UI inside a Codebolt panel.

## Debug plugin problems

Use **Plugin Debug** when a plugin does not start, does not register its capability, crashes, or disconnects.

Plugin debug data is stored in the active project:

```text
<project>/.codebolt/plugindebug
```

Common checks:

| Problem | What to check |
|---|---|
| Plugin does not appear | Install path and `package.json` `codebolt.plugin`. |
| Plugin starts then goes to `error` | stderr logs, missing entrypoint, missing dependencies. |
| Plugin remains `loaded` | Start action or startup trigger. |
| Provider does not appear | Plugin state, registration logs, provider settings refresh. |
| Plugin UI does not open | `codebolt.plugin.ui.path` and UI file path. |
| Project plugin does not start | Active project and `<project>/.codebolt/plugins`. |

## Related pages

- [Plugin Marketplace](./03_plugin-marketplace.md)
- [Build a Plugin](./04_building-plugins.md)
