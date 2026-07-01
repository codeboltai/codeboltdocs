---
sidebar_position: 0
title: Getting Started
description: Install the desktop app, complete onboarding, and run your first agent task.
---

import { TryItCard } from '@site/src/components/TryItCard';

# Desktop App - Getting Started

Get the desktop app installed and configured, then run your first agent task. About 5-10 minutes end to end.

## Setup Path

1. [Download and install](https://codebolt.ai) the Desktop App for your operating system.
2. [Complete onboarding](./01_onboarding.md).
3. Open a project.
4. Run your first agent.

Use the macOS, Windows, or Linux package from the [Codebolt website](https://codebolt.ai). On first launch, Codebolt starts the local server and opens the sign-in flow.

## Open A Project

After onboarding, you land on the **project dashboard**. Click **Open project** and pick any folder, or create a new empty folder for a clean start.

Codebolt opens the project in the default development layout with the code editor and chat panels.

## Run Your First Agent

A chat panel opens. Ask the agent to understand your codebase first:

<TryItCard prompt="Read the codebase and give me a one-paragraph summary of what this project does." />

Watch it read files in real time. Then try something that makes a change:

<TryItCard prompt="Add a short CONTRIBUTING.md explaining how to run the project locally." />

The agent reads your existing README, writes the file, and shows you the diff.

## Review And Continue

When an agent makes a change, review the updated files and diffs before you continue. You can:

- **Keep it** - leave the file as written and commit when you are ready.
- **Edit it** - make manual changes in the code editor.
- **Iterate** - type a follow-up request in chat.

That's the core loop. Every other feature builds on this.

**Next:** [Workspace and Project Management](./01_workspace-and-project-management/01_overview.md) · [Chat](../../03_chat/01_overview.md) · [Agents](../../04_agents/01_what-is-an-agent.md)
