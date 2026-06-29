---
sidebar_position: 3
title: Syncing Changes
description: How changes made in a cloud environment get back to your repository — Git sync, Workspace Sync, and merge strategies.
---

# Syncing Changes

When an agent works inside a cloud environment, the changes it makes need a path back to your real repository. Codebolt Cloud supports two **sync modes** that control how that happens, plus **merge strategies** that control how concurrent changes are reconciled. Picking the right one up front avoids surprises later.

## The two sync modes

| Sync mode | Label in UI | How it works | Best for |
|---|---|---|---|
| **`git`** | Git | The environment clones your repo; changes are committed and pushed back via a branch or PR | Cloud sandboxes, work that should land in a remote repo |
| **`workspace_sync`** | Workspace Sync | The environment works on files that are synced bi-directionally with a parent workspace (often a local worktree) | Local/runner runtimes, child environments, keeping work on your hardware |
| **`none`** | Blank Project | No sync — the environment is a throwaway sandbox | Experiments, demos, throwaway work |

You pick the sync mode when creating a runtime in Remote Chat. The default depends on the context:

- A runtime created **with a repo URL** defaults to **Git**.
- A **child environment** (spawned from a parent) defaults to **Workspace Sync**.
- A runtime **without a repo** defaults to **Blank Project**.

## Git sync

Git sync is the standard way to get cloud work back into a real repository. The flow:

```
your repo  ──clone──▶  cloud environment  ──agent works──▶  commits
                                                              │
                            ◀──── push branch / open PR ──────┘
```

1. **Clone** — the environment clones your repo (using a GitHub App token for private repos).
2. **Work** — the agent edits files and commits as it goes.
3. **Sync back** — changes are returned via one of:
   - A **branch push** back to the origin.
   - A **Review Merge Request (RMR)** that creates an upstream GitHub PR — see [Review Merge Requests](./06_review-merge-requests.md).

### Git transport

Git-synced runtimes carry a `git_transport` field that decides how merges happen:

| Transport | Behavior |
|---|---|
| `github_pr` | Opens an external GitHub Pull Request against the base ref — reviewable on GitHub |
| `local_merge` | Merges the head ref into the base ref directly inside the environment |

The RMR workflow (`github_pr`) is preferred for anything you'd want a human to review.

### Git fields on a runtime

| Field | Meaning |
|---|---|
| `git_remote_url` | The cloned origin |
| `git_branch` | The branch the agent is working on |
| `git_base_ref` | The branch changes merge *into* (usually `main`) |
| `git_head_ref` | The branch changes come *from* |
| `external_pr_url` | If a PR was opened, the GitHub URL |
| `external_pr_number` | The GitHub PR number |

## Workspace Sync

Workspace Sync is for runtimes that share files with a parent workspace — most commonly a **worktree** of a local project on your machine or a runner node. Instead of cloning a remote, the environment operates on a linked copy that stays in sync with the parent.

- The provider creates a worktree (or equivalent) at a path like `<project>/.codebolt/worktree/<env-name>`.
- Changes are reconciled with the parent on a schedule or on demand.
- No remote round-trip — everything stays on the host filesystem.

This is the default for **child environments** and for the `local-threadpool-worktree-provider`, which directly manages local worktrees.

### When to use Workspace Sync

- You're running on your own machine (runner or local runtime) and want changes on your real files.
- You want parallel isolated worktrees off one repo without pushing remote branches.
- A child environment should inherit the parent's files.

## Merge strategies

Independent of *how* files sync, the **merge strategy** controls how concurrent or conflicting changes are reconciled:

| Merge strategy | Behavior |
|---|---|
| `none` | No reconciliation — last write wins, conflicts surface as errors |
| `git` | Use git merge semantics — three-way merge, conflicts need manual resolution |
| `workspace_sync` | Use the workspace sync reconciler — designed for concurrent local edits |

Providers advertise which sync modes and merge strategies they support via `supported_sync_modes` and `supported_merge_strategies`. When you create a runtime, the portal only offers options the chosen provider supports.

## Environment paths

Each environment has a resolved **project path** — where it works inside the sandbox or host. Understanding the path fields helps when debugging or scripting:

| Field | Meaning |
|---|---|
| `requested_path` | What you asked for (may be empty — the portal proposes one) |
| `resolved_path` | The final path the environment actually uses |
| `environment_path` | For child environments, the path within the parent |
| `worktree_path` | For worktree-based environments |
| `path_source` | How the path was decided: `provider_proposed`, `user_override`, etc. |

When you create a runtime, the portal calls the server's **prospective-path** endpoint to compute the resolved path and show it to you before you confirm. For child environments, the default layout is `<parent>/.codebolt/worktree/<name>` (Git sync) or `<parent>/.codebolt/environments/<name>` (Workspace Sync).

## Picking the right combination

| Situation | Sync mode | Merge strategy |
|---|---|---|
| Cloud sandbox, work lands in GitHub | `git` | `git` |
| Cloud sandbox, throwaway demo | `none` | `none` |
| Runner node, working on real local files | `workspace_sync` | `workspace_sync` |
| Child environment off a parent | `workspace_sync` (default) | `workspace_sync` |
| Local worktree you want pushed as a PR | `git` | `git` |

## See also

- [Cloud Environments](./02_environments.md) — parent/child environments and the tree
- [Review Merge Requests](./06_review-merge-requests.md) — the Git sync review workflow
- [Runtimes & Providers](./04_runtimes-and-providers.md) — runtime types
