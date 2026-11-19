---
sidebar_position: 3
title: Running Agents
description: Start agent work from chat surfaces or from the CLI modes that actually exist today.
---

# Running Agents

![Running Agents](/productImages/agents/running_agent.png)

Codebolt supports more than one way to run agent work, but the available controls depend on the surface. The current CLI does not expose the older task-oriented runtime flow from previous drafts.

## Starting an interactive run

Open a chat tab, pick an agent from the dropdown, and send a message.

```text
[tab] agent: generalist ▾   model: claude-sonnet-4 ▾
user: Rename getUser to fetchUser everywhere
```

You see the steps inline as the run progresses.

## Starting from the CLI

Use a headless prompt to run one task:

```bash
codebolt --prompt "Rename getUser to fetchUser" --project /path/to/project
```

For a running server, use [Agent Commands](../02_surfaces/04_cli/02_cli-commands/02_agent-commands.md) to list available agents and start an agent task through the gateway.

## Interrupting to add information

If the agent is mid-task and you need to add context, send another message in the same thread instead of starting over. The next deliberation step uses the updated thread context.

## Running multiple agents at once

- Different chat threads can use different agents at the same time.
- Child agents can be spawned from within a larger run. See [Agent run end-to-end](../../04_build-on-codebolt/02_architecture/04_data-flow-walkthroughs/agent-run-end-to-end.md).
- Swarm-style coordination is covered separately in [Running a swarm](../07_multi-agent-usage/02_running-a-swarm.md).

## Stopping a running agent

Use the stop control in chat or open **Execution → Running Agent** and stop the active execution.

## Agent discovery from the CLI

Run `codebolt command agent list` against a running CodeBolt server.

## Current limitation

The current `packages/cli` implementation does not provide the older task-run, run-watch, history, force-kill, or flow-execution command families from previous drafts.

If you need those capabilities, use the desktop or CLI interface surfaces, or extend command mode against the running server APIs.
