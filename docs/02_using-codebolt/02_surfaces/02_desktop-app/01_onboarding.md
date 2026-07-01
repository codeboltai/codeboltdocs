---
sidebar_position: 0.5
title: Onboarding
description: Sign in, choose providers, configure workspace defaults, install the CLI, and pick a default agent.
---

# Onboarding

Onboarding configures the desktop app for agent runs.

## Sign In

Open Codebolt. Click **Sign In** - a browser window opens to the Codebolt portal. Log in or create a free account. The token is picked up automatically.

![Codebolt welcome screen](/img/get_started.png)

New users are taken into the setup wizard. Returning users go straight to the project dashboard.

## Provider Selection

The wizard opens to **Select Default AI Models**. Pick the provider type that fits you best:

![Select default AI models](/img/onboarding-default-models.png)

| Provider type | What you need |
|---|---|
| Built-in provider | No key required when available on your plan |
| Hosted model provider | API key from the provider's console |
| Local model provider | Local URL - the model server must be running |
| Enterprise or cloud provider | Access credentials, region, account details, or API token |

Click your provider, enter the key or URL, then select an **LLM model** and an **Embedding model**. Both must be selected before you can continue.

If your team needs a provider that is not listed, see [Custom LLM Provider](../../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md) for the build path. For provider configuration, see [LLM Settings](./Settings/02_llm-settings.md).

## Workspace And Theme

The **Review Settings** screen lets you configure:

![Review settings](/img/onboarding-review-settings.png)

- **Default workspace** - defaults to your Desktop. Click **Browse** to change it. See [Workspaces](./01_workspace-and-project-management/02_workspaces.md) for workspace behavior and project organization.
- **CLI installation** - click **Install** to add `codebolt` to your PATH. You can skip and install later from Settings.
- **Theme** - choose the starting app theme. See [Themes](./Settings/08_themes.md) for built-in themes and customization.

## Default Agent

On **Select Default Agent**, browse or search the agent grid. Click **Add as Default Agent**. Codebolt installs it and sets it as the default for new projects.

You can change agent settings later from Settings.

## Next

Continue to [Getting Started](./00_get-started.md) to open a project and run your first agent.
