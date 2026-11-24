---
sidebar_position: 6
title: Where an Environment Runs
description: Understand which machine runs your task and how to find its changes.
---

# Where an environment runs

When you send a task, the environment determines which machine executes it. A local environment uses the project on your machine. A cloud sandbox runs on its configured provider. A runner-hosted environment uses the machine connected as the runner node.

To check where a task will run, open **Environments**, select the environment, and review its provider and project path. To run work on your own hardware from the portal, start the runner daemon on that machine. It connects out to Codebolt Cloud over WebSocket and retries if the connection drops. Keep the runner machine online while the task runs. See [Runner Nodes](../02_surfaces/06_cloud/04_running-agents/05_runner-nodes.md).

To find the resulting files, check the environment’s sync mode. With **Git**, inspect the configured branch. With **Workspace Sync**, inspect the review request in the parent workspace. With **No sync**, inspect the execution environment itself. Available modes depend on the provider.

See [Create and Manage Environments](./02_configuring-environments.md) and [Code Sync Between Environments](./04_code-sync.md).
