---
sidebar_position: 2
title: MultiAgent Loops
description: Coordinate multiple agents through parallel discovery, implementation, review, and verification
---

# MultiAgent Loops

MultiAgent loops split work across specialized agents. Instead of one agent doing everything, each agent owns a role such as planning, implementation, review, testing, or documentation.

**Use case:** you need faster exploration, independent review, or multiple specialists working on the same goal.

## The loop

1. **Assign roles.** Decide which agent plans, implements, reviews, and verifies.
2. **Share the goal.** Give every agent the same outcome and constraints.
3. **Run discovery in parallel.** Let agents inspect different areas or risks.
4. **Merge findings.** Consolidate the plan before edits begin.
5. **Implement in controlled slices.** Avoid overlapping file edits where possible.
6. **Review independently.** Use a reviewer agent to challenge assumptions and catch regressions.
7. **Verify together.** Run the project checks and resolve failures.

## Role examples

- **Planner:** turns the goal into an implementation sequence.
- **Builder:** makes the primary code or documentation edits.
- **Reviewer:** checks correctness, safety, and maintainability.
- **Tester:** identifies missing coverage and runs validation.
- **Documenter:** updates user-facing or internal docs.

## When to use it

Use MultiAgent loops when:

- The task spans several subsystems.
- Independent critique would improve quality.
- Discovery can be parallelized safely.
- You need separate agents for code, tests, and documentation.

Avoid it for tiny tasks where coordination costs more than the work itself.

## Example prompt

```text
Use a planner, builder, and reviewer flow for this checkout refactor. The planner should inspect the current flow first. The builder should edit only after the plan is clear. The reviewer should check the final diff and require verification before completion.
```

## Common pitfalls

- **Unclear ownership.** Two agents editing the same files can conflict.
- **No merge point.** Parallel findings must be reconciled before implementation.
- **Skipping review.** MultiAgent work is strongest when one agent challenges another.

## See also

- [Build a plan-execute-review flow](../06_multi-agent/build-a-plan-execute-review-flow.md)
- [Build a code review swarm](../06_multi-agent/build-a-code-review-swarm.md)
