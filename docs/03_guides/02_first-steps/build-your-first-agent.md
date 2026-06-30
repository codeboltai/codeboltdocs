---
sidebar_position: 1
title: Build your first agent
description: Create a specialised agent for your project in ~20 minutes
---

# Build your first agent

Create a specialised agent for your project in ~20 minutes. Starts with the simplest possible version (level 0 remix) and graduates to level 1 framework code when you need it.

**You'll need:** Codebolt installed and running, a provider configured, a project open, Node.js 18+ (only if you reach the level 1 part).

## What we're building

A **PR reviewer agent** tuned for your project's conventions. By the end you'll have:

1. A level-0 remix of the default reviewer with your project-specific rules.
2. A level-1 upgrade that adds a custom check (optional — do this part if level 0 isn't enough).

## Part 1 — Level 0 remix

### Step 1: scaffold

```bash
cd /path/to/your/project
codebolt agent create --name my-pr-reviewer --template reviewer
```

This creates `.codebolt/agents/remix/my-pr-reviewer.md` — a Markdown file with YAML frontmatter.

### Step 2: write the remix

Open `.codebolt/agents/remix/my-pr-reviewer.md` and edit:

```markdown
---
name: my-pr-reviewer
description: Reviews PRs for this project's conventions.
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search_files
  - codebolt_codebase.*
  - codebolt_git.git_diff
  - codebolt_git.git_status
  - codebolt_git.git_logs
remixedFromId: reviewer
customInstructions: |
  You are a code reviewer for the Acme project.

  Project conventions you MUST enforce:
  - All async functions must have explicit error handling; no bare `await` without try/catch.
  - Database access only via the repository layer in src/db/repos/. Direct knex calls in other files are a bug.
  - Public API types live in src/types/api.ts. Any new public type added elsewhere is a bug.
  - Test files mirror source paths under tests/.

  Focus on runtime bugs and convention violations. Do NOT comment on:
  - Style (we have a formatter).
  - Performance unless it's algorithmic (O(n²) where O(n) is possible).
  - Variable naming preferences.

  Be concise. One bullet per issue. Include file:line. End with a summary verdict:
  "APPROVE", "REQUEST_CHANGES", or "NEEDS_DISCUSSION".
---
```

What changed from the default reviewer:

- **Project-specific rules** in the custom instructions. The LLM will check for them.
- **Explicit "do NOT comment on..."** clauses. This trims noise.
- **Read-only tools.** The reviewer can't accidentally change files.
- **Git read tools** so it can see the diff and history.
- **A structured verdict** (APPROVE/REQUEST_CHANGES/NEEDS_DISCUSSION) that downstream tooling can parse.

### Step 3: test it

Restart Codebolt or reload the project. The new agent should appear in the agent picker.

### Step 4: use it

In the chat, pick `my-pr-reviewer` from the agent picker and send:

```
Review my current staged changes.
```

Or from the CLI:

```bash
codebolt --prompt "review the staged changes" --agent my-pr-reviewer
```

### When level 0 is enough

For most review agents it is. You get:

- Custom rules in the instructions.
- Read-only safety.
- Project-specific model choice.

All without writing code. Ship this, use it, see what breaks, iterate by editing the markdown file.

## Part 2 — Level 1 upgrade (optional)

Do this part when your rules get complex enough that embedding them in instructions isn't enough — for example, if you want to mechanically verify something, not ask the LLM to check it.

Level 1 agents are framework-based TypeScript projects. See [Level 1 — Framework](../../04_build-on-codebolt/02_creating-agents/03_creation-levels/level-1-framework.md) for the full walkthrough on creating framework agents with custom logic, processors, and mechanical checks.

## What you learned

- **Start at level 0.** A remix is often enough.
- **Graduate only when the instructions aren't sufficient.** "I want the LLM to definitely not miss X" often means X should be a mechanical check, not a prompt instruction.
- **Read-only reviewers are safer.** Restrict tools the agent doesn't need.
- **Iterate.** The first version won't be right. Test, edit, test again.

## Where to next

- **Commit your agent** to the project repo so your team gets it automatically. `.codebolt/agents/` should be in git.
- **Publish it to the marketplace** — see [Publishing](../../04_build-on-codebolt/02_creating-agents/99_publishing.md).
- **Code review with an agent** — see [Code review guide](../03_everyday-workflows/code-review-with-an-agent.md).

## See also

- [Custom Agents Overview](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
- [Level 0 — Remix](../../04_build-on-codebolt/02_creating-agents/03_creation-levels/level-0-remix.md)
- [Level 1 — Framework](../../04_build-on-codebolt/02_creating-agents/03_creation-levels/level-1-framework.md)
