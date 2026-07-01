---
sidebar_position: 1
title: Proxy Execution
description: Use Proxy Execution to inspect and control execution paths that run through Codebolt's proxy layer.
---

# Proxy Execution

Proxy Execution is the orchestration surface for work that needs to pass through a managed execution proxy instead of running directly in the active UI session.

Open via: **System menu -> Proxy Execution**, the panel-header **+** menu, or the Panel Selector.

## What you can do

- Inspect proxy execution configuration for the current project.
- Check which execution path is active before delegating work.
- Coordinate proxy-backed tasks with environments and routing rules.
- Use it when agent or tool execution needs a controlled bridge between the desktop app and a runtime.

## When to use it

| Need | Use Proxy Execution to |
|---|---|
| Remote or isolated execution | Confirm the proxy path before starting a run. |
| Agent tool routing | Verify that tool calls can reach the intended runtime. |
| Runtime troubleshooting | Compare proxy configuration with the selected environment. |

## See also

- [Routing Gateway](./02_routing-gateway.md)
- [Environments](./03_environments.md)
- [Running Agents](../04b_agent-management-features/01_running-agents.md)
