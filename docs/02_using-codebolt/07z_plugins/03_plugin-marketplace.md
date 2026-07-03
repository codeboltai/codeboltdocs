---
sidebar_position: 3
title: Plugin Marketplace
description: Use the marketplace to discover, install, and update plugins published for Codebolt.
---

# Plugin Marketplace

The **Plugin Marketplace** is where you find plugins built by the Codebolt team, your organization, or the community. Marketplace plugins can be installed into the app scope or into the current project.

![Extensions panel plugin marketplace](/productImages/plugins/plugin-marketplace.png)

## What you can find

| Plugin category | What it adds |
|---|---|
| **Model providers** | Custom LLM providers, internal inference servers, or provider-specific login flows. |
| **Tools** | New actions agents can discover and call. |
| **Web search providers** | Search, research, news, or image search backends. |
| **Channel plugins** | External chat or messaging platforms connected to agents. |
| **Artifact preview providers** | Preview systems for generated artifacts. |
| **Execution plugins** | Remote execution or proxy execution behavior. |
| **UI plugins** | Custom panels inside Codebolt. |

## Install from marketplace

1. Open **Extensions**.
2. Select **Plugin**.
3. Open **Marketplace**.
4. Search or browse for a plugin.
5. Choose the install scope:
   - **App** for `~/.codebolt/plugins`
   - **Project** for `<project>/.codebolt/plugins`
6. Select **Install**.

After install, Codebolt reloads plugins and attempts to start the plugin so its capabilities become available.

## Update marketplace plugins

The **Installed** tab compares installed plugin versions with marketplace versions. If a newer marketplace version is available, the installed plugin can show an update action.

When Codebolt updates a plugin, it:

1. Stops the running plugin if it is already active.
2. Downloads the new archive.
3. Replaces the old plugin folder.
4. Runs dependency install for the new version.
5. Reloads plugins.
6. Starts the plugin again when possible.

## Installed list

The installed list shows plugins found at app and project level. If the same plugin is installed in both places, the list can show both install scopes.

Use the installed list to check:

- Plugin name
- Version
- Description
- Folder path
- Install scope
- Whether a marketplace update is available

## Trust and safety

Plugins run as local Node.js processes. They can access the same local project context and network capabilities available to the Codebolt process.

Before installing a plugin:

- Check the publisher.
- Read what the plugin connects to.
- Review setup and authentication requirements.
- Prefer plugins from sources you trust.
- Use project scope when a plugin is only needed for one workspace.

## Publishing plugins

Publishing is covered in the builder docs. Start here if you want to create and publish your own plugin:

- [Build on Codebolt: Plugins Overview](../../04_build-on-codebolt/05_plugins/01_overview.md)
- [Packaging and Publishing](../../04_build-on-codebolt/05_plugins/99_packaging-and-publishing.md)
