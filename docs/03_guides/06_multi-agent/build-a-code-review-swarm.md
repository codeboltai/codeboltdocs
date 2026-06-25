---
sidebar_position: 1
title: Build a Code-Review Swarm
description: A swarm of specialised reviewers checking a diff in parallel, each focused on one concern
---

# Build a Code-Review Swarm

A swarm of specialised reviewers checking a diff in parallel, each focused on one concern. Useful when one general reviewer misses too much because "review this diff" is too vague.

**You'll need:** Codebolt with a provider configured, a project open, and a basic understanding of [custom agents](../../04_build-on-codebolt/02_creating-agents/01_overview.md).

## What we're building

A set of specialised review agents:

- A **security reviewer** focused on auth, crypto, injection, data leaks.
- A **performance reviewer** focused on algorithmic complexity and N+1 queries.
- A **correctness reviewer** focused on logic bugs and missing edge cases.
- A **style reviewer** focused on project conventions.

Each specialist has a narrow scope and a clear rubric, so it doesn't get distracted.

## The specialists

Create `.codebolt/agents/remix/` entries for each reviewer. They're all remix agents, differing in their custom instructions.

### security-reviewer

```markdown
---
name: security-reviewer
description: Security-focused code reviewer.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_git.git_diff
  - codebolt_git.git_status
  - codebolt_git.git_logs
remixedFromId: reviewer
customInstructions: |
  You are a security reviewer. Focus EXCLUSIVELY on:
  - Authentication and authorization bugs
  - SQL injection, command injection, path traversal
  - Secrets leakage (logged, committed, exposed in errors)
  - Cryptographic misuse (weak algorithms, missing validation)
  - Insecure defaults
  - Missing input validation on security boundaries

  Do NOT comment on:
  - Code style, performance, or general correctness (other reviewers handle those)
  - Nit-level issues

  Output format: a JSON array of {severity, file, line, issue}.
  Severities: blocker, major, minor.
---
```

### performance-reviewer

```markdown
---
name: performance-reviewer
description: Performance-focused code reviewer.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_git.git_diff
remixedFromId: reviewer
customInstructions: |
  You are a performance reviewer. Focus EXCLUSIVELY on:
  - Algorithmic complexity (O(n²) where O(n) is possible)
  - N+1 database queries
  - Unnecessary allocations in hot paths
  - Blocking calls in async contexts
  - Missing batching opportunities

  Do NOT comment on: style, security, general correctness.

  Output format: JSON array of {severity, file, line, issue, suggested_change}.
---
```

### correctness-reviewer

```markdown
---
name: correctness-reviewer
description: Correctness-focused code reviewer.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_git.git_diff
remixedFromId: reviewer
customInstructions: |
  You are a correctness reviewer. Focus EXCLUSIVELY on:
  - Logic bugs (off-by-one, wrong comparisons, inverted conditions)
  - Missing edge case handling (empty inputs, nulls, boundaries)
  - Race conditions in concurrent code
  - Missing error handling that would cause silent failures
  - Inconsistencies between related changes

  Do NOT comment on: style, security, or performance.

  Output format: JSON array of {severity, file, line, issue}.
---
```

### style-reviewer

```markdown
---
name: style-reviewer
description: Style and conventions-focused code reviewer.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_git.git_diff
remixedFromId: reviewer
customInstructions: |
  You are a style reviewer focused on project conventions.
  Check against these project rules:
    - Public API types live in src/types/api.ts
    - Database access goes through src/db/repos/
    - All async functions must have explicit try/catch
    - File names use kebab-case

  Do NOT comment on generic style (we have a formatter).
  Do NOT comment on bugs, security, or performance.

  Output format: JSON array of {severity, file, line, issue}.
---
```

## Running the swarm

Run each specialist in a separate chat tab, or sequentially from the CLI:

```bash
codebolt --prompt "review the staged changes" --agent security-reviewer
codebolt --prompt "review the staged changes" --agent performance-reviewer
codebolt --prompt "review the staged changes" --agent correctness-reviewer
codebolt --prompt "review the staged changes" --agent style-reviewer
```

Each specialist produces its own focused review. You manually synthesise the results.

## Variations

### Different models per reviewer

Use different model families for true independence. For example, run the security reviewer on a different model than the others:

```yaml
model: gpt-4
```

If security, performance, and correctness all use the same model, they correlate mistakes. Mixing models reduces that.

### Sequential instead of parallel

Run one reviewer at a time, feeding the previous review into the next. This lets later reviewers see what earlier ones found, avoiding duplication.

## Cost considerations

Four specialists per review means 4x the LLM cost of a single reviewer. Worth it when:

- Stakes are high (security-critical code, customer-facing changes).
- A single general reviewer was missing too much.
- You want a structured report, not a prose review.

Not worth it for small, low-risk changes. Use a single generalist there.

## See also

- [Code review with an agent](../03_everyday-workflows/code-review-with-an-agent.md) — the single-agent version
- [Custom Agents Overview](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
- [Level 0 — Remix](../../04_build-on-codebolt/02_creating-agents/03_creation-levels/level-0-remix.md)
