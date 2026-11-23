---
sidebar_position: 5
title: Sub Agent
description: Ask an agent to delegate from Chat and follow the resulting subagent run or child thread.
---

# Subagents

A subagent is a child agent started by a parent agent to handle part of a task. The parent agent can also delegate work to a child thread with its own conversation and status.

## Choose a subagent

Select a parent agent in Chat that supports delegation. To include a specific agent in your request, type `#` and select that agent from the suggestions. The parent decides how to use the agents you mention.

To configure subagents you want available to a remix, open **Agents → Agents → Create Agent → Remix Agent**. Set **Remix From** to a parent agent that supports delegation, choose agents under **Sub Agents**, and use **Custom Instructions** to describe when to delegate to them. Save the remix and select it in Chat.

## Delegate within the current thread

Send the parent a request that identifies the handoff. For example, try this in Chat.

> Ask a subagent to read the README and list missing setup steps. Use its findings to summarize the setup gaps in this conversation.

Open **Execution → Running Agent** and select **Hierarchy View**. When the parent starts the subagent, the child execution appears beneath it.

## Delegate to a child thread

Use a parent agent with access to create background threads. For example, try this in Chat.

> Start a background child thread to list existing tests for the settings module. In this conversation, read the README and summarize how to run the test suite.

In the parent conversation, open **Agent Threads** in the Chat activity area. When the child thread appears, use **Open thread** to read its messages or **Stop child thread** to stop an active run.

## See also

- [Running Parallel Agents](./02_running-parallel-agents.md)
- [Background Agent](./04_background-agent.md)
- [Implement delegation in a custom agent](../../04_build-on-codebolt/03_agent-extensions/08_subagents.md)
