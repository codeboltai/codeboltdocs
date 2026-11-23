---
sidebar_position: 5
title: Installing an Agent
description: Install marketplace agents from the desktop picker or use agents defined in your project.
---

# Installing an Agent

Install an agent from the desktop agent picker, or open a project that includes its own agent.

![Installed Agents](/productImages/agents/installed.png)

## From the marketplace

1. Open the agent picker in Chat and go to **Marketplace**.
2. Find the agent and select **Install**.
3. Go to **Installed** to select the agent for your thread.

The server downloads and extracts the package into its agents directory, reads `codeboltagent.yaml`, records the installation, and runs the package setup.

## From a local directory

Put the agent in a subdirectory of `.codebolt/agents/` in your project, with its manifest at `.codebolt/agents/<agent-directory>/codeboltagent.yaml`. Open that project and use the **Local** tab in the chat agent picker.

For a team-shared agent, commit its source and manifest with the project. See [Build your first agent](../../03_guides/02_first-steps/build-your-first-agent.md) for the agent directory and setup.

## Checking install state

Check **Installed** in the desktop picker or run `codebolt command agent list` against the running server. Use **Local** in the picker to look for an agent provided by the open project.

## Install troubleshooting

- If a marketplace install fails, check that the registry and package download are reachable.
- If a project agent is missing, check the manifest filename, ensure the manifest is inside the agent's subdirectory, and confirm you opened the intended project.

## See also

- [The Marketplace](./04_the-marketplace.md)
- [Agent Portfolios](./06_agent-portfolios.md)
- [Publishing](../../04_build-on-codebolt/02_creating-agents/99_publishing.md)
