---
sidebar_position: 1
title: Build a review agent
description: Remix an existing Codebolt agent in the desktop app and give it project-specific review instructions.
---

# Build a review agent

Open a project in Codebolt Desktop with a configured model provider. You'll remix an existing agent and give it instructions for reviewing your project's changes.

## Part 1 — Level 0 remix

### Step 1 — create the remix

In Chat, open the agent picker and select **Create Agent → Remix Agent**. Under **Remix From**, choose an agent that can inspect your project's files and Git diff. Name the remix `my-pr-reviewer`.

### Step 2 — add review instructions

Paste these example rules into **Custom Instructions**. Replace the paths with the ones your project uses, then select **Create**.

```text
Review the staged changes for bugs and violations of these project conventions.

- Keep database access in the repository layer under src/db/repos/.
- Define public API types in src/types/api.ts.
- Place tests under tests/ and mirror their source paths.

Leave the files as they are. Report one finding per bullet with its file
and line number. End with APPROVE, REQUEST_CHANGES, or NEEDS_DISCUSSION.
```

Codebolt saves the remix in `.codebolt/agents/remix/my-pr-reviewer.md`. The YAML front matter stores the base agent and settings. The Markdown body stores the instructions.

### Step 3 — try a review

Open a Chat tab, select `my-pr-reviewer` in the agent picker, and send this message.

```text
Review my current staged changes.
```

Check the findings against the diff. To edit the prompt, open **Agents → Agents** from the bottom bar and use **Edit Remix** on the agent's row.

You can also run the review from the CLI.

```bash
codebolt --prompt "review the staged changes" --agent my-pr-reviewer
```

## Part 2 — Level 1 upgrade (optional)

Do this part when your rules get complex enough that embedding them in instructions isn't enough — for example, if you want to mechanically verify something, not ask the LLM to check it.

The [Custom Agent Quickstart](../../04_build-on-codebolt/02_creating-agents/02_quickstart.md#part-2--framework-agent-level-1) explains the files Codebolt generates and shows how to implement, build, and test a TypeScript handler. See [Level 1 — Framework](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md) for the full walkthrough on creating framework agents with custom logic, processors, and mechanical checks.

## What you learned

- **Start at level 0.** A remix is often enough.
- **Graduate only when the instructions aren't sufficient.** "I want the LLM to definitely not miss X" often means X should be a mechanical check, not a prompt instruction.
- **Iterate.** The first version won't be right. Test, edit, test again.

## Where to next

- **Commit your agent** to the project repo so your team gets it automatically. `.codebolt/agents/` should be in git.
- **Publish it to the marketplace** — see [Publishing](../../04_build-on-codebolt/02_creating-agents/99_publishing.md).
- **Code review with an agent** — see [Code review guide](../04_everyday-workflows/code-review-with-an-agent.md).

## See also

- [Custom Agents Overview](../../04_build-on-codebolt/02_creating-agents/01_overview.md)
- [Level 0 — Remix](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-3-remix.md)
- [Level 1 — Framework](../../04_build-on-codebolt/02_creating-agents/03_agent-types/level-2-framework.md)
