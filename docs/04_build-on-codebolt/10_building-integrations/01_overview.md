---
sidebar_position: 1
title: Building Integrations
description: "Patterns for connecting Codebolt to external services and platforms. Each pattern covers: which mechanism to use, how it's wired, and a minimal working example."
---

# Building Integrations

Start with the event that should reach Codebolt. Follow it through to a result you can check in the originating application.

| What you want to do | Where to start |
| --- | --- |
| Receive a Discord, Slack, or Telegram message | [Connect a chat platform](./02_chat-integrations/01_overview.md). Send a message and look for the reply in that conversation. |
| Connect a Linear agent session | [Connect a project tool](./04_project-tool-integration.md). Start a session on a test issue and check its activities in Linear. |
| Send a request from a script or backend service | [Use the API gateway guide](./06_api-gateway.md) for lifecycle requests, task queries, and sending a Chat prompt from the Client CLI. |
| Expose Codebolt to an external MCP client | [Configure Codebolt as an MCP server](../03_agent-extensions/04_mcp-tools/02_quickstart-local-mcp.md#approach-2-mcp-server-via-codeboltjs-api), then inspect the available tools in the client. |

## See also

- [Custom UIs](../04_custom-uis/01_overview.md) — clientsdk reference
- [Plugins](../05_plugins/01_overview.md) — hook and plugin bus reference
- [Extending Codebolt](../06_extending-codebolt/01_overview.md) — adding features inside the app
