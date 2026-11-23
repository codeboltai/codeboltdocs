---
sidebar_position: 6
title: MCP Server
description: Install, configure, and select MCP tools in the Codebolt desktop app.
---

# MCP Servers

MCP servers give agents access to additional tools, such as listing issues or querying a data source.

## Install an MCP server

1. Open **System → Marketplace** and select **MCP**.
2. In **Marketplace**, find the entry you want. Choose an installation scope if prompted, then select **Install** and complete the setup.
3. Check the Chat MCP picker for the installed tools. To review the connection settings for a configured server, open **Agents → MCP**.

For a server provided by your team or a vendor, use the [manual configuration guide](../../03_guides/05_mcp-and-tools/install-a-third-party-mcp-server.md#configure-a-server-manually).

## MCP server management

Open **Agents → MCP** to find installed servers. Select **Configure** to edit a server's connection settings. Use the switch beside its name to disable or re-enable it. Enabling a disabled server opens its configuration dialog.

## Use an MCP tool in Chat

1. Open the MCP picker in the Chat composer.
2. Find the configured server. Select the server or expand it and select the individual tools you want to make available.
3. Send a request that uses one of those tools. For example, with an issue tracker connected, try this prompt.

> Use the connected issue tracker to list my open issues and include a link to each one.

The agent's tool configuration and the active [Policy Profile](../05b_guardrails-and-settings/01_guardrails.md#policy-profiles) determine which calls are available.

## Troubleshooting

If a tool is missing, check that the server is enabled and configured, then use **Refresh MCP list** in the Chat picker. For a local server, verify its start command, arguments, and required environment settings.

## See also

- [MCP Server CLI Commands](../02_surfaces/04_cli/02_cli-commands/03_tool-commands.md)
- [Custom Tools](./07_custom-tools.md)
- [Build a Local MCP Server](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/02_quickstart-local-mcp.md)
- [MCP Client SDK Reference](../../05_reference/04_client-sdk/02_api-reference/mcp/index.md)
