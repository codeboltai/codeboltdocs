---
sidebar_position: 1
title: Code Observability Overview
description: Codebolt includes code-observability tools for understanding both how a project is wired together and how an agent execution moved through that code before you.
---

# Code Observability

Codebolt includes code-observability tools for understanding both how a project is wired together and how an agent execution moved through that code before you edit, refactor, or hand work to an agent.

## Panels in this section

| Panel | Purpose |
|---|---|
| [Codemap](./02_codemap.md) | Structural dependency graph of files, modules, classes, and functions |
| [Narrative Graph](./03_narrative-graph.md) | Visual replay of an agent run, including branches, hierarchy, and file-level execution detail |

## When to use it

- **Before a refactor** — understand the blast radius of a change
- **When orienting in a new repo** — see how modules connect without reading every file
- **When replaying an execution path** — inspect where a run branched, retried, or touched code
- **When delegating to an agent** — frame the task with the right dependency context

## Related

- [Agent Observability](../05c_agent-observability/01_overview.md) — running processes, log streams, and LLM traces
- [Code Editor Features](../02_surfaces/02_desktop-app/03b_code-and-terminal/01_overview.md) — editor, terminal, git, and preview
