---
sidebar_position: 2
title: Background Agents
description: Start, monitor, and stop detached agent runs from the desktop Background Agents panel.
---

# Background Agents

The **Background Agents** panel manages detached agent runs that continue outside the normal chat flow.

Open via: **Execution menu -> Background Agents** or the Panel Selector.

## What you can do

- Start a background agent from installed, remix, or local agents.
- Add an optional task prompt before starting the run.
- View active and historical background agents.
- Expand logs for each run.
- Stop an active background agent.
- Watch live updates through the background-agent WebSocket.

## Backing server features

The desktop panel uses `/background-agents`, `/background-agents/start`, `/background-agents/:instanceId/stop`, and the `background-agent-ws` WebSocket.

## See also

- [Running Agents](./01_running-agents.md)
- [Background Agent](../../../07a_parallel-agents/04_background-agent.md)

