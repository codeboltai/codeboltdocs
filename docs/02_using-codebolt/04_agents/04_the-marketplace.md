---
sidebar_position: 4
title: The Marketplace
description: Browse published agents and install them through the desktop agent picker.
---

# The Agent Marketplace

The Agent Marketplace is the Codebolt catalog of published agents. Entries describe what an agent is designed to do and provide the package the desktop app installs.

![Agent Marketplace](/productImages/agents/marketplace.png)

## Browsing from the desktop app

Open the chat agent picker and select **Marketplace** to browse and install agents. Use **Installed** to select an installed agent or **Local** to find agents provided by the open project.

See [Installing an Agent](./05_installing-an-agent.md) for the install steps. [MCP Servers](../04b_agent-extensions/06_mcp-server.md) and [Capabilities](../04b_agent-extensions/02_capabilities.md) have their own setup flows.

## Browsing from command mode

Run `codebolt command agent list` to list agents visible to the connected server.

## Trust model

Before installing a third-party agent, review its publisher, source where available, and the tools it needs.

## Publishing your own

Use the publish action with your agent directory.

```bash
codebolt action agent publish --path ./my-agent
```

See [Publishing](../../04_build-on-codebolt/02_creating-agents/99_publishing.md) for packaging and publication details.

## See also

- [Running agents](./03_running-agents.md)
- [Agent portfolios](./06_agent-portfolios.md)
