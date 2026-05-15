---
sidebar_position: 1
title: Workspace and Projects
description: The two durable containers for your work in Codebolt. Every chat, every agent run, every file edit lives inside one of them.
---

# Workspace and Projects

The two durable containers for your work in Codebolt. Every chat, every agent run, every file edit lives inside one of them.

## The distinction

| Concept | What it is | Scope |
|---|---|---|
| **Workspace** | A top-level container for related projects, settings, agents, and integrations | Per-user |
| **Project** | A single codebase (usually a git repo) you're working on | Inside a workspace |

Most people have one workspace and many projects inside it. Teams with several unrelated bodies of work may have multiple workspaces, one per domain.

## What a project contains (from Codebolt's view)

When you open a folder as a project, Codebolt sets up:

1. **The project structure index** — a live tree of files, updated as you edit.
2. **The codebase index** — semantic index of symbols, imports, calls. Powers "find definition" and codebase search.
3. **The codemap** — a compressed architectural summary that gets injected into agent context. Auto-rebuilt.
4. **A shadow git repo** in `.codebolt/shadow-git/` — parallel history used for checkpoints and rollback. Your real `.git` is untouched.
5. **A project-local config directory** in `.codebolt/` — for local agents, flows, hooks, context rules.
6. **A database row** tracking the project's state in the Codebolt DB.

Indexing takes seconds to a minute depending on project size. You can start chatting before it's done.

## Opening a project

Three ways:

- **From the project panel** — click "Open project" and pick a folder.
- **From the command line** — `cd /path/to/project && codebolt`.
- **Drag-and-drop** — drop a folder onto the app.

Projects remember their last state: open files, active chat tab, checkpoints. Reopening a project should feel like resuming, not starting fresh.

## Project-local configuration

Anything project-specific lives in `.codebolt/`:

```
.codebolt/
├── agents/              ← project-local custom agents
├── flows/               ← agent flows
├── hooks/               ← project-scoped hooks
├── context-rules/       ← context assembly rules
├── settings.yaml        ← per-project settings override
└── shadow-git/          ← do not edit; managed by the server
```

Everything in `.codebolt/` except `shadow-git/` should be committed to your real git. That's how project-specific agents, hooks, and rules travel with the codebase.

Add `.codebolt/shadow-git/` to your `.gitignore` — it's huge and not useful outside the server that created it.

## Settings hierarchy

Settings are layered in order of precedence (highest wins):

1. **Project** (`.codebolt/settings.yaml`)
2. **Workspace**
3. **User** (`~/.codebolt/settings.yaml`)
4. **Server** (only if self-hosting)

If the same setting appears at multiple levels, the highest-precedence layer wins. This is what lets one user work on two projects with different providers, limits, or guardrails without constantly reconfiguring.

## Multiple projects at once

You can have multiple projects open in tabs. Each has its own:
- File tree
- Chat tabs
- Active agent runs
- Checkpoint history

Agents in one project don't see anything in another. This is both a safety property (a code-review agent in project A can't accidentally read project B's secrets) and a simple mental model.

**Memory is per-project by default.** Persistent memory, the knowledge graph, and the vector DB are scoped to the project they were written from. Cross-project memory is possible but requires explicit opt-in.

## Closing a project

Closing a project:
- Stops any agents still running in it.
- Flushes the event log.
- Persists the project state.
- Does **not** delete anything — you can reopen it any time.

To genuinely remove a project from Codebolt, use **Settings → Projects → Remove**. That removes the project row from the DB and (optionally) deletes `.codebolt/` from disk. Your real codebase is untouched.

## Moving or renaming a project

If you move the project folder on disk:

1. Codebolt's "recent projects" list still points at the old path and will fail to open.
2. Open the project at its new path — Codebolt will detect that it's the same project (via a stable ID in `.codebolt/`) and offer to update its records.
3. Confirm, and history is preserved.

If you skip step 3 and open at the new path as a new project, you'll have two rows pointing at the same codebase with split history. Merging them is manual.

## Multi-root workspaces

Not supported. Codebolt expects one project = one root folder. If you need to work across several repos simultaneously, either:

- Open multiple projects in tabs (simple, no shared state).
- Use a meta-repo that contains the others as submodules (complex, but shared indexing works).

Cross-project orchestration lives in the roadmap, not shipped.

## See also

- [Panels and layout](./02_panels-and-layout.md)
- [Settings and profiles](./03_settings-and-profiles.md)
- [Project & Workspace internals](../../../04_build-on-codebolt/09_internals/03_subsystems/10_project-and-workspace.md)
- [Checkpoints](../../03_chat/04_checkpoints-and-rollback.md)
