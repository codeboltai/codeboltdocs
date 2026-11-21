---
sidebar_position: 2
title: Quickstart
description: Set up Codebolt Desktop, run your first agent task, and review the resulting change.
---

Ask an agent about your project, make one small edit, and review the diff in Codebolt Desktop.

**Already set up?** [Open a project](#open-a-project) to send your first prompt.

You can also follow the [CLI Quickstart](../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md) or the [Cloud Quickstart](../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md).

## 1. Install and set up Codebolt {#setup-path}

Install and open Codebolt Desktop. Sign in if prompted, then choose an LLM model and a default workspace if the setup wizard opens. Setup is complete when the project dashboard shows **Open project**. [Installation and Onboarding](../02_using-codebolt/02_surfaces/02_desktop-app/01_onboarding.md)

## 2. Open a project {#open-a-project}

On the project dashboard, click **Open project** and select the folder you want the agent to explore. The default layout opens the editor and **Chat**. If Chat is hidden, click the chat bubble in the bottom bar.

To complete the edit and diff exercise in the same chat, choose a Git repository with a tracked `README.md` or another tracked Markdown file.

## 3. Ask about the project {#run-your-first-agent}

Paste this prompt into **Chat** and click **Send**.

```text
What does this project do? Point me to two files that explain how it works. Do not edit any files.
```

Open one of the files the agent names to check its explanation against the project.

## 4. Make and review one change {#review-and-continue}

Use `README.md` if it has no pending edits, or substitute another tracked Markdown file in the prompt. If you opened a folder without Git, open a Git repository and ask the first question there before continuing.

Click the branch icon in the editor sidebar to open **Source Control**. Note any files already listed under **Changes**. The group may be hidden if there are no changes. Opening a project can add `.codebolt` and `.worktree` entries to `.gitignore`.

Send this follow-up in the same chat.

```text
Add a two-sentence project overview to README.md based on what you found. Keep the existing content and edit only README.md. Do not commit the change.
```

If Codebolt asks for approval, review the requested action and approve it if it matches the edit you asked for. [Approval requests](../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md#approval-requests)

When the agent finishes, select the file you asked it to edit under **Changes** in **Source Control** to open its diff. Check that the two sentences describe the project accurately and that the edit kept the existing content. Verify that the requested file is the only new entry in the list.

If you want to restore project files from a checkpoint attached to a chat message, see [Checkpoints and Rollback](../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md).
