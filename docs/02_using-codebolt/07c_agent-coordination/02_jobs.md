---
sidebar_position: 2
title: Jobs
description: The Jobs panel is the central work queue for multi-agent coordination
---

# Jobs

The Jobs panel is the central work queue for multi-agent coordination. Agents discover, bid on, lock, and complete jobs — and can propose splitting a job into sub-jobs when the scope is too large.

Open **Tools → Jobs** in the desktop app.

## What a job is

A job is a discrete unit of work with a type, priority, status, and optional parent job. Jobs can be created by users, orchestrators, or agents themselves. They are the primary mechanism by which work is distributed across a swarm.

| Field | Options |
|---|---|
| **Type** | `bug`, `feature`, `task`, `epic`, `chore` |
| **Priority** | `critical`, `high`, `medium`, `low` |
| **Status** | `open`, `working`, `review`, `hold`, `closed`, `archived` |

## Views

The Jobs panel offers four views:

| View | Description |
|---|---|
| **List** | Flat list of jobs, sortable and filterable |
| **Tree** | Hierarchical view showing parent → child job relationships |
| **Timeline** | Jobs plotted on a time axis |
| **Heatmap** | Frequency and intensity visualisation across job dimensions |

Switch between views using the toolbar at the top of the panel.

## Filtering and grouping

Filter jobs by status, priority, type, and labels using the filter bar. Group by status, priority, type, or split status. Sort by created date, updated date, priority, ID, name, or status.

## How agents interact with jobs

Agents interact with jobs through several mechanisms:

### Bidding
An agent can submit a **bid** on an open job — declaring its intent and priority for taking the work. The orchestrator or a supervising agent selects the winning bid and assigns the job.

### Locking
When an agent starts working on a job, it **locks** it. A locked job is visible to other agents but cannot be taken. Other agents can file an **unlock request** that the lock holder approves or rejects. See [Locks & Unlock Requests](../07d_stigmergic-coordination/03_locks-and-unlock-requests.md) for the full lifecycle.

### Splitting
If a job is too large, an agent can propose a **split** — decomposing the job into two or more child jobs. The split proposal appears for review before being accepted. Child jobs appear under the parent in the Tree view.

### Pheromone deposits
Agents can deposit **pheromones** on jobs — metadata signals that influence which jobs other agents prioritise. This is inspired by ant colony optimisation: agents leave trails that guide swarm behaviour without direct communication. See [Pheromones](../07d_stigmergic-coordination/02_pheromones.md) for types, intensity, and decay details.

### Blockers
A job can declare another job as a **blocker** — preventing progress until the blocking job is resolved. Blockers are visible in the job detail view and affect scheduling.

## Job detail panel

Click any job to open its detail view. The detail view shows:
- Full description and metadata
- Bid history and current assignee
- Split proposals and their status
- Blocker relationships
- Pheromone deposits
- Message log written by agents as they work

## Creating jobs

Click **New Job** in the toolbar. Set the title, type, priority, and optionally a parent job to nest it in the hierarchy.

## Job groups

Jobs can be organised into **groups** (similar to epics or milestones). Groups are also created automatically when a swarm is created — each swarm gets a corresponding job group prefixed `SWARM-{name}`.
