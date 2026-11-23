---
sidebar_position: 6
title: Orchestrators
description: Delegate work to subagents and follow related work in Thread Coordination.
---

# Orchestrators

In CodeBolt, orchestration is a pattern in which a parent agent divides work among subagents and combines their results. Start with a parent agent in chat and use [subagent delegation](../07a_parallel-agents/05_sub-agent.md) to run related work.

## Follow delegated work

In the parent chat, select **Agent Threads** in the activity area. Use **Open thread** to inspect a child conversation and **Stop child thread** to stop an active child thread. Select **View in panel** to open its coordination view beside Chat. For a subagent running in the same thread, use **Execution → Running Agent → Hierarchy View**.

Use [Jobs & Job Groups](./02_jobs.md) to track shared work items and [Swarm Management](./05_swarm-management.md) to manage a swarm.

## See also

- [When to use multiple agents](../../04_build-on-codebolt/08_multi-agent-orchestration/02_when-multi-agent.md)
- [Multi-agent coordination](./01_overview.md)
