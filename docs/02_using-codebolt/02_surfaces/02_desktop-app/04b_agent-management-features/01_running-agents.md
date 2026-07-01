---
sidebar_position: 1
title: Running Agents
description: Monitor active and historical agent executions in the desktop Running Agents panel.
---

# Running Agents

The **Running Agents** panel shows agent executions for the active project. Use it when you need to see what is running, what finished, what failed, and how agent calls relate to each other.

Open via: **Execution menu -> Running Agents** or the Panel Selector.

## What you can do

- Filter executions by status, swarm ID, and start source.
- Switch between hierarchy, flow, heatmap, icon, and grid-style views.
- Open a running-agent detail panel for a specific execution.
- Stop a controllable agent execution.
- Inspect parent and child agent relationships for nested runs.

## Backing server features

The desktop panel reads agent execution data from endpoints such as `/agent-execution/executions/filtered` and `/agent-execution/swarm-ids`.

## See also

- [Background Agents](./02_background-agents.md)
- [Swarm Management](./07_swarm-management.md)
- [Agent Observability](../../../05c_agent-observability/01_overview.md)

