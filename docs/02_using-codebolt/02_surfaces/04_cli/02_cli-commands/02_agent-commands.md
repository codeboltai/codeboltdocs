---
sidebar_position: 2
title: Agent Commands
description: Run a headless prompt, use agent gateway tools, or author an agent extension.
---

# Agent Commands

## Run a headless prompt

```bash
codebolt --project /path/to/project --prompt "Summarize this project"
```

Pass `--agent <name>` to select an agent or read [Headless Prompt](../03_cli-headless/03_headless-prompt.md) for provider and output options.

## Agent and thread commands

Start a CodeBolt server before using gateway commands. Use the agent ID returned by `agent list` when starting a task through the gateway.

```bash
codebolt command agent list
codebolt command agent start --agent-id AGENT_ID --task "Summarize this project"
codebolt command thread list
codebolt command thread get-messages --thread-id THREAD_ID
```

Open **Execution → Running Agent** in the desktop app to stop a running execution.

## Author agent extensions

```bash
codebolt action agent create --framework --name my-agent
codebolt action agent create --remix
codebolt action agent list
```

See [Agent Action Commands](../../../../05_reference/06_codebolt-cli/actions/agent.md) for authoring and publishing.
