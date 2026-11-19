---
sidebar_position: 1
title: Planning Overview
description: Codebolt includes a set of built-in planning tools that live alongside your code and your agents
---

import PlanningOverview from '@site/src/components/diagrams/PlanningOverview';

# Planning

Codebolt includes a set of built-in planning tools that live alongside your code and your agents. They cover the full arc from strategic intent to individual work items — and agents can read and update them, so your plans stay connected to what's actually happening in the codebase.

## The tools

| Tool | What it's for | Level |
|---|---|---|
| **[Roadmap](./02_roadmap.md)** | Features, phases, and ideas — the product vision | Strategic |
| **[Specs](./03_specs.md)** | Technical specification documents with rich formatting | Documentation |
| **[UI Flow](./04_ui-flow.md)** | Wireframes and UI mockups on a freehand canvas | Design |
| **[Requirement Plan](./05_requirement-plan.md)** | Aggregated documents linking specs, flows, and action plans | Aggregation |
| **[Action Plan](./06_action-plan.md)** | Structured execution plans with tasks, dependencies, and parallel groups | Execution |
| **[Tasks](./07_tasks.md)** | Individual work items with status, priority, and sub-task hierarchy | Operational |
| **[Feature Plans](#feature-plans)** | Organize a feature's notes, canvases, and execution plans | Feature |
| **[Notes & Canvas](#notes--canvas)** | Record decisions and sketch the work | Planning context |

## How they fit together

<PlanningOverview />

The tools are independent — you can use any one without the others. But they're designed to compose: a Roadmap feature can become a Task; a Requirement Plan can pull together a Spec, a UI Flow, and an Action Plan into one document.

## Feature Plans

Open **Feature Plan** from the desktop panel selector to create or open a plan for a feature. Add Markdown or code sections for context and use **Note Link**, **Canvas Link**, or **Execution Plan Link** to connect related planning material.

## Notes & Canvas

Use **Note** for written decisions and requirements, and **Canvas** for visual planning. Open either panel from the desktop panel selector or open a linked note or canvas directly from its feature plan.

## Where planning tools live

Every planning tool persists inside the project:

| Tool | Location |
|---|---|
| Roadmap | `.codebolt/roadmap/roadmap.json` + `ideation.json` |
| Specs | `specs/*.specs` |
| UI Flows | `.codebolt/uiflows/` |
| Requirement Plans | `plans/*.plan` |
| Action Plans | `.codebolt/.action-plans/` |
| Tasks | Indexed in the Codebolt database |

All files (except Tasks) are plain JSON or Markdown on disk. You can check them into version control, diff them, and share them with your team.

## Agents and planning

Agents can read and write every planning tool via the `codeboltjs` SDK:

```ts
// Read the roadmap
const roadmap = await codebolt.roadmap.getRoadmap();

// Create a task
await codebolt.taskplaner.createTask({ name: 'Fix auth bug', priority: 'high' });

// Update an action plan task status
await codebolt.actionplan.updateTaskStatus(taskId, 'completed');

// Read a spec
const spec = await codebolt.specs.get('auth-flow.specs');
```

This means agents can plan their own work, report progress back into the planning tools, and surface what they've done where you can see it.
