---
sidebar_position: 4
title: Deposition Framework
description: Structure agent handoffs as clear records of context, decisions, evidence, and next actions
---

# Deposition Framework

The deposition framework is a way to make agent work auditable. A deposition records what the agent learned, what decisions it made, what evidence supports those decisions, and what should happen next.

**Use case:** you need durable handoffs between humans, agents, reviews, or future sessions.

## What a deposition contains

A useful deposition includes:

- **Goal:** the outcome the agent was asked to achieve.
- **Context:** files, systems, constraints, and assumptions discovered during work.
- **Actions:** the edits, commands, or operational steps performed.
- **Evidence:** test output, build results, logs, screenshots, or reviewed source references.
- **Decisions:** tradeoffs, rejected options, and why the chosen path was used.
- **Open risks:** unresolved questions, known limitations, and follow-up work.
- **Next actions:** what the next human or agent should do.

## The framework loop

1. **Collect context.** Record the sources used to understand the task.
2. **State assumptions.** Make uncertainty visible before acting on it.
3. **Perform the work.** Keep changes connected to the original goal.
4. **Capture evidence.** Save the verification results that prove the work.
5. **Summarize decisions.** Explain why the final approach was chosen.
6. **Hand off cleanly.** Leave enough information for another agent to continue.

## Example deposition template

```markdown
## Goal

## Context reviewed

## Actions taken

## Evidence

## Decisions

## Risks and limitations

## Next actions
```

## When to use it

Use the deposition framework when:

- Work spans multiple sessions.
- Another agent will continue the task.
- Reviewers need evidence, not just a summary.
- Production changes require a clear audit trail.

## See also

- [Query the event log](../08_advanced/query-the-event-log.md)
- [Replay an agent run](../08_advanced/replay-an-agent-run.md)
