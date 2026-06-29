---
sidebar_position: 2
title: MultiAgent Loops
description: Coordinate multiple agents through delegation, parallel discovery, review, and verification
---

import MultiAgentSpawnLoopDiagram from '@site/src/components/diagrams/MultiAgentSpawnLoopDiagram';

# MultiAgent Loops

MultiAgent loops split work across specialized agents. One agent can coordinate the loop and spawn child agents for focused subtasks, or several agents can be arranged ahead of time as a fixed flow.

**Use case:** you need faster exploration, independent review, or multiple specialists working on the same goal.


## The loop

1. **Start with a coordinator.** One agent owns the main goal, constraints, and final answer.
2. **Assign roles.** Decide which child agents plan, inspect, implement, review, or verify.
3. **Spawn child agents.** The coordinator delegates focused tasks to other agents.
4. **Collect results.** Child agents return findings, edits, or review notes to the coordinator.
5. **Merge findings.** The coordinator decides what to keep, what conflicts, and what needs another pass.
6. **Loop if needed.** Spawn another child agent or send a follow-up task when the result is incomplete.
7. **Verify together.** Run checks and summarize the final outcome.

## Coordinator-spawned agents

The most common shape is a coordinator agent that stays in the main loop and calls other agents as needed.

Use this when one agent should keep ownership of the task, but needs help from specialists.

```ts
import codebolt from '@codebolt/codeboltjs';

const result = await codebolt.agent.startAgent(
  'code-reviewer',
  'Review the authentication changes and return only risks and required fixes.',
);

if (result.success) {
  // The coordinator uses the child result in its next loop step.
}
```

For isolated or parallel work, the coordinator can start child agents in separate threads:

```ts
await codebolt.thread.createThreadInBackground({
  agentId: 'test-scanner',
  userMessage: 'Scan the payment module for missing test coverage.',
  parentId: currentThreadId,
  groupId: 'payment-review',
});
```

Keep the coordinator responsible for the final decision. Child agents should own a narrow task and report back clearly.

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
- One coordinator needs to spawn specialist agents during the loop.

Avoid it for tiny tasks where coordination costs more than the work itself.

## Common pitfalls

- **Unclear ownership.** Two agents editing the same files can conflict.
- **No merge point.** Parallel findings must be reconciled before implementation.
- **Unbounded spawning.** A coordinator should limit how many child agents it starts.
- **Skipping review.** MultiAgent work is strongest when one agent challenges another.

## See also

- [Build a plan-execute-review flow](../06_multi-agent/build-a-plan-execute-review-flow.md)
- [Build a code review swarm](../06_multi-agent/build-a-code-review-swarm.md)
- [Subagents](../../04_build-on-codebolt/03_agent-extensions/08_subagents.md)
