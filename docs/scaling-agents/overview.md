---
title: Scaling Agents Overview
description: Choose how to run agents in parallel, delegate work, coordinate swarm workers, and give agents separate workspaces.
---

# Scaling Agents Overview

If you have two independent tasks, you can start both from Chat. If one task depends on the other, decide who should handle the handoff. You can compare the results yourself, ask a parent agent to delegate, or organize work as jobs for a swarm.

## Start with two Chat threads

In **Chat**, ask an agent to identify missing setup instructions in the README. While it works, select **New Chat** and ask an agent to find the commands the project uses to run its tests. Use **Open threads** to switch between the conversations. You can use the test commands from the second answer to check the setup gaps in the first. [Running Parallel Agents](../02_using-codebolt/07a_parallel-agents/02_running-parallel-agents.md)

Each thread has its own conversation history. Agents working in the same project can still edit the same files. If both tasks need to change the same code independently, give each a separate working directory or isolated environment. [Local and remote execution environments](../02_using-codebolt/08a_environments/01_overview.md)

## Choose how work gets delegated

| When you need to… | Use | Where to follow the work |
|---|---|---|
| Ask a specialist for a result the parent needs in the current conversation | A [subagent](../02_using-codebolt/07a_parallel-agents/05_sub-agent.md#delegate-within-the-current-thread), started by a parent that supports delegation | **Execution → Running Agent → Hierarchy View** |
| Let the parent continue while delegated work has its own conversation | A [background child thread](../02_using-codebolt/07a_parallel-agents/05_sub-agent.md#delegate-to-a-child-thread) | Open **Agent Threads** in the parent conversation |
| Start an independent run and check its status later | A [background agent](../02_using-codebolt/07a_parallel-agents/04_background-agent.md) | **Execution → Background Agents** |
| Start several instances of configured agents for a shared set of jobs | [Swarm workers](../02_using-codebolt/07_multi-agent-usage/02_running-a-swarm.md) | The swarm’s **Workers** and **Jobs** tabs |
| Route incoming messages to the same agent identity over time | A [Virtual Worker](../02_using-codebolt/07a_parallel-agents/06_virtual-workers.md) with routing rules for threads and environments | The worker’s chat and **Recent invocations** |

## Coordinate a swarm

In Chat, ask an agent with swarm tools to create a swarm or start an existing one with its saved workers. To launch it yourself, open **Execution → Distributed Swarm Management** and select **Start Swarm**. Both paths require an initial prompt or a job in the swarm’s job group. If the group is empty, Codebolt creates its first job from the prompt. Choose instance counts within the swarm’s configured limits. [Running a Swarm](../02_using-codebolt/07_multi-agent-usage/02_running-a-swarm.md)

Use jobs to track work and dependencies. When an agent submits changes for review, open the review request to inspect the changes, record feedback, and check for conflicts before merging. [Jobs and Job Groups](../02_using-codebolt/07c_agent-coordination/02_jobs.md) · [Review and Merge](../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md)

## Design a workflow or change where it runs

If you regularly repeat the same handoff, such as planning a change, implementing it, and reviewing the result, use the orchestration guides to decide which agent owns each stage. [Multi-agent Orchestration](../04_build-on-codebolt/08_multi-agent-orchestration/02_when-multi-agent.md)

Choose the execution environment separately. Agents can work on your machine, or you can use a configured remote environment when the task needs another runtime or workspace. [Local Scaling](../01_get-started/04_core-concepts/06_local-scaling.md) · [Cloud Scaling](../01_get-started/04_core-concepts/07_cloud-scaling.md)
