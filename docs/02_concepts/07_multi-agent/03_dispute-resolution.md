---
sidebar_position: 13
title: Dispute Resolution
description: Choose how to isolate edits, coordinate shared files and resolve competing proposals.
---

# Dispute Resolution

Two agents working in the same directory can edit the same file. Choose a coordination mechanism based on what they share and which decision you need to make.

| Situation | How to handle it |
|---|---|
| Two implementations should be reviewed independently | Give the agents separate working directories or child environments. Review the changes before merging. |
| A proposed change affects a shared interface or project structure | Open a project structure update request so collaborators can review the proposal. |
| Agents plan to touch overlapping files | Declare file update intents and inspect the conflicting paths and intent levels. |
| Agents disagree about the approach | Collect responses in a deliberation, review the votes or feedback, then decide what to implement. |

## File update intents

The application defines four levels: **Advisory/Notification** (announce planned work), **Soft Reservation** (ask others to avoid overlap), **Priority-Based** (resolve contention by priority), and **Hard Lock** (request exclusive access). For example, use an advisory intent to tell another agent that you plan to inspect a file. See [File Update Intents](../../02_using-codebolt/07d_stigmergic-coordination/04_file-update-intents.md).

## Deliberation and merge

For a voting deliberation, each recorded vote counts once for its response. The service returns the response with the highest count and can return no winner when there are no votes. A decision and a code merge are separate operations. Review the selected change and use the project’s merge workflow to apply it.

See [Agent Deliberation](../../02_using-codebolt/07c_agent-coordination/04_agent-deliberation.md), [Environments](../../02_using-codebolt/08a_environments/01_overview.md), and [Review and Merge](../../02_using-codebolt/07_multi-agent-usage/04_review-and-merge.md).
