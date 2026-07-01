---
sidebar_position: 0
title: Overview
description: Desktop panels for managing agents, agent tooling, work queues, swarms, orchestrators, guardrails, and execution review.
---

# Agent Management Features

Agent Management Features are the desktop panels used to track agent work, inspect active runs, manage agent tooling, review queues, and control agent-facing safety and evaluation workflows.

Open these panels from the bottom bar menus, the panel-header **+** menu, or the Panel Selector.

## Feature map

| Feature | Use it for |
|---|---|
| [Running Agents](./01_running-agents.md) | Monitor active and historical agent executions, filter runs, and open execution details. |
| [Background Agents](./02_background-agents.md) | Start detached agent runs and watch their logs outside the main chat flow. |
| [Kanban Board](./03_kanban-board.md) | View agent tasks as board columns and open task execution details from task cards. |
| [Capabilities](./04_capabilities.md) | Browse and manage agent capabilities that can be attached to prompts and agent runs. |
| [Action Block](./05_action-block.md) | Manage reusable action blocks that agents, hooks, and automations can execute. |
| [Jobs](./06_jobs.md) | Manage the work queue used by swarms, orchestrators, and coordinating agents. |
| [Swarm Management](./07_swarm-management.md) | Create swarms, manage agents, teams, roles, vacancies, and swarm execution. |
| [Orchestrator Management](./08_orchestrator-management.md) | Monitor orchestrators, worker agents, combined chat, and orchestrator settings. |
| [Eval](./09_eval.md) | Run and inspect agent evaluations for prompts, tools, and task behavior. |
| [Agent Profiles](./10_agent-profiles.md) | Review agent profile detail such as overview, talent, karma, testimonials, and conversations. |
| [Guardrails](./11_guardrails.md) | Configure and inspect agent guardrails before tool calls or risky actions execute. |
| [Routing Gateway](../04d_agent-orchestrations/02_routing-gateway.md) | Route external messages and responses into the correct agent flow. |

## Related orchestration features

Execution environments, proxy-backed execution, and routing-gateway behavior are documented in [Agent Orchestrations](../04d_agent-orchestrations/00_overview.md).

## Related deposition features

Some surfaces are better treated as deposition targets because they store handoff results, approvals, schedules, or test evidence for later pickup.

See [Deposition Framework Features](../04c_deposition-framework-features/00_overview.md) for Review Merge Requests, Agent Deliberation, Inbox, Calendar, Auto Testing, Artifacts, Event Log, Update Project Structure Request, and Changes Summary.

## Related planning features

Tasks, Action Plans, Requirement Plans, Specs, UI Flow, Roadmap, Project Structure, and Codemap are documented in [Application Planning Features](../04a_application-planning-features/00_overview.md).
