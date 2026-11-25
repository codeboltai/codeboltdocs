---
displayed_sidebar: getStartedSidebar
sidebar_position: 1
title: The Planning System
description: Choose a roadmap, note, canvas, feature plan, execution plan or task for project work.
---

import PlanningOverview from '@site/src/components/diagrams/PlanningOverview';

# The Planning System

Use the **Plan** menu to capture a decision, sketch a screen, or organize implementation work. Start with the item you need. A single task can be enough for a small change.

<PlanningOverview />

| Planning item | Use it for |
|---|---|
| [Roadmap](../../02_using-codebolt/06_planning/02_roadmap.md) | Group features into phases and collect ideas. |
| [Note](../../02_using-codebolt/06_planning/03_specs.md) | Write a specification, acceptance criteria, or open questions. |
| [Canvas](../../02_using-codebolt/06_planning/04_ui-flow.md) | Sketch screens and transitions. |
| [Feature Plan](../../02_using-codebolt/06_planning/05_requirement-plan.md) | Combine written sections with links to a note, canvas or execution plan. |
| [Execution Plan](../../02_using-codebolt/06_planning/06_action-plan.md) | Break implementation into steps and track their status. |
| [Tasks](../../02_using-codebolt/06_planning/07_tasks.md) | Track individual work items. |

## Example: plan a password reset

Write the reset-link expiry rules in a **Note**. Draw the request, confirmation and expired-link screens on a **Canvas**. In the **Feature Plan**, add a **Note Link** and a **Canvas Link**. When you have implementation steps, add an **Execution Plan Link**. Reference the relevant materials when asking an agent to build or review the feature.

The planning catalog discovers notes under `notes/*.note`, canvases under `canvas/*.canvas`, and feature plans under `plans/*.plan`, including subdirectories. The roadmap is stored in `.codebolt/roadmap/roadmap.json`. Tasks and execution plans appear through their respective services.
