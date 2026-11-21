---
sidebar_position: 1
title: Level 3 — Remix Agents
description: "The lightest possible custom agent: take an existing one, override a few fields, give it a new name. No code. No dependencies. Pure config."
---

# Level 0 — Remix

The lightest possible custom agent: take an existing one, override a few fields, give it a new name. No code. No dependencies. Pure config.

If you can get what you want this way, do it this way. Remix agents inherit bug fixes and improvements from their parent every time the parent is updated — code-based agents don't.

## What you can override

A remix can change any of the following:

| Field | What it does |
|---|---|
| `system_prompt` | The agent's guiding prompt. The most common override. |
| `model` | Use a different model for this remix. |
| `tools.allow` / `tools.deny` | Constrain (or expand) the tool allowlist. |
| `processors` | Add or remove processors from the pipeline. |
| `default_temperature`, `max_tokens`, etc. | LLM parameters. |
| `metadata` | Name, description, tags, marketplace fields. |
| `limits` | Per-run budgets (token, time, tool-call count). |

You **cannot** change the loop structure, add new phases, or change what the agent returns. For any of those, graduate to [level 1](./level-2-framework.md).

## The manifest

Remix agents are stored as markdown files with YAML frontmatter in `.codebolt/agents/remix/`:

```yaml
# .codebolt/agents/remix/my-reviewer.md
---
name: my-reviewer
description: A stricter code reviewer with write tools disabled.
remixedFromId: c4d3fdb9-cf9e-4f82-8a1d-0160bbfc9ae9
remixedFromTitle: Act
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search
  - codebolt_codebase.*
  - codebolt_code.analyze_code
version: 1.0.0
type: remix
---

You are a code reviewer. Your job is to find bugs that will
cause incorrect behaviour at runtime. Do not comment on style.
Do not comment on performance unless it's algorithmic.
```

The YAML frontmatter holds configuration. The markdown body (after `---`) holds the custom instructions.

## How remix resolves at runtime

When the agent runs, the server:

1. Loads `generalist` (the parent).
2. Applies the remix block on top: deep-merges `tools`, replaces scalar fields.
3. Spawns a process with the merged manifest.

There's no forked code. A bug fix to the parent's tool handling, an improvement to its default processors, a new safety feature — all of these automatically apply to your remix the next time the server loads it.

## Finding a parent to remix

```bash
codebolt action agent list
```

Shows every installed agent. The built-in ones (`generalist`, `planner`, `reviewer`, etc.) are the safest to remix because they're maintained as part of Codebolt itself. Marketplace agents can also be remixed, but their authors may break you with updates.

To inspect what a parent looks like before remixing:

```bash
codebolt command agent list
```

Prints the full resolved manifest including defaults.

## Scaffolding

```bash
codebolt action agent create --remix
```

This starts an interactive flow: select the agent to remix, enter a name, description, and custom instructions. Creates a `.codebolt/agents/remix/<name>.md` file with the remix config. Edit it to customise further.

## Remix patterns that work well

### Constrained variant
The original has all tools, your remix has only a safe subset. Used for reviewers, auditors, read-only inspectors. Remove write tools, keep reads.

### Domain specialist
Same base agent, but with a system prompt that injects domain context: your company's coding conventions, your API style, your deployment rules. Often 10 lines of prompt that turn a generalist into a specialist for your codebase.

### Fast variant
Same as the parent but with a cheaper/faster model and tighter token limits. Good for high-volume use.

### Strict variant
Add extra processors (e.g. a `LoopDetectionModifier` with a lower threshold, a custom validation processor) without changing the rest.

## When to graduate to level 1

Clear signs:
- You find yourself wanting to add code inside the handler ("after the tool call, if X, do Y").
- You need structured input or output that doesn't match the parent's interface.
- You want to use this agent as a node in a typed agent flow.
- You need to inject state or context from an external system.

Graduating is a one-way move (usually) — a level-1 agent doesn't inherit from its level-0 ancestor automatically. But you can keep the level-0 remix alongside and graduate only the cases that need it.

## See also

- [Level 1 — Framework](./level-2-framework.md)
- [Custom Agents Quickstart](../02_quickstart.md)
- [agent.yaml reference](../05_agent-anatomy/agent-yaml.md)
