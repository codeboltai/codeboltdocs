---
sidebar_position: 3
title: Running Agents
description: Start agent work from chat surfaces or from the CLI modes that actually exist today.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running Agents

![Running Agents](/productImages/agents/running_agent.png)

Codebolt supports more than one way to run agent work, but the available controls depend on the surface. The current CLI does not expose the older task-oriented runtime flow from previous drafts.

## Starting an interactive run

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Open a chat tab, pick an agent from the dropdown, and send a message.

```text
[tab] agent: generalist ▾   model: claude-sonnet-4 ▾
user: Rename getUser to fetchUser everywhere
```

You see the steps inline as the run progresses.

</TabItem>
<TabItem value="cli" label="CLI">

The CLI currently supports two practical patterns:

1. Headless prompt execution with `--prompt`
2. Agent process management through `codebolt command agents ...`

### Headless agent prompt

```bash
codebolt --prompt "rename getUser to fetchUser everywhere" --agent generalist
```

Relevant options from `packages/cli/src/index.ts`:

```bash
codebolt --prompt "..." \
  --agent <name> \
  --project /path/to/project \
  --provider <provider> \
  --model <model> \
  --api-key <key> \
  --api-url <url>
```

This opens the normal runtime in headless mode, sends one prompt over WebSocket, and streams agent output to stdout.

### Agent management commands

The structured CLI agent commands live under `codebolt command agents`, not `codebolt agent`.

`codebolt agent` is a different command family used for agent extension creation and publishing.

```bash
codebolt command agents list
codebolt command agents running
codebolt command agents start --id <agentId> [--name <name>]
codebolt command agents stop --id <agentId>
codebolt command agents config <name>
```

Those commands talk to a running server and manage agent processes. They do not accept task text like `--task`, and they do not provide `watch`, `detach`, or `history` flags.

</TabItem>
<TabItem value="tui" label="TUI">

Use the Chat tab, switch to the conversation you want, choose the active agent, and type the task in the composer. The run appears inline in the message stream.

</TabItem>
</Tabs>

## Interrupting to add information

If the agent is mid-task and you need to add context, send another message in the same thread instead of starting over. The next deliberation step uses the updated thread context.

## Running multiple agents at once

- Different chat threads can use different agents at the same time.
- Child agents can be spawned from within a larger run. See [Agent run end-to-end](../../04_build-on-codebolt/09_internals/04_data-flow-walkthroughs/agent-run-end-to-end.md).
- Swarm-style coordination is covered separately in [Running a swarm](../07_multi-agent-usage/02_running-a-swarm.md).

## Stopping a running agent

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the stop controls in the active chat or run UI.

</TabItem>
<TabItem value="cli" label="CLI">

The current command router supports:

```bash
codebolt command agents stop --id <agentId>
```

The CLI code in `packages/cli` does not currently expose a separate `kill` command for agent runs.

</TabItem>
<TabItem value="tui" label="TUI">

Stop the run from the active TUI thread controls.

</TabItem>
</Tabs>

## Agent discovery from the CLI

To find agent IDs and inspect what is available from the current server:

```bash
codebolt command agents list
codebolt command agents local
codebolt command agents featured
codebolt command agents recommended
codebolt command agents running
```

These commands are implemented in `packages/cli/src/commands/agents.ts`.

## Current limitation

The current `packages/cli` implementation does not provide the older task-run, run-watch, history, force-kill, or flow-execution command families from previous drafts.

If you need those capabilities, use the desktop or TUI surfaces, or extend the CLI against the running server APIs.
