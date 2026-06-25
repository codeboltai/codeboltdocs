---
sidebar_position: 2
title: Bulk Refactor with Checkpoints
description: Using an agent to do a mechanical refactor across many files, with checkpoints so you can undo any step if it goes wrong.
---

# Bulk Refactor with Checkpoints

Using an agent to do a mechanical refactor across many files, with checkpoints so you can undo any step if it goes wrong.

**Use case:** rename a widely-used symbol, change an API pattern across a codebase, migrate from one library to another.

## The pattern

1. **Plan** — have an agent (or yourself) produce a list of files that need changes.
2. **Checkpoint** — create an explicit checkpoint before starting.
3. **Batch execute** — run the refactor agent over the list.
4. **Verify** — tests, diagnostics, quick visual review.
5. **Rollback if needed** — one command back to safety.

## Step 1 — plan

```
user (to planner): Produce a list of every file that needs updating to rename the function `getUser` to `fetchUser`.
```

The planner scans, lists files. Verify the list is correct — check a few random ones.

## Step 2 — explicit checkpoint

Create a named checkpoint using the chat UI checkpoint controls, or:

```
/checkpoint before-getUser-rename
```

This is your safety net. Keep the checkpoint panel open so you can easily roll back.

## Step 3 — execute

```
user (to refactor): For each file in [list], replace getUser with fetchUser. Update imports, exports, and tests. Do not change behaviour.
```

The refactor agent works through the list. Watch the stream. If anything looks wrong mid-way:

- **Stop immediately:** Esc, or `codebolt agent stop <run-id>`.
- **Check the trace** for what went wrong.
- **Roll back** to the pinned checkpoint and try again.

## Step 4 — verify

After the agent reports done:

1. **Run the tests.** `npm test` / `pytest` / whatever. All should pass.
2. **Check diagnostics.** Open a few changed files; look for red squigglies.
3. **Search for leftover `getUser`.** `codebolt_fs.search_files("getUser")` — should return nothing in the code (maybe still in docs or comments).
4. **Visual spot-check.** Read 2-3 changed files. Does the diff look right?

## Step 5 — commit or rollback

### If everything's good

Commit normally:

```bash
git add -p    # review the diff as you stage
git commit -m "refactor: rename getUser to fetchUser everywhere"
```

Delete the checkpoint if you want via the checkpoint panel.

### If something's wrong

Use the checkpoint strip in the UI to roll back to "before-getUser-rename".

Every file back to exactly where it was before the refactor. Real git is untouched. Try again with different instructions.

## Partial rollback

If 90% of the refactor was right but one subdirectory was botched, you can use the checkpoint panel to roll back specific files, or undo the changes in that directory manually.

## Tips for successful bulk refactors

- **Small batches beat one huge batch.** Refactor 20 files, verify, commit, move on to the next 20. Easier to roll back if something goes wrong.
- **Tests between batches.** Run the test suite between batches, not just at the end. A batch that breaks tests should be rolled back before the next batch piles on.
- **Explicit lists beat "find and replace".** Producing a concrete file list first means the agent can't drift into files you didn't intend.
- **Don't let the agent plan and execute in one go.** The plan should be reviewable before execution.
- **Watch the stream.** Don't `--detach` and walk away for a bulk refactor. Stop it if it starts going wrong.

## Common pitfalls

- **The agent "improves" code beyond the refactor.** Tight system prompt: "make no other changes". If it still improvises, stop and try a stricter refactor agent.
- **Tests pass but behaviour changed.** Rare but devastating. A manual spot-check of a few files catches most of these.
- **Massive token usage.** Bulk refactors can eat budget. Monitor usage via **Settings → Usage**.
- **Missing imports/exports.** Mechanical refactors miss cross-file concerns. Run a type-checker or linter between batches.

## See also

- [Checkpoints and rollback](../../02_using-codebolt/03_chat/04_checkpoints-and-rollback.md)
- [Running agents](../../02_using-codebolt/04_agents/03_running-agents.md)
- [Built-in agents](../../02_using-codebolt/04_agents/02_built-in-agents.md) — the `refactor` agent
