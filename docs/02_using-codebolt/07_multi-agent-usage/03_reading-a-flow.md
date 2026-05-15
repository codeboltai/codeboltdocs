---
sidebar_position: 3
title: Reading a Flow
description: Understand what a multi-stage agent flow is doing while it runs, using the current desktop product surfaces rather than the removed flow CLI commands.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reading a Flow

Understanding what an agent flow is doing while it runs, or after it has finished, is primarily a desktop experience in the current product.

## Viewing a flow run

<Tabs groupId="surface">
<TabItem value="desktop" label="Desktop" default>

When you run a flow, the desktop UI opens a dedicated view with node status, timing, and drill-down into input, output, and related run details.

</TabItem>
<TabItem value="cli" label="CLI">

The current CLI does not expose the older dedicated flow-inspection and replay command family from previous drafts.

Use the CLI only for adjacent server-backed inspection such as:

```bash
codebolt command agents running
codebolt command threads list
codebolt command threads steps <threadId>
codebolt command jobs list
```

</TabItem>
</Tabs>

## The flow view

In the desktop product, a flow view typically lets you inspect:

- node status
- elapsed time
- stage relationships
- per-stage drill-down into related activity

## Node detail

The important user-facing questions remain the same:

- which agent handled the stage
- what input it received
- what output it produced
- whether it spawned additional work
- where it failed or stalled

## Understanding flow structure

Flow definitions still live in configuration and orchestration code, but the current CLI does not expose the older flow-definition helper documented in previous drafts.

## Common questions

### "Why is it stuck at this node?"

Check the current node state, recent activity, and whether downstream work is waiting on another stage or on user input.

### "Why did it take a different path than I expected?"

Check the previous stage output and the routing logic that connects stages.

### "Why are there so many iterations?"

Feedback loops and retry logic can cause repeated execution. Investigate the stage that keeps re-entering the loop.

## See also

- [Multi-Agent Usage Overview](./01_overview.md)
- [Running a Swarm](./02_running-a-swarm.md)
