---
sidebar_position: 9
title: Remote Execution
description: Choose a runtime for agent work and inspect its execution and sync behavior.
---

# Remote Execution

A CodeBolt environment gives a project a place to run agent work. You can select a connected runtime or create an environment with a provider. The agent runs in the selected execution location.

## Start a run

- In the desktop app, use [Environment Management](../../02_using-codebolt/08a_environments/02_environment-management.md) to create or select an environment before sending the task.
- In Cloud, open [Remote Chat](../../02_using-codebolt/02_surfaces/06_cloud/04_running-agents/01_remote-chat.md) and choose the environment from the composer.
- To run the CodeBolt runtime on a machine you manage, see [Running the Server](./02_running-the-server.md).

## Inspect the run

Follow the agent's messages in its thread. Use [Environment Debug](../../03_guides/trubleshooting/09_environment-debug.md) for provider startup and connection details. Check the environment's sync mode before applying the resulting changes. [Code Sync Between Environments](../../02_using-codebolt/08a_environments/04_code-sync.md) explains the review paths.
