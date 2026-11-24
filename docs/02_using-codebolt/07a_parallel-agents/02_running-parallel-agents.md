---
sidebar_position: 2
title: Running Parallel Agents
description: Run independent threads or coordinate child agents and swarm workers.
---

# Running Parallel Agents

Run independent tasks in separate Chat tabs, ask a parent agent to delegate part of a task, or start several workers in a swarm.

## Run two agents in parallel

1. In **Chat**, choose an agent and send a request. For example, ask it to read the README and list missing setup steps.
2. While that request is running, click **New Chat** in the header. Choose an agent and ask it to list the existing tests for a module.
3. Use the **Open threads** menu in the Chat header to switch between the two conversations and see which are running. Each conversation has its own messages. If you ask both agents to edit files in the same project, give them different files to work on.

## Delegate to a child agent

Choose a parent agent that supports delegation. In Chat, ask it to hand a specific part of the work to a subagent. For example, ask the parent to delegate a review of the README while it inspects the test layout. To give the delegated work its own conversation, ask the parent to start a child thread in the background.

See [Subagents](./05_sub-agent.md) for prompts to try in Chat and where to check that the parent started the delegated work.

## Start workers in a swarm

Use a swarm when several instances of configured agents should work on a shared job group. Ask an agent with swarm tools to start the swarm from Chat, or start it yourself from **Execution → Distributed Swarm Management**. Supply an initial prompt or a job before starting its workers. Open **Workers** to follow an individual worker’s thread and **Jobs** to see the group’s work. [Running a Swarm](../07_multi-agent-usage/02_running-a-swarm.md)

## Monitoring concurrent runs

### Running Agent panel

Open **Execution → Running Agent** in the bottom bar to check run status. Use **Hierarchy View** to inspect parent and child agent executions.

### Background Agents panel

Open via **Execution dropdown → Background Agents**. This is a dedicated panel for tracked background runs, with active items, history, and start/stop controls.

See [Background Agent](./04_background-agent.md) for when runs move into this panel and how to monitor them.

## Limits

For a swarm, set the worker count and concurrency limit in its configuration. The server rejects starts that exceed the per-agent or swarm limits.

## Stopping parallel runs

Use the stop control in the chat tab or open **Execution → Running Agent** and stop the relevant execution.
