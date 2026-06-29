---
sidebar_position: 2
title: MultiAgent Loops
description: Coordinate multiple agents through delegation, parallel discovery, review, and verification
---

import MultiAgentSpawnLoopDiagram from '@site/src/components/diagrams/MultiAgentSpawnLoopDiagram';

# MultiAgent Loops

MultiAgent loops split work across specialized agents. The main agent can own the loop and spawn subagents for focused subtasks, or several agents can be arranged ahead of time as a fixed flow.

**Use case:** you need faster exploration, independent review, or multiple specialists working on the same goal.


## The loop

1. **Start with the main agent.** One agent owns the main goal, constraints, and final answer.
2. **Assign roles.** Decide which subagents plan, inspect, implement, review, or verify.
3. **Spawn subagents.** The main agent delegates focused tasks to other agents.
4. **Collect results.** Subagents return findings, edits, or review notes to the main agent.
5. **Merge findings.** The main agent decides what to keep, what conflicts, and what needs another pass.
6. **Loop if needed.** Spawn another subagent or send a follow-up task when the result is incomplete.
7. **Verify together.** Run checks and summarize the final outcome.

## Subagents spawned by the main agent

The most common shape is a main agent that stays in the main loop and calls subagents as needed.

Use this when one agent should keep ownership of the task, but needs help from specialists.

```ts
import codebolt from '@codebolt/codeboltjs';

const result = await codebolt.agent.startAgent(
  'code-reviewer',
  'Review the authentication changes and return only risks and required fixes.',
);

if (result.success) {
  // The main agent uses the subagent result in its next loop step.
}
```

For isolated or parallel work, the main agent can start subagents in separate threads:

```ts
await codebolt.thread.createThreadInBackground({
  agentId: 'test-scanner',
  userMessage: 'Scan the payment module for missing test coverage.',
  parentId: currentThreadId,
  groupId: 'payment-review',
});
```

Keep the main agent responsible for the final decision. Subagents should own a narrow task and report back clearly.

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
- The main agent needs to spawn specialist subagents during the loop.

Avoid it for tiny tasks where coordination costs more than the work itself.

## Common pitfalls

- **Unclear ownership.** Two agents editing the same files can conflict.
- **No merge point.** Parallel findings must be reconciled before implementation.
- **Unbounded spawning.** The main agent should limit how many subagents it starts.
- **Skipping review.** MultiAgent work is strongest when one agent challenges another.

## See also

- [Build a plan-execute-review flow](../06_multi-agent/build-a-plan-execute-review-flow.md)
- [Build a code review swarm](../06_multi-agent/build-a-code-review-swarm.md)
- [Subagents](../../04_build-on-codebolt/03_agent-extensions/08_subagents.md)
