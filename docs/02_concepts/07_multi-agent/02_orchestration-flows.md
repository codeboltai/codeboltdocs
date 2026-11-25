---
sidebar_position: 12
title: Orchestration Flows
description: Follow the nodes and connections in a Codebolt visual flow agent.
---

# Orchestration Flows

A visual flow agent stores its nodes, settings and connections in a JSON `.agentflow` file. A connection can carry data or trigger the next node. The editor lets you inspect both before running the agent in Chat.

## Example: reply to a chat message

The basic message flow in Codebolt’s application tests uses three nodes:

| Node | Connection | Role |
|---|---|---|
| `events/onmessage` | `message_received` → `onTrigger` on the send node | Triggers the reply when a user sends a message. |
| `basic/const_string` | `value` → `message` on the send node | Supplies the text of the reply. |
| `codebolt/chat/sendmessage` | Receives both connections | Sends the text to Chat. |

The example sets the string to `agentflow-basic-smoke-ok`. Open the flow editor, change the string, save the graph and send the agent another message. The next reply should contain your new text.

For the full JSON graph and editor steps, see [Agent Flows](../../04_build-on-codebolt/08_multi-agent-orchestration/04_agent-flows.md). For delegation patterns that choose workers during a run, see [Multi-Agent Patterns](./01_multi-agent-patterns.md).
