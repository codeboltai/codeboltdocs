---
sidebar_position: 1
title: Install a Third-Party MCP Server
description: Configure an existing MCP server and select its tools from the desktop Chat composer.
---

# Install a Third-Party MCP Server

Open a project in Codebolt and check the server provider's setup instructions for the start command, arguments, and credentials.

## Install from Marketplace

In the desktop app, open **System → Marketplace → MCP**. Find the server, choose **App** or **Project** under **Install to**, and select **Install**. Complete any setup shown in the conversation.

## Configure a server manually

In the Chat composer, open the MCP picker and select **Open MCP Config** to edit `mcp_servers.json`. Add your entry inside the existing `mcpServers` object. For example, a server installed as a local script can use this configuration shape.

```json
{
  "mcpServers": {
    "my-project-tools": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server.js"]
    }
  },
  "enabled": []
}
```

Replace the path with the server's actual entry point and keep your existing entries. For a command with arguments or environment values, use the fields supplied by the server provider. Open **Agents → MCP**, find the server and use its switch or **Configure** to complete the setup.

## Verify the installation in Chat

Open the MCP picker and select **Refresh MCP list** if you just configured the server. Expand the server to select an individual tool, then ask the agent to perform a small action that needs it. For an issue tracker, try asking for the titles of your open issues. Check the tool activity in Chat.

See [MCP Servers](../../02_using-codebolt/04b_agent-extensions/06_mcp-server.md) for managing installed servers.
