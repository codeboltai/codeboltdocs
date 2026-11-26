---
title: Marketplace
description: Find, install, and manage agents, extensions, connectors, and MiniApps in Codebolt Desktop.
---

# Marketplace

Use the Marketplace to install agents and extensions, connect external services, and find MiniApps. In Codebolt Desktop, open **System → Marketplace** from the bottom bar. The panel opens on **Agent** by default.

## Marketplace tabs

| Tab | Use it to | Guide |
|---|---|---|
| **Agent** | Install an agent to use in Chat. | [Select an installed agent](#agent) |
| **MCP** | Add tools agents can call through an MCP server. | [Use MCP tools in Chat](#mcp) |
| **Provider** | Add services such as models or execution environments. | [Set up a provider](#provider) |
| **Plugin** | Add features and integrations to Codebolt. | [Check a plugin's status](#plugin) |
| **Skill** | Add a reusable skill that a user or agent can invoke. | [Find available skills](#skill) |
| **ActionBlock** | Add a reusable block that runs a defined task. | [Find and inspect an ActionBlock](#actionblock) |
| **Capability** | Add a reusable agent operation with defined inputs and outputs. | [Add a capability to Chat](#capability) |
| **Executor** | Add a runtime that executes capabilities. | [Check what an executor supports](#executor) |
| **Bundle** | Install a set of extensions together. | [Install a bundle](#bundle) |
| **Connectors** | Find and configure a connection to an external service. | [Configure a connector](#connectors) |
| **MiniApps** | Install a web app you can open from Codebolt. | [Install and open a MiniApp](#install-and-open-a-miniapp) |

## Install an extension

The tabs from **Agent** through **Bundle** have two views. Open **Marketplace** to browse published items. **All** shows the catalog and **My** shows your published items. Open **Installed** to see what you've added to the app or the current project.

![Marketplace catalog with the extension tabs and Project selected under Install to](/img/desktop/marketplace-install-scope.webp)

1. Choose the type of extension you want, then open **Marketplace** and select **All**.
2. Search by name and review the description and publisher.
3. In **Install to**, choose **App** to use the extension across projects on this machine, or **Project** to install it in the project you have open.
4. Select **Install**. If the status shows **Configuration needed**, select **View** on the setup card. Enter the requested settings and choose **Save and continue**, or use **Connect account** and **Check connection** when prompted.

## Manage installed extensions

Open **Installed** in the same tab and find the extension. Its row shows the version, install scope, and whether it's enabled.

- Use **Activate** or **Deactivate** to change whether the extension is enabled.
- Use **Update** when a newer version is available, or **Delete** to remove the installation.
- For **MCP** and **Plugin** items, use **Configure** to change their settings. If the item is installed in both scopes, select which installation to configure.

## Use items from the Marketplace

### Agent

After installing an agent, open the agent picker in **Chat** and select it from **Installed**. Use **Local** to find agents provided by the open project. Send a message in that conversation to start a run with the selected agent. [Installing an Agent](./04_agents/05_installing-an-agent.md)

### MCP

Open the **MCP** picker in the Chat composer. Select the server, or expand it and select the individual tools you want the agent to use in that conversation. Open **Agents → MCP** to review the connection settings for installed servers. [Use an MCP tool in Chat](./04b_agent-extensions/06_mcp-server.md#use-an-mcp-tool-in-chat)

### Provider

Open **Provider → Marketplace**, search for a provider, and select **Install**. Once setup completes, use the relevant settings for that provider. [Model providers](./08_integrations/01_llm-providers.md) · [Environment providers](./08a_environments/03_environment-providers.md)

### Plugin

Open **Agents → Plugins** after installation. Find the plugin and check its status. If it’s stopped, use **Start plugin**. Open its UI if the plugin provides one. [Manage installed plugins](./07z_plugins/02_installing-plugins.md#manage-installed-plugins)

### Skill

Open **Agents → Capabilities → Skills** to browse the skills Codebolt discovers. Use **Search skills** to find one by name and **Refresh** to reload the list. To check the version or scope of a Marketplace installation, use **Skill → Installed** in Marketplace. [Skills](./04b_agent-extensions/03_skills.md)

### ActionBlock

After installing from **ActionBlock → Marketplace**, open **Agents → ActionBlocks**. Use **Refresh ActionBlocks** if the block hasn’t appeared. Select its row to check the description, entry point, and path.

A hook can start an ActionBlock when its configured event occurs. After the block runs, open **Debug → ActionBlock Debug** and select the execution to inspect its status and logs. [Triggering action blocks](./04b_agent-extensions/04_action-blocks.md#triggering-action-blocks) · [ActionBlock Debug](./08_integrations/07_plugin-debug.md#actionblock-debug)

### Capability

Open **Agents → Capabilities** to see the capabilities available to the project. To include one in a Chat request, type `/` in the composer, open **Capabilities**, and select the item. [Capabilities](./04b_agent-extensions/02_capabilities.md)

### Executor

An executor handles specific capability types. Open **Agents → Capabilities → Executors** and check the supported types on the executor’s card. For an executor installed from Marketplace, check **Executor → Installed** for its version and scope. [Executors](./04b_agent-extensions/05_executors.md)

### Bundle

Open **Bundle → Marketplace** and search for the bundle. Choose **App** or **Project** under **Install to**, then select **Install**. Codebolt installs the bundle's required extensions as part of setup. Open **Installed** in the **Bundle** tab to check its status.

### Connectors

Open **Connectors** and search for the service you want. Select **Configure** to open its setup page in the Cloud Portal. If the service is already connected, select **Manage**. [Cloud Connectors](./02_surfaces/06_cloud/05_settings/02_connectors.md)

### MiniApps {#install-and-open-a-miniapp}

1. Open **MiniApps → All MiniApps** and search for the app. Use **My MiniApps** to find apps you've published.
2. Select **Install** on the app card.
3. From the Desktop bottom bar, open **Context → MiniApps**. On the installed app card, choose **Preview in Browser panel** or **Open externally**. [Using MiniApps](../04_build-on-codebolt/04b_custom-agentic-applications/05_mini-apps.md#use-a-miniapp-on-desktop)

## Publish to the Marketplace

To publish a local extension, sign in to Codebolt, open its type in Marketplace, and use the **Publish** button in the panel header. Select the local extension, review its name and version, then confirm **Publish**. After it succeeds, open **Marketplace → My** in the same tab to find it.

For publishing from Codebolt Cloud, see [Marketplace Publishing](./02_surfaces/06_cloud/03_registry/02_marketplace-publishing.md).
