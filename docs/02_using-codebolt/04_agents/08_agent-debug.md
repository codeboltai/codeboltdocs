---
sidebar_position: 8
title: Agent Debug
description: Find a recorded desktop agent execution and inspect its captured output.
---

# Agent Debug

Open **Debug → Agent Debug** to inspect output captured from agents that Codebolt launches. For a self-executed agent, check the terminal that started its process.

## Agent Debug Panel

![Agent Debug Panel](/productImages/agentobservability/agentDegug.png)

1. Find the instance under **Running** or **History**. Use **Status** and **Type** to narrow the list.
2. Select the instance to show its captured output in the terminal pane. A running instance can continue adding output there.
3. Read the output leading up to an error. For example, if the agent stopped before responding, look for a startup or configuration error in the failed instance.

## Related views

- [AI Requests](../02_surfaces/02_desktop-app/03_chat/08_ai-requests.md) for recorded model requests.
- [Narrative Graph](../02_surfaces/02_desktop-app/03b_code-and-terminal/07_narrative-graph.md) for recorded file operations and commands.
- [Subagents](../07a_parallel-agents/05_sub-agent.md) for following a delegated execution or child thread.
