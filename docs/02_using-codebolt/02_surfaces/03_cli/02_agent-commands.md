---
sidebar_position: 2
title: Agent Commands
description: The current CLI splits agent work across headless prompt execution, server-backed inspection commands, and extension authoring commands.
---

# Agent Commands

The current CLI does not use the older task-oriented agent runtime command family from previous drafts.

Agent-related work is split across three surfaces:

- `codebolt --prompt ...` for one-shot headless execution
- `codebolt command agents ...` for server-backed inspection and process control
- `codebolt agent ...` or `codebolt action agent ...` for authoring and publishing agent extensions

## Run a one-shot prompt

Use headless prompt mode when you want to send a single prompt to an agent and exit:

```bash
codebolt --prompt "Explain this codebase in 3 bullet points"
codebolt --prompt "Add a /health endpoint" --agent generalist
codebolt --prompt "Review the current project" --project /path/to/project
```

You can also pass provider settings at launch time:

```bash
codebolt --prompt "Summarize the repo" \
  --agent generalist \
  --provider openai \
  --model gpt-5 \
  --api-key "$OPENAI_API_KEY"
```

## Inspect and manage installed agents

When a Codebolt server is already running, use `codebolt command agents`:

```bash
codebolt command agents list
codebolt command agents running
codebolt command agents local
codebolt command agents featured
codebolt command agents recommended
codebolt command agents config <name>
```

The current process control commands are:

```bash
codebolt command agents start --id <agentId> [--name <name>]
codebolt command agents stop --id <agentId>
```

These commands manage installed or running agent processes through the server. They are not a replacement for the older task-oriented runtime flow documented in previous drafts.

## Inspect related runtime data

Other useful server-backed command groups:

```bash
codebolt command threads list
codebolt command threads messages <threadId>
codebolt command threads steps <threadId>

codebolt command chat list
codebolt command chat messages <threadId>
codebolt command chat steps <threadId>

codebolt command jobs list
codebolt command todos list
codebolt command projects threads
```

Use `--json` with `codebolt command ...` when you need structured output.

## Build and publish agent extensions

The `codebolt agent` command family is currently for agent extension authoring:

```bash
codebolt agent create --framework --name my-agent
codebolt agent create --remix
codebolt agent publish --path ./my-agent
codebolt agent list
codebolt agent create-remote --name my-remote-agent --execution-mode selfExecuted
```

The same commands are also available under `codebolt action agent ...`.

## Current limitation

The current `packages/cli` implementation does not expose the older run-tracing, runtime install, portfolio, and delegation subcommands that existed in previous documentation drafts.

For task execution, use `codebolt --prompt ...`. For richer agent management and observability, use the desktop UI and TUI surfaces.

## See also

- [CLI Overview](./01_overview.md)
- [Headless Mode](../05_headless.md)
- [Running agents](../../04_agents/03_running-agents.md)
