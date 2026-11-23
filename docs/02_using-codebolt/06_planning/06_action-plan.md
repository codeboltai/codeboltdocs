---
sidebar_position: 6
title: Action Plan
description: An Action Plan is an execution plan. It breaks a piece of work into tasks and groups, tracks their status as work progresses, and can represent complex.
---

# Action Plan

![Action Plan](/productImages/planning/action_plan.png)

An Action Plan is an execution plan. It breaks a piece of work into tasks and groups, tracks their status as work progresses, and can represent complex structures like parallel workstreams, loops, and conditional branches. Action Plans are typically created and updated by agents, but you can create and edit them manually too.

## Structure

An Action Plan contains a flat list of **items**. Items are either tasks or groups:

### Tasks

The basic work unit. Each task has:

| Field | Description |
|---|---|
| **Name** | Short description of the work |
| **Description** | Longer explanation, acceptance criteria |
| **Status** | `created` → `planned` → `pending` → `in_progress` → `review` → `completed` (or `cancelled` / `failed`) |
| **Priority** | `low` · `medium` · `high` · `urgent` |
| **Due date** | Optional deadline |
| **Dependencies** | Other tasks that must complete first |
| **Tags** | Free-form labels |
| **Mentioned files / MCPs** | Context the task references |

### Groups

Groups organise how tasks execute:

| Group type | Behaviour |
|---|---|
| **Parallel Group** | All tracks inside run concurrently |
| **Loop Group** | Repeats its tasks for each item in a list |
| **If Group** | Runs its tasks only if a condition is true |
| **Wait Until Group** | Pauses execution until a condition is met |

Groups can contain tasks or nested groups.

## Views

The Execution Plan detail panel offers three views.

- **List view** — a hierarchical list of all tasks and groups, collapsible, with inline status editing and drag-to-reorder
- **Timeline view** — inspect tasks and groups along the plan timeline
- **Flow view** — a React Flow diagram showing tasks as nodes and dependencies as edges; useful for understanding the execution shape of a complex plan

## Creating an action plan

Open **Plan → Execution Plan** and choose **New Plan**. Enter the name and description, then use **Add Task** or **Add Group** to structure the work.

## Editing tasks

Click any task to open the detail panel. From there you can:

- Edit name, description, status, priority, due date
- Add or remove dependencies
- Add comments
- View the task's execution history

## Task statuses

| Status | Meaning |
|---|---|
| `created` | Just added, not yet planned |
| `planned` | Included in a plan, not started |
| `pending` | Ready to start (dependencies met) |
| `in_progress` | Agent or user is actively working on it |
| `waiting_user` | Agent is blocked, waiting for your input |
| `review` | Work done, awaiting review |
| `completed` | Done |
| `cancelled` | Dropped |
| `failed` | Failed with an error |

## Progress tracking

The plan header shows overall progress: total tasks, completed tasks, and a percentage. The progress bar updates in real time as agents complete tasks.

## Agents and action plans

An agent can create and update execution plans with the [Execution Plan API](../../05_reference/02_codeboltjs/10_api-access/executionPlan/index.md). For example, record prerequisite tasks before starting implementation and update each task as work progresses. How a running agent responds to plan edits depends on its workflow.

## Persistence

Action Plans are stored in `.codebolt/.execution-plans` as JSON. The last five versions of each plan are kept as backups, written with a 100ms debounce to avoid write thrash during fast agent updates.

## See also

- [Tasks](./07_tasks.md) — simpler individual task tracking outside of plans
- [Roadmap](./02_roadmap.md) — feature planning that feeds into action plans
- [Requirement Plan](./05_requirement-plan.md) — embed an action plan in a larger document
