---
sidebar_position: 0.5
title: Installation and Onboarding
description: Install Codebolt Desktop, sign in, choose a model, and configure your workspace.
---

# Installation and Onboarding

[Download and install Codebolt Desktop](https://codebolt.ai/download/) for your operating system. You can also find macOS and Windows installers in the [GitHub release assets](https://github.com/codeboltai/codebolt/releases). Onboarding configures the app for agent runs.

## Sign In

Open Codebolt. Click **Sign In** - a browser window opens to the Codebolt portal. Log in or create a free account. The token is picked up automatically.

![Codebolt welcome screen](/img/get_started.png)

If you already have a workspace configured, Codebolt can take you directly to the project dashboard. Otherwise it opens the setup wizard.

## Provider Selection

The wizard opens to **Select Default AI Models**. Pick the provider type that fits you best:

![Select default AI models](/img/onboarding-default-models.png)

| Provider type | What you need |
|---|---|
| Built-in provider | No key required when available on your plan |
| Hosted model provider | API key from the provider's console |
| Local model provider | Local URL - the model server must be running |
| Enterprise or cloud provider | Access credentials, region, account details, or API token |

Click **Select** next to **LLM Model**. Choose a provider, supply any credentials or server URL it requires, then select your model and click **Continue**. You can also choose an **Embedding Model** for features that use embeddings.

If your team needs a provider that is not listed, see [Custom LLM Provider](../../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md) for the build path. For provider configuration, see [LLM Settings](./Settings/02_llm-settings.md).

## Workspace And Theme

The **Review Settings** screen lets you configure:

![Review settings](/img/onboarding-review-settings.png)

- **Default workspace**. Use **Browse** or **Change** to select the folder where you organize projects. See [Workspaces](./01_workspace-and-project-management/02_workspaces.md).
- **Open From Terminal**. Click **Install** to add `codebolt` to your `PATH`. This is optional and can be done later in Settings.
- **Theme**. Choose the starting app theme. See [Themes](./Settings/08_themes.md).

Click **Continue** to save the workspace and open the project dashboard.

## Next

Continue to [Open a project](./00_get-started.md#open-a-project) to run your first agent task.
