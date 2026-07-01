---
sidebar_position: 0
title: Quick Start
description: Install the desktop app, complete onboarding, and run your first agent task.
---

import { TryItCard } from '@site/src/components/TryItCard';

# Desktop App - Quick Start

Get the desktop app installed and configured, then run your first agent task. About 5-10 minutes end to end.

## Setup Path

1. [Download and install](https://codebolt.ai) the Desktop App
2. [Complete onboarding](./01_onboarding.md).
3. Open a project.
4. Run your first agent.

Use the macOS, Windows, or Linux package from the [Codebolt website](https://codebolt.ai). On first launch, Codebolt starts the local instance and opens the sign-in flow.

## Open A Project

After onboarding, you land on the **project dashboard**. Click **Open project** and pick any folder, or create a new empty folder for a clean start.

Codebolt opens the project in the default development layout with the code editor and chat panels.

## Run Your First Agent

Use the chat panel to ask the agent for any task you want to run.

<TryItCard prompt="Review this project and help me with the next task." />

You can ask for code changes, explanations, setup help, debugging, tests, documentation, or project review.

<TryItCard prompt="Help me improve this project." />

If the agent changes files, review the generated diff before continuing.

## Review And Continue

When an agent makes a change, review the updated files and diffs before you continue. You can:

- **Keep it** - leave the file as written and commit when you are ready.
- **Edit it** - make manual changes in the code editor.
- **Iterate** - type a follow-up request in chat.

That's the core loop. Every other feature builds on this.

**Next:** [Workspace and Project Management](./01_workspace-and-project-management/01_overview.md) · [Chat](./03_chat/01_overview.md) · [Agents](../../04_agents/01_what-is-an-agent.md)
