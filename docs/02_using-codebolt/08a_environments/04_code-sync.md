---
sidebar_position: 4
title: Code Sync Between Environments
description: Choose how CodeBolt shares project files between environments and review changes before applying them.
---

# Code Sync Between Environments

An environment's sync mode controls how it gets project files and how changes can return. Available modes depend on the environment provider.

| Mode | How to bring changes back |
|---|---|
| **Workspace Sync** | Review the changes against the parent workspace through a workspace-sync review request. |
| **Git** | Follow the configured Git transport. CodeBolt can use a local merge or a GitHub pull request. |
| **No sync** | Changes stay in the execution environment until you move them yourself. |

## Review changes

1. Open the environment details and check its sync mode. For Git mode, confirm which repository and branch the environment is using.
2. Open the review request or linked pull request when the work is ready. Inspect the changes and resolve conflicts before merging.
3. After merging, open the destination workspace or branch and confirm the changes are present.

See [Review and Merge](../07_multi-agent-usage/04_review-and-merge.md) for the desktop workflow and [Syncing Changes](../02_surfaces/06_cloud/04_running-agents/03_syncing-changes.md) for Cloud.
