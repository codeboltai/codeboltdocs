---
sidebar_position: 2
title: Running a Swarm
description: A swarm is a dynamic group of cooperating agents. The current user-facing control surface is the desktop product, not the older swarm CLI commands.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running a Swarm

![Running a Swarm](/productImages/multiagentusage/running_swarm.png)

A **swarm** is a dynamic group of agents cooperating on a task. Unlike a fixed flow, a swarm can change shape while it runs.

## Starting a swarm run

The current user-facing swarm experience is primarily desktop-driven. Use the execution and orchestration surfaces exposed by your build to start and monitor swarm-style work.

The current CLI does not expose the older swarm launch flows documented in earlier drafts.

## Watching a swarm

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the running-agent and related execution surfaces in the desktop app to inspect orchestrators, workers, and nested runs.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose dedicated swarm tree or swarm watch commands.

What it can provide is limited supporting inspection:

```bash
codebolt command agents running
codebolt command threads list
codebolt command threads steps <threadId>
codebolt command jobs list
```

</TabItem>
<TabItem value="api" label="HTTP API">

If your runtime exposes server APIs for orchestration, use those deployment-specific endpoints rather than the removed CLI examples from older drafts.

</TabItem>
</Tabs>

## Observing coordination

Swarm-style coordination can involve direct messages, shared state, or indirect coordination through shared artifacts. In the current user-facing product, the best place to observe this is the desktop execution UI and any run-detail panels your build exposes.

The current CLI does not expose the older event-stream commands from previous drafts.

## Stopping a swarm

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

Use the stop controls provided by the desktop execution surfaces for the orchestrator or top-level run.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose dedicated swarm stop commands.

The only documented stop control in `packages/cli` is:

```bash
codebolt command agents stop --id <agentId>
```

</TabItem>
</Tabs>

## Failed workers and policies

Worker failures are handled by the orchestrator or flow logic that owns the swarm. Typical policies still include fail-fast, best-effort, and retry, but the control surface for understanding those outcomes is the desktop UI rather than the removed swarm CLI.

## See also

- [Multi-Agent Usage Overview](./01_overview.md)
- [Reading a Flow](./03_reading-a-flow.md)
