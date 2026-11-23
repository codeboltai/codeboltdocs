---
sidebar_position: 2
title: Running a Swarm
description: Configure, start, and inspect a swarm in the desktop app.
---

# Running a Swarm

![Running a Swarm](/productImages/multiagentusage/running_swarm.png)

## Starting a swarm run

1. Open **Execution → Distributed Swarm Management**.
2. Open a swarm or choose **New** to create one.
3. In **Config**, add and enable the agents you want to use, then save the configuration.
4. Select **Start Swarm**, choose the number of instances of each agent, and start the run. The dialog checks the configured concurrency limit.

## Watching a swarm

Open **Workers** to see its workers and open their threads. Use **Jobs** for the swarm's configured job group. The swarm also has views for activity, spawn requests, and termination requests.

You can also list threads and jobs from the CLI.

```bash
codebolt command thread list
codebolt command job list
```

## See also

- [Swarm Management](../07c_agent-coordination/05_swarm-management.md)
- [Running Parallel Agents](../07a_parallel-agents/02_running-parallel-agents.md)
