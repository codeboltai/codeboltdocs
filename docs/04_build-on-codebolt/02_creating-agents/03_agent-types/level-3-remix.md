---
sidebar_position: 1
title: Level 0 — Remix
description: "The lightest possible custom agent: take an existing one, override a few fields, give it a new name. No code. No dependencies. Pure config."
---

# Level 0 — Remix

The lightest possible custom agent: take an existing one, override a few fields, give it a new name. No code. No dependencies. Pure config.

If you can get what you want this way, do it this way. Remix agents inherit bug fixes and improvements from their parent every time the parent is updated — code-based agents don't.

## Create and test a remix in Desktop

### Create the remix {#step-1--create-the-remix}

In the Chat agent picker, select **Create Agent → Remix Agent**, choose a base agent under **Remix From**, name it `my-reviewer`, and select **Create**.

### Edit the instructions and check the reply {#edit-remix}

1. Open `.codebolt/agents/remix/my-reviewer.md` in the project. The block between the first two `---` lines identifies the remix and its parent. The text **below the second line** contains its instructions.
2. Replace that body text with the following instruction and save the file.

   > When reviewing a code snippet, start your response with “Review note”. Explain one possible bug in one sentence.

3. Open a new Chat tab, select **my-reviewer**, and send: **Review this JavaScript function: `function firstName(user) { return user.name.split(" ")[0]; }`**
4. Look for a reply beginning with **Review note** that identifies a possible failure, such as a missing `name`. To try another edit, change “Review note” to “Finding”, save, and repeat in a new Chat tab.

## What you can override

The Markdown body contains the instructions added by the remix. In the YAML frontmatter, `name` and `description` identify the remix, `remixedFromId` identifies its parent, and `tools` accepts a string or list of tool names. Use the tool identifiers available in your project. For custom processors or tool implementations, use the [agent framework](./level-2-framework.md).

## The manifest

Remix agents are stored as markdown files with YAML frontmatter in `.codebolt/agents/remix/`:

```yaml
# .codebolt/agents/remix/my-reviewer.md
---
name: my-reviewer
description: Review code for runtime errors.
remixedFromId: c4d3fdb9-cf9e-4f82-8a1d-0160bbfc9ae9
remixedFromTitle: Act
model: claude-sonnet-4-6
tools:
  - codebolt_fs.read_file
  - codebolt_fs.search
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

The loader reads the frontmatter and Markdown body. It maps `tools` to required tools, preserves `remixedFromId`, and passes the body as custom instructions. The parent is the agent you chose under **Remix From**.

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

### Review checklist

Give the parent agent a repeatable review task by listing the checks in the Markdown body and specifying how to report the findings.

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
