---
sidebar_position: 2
title: Running a Swarm
description: Start a swarm from an agent in Chat or from the desktop panel, then inspect its workers and jobs.
---

# Running a Swarm

A running agent can start a swarm on your behalf. You can also configure and launch the same swarm yourself from the desktop panel.

## Start a swarm from Chat

Choose an agent with access to the swarm tools. If you already have a configured swarm, give the agent its ID. For example:

> Start swarm `<swarm-id>` with its saved workers. Use the existing jobs in its job group and tell me whether the workers started.

For a new swarm, describe the objective and what each worker should deliver. For example:

> Create a swarm with two instances of my installed review agent. Give one worker a job to check the README setup steps and the other a job to check the test instructions. Start the swarm and report its execution status.

The agent can use `swarm_create` to save a new swarm and `swarm_start` to launch it. For an existing swarm, passing just `swarm_id` uses its saved worker counts. The swarm needs an initial prompt or at least one job. An initial prompt creates one root job when the group is empty. Give the workers separate jobs if they should have independent assignments from the start.

A successful start request means startup was accepted. The agent can use `swarm_get_execution_status` to check worker counts and launch errors. In custom agent code, the corresponding calls are `codebolt.swarm.startSwarm(swarmId)` and `codebolt.swarm.getExecutionStatus(swarmId)`. [Swarm SDK reference](../../05_reference/02_codeboltjs/10_api-access/swarm/index.md)

## Start a swarm from the desktop panel

![Running a Swarm](/productImages/multiagentusage/running_swarm.png)

1. Open **Execution → Distributed Swarm Management**.
2. Open a swarm or choose **New** to create one.
3. In **Config**, add and enable the agents you want to use, then save the configuration.
4. Give the workers a task. Enter an **Initial Prompt** in **Config** and save, or add a job to the swarm’s configured job group. If the group is empty, Codebolt creates the first job from the prompt.
5. Select **Start Swarm** and choose how many instances of each enabled agent to start. Keep each count within that agent’s maximum and the total within both the swarm size and concurrency limits. The server rejects an over-limit request. Reduce the counts or save higher limits before retrying.

## Watching a swarm

Open **Workers** to see its workers and open their threads. Use **Jobs** for the swarm's configured job group. The swarm also has views for activity, spawn requests, and termination requests.

If the run was interrupted, open its detail view. **Resume Swarm** is available for a run in an error state or an eligible previously active run that is now idle. Use **Workers** and **Jobs** to check the recovered threads and remaining work.

You can also list threads and jobs from the CLI.

```bash
codebolt command thread list
codebolt command job list
```

## See also

- [Swarm Management](../07c_agent-coordination/05_swarm-management.md)
- [Running Parallel Agents](../07a_parallel-agents/02_running-parallel-agents.md)
