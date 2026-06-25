---
sidebar_position: 1
title: Replay an Agent Run
description: Re-running an agent with the same or similar prompt to verify that changes to the agent's configuration didn't break its behaviour.
---

# Replay an Agent Run

Re-running an agent with the same or similar prompt to verify that changes to the agent's configuration didn't break its behaviour.

**You'll need:** a custom agent with at least one previous run, and a change you want to test.

## Why replay

LLM behaviour isn't deterministic. You change the agent's instructions, test it, and the new run looks fine — but that's one sample. You don't know if you broke a common case until the bad case shows up in production.

Manual replay helps by:

1. **Recording** what the agent did in a good run (via the run history).
2. **Re-running** the agent with the same prompt after your change.
3. **Comparing** — what's different between the two runs?

## Step 1 — note a good run

Run your agent with a task and note the prompt you used:

```bash
codebolt --prompt "review the current branch" --agent my-agent
```

After the run completes, check the run history in the UI. Note:
- The exact prompt you used
- The tool calls the agent made
- The final output

## Step 2 — make a change

Edit your agent — tweak the instructions, update the tool list, change the model, whatever.

## Step 3 — replay

Run the same prompt against the modified agent:

```bash
codebolt --prompt "review the current branch" --agent my-agent
```

Compare the new run's tool calls and output against the previous run. Key things to check:

- Did the agent still call the right tools?
- Did it follow the same general approach?
- Is the output quality at least as good?

## Step 4 — what to look for

Because LLM outputs are non-deterministic, exact matches aren't expected. Instead, look for:

- **Structural changes** — the agent now skips a step it used to do, or does things in a different order.
- **Quality regressions** — the output is noticeably worse or missing key elements.
- **Tool call differences** — the agent calls different tools or makes many more calls (potential loop).

## Keeping test prompts

Save prompts that exercise important agent behaviour in a file:

```markdown
# agent-tests.md

## Test: branch review
Prompt: "review the current branch"
Expected: agent reads git diff, reads relevant files, produces structured review

## Test: specific file review
Prompt: "@src/auth/session.ts review for security issues"
Expected: agent focuses on that file, checks for auth bugs
```

Run these prompts after any agent change to verify nothing broke.

## Limitations

- **Non-determinism.** LLM outputs vary between runs. You're checking for structural/quality regressions, not exact matches.
- **Context differences.** If the codebase changed between runs, the agent will naturally produce different output.
- **No automated diff.** You compare runs manually by inspecting both in the run history.

## See also

- [Agent Debug](../../02_using-codebolt/05c_agent-observability/02_agent-debug.md)
- [Running agents](../../02_using-codebolt/04_agents/03_running-agents.md)
- [Query the event log](./query-the-event-log.md)
