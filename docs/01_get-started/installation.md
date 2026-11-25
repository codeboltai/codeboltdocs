---
title: Installation
description: Set up Codebolt Desktop or the CLI, or connect to Codebolt Cloud from your browser.
---

# Installation

Choose [Desktop](#desktop) to work in the editor, [Terminal (CLI)](#terminal) to work from a shell, or [Cloud](#cloud) to use Codebolt in your browser.

## Desktop

1. **Install the app.** Choose the installer for your operating system and processor. On macOS, choose `arm64` for Apple silicon or `x64` for Intel. Run the installer and open Codebolt. [Download Codebolt Desktop](https://codebolt.ai/download/)
2. **Sign in if prompted.** Select **Sign In** on the welcome screen, finish signing in through your browser, then return to the app. If you already see **Open project**, skip to the project step below.
3. **Choose a model.** If the setup wizard opens, select **LLM Model** on **Select Default AI Models**. Choose a provider and model. A hosted provider may ask for an API key. A local provider needs the URL of your running model server. Once the model name appears, select **Continue**. [Model setup and credentials](../02_using-codebolt/02_surfaces/02_desktop-app/01_onboarding.md#provider-selection)
4. **Confirm your workspace.** On **Review Settings**, check the **Default Workspace** folder and select **Continue**. You’ll choose the specific project to open on the next screen.

**Open your project.** On the dashboard, select **Open project** and choose an existing project folder. When its files appear in the editor, you’re ready to explore them in Chat. [Ask your first question](./03_quickstart.md#run-your-first-agent)

## Terminal (CLI) {#terminal}

**Check the prerequisites.** Open a terminal and run these commands. Each should print a version number. If either command is missing, install Node.js with npm before continuing.

```bash
node --version
npm --version
```

**Install the standalone CLI.**

```bash
npm install -g codebolt
```

**Verify the command.** Open a new terminal and run:

```bash
codebolt --version
codebolt --help
```

Look for a version number and the options `--server` and `--connect`. If the help only describes opening a folder in Desktop, your shell found the Desktop launcher. Put npm’s global executable directory earlier in your `PATH`, then open a new terminal and check again. [CLI installation and troubleshooting](../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md#1-install-and-verify)

**Start in your project.** From the folder you want to work on, run:

```bash
codebolt --project .
```

The local server starts and the terminal interface opens. Follow any prompts for sign-in, model, or agent setup. Once the **Chat** tab is ready, continue with the [CLI Quickstart](../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md#3-send-a-first-task).

## Cloud

You’ll need a Codebolt account and either an available environment or access to an enabled cloud sandbox provider. The environment determines where the agent runs and which files it can access.

1. **Open Remote Chat.** Sign in to the [Codebolt portal](https://portal.codebolt.ai), open **Agents → Remote Chat**, and start a conversation.
2. **Choose a project.** Select an existing project in the composer, or select **Create New: Blank** to try Codebolt with an empty project.
3. **Choose an environment and agent.** In the environment picker, select an available environment or choose **New environment** and select an enabled provider. Then choose an **Agent** in the composer. If you need to enable a provider, see [Runtimes and Providers](../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/04_runtimes-and-providers.md).
4. **Verify the connection.** When Remote Chat shows **Live**, ask the agent to list the top-level files in its working directory. A new sandbox is provisioned on the first send. Check that the reply describes the project you selected. For a blank project, an empty listing is expected. [Cloud Quickstart](../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md)
