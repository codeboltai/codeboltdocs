---
sidebar_position: 3
title: Git and Shadow Git
description: "Codebolt has two git repos per project: your real .git/ and a parallel shadow git under .codebolt/shadow-git/. They serve different purposes and rarely interact"
---

# Git and Shadow Git

Codebolt has two git repos per project: your real `.git/` and a parallel shadow git under `.codebolt/shadow-git/`. They serve different purposes and rarely interact.

## Real git

This is your normal git repository. Codebolt:

- Reads status, diff, log, branches — agents can see your git state.
- Writes commits, checkouts, branches, pushes — if an agent uses `codebolt_git.commit` and it's allowed by policy.

But mostly Codebolt **leaves real git alone**. Agent file edits don't automatically commit. You decide when and what to commit via normal git workflows.

## Shadow git

A **parallel** git repo that Codebolt maintains automatically. Every agent write is committed here as it happens. This is what powers:

- [Checkpoints](../03_chat/04_checkpoints-and-rollback.md) — rollback to any prior state.
- [Replay](../07_multi-agent-usage/03_reading-a-flow.md) — view the FS as it was.
- [Branching](../03_chat/04_checkpoints-and-rollback.md) — start a new chat from a past state.

Shadow git is **invisible** until you want to use it. It's not shown in normal git commands. It's not pushed anywhere. Your real git state is never affected.

Add `.codebolt/shadow-git/` to your `.gitignore` — it's huge and not useful outside the server that created it.

## Tools agents use

Read-side tools (always safe):

- `codebolt_git.status`
- `codebolt_git.diff`
- `codebolt_git.logs`
- `codebolt_git.branch` (read current branch)

Write-side tools (require explicit allowlist):

- `codebolt_git.add`
- `codebolt_git.commit`
- `codebolt_git.checkout`
- `codebolt_git.init`
- `codebolt_git.clone`
- `codebolt_git.pull`
- `codebolt_git.push`

By default, `commit` and `push` are allowed for agents that need them. `push` is guardrail-restricted: pushing to protected branches (`main`, `master`, anything matching a configurable pattern) is blocked.

## Recommended workflow

Most users want agents to *not* commit to real git automatically. The pattern:

1. **Agent makes changes.** Writes files, shadow git commits automatically.
2. **You review.** Check the diff, test, iterate.
3. **You commit.** Use your own `git add` / `git commit` in a terminal, or the git panel in the UI.

This keeps your git history intentional. Agent-authored commits are easy to spot and review as a batch, rather than mixed in with your own.

To enforce this pattern, deny write-side git tools in most agents' allowlists:

```yaml
tools:
  allow:
    - codebolt_fs.*
    - codebolt_git.status
    - codebolt_git.diff
    - codebolt_git.logs
  deny:
    - codebolt_git.commit
    - codebolt_git.push
```

Agents can still read git state, just not modify it.

## When agents should commit

For high-volume or automated workflows (batch migrations, nightly jobs, CI), you may want the agent to commit itself. Allow write tools but guardrail against dangerous operations:

```yaml
tools:
  allow:
    - codebolt_git.add
    - codebolt_git.commit
    - codebolt_git.branch
  deny:
    - codebolt_git.push        # still no push
    - codebolt_git.reset       # still no reset
```

And add guardrails for branch protection, commit message requirements, etc.

## Switching branches with an agent running

If you `git checkout` to a different branch while an agent is running, things get confusing — the agent is working with one file state, you changed it out from under them. Codebolt detects this and:

1. Warns you in the UI.
2. Optionally suspends the agent until you confirm.

Best practice: don't switch branches with a running agent. Let it finish first.

## The merge case

When you're merging a branch with agent-authored changes, the agent's shadow git history is not brought along — only the real git commits you made. Shadow git is local state only.

If you want to preserve the agent's decision history, export it from the observability surface your build exposes and attach that summary to your PR as context for human reviewers.

## Git submodules

Shadow git handles submodules like normal git — each submodule has its own shadow subrepo. Checkpoints rolling back in a parent project don't automatically rollback submodules; they roll back only the current level.

## See also

- [Checkpoints and rollback](../03_chat/04_checkpoints-and-rollback.md)
- [Checkpoint and rollback (internals)](../../04_build-on-codebolt/09_internals/04_data-flow-walkthroughs/checkpoint-and-rollback.md)
- [Project & Workspace (internals)](../../04_build-on-codebolt/09_internals/03_subsystems/10_project-and-workspace.md)
