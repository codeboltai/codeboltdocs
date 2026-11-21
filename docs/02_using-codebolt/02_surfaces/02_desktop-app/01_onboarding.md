---
sidebar_position: 0.5
title: Installation and Onboarding
description: Install Codebolt Desktop, sign in, choose a model, and configure your workspace.
---

# Installation and Onboarding

## Install Codebolt Desktop

Start on the [Codebolt download page](https://codebolt.ai/download/). On [GitHub Releases](https://github.com/codeboltai/codebolt/releases), expand **Assets** for a release and choose the installer that matches your operating system and processor. Available installers vary by release. For example, the macOS `.dmg` files use `arm64` for Apple Silicon and `x64` for Intel.

Open the installer and follow the prompts. When installation finishes, open Codebolt.

## Sign in

If the welcome screen appears, click **Sign In**. Sign in or create a Codebolt account in your browser, then return to the app.

![Codebolt welcome screen](/img/get_started.png)

If you see **Open project** on the project dashboard, you can continue to the [Quickstart](../../../01_get-started/03_quickstart.md#open-a-project). If Codebolt opens the setup wizard, choose a default model.

## Choose a model {#provider-selection}

On **Select Default AI Models**, click **Select** beside **LLM Model**. Choose a provider, supply any credentials or server URL it requires, and select a model.

![Select default AI models](/img/onboarding-default-models.png)

| Provider type | What you need |
|---|---|
| Built-in provider | No key required when available on your plan |
| Hosted model provider | API key from the provider's console |
| Local model provider | URL for a running local model server |
| Enterprise or cloud provider | Access credentials, region, account details, or API token |

Once your model name appears under **LLM Model**, click **Continue**. Choose an **Embedding Model** now or later in Settings if you use features that need embeddings.

If your team needs a provider that is not listed, see [Custom LLM Provider](../../../04_build-on-codebolt/05_plugins/06_custom-ai-providers/02_custom-llm-provider.md) for the build path. For provider configuration, see [LLM Settings](./Settings/02_llm-settings.md).

## Review workspace settings {#workspace-and-theme}

On **Review Settings**, confirm the **Default Workspace** folder. Use **Browse** or **Change** to choose where you organize projects. [Workspaces](./01_workspace-and-project-management/02_workspaces.md)

![Review settings](/img/onboarding-review-settings.png)

- **Open From Terminal** is optional. Click **Install** if you want to open a folder in Desktop with `codebolt .`.
- **Theme** sets the app's appearance. [Themes](./Settings/08_themes.md)

Click **Continue** to save the settings. When the project dashboard shows **Open project**, you're ready to start.

## Next

Continue to [Open a project](../../../01_get-started/03_quickstart.md#open-a-project) to run your first agent task.
