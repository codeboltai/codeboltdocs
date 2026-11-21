---
sidebar_position: 0
title: Get Started
description: Connect a cloud environment and send your first agent task from the Codebolt portal.
---

# Cloud Quickstart

Run your first agent task in a browser. You'll need a Codebolt account and access to a cloud sandbox provider or an existing environment.

## 1. Open Remote Chat

Sign in to the [Codebolt portal](https://portal.codebolt.ai), then open **Agents → Remote Chat** and start a new conversation.

## 2. Choose where the agent runs

1. In the composer, select an existing project or use **Create New: Blank** to create one.
2. Open the environment picker. Choose an available environment or select **New environment** and pick an enabled cloud sandbox provider.
3. Choose an **Agent** in the composer.

If you need to enable a provider, see [Runtimes & Providers](./04_running-agents/04_runtimes-and-providers.md). To run on your own machine, see [Connect a local runtime](./04_running-agents/01_remote-chat.md#mode-2--local-runtime-connect-your-machine-to-the-cloud).

## 3. Send a task and verify the result

Try this in your first message. It works with a blank project too.

```text
Tell me which directory you're working in and list its top-level files. Do not modify files.
```

Send the message when the connection shows **Live**. If you're starting a new sandbox, Remote Chat provisions it on the first send. Look for the agent's reply in the conversation. It should report a directory and either list the files it found or say the directory is empty.

## Next steps

- [Remote Chat](./04_running-agents/01_remote-chat.md) covers repository setup, threads, artifact previews, and stopping a sandbox.
- [Cloud Platform](../../../01_get-started/02f_platforms/04_cloud.md) explains cloud sandboxes and connected runtimes.
- [Marketplace Publishing](./03_registry/02_marketplace-publishing.md) covers publishing agents, plugins, and apps.
