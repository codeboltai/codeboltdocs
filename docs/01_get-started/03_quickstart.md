---
sidebar_position: 2
title: Quickstart
description: Set up Codebolt Desktop, run your first agent task, and review the resulting change.
---

Install Codebolt Desktop, open a project, and ask an agent how your code works. If you’d like to try an edit, ask the agent to update your README, then review the change in Source Control.

Already have a project open? [Ask your first question](#run-your-first-agent).

## Before you begin

Have a project folder ready. You can explore any code project in the first three steps.

Working in a terminal or browser? [Get started with the CLI](../02_using-codebolt/02_surfaces/04_cli/01_cli-interface/00_get-started.md) or [run your first agent in Codebolt Cloud](../02_using-codebolt/02_surfaces/06_cloud/00_get-started.md).

## 1. Install and set up Codebolt {#setup-path}

Choose the installer for your operating system and processor, then install and open the app. [Download Codebolt Desktop](https://codebolt.ai/download/)

Sign in if prompted. If the setup wizard opens, choose a model and confirm your default workspace. If your provider asks for credentials, see [Choose a model](../02_using-codebolt/02_surfaces/02_desktop-app/01_onboarding.md#provider-selection).

When the dashboard shows **Open project**, you’re ready to continue.

## 2. Start your first session {#open-a-project}

On the project dashboard, click **Open project** and select any code project you want to explore. The default layout opens the editor and **Chat**. If Chat is hidden, click the chat bubble in the bottom bar.

## 3. Ask your first question {#run-your-first-agent}

Paste this prompt into **Chat** and click **Send**.

```text
What does this project do? Point me to two files that explain how it works. Do not edit any files.
```

Look in **Chat** for a project summary and two file paths. Open one of those files in the editor and check whether its contents support the explanation. That completes your first agent task.

## 4. Make your first edit (optional) {#review-and-continue}

For this exercise, use a Git project with a tracked `README.md` that has no pending edits. You can also choose another tracked Markdown file with no pending edits and use its path in the prompt.

Send this follow-up in the same chat.

```text
Add a two-sentence project overview to README.md based on what you found. Keep the existing content and edit only README.md. Do not commit the change.
```

If Codebolt asks for approval, review the requested action and approve it if it matches the edit you asked for. [Approval requests](../02_using-codebolt/05b_guardrails-and-settings/01_guardrails.md#approval-requests)

## 5. Review the change with Git

When the agent finishes, click the branch icon in the editor sidebar to open **Source Control**. Under **Changes**, select `README.md` (or the file you chose) to open its diff. Look for the two added sentences and check that they describe your project accurately. The surrounding text should be intact.

If `.gitignore` also appears under **Changes**, opening the project can add entries for `.codebolt` and `.worktree`.

If you want to restore project files from a checkpoint attached to a chat message, see [Checkpoints and Rollback](../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md).

## 6. Investigate a bug or plan a feature

Pick a problem from your own project. Tell the agent what you did, what happened, and what you expected. For example, if a form accepts an empty field, try this prompt.

```text
This form accepts an empty name. Find where the form validates input and suggest the smallest fix. Show me the relevant code before editing.
```

For a feature, name the behavior you want and ask which files would need to change. Review the plan before asking the agent to implement it.

## 7. Try other workflows {#try-another-task}

Continue in the same chat with a follow-up question.

- **Explore the project.** “Where does this project start running? Show me the entry point and explain what it calls first.”
- **Review your edit.** “Check the two sentences you added against the code. Which file supports each sentence?”

## Essential Desktop controls

| To | Use |
|---|---|
| Bring the conversation back into view | Click the chat bubble in the bottom bar. |
| Give the agent a specific file | Type `@` in Chat and choose the file. [Context and mentions](../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/03_context-and-at-mentions.md) |
| Inspect an edit | Open **Source Control → Changes** and select the file. |

## Tips for your first session

Give the agent a way to check its work. For a bug, describe how to reproduce it. For an edit, name the file and describe what you expect to see in the diff.

## What’s next?

Explore [Guides and tutorials](../03_guides/01_overview.md) for more project walkthroughs.

To understand what happened during your task, see [How agents, models, and tools work together](./04_core-concepts/02_start-simple.md).

## Getting help

If you get stuck during sign-in or model setup, follow [Installation and Onboarding](../02_using-codebolt/02_surfaces/02_desktop-app/01_onboarding.md).
