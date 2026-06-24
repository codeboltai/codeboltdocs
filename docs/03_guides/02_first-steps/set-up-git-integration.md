---
sidebar_position: 4
title: Set Up Git Integration
description: Git works out of the box — Codebolt detects your repo, reads status, and provides codebolt_git tools
---

# Set Up Git Integration

Git works out of the box — Codebolt detects your repo, reads status, and provides `codebolt_git` tools. This guide covers going beyond defaults: commit conventions, protected branches, PR workflows, and integrating with GitHub/GitLab.

**You'll need:** an existing git repo open as a Codebolt project.

## Default behaviour

When you open a project that's a git repo:

- The git panel shows status.
- Agents can use `codebolt_git.git_status`, `codebolt_git.git_diff`, `codebolt_git.git_logs`, `codebolt_git.git_branch`.
- Shadow git is set up automatically in `.codebolt/shadow-git/`.
- Real git is never modified unless you explicitly allow an agent to.

## Recommended defaults for agents

Most agents should have read-only git access:

```yaml
tools:
  allow:
    - codebolt_git.git_status
    - codebolt_git.git_diff
    - codebolt_git.git_logs
    - codebolt_git.git_branch
  deny:
    - codebolt_git.git_commit
    - codebolt_git.git_push
```

You commit from your own terminal or the git panel — agents don't need write access for most workflows.

## Protected branches

For agents that do have commit access, you can restrict write operations through the agent's tool configuration. For example, to prevent push access, omit `codebolt_git.git_push` from the tool allowlist:

```yaml
tools:
  allow:
    - codebolt_git.git_status
    - codebolt_git.git_diff
    - codebolt_git.git_logs
    - codebolt_git.git_branch
    - codebolt_git.git_commit
  deny:
    - codebolt_git.git_push
```

## GitHub / GitLab integration

For posting comments on PRs, reading issues, etc., install an MCP server for your host:

```bash
npm install -g @modelcontextprotocol/server-github
```

Configure with a personal access token (never commit it — use env var):

```yaml
servers:
  github:
    command: npx
    args: ["@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: ${GITHUB_TOKEN}
```

Now agents can read issues, post PR comments, etc., via `github.*` tools.

## Conventional commits

If your project uses conventional commits, embed the format in the agent's system prompt:

```yaml
customInstructions: |
  When committing, use conventional commit format:
      <type>(<scope>): <description>
    Types: feat, fix, docs, style, refactor, test, chore.
    Examples: "feat(auth): add rate limiting", "fix(api): handle null user".
    Always include a scope when the change is scoped to a specific module.
```

## The typical agent + git workflow

1. **Agent modifies files.** Shadow git captures the change; real git is dirty.
2. **You review.** The git panel shows the diff; use Codebolt's diff viewer or your own.
3. **You commit.** `git add -p` for granular staging, `git commit -m "..."` in your terminal.
4. **You push.** Normal `git push`.

Agents don't need to be in this loop. They produce changes; you decide what to keep and when.

## Rollback without losing real git state

Codebolt's checkpoint rollback uses shadow git, never real git. You can have uncommitted changes in real git and still roll back shadow git — the two are independent. See [Checkpoints and rollback](../../02_using-codebolt/03_chat/04_checkpoints-and-rollback.md).

## See also

- [Git and Shadow Git](../../02_using-codebolt/08_integrations/03_git-and-shadow-git.md)
- [Checkpoints and rollback](../../02_using-codebolt/03_chat/04_checkpoints-and-rollback.md)
- [Guardrails & Eval (internals)](../../04_build-on-codebolt/07b_subsystems/09_guardrails-and-eval.md)
