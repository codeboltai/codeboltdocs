---
sidebar_position: 10
title: Project & Workspace
description: Everything an agent knows about the actual code it's working on — the files, the structure, the git state, the LSP diagnostics, the running environments — comes.
---

# Project & Workspace Subsystem

Everything an agent knows about the actual code it's working on — the files, the structure, the git state, the LSP diagnostics, the running environments — comes from this subsystem.

> **Source code:** `controllers/{project,projectState,projectStructure,projectStructureUpdateRequest,workspace,codebaseIndex,codemap,file,filereadCcontroller,fileUpdateIntent,git,shadowGit,editor,languageServer,environment,system,application,apps,rootAppState}`, plus the corresponding services and `treeSitterService`, `scaffoldService`, `statusManager`, `applicationEventBus`, `systemAlertService`.

## Responsibilities

1. **Filesystem access** — reads, writes, searches, with intent tracking.
2. **Project structure indexing** — always-fresh view of what files exist and how they relate.
3. **Codebase semantic index** — the searchable, queryable model of code.
4. **Codemap** — the structural summary used by context assembly.
5. **Git + shadow git** — the real repo and a parallel history for agent checkpoints.
6. **Language servers** — LSP integration for diagnostics, definitions, references.
7. **Environments** — per-project runtimes (containers, venvs, node versions).
8. **App state** — Codebolt's own notion of the currently open project, workspaces, settings.

## The indexes

Three complementary indexes, each for a different query pattern:

| Index | Built by | Answers |
|---|---|---|
| **Project structure** | `projectStructureService` | "What files exist? What changed since last step?" |
| **Codebase index** | `codebaseIndexService` + `treeSitterService` | "Where is this symbol defined? Used? Implements what?" |
| **Codemap** | `codemapDataService` | "Give me a 500-token summary of this project's architecture." |

The codemap is the interesting one: it's a compressed, LLM-readable map of the project that goes into the context window when the agent needs orientation. Rebuilt incrementally as files change.

## Filesystem access

### `fileReadService`
Centralised reads. Every read goes through here so we can:
- Track which files the agent has seen (memoised per step).
- Normalise encodings.
- Enforce read-size budgets.
- Feed the context assembler with "hot" files.

### `fileUpdateIntentService`
Writes are declared as *intents* first: "I want to write X to Y, here's why". The intent is evaluated by guardrails, may be rejected, and only then commits. This is why you can audit every write.

### `filesystem-service/`
The actual FS adapter. Abstracts OS differences and provides the sandboxed view an agent sees.

## Git + shadow git

### `gitService`
The real repo. Normal git operations: status, diff, commit, branch, push, pull.

### `shadowGitService`
A *parallel* git repo that Codebolt maintains alongside the real one. Every agent write is committed here automatically, even if the agent never touches real git. This is what powers:
- **Checkpoints** — go back to "where we were 10 steps ago" instantly.
- **Replay** — reconstruct the FS state at any point in a run.
- **Diff-against-start** — show the user everything an agent changed in one view.

Shadow git is invisible to the user until they want to time-travel.

## Language servers

`languageServerService` starts and manages LSP servers per language. Agents use them through tools like `codebolt_code.analyze` and `codebolt_debug.*`. Diagnostics flow through `diagnosticService` into the agent loop as structured problems.

## Environments

`environmentsServices` + `environmentRestartService` manage per-project runtimes — the thing that lets an agent run `npm test` against the right Node version without the user configuring anything.

## App state

`rootAppStateService` + `appStateService` + `statusManager` are Codebolt's own "what's happening right now" state — open project, active agents, pending approvals, unread outputs. The UI reads from this via sockets.

## See also

- [Process Model](../02_architecture/03_process-model.md) — where language servers fit
- [Communication](./11_communication.md) — how app state reaches the UI
- [Checkpoints (user-facing)](../../02_using-codebolt/02_surfaces/02_desktop-app/03_chat/04_checkpoints-and-rollback.md)
