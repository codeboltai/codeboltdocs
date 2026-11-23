---
sidebar_position: 6.1
title: Application Logs
description: Find logs for the Codebolt server, agents, plugins, and environments.
---

# Application Logs

Start with the log source that matches the failure.

| What failed | Where to look |
|---|---|
| Agent startup or execution | **Debug → Agent Debug**. Select the agent instance and inspect its output. |
| Model request | **Debug → AI Debug** or [AI Requests](02_surfaces/02_desktop-app/03_chat/08_ai-requests.md). |
| Plugin startup or execution | **Debug → Plugin Debug**. Select the plugin instance to inspect its logs. |
| Environment provisioning | **Debug → Environment Debug**. Open the instance that reported the error. |
| Headless server startup | The terminal where you launched `codebolt --server`. |

For example, if a chat agent stops immediately after you send a message, open **Agent Debug**, find the run by time or agent, and read the last error for that instance.

Server structured logs, when enabled, are stored as JSON Lines in the `structured` subdirectory of the server's configured log directory. Agent, plugin, and environment debug records are stored separately under the active project's `.codebolt` directory.

## See also

- [Agent Debug](04_agents/08_agent-debug.md)
- [Plugin Debug](08_integrations/07_plugin-debug.md)
- [Headless Server](02_surfaces/04_cli/03_cli-headless/02_headless-server.md)
