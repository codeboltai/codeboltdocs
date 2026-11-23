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
| **[Specs](./03_specs.md)** | Write requirements and acceptance criteria in a note | Documentation |
| **[UI Flow](./04_ui-flow.md)** | Wireframes and UI mockups on a freehand canvas | Design |
| **[Requirement Plan](./05_requirement-plan.md)** | Organize related materials in a Feature Plan | Aggregation |
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

Codebolt stores roadmap data under `.codebolt/roadmap/` in the project. For notes and canvases, use the path shown by the editor or linked from the feature plan.

## Agents and planning

Open **Plan → Roadmap** to review the next milestone. In Chat, ask an agent with access to your planning tools to summarize the work still open for that milestone. Use the roadmap to check its summary before deciding what to assign.

For custom agents, see the [Roadmap API](../../05_reference/02_codeboltjs/10_api-access/roadmap/index.md) and [Task API](../../05_reference/02_codeboltjs/10_api-access/taskplaner/index.md).
