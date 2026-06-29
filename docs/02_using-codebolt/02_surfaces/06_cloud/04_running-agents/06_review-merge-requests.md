---
sidebar_position: 6
title: Review Merge Requests
description: The RMR workflow surfaces agent-raised changes in a portal review queue so humans can approve, comment, and merge work back to a repository.
---

# Review Merge Requests

A **Review Merge Request (RMR)** is the human-in-the-loop checkpoint between an agent's work in a cloud environment and your real repository. When an agent finishes a task in a Git-synced environment, it raises an RMR; the RMR appears in a portal review queue where you can inspect the diff, approve, and merge.

Open the queue at **Agents → Review Merge** in the portal.

## What an RMR is

An RMR bundles everything a reviewer needs to decide whether agent work should land:

| Field | Meaning |
|---|---|
| **Title / Description** | What the agent set out to do and what it did |
| **Source type** | `git` (cloud sandbox, will open a GitHub PR) or `workspace_sync` (local/runner) |
| **Status** | `pending_review` → `in_review` → `approved` → `merged` (see lifecycle below) |
| **Base / Head** | The base ref (usually `main`) and head ref the changes come from |
| **Repository** | The cloned origin / remote URL |
| **Changed files** | The major files the agent touched |
| **Diff summary** | A patch preview of the changes |
| **External PR** | The GitHub PR URL once the runtime creates it |
| **Runtime / Environment** | Which cloud environment produced the RMR |

## Source types

RMRs come in two flavors depending on how the originating environment syncs:

- **Git RMRs** (`source_type: git`) — the environment cloned a remote repo. The RMR wraps an upstream **GitHub Pull Request**. Merging the RMR merges the GitHub PR.
- **Workspace Sync RMRs** (`source_type: workspace_sync`) — the environment works on local/runner files. There's no external PR; changes are reconciled against the parent workspace.

Git RMRs require a **GitHub connector** configured (see [Connectors](../05_settings/02_connectors.md)) so the runtime can push and open PRs using short-lived installation tokens.

## Status lifecycle

```
pending_review → in_review → approved → review_completed → merged
                     │                                          ▲
                     ├──→ changes_requested                     │
                     └──→ rejected ────────────────────────────►┘
                     └──→ closed
```

| Status | Meaning |
|---|---|
| `pending_review` | Raised by the agent, awaiting a human |
| `in_review` | A reviewer is actively looking |
| `changes_requested` | Reviewer asked for revisions; the agent can iterate |
| `approved` | Reviewer approved |
| `review_completed` | Review finished; ready to merge |
| `merged` | Changes landed in the base ref |
| `rejected` / `closed` | Discarded |

## The review queue

The queue lists every RMR, filterable by status and searchable by title/project. Each row shows the source badge (Git vs Workspace Sync), status badge, project path, and a short runtime ID.

Selecting an RMR opens the detail panel with:

- **Changed files** list
- **Diff summary** patch
- **Open GitHub PR** link (for Git RMRs that have created one)
- **Merge RMR** button — enabled once the RMR is `approved` or `review_completed` and the GitHub PR exists

:::note
For Git RMRs, **Merge** is disabled until the runtime has created and attached the upstream GitHub PR. Until then the button shows "Merge is available after approval or review completion."
:::

## Merging

- **Git RMRs** — clicking **Merge RMR** merges the wrapped GitHub PR and marks the RMR `merged`.
- **Workspace Sync RMRs** — no external merge; resolving the RMR reconciles changes with the parent workspace (see [Syncing Changes](./03_syncing-changes.md)).

## Prerequisites

Before RMRs can produce GitHub PRs, connect GitHub:

1. Go to **Settings → Connectors** and install the Codebolt GitHub App (see [Connectors](../05_settings/02_connectors.md)).
2. The runtime uses short-lived installation tokens for clone, push, and PR creation.

## See also

- [Syncing Changes](./03_syncing-changes.md) — the `github_pr` git transport
- [Cloud Environments](./02_environments.md) — where RMRs originate
- [Connectors](../05_settings/02_connectors.md) — GitHub App setup
