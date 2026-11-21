---
sidebar_position: 2
title: Quickstart
description: Set up Codebolt Desktop, run your first agent task, and review the resulting change.
---

This walkthrough uses Codebolt Desktop. You can also start from the [CLI Quickstart](../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md) or the [Cloud Quickstart](../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md).

## Before you begin

- Have a Codebolt account ready, or create one when you sign in.
- Have access to an AI model. Use the built-in provider if it's available on your plan, or have your provider's API key or local model server URL ready.
- Choose an existing Git repository with a `README.md` that you can edit. Start with a clean working tree so it's easy to see what the agent changes.

## 1. Install and set up Codebolt {#setup-path}

1. [Download Codebolt](https://codebolt.ai/download/), install it, and open the app. You can also find macOS and Windows installers under **Assets** on [Codebolt's GitHub releases](https://github.com/codeboltai/codebolt/releases). Choose a release with an installer for your operating system.
2. If prompted, click **Sign In**, finish signing in in your browser, then return to Codebolt. If the project dashboard opens, go to [Open a project](#open-a-project).
3. On **Select Default AI Models**, click **Select** next to **LLM Model**. Choose a provider, configure it if prompted, and select a model. Click **Continue**. The embedding model is optional.
4. On **Review Settings**, confirm your **Default Workspace** folder and click **Continue** to open the project dashboard. The **Open From Terminal** install is optional.

For screenshots and provider requirements, see [Installation and Onboarding](../02_using-codebolt/02_surfaces/02_desktop-app/01_onboarding.md).

## 2. Open a project {#open-a-project}

On the project dashboard, click **Open project** and select your repository folder. The default layout opens the editor and **Chat**. If Chat is hidden, click the chat bubble in the bottom bar.

Click the branch icon in the editor's file sidebar to open **Source Control**. Check which files are already listed under **Changes**. Opening the project can create or update `.gitignore` with entries for `.codebolt` and `.worktree`.

## 3. Ask about the project {#run-your-first-agent}

Paste this prompt into **Chat** and click **Send**.

```text
Explain how this project starts. Name the entry point and two files I should read next. Do not modify files.
```

The reply should name files you can open in the editor. Check at least one of those paths before asking the agent to make a change.

## 4. Make and review one change {#review-and-continue}

Send a follow-up in the same chat.

```text
Add a two-sentence project overview to README.md based on what you found. Keep the existing content and edit only README.md. Do not commit the change.
```

Once the agent finishes, go back to **Source Control**. Select `README.md` under **Changes** to open its diff. Check that the new overview matches the project and that `README.md` is the only new entry compared with what you saw when you opened the project. You can edit the file yourself or ask for a follow-up in Chat.

If you want to restore project files from a checkpoint attached to a chat message, see [Checkpoints and Rollback](../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md).
