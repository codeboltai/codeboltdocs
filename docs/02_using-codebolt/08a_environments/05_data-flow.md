---
sidebar_position: 5
title: Data Flow In Environments
description: Follow project files and agent results across CodeBolt environments.
---

# Data Flow in Environments

When you send a task, the selected environment determines where the agent runs. The environment's sync mode controls how it receives project files and how work can return to the parent workspace.

1. **Start with the project.** Choose an existing environment or use a provider to create one for that project.
2. **Send work to the environment.** The agent executes there. The thread shows messages and results returned by the runtime.
3. **Review what changed.** Check the destination before applying changes from a review request or pull request. With no sync, work stays in that environment until you transfer it.

The **Environments** and **Environment Debug** panels help identify the provider, runtime, and sync mode. See [Code Sync Between Environments](./04_code-sync.md) for the paths changes can take.
