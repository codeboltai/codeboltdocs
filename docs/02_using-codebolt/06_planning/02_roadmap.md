---
sidebar_position: 2
title: Roadmap
description: The Roadmap tool is for product-level planning
---

# Roadmap

![Roadmap panel showing the Roadmap and Iteration views and the Create Phase button](/img/desktop/roadmap.webp)

The Roadmap tool is for product-level planning. It organises what you want to build into **phases** and **features**, and includes a separate **Ideation** tab for collecting and reviewing ideas before they become commitments.

## Opening the Roadmap

Open the Roadmap panel from the sidebar. The panel has two tabs: **Roadmap** and **Ideation**.

## Roadmap tab

The Roadmap tab shows features organised into phases.

### Phases

A phase is a time or theme grouping — a sprint, a quarter, a milestone. Create as many phases as you need.

- Click **+ Add Phase** to create a new phase
- Give it a name and optional description
- Drag phases to reorder them

### Features

Features live inside phases. Each feature has:

| Field | Options |
|---|---|
| **Title** | Short name |
| **Description** | Free-form text |
| **Status** | `idea` · `planned` · `in-progress` · `completed` · `archived` |
| **Impact** | `low` · `medium` · `high` · `critical` |
| **Difficulty** | `easy` · `medium` · `hard` · `complex` |
| **Priority** | 1–5 |
| **Category** | `code` · `ui-ux` · `docs` · `security` · `performance` · `devops` · `testing` · `accessibility` · `other` |
| **Tags** | Free-form labels |

Click a feature to expand its detail. From the detail view you can:

- **Convert to Task** — creates a Task in the Tasks panel and links back to the feature
- **Send to Chat** — opens a chat thread pre-filled with the feature context, so you can immediately ask an agent to work on it
- **Move to phase** — drag the feature card to a different phase, or use the move menu

### Filtering and sorting

Use the filter bar above the phase list to filter by status, category, impact, or tags. Sort features within a phase by priority or creation date.

## Ideation tab

The Ideation tab is a holding area for feature suggestions — from your team, from agents, or from your own notes — before you decide what to build.

Each idea has:
- Title and description
- Suggested impact and difficulty
- Category and tags
- Status: `pending` · `reviewed` · `accepted` · `rejected`
- Created by (user or agent name)

### Reviewing ideas

Click an idea to open the review panel. You can:

- **Accept** — moves the idea to Roadmap as a feature (you choose which phase)
- **Reject** — archives the idea with an optional review note
- Add a review note explaining the decision

### Agents submitting ideas

Agents can submit ideas to the Ideation tab as part of their work. For example, a code-review agent might notice a recurring pattern and suggest a refactor as an idea rather than acting on it immediately. You review and approve before anything changes.

## Persistence

Roadmap data is stored in `.codebolt/roadmap/roadmap.json` and `.codebolt/ideation.json`. Both files are plain JSON — commit them to version control to share the roadmap with your team.

Real-time updates are broadcast via WebSocket, so multiple team members see changes immediately.

## See also

- [Action Plan](./06_action-plan.md) — break a feature down into executable steps
- [Tasks](./07_tasks.md) — individual work items
- [Requirement Plan](./05_requirement-plan.md) — aggregate specs and plans into one document
