---
sidebar_position: 4
title: Deposition Framework
description: Deposit agent results so another agent can pick up the work later
---

import DepositionPickupDiagram from '@site/src/components/diagrams/DepositionPickupDiagram';

# Deposition Framework

The deposition framework is a handoff pattern for making agent results durable enough that another agent can pick up the work later.

A deposition is a stored result, finding, test run, decision, or handoff package. It tells the next agent, subagent, thread, or future session what happened, where the useful artifacts are, and what to do next.

**Use case:** one agent finishes part of a workflow and another agent, thread, or future session needs to continue from that result.

Deposition is not one generic Codebolt API. Codebolt provides durable surfaces, such as auto testing and agent deliberation, that can act as deposition targets for different kinds of handoffs.

## Deposition loop

<DepositionPickupDiagram />

The loop is complete when the next agent can load the deposited result by ID and continue with clear evidence and a specific next action.

## Deposition contents

A useful deposition should include:

- **What happened:** the completed task, finding, or decision.
- **Artifact IDs:** run IDs, case IDs, deliberation IDs, thread IDs, file paths, or external record IDs.
- **Evidence:** logs, test output, screenshots, votes, summaries, or review notes.
- **Current status:** pending, running, passed, failed, completed, blocked, or closed.
- **Next action:** the exact pickup step for the next agent.
- **Owner or target:** the agent, thread, environment, or user expected to continue.
- **Known blockers:** missing credentials, failing checks, unclear requirements, or environment issues.

## Built-in deposition surfaces

Codebolt already has durable surfaces that work like depositions:

- **Auto testing:** agents can deposit test suites, test cases, test runs, run case statuses, run step statuses, and logs.
- **Agent deliberation:** agents can deposit structured decisions, requests, responses, votes, winners, and summaries.

These surfaces are file-backed by the server, but agents should use the public Codebolt APIs instead of writing directly to `.codebolt` files.

## Code example

```ts
import codebolt from '@codebolt/codeboltjs';

await codebolt.agentDeliberation.summary({
  deliberationId: 'delib-123',
  summary: 'Use the preview-thread result. The API check passed, but staging secrets still need review.',
  authorId: 'validator-agent',
  authorName: 'Validator Agent',
});

await codebolt.autoTesting.updateRunStepStatus({
  runId: 'run-123',
  caseId: 'case-456',
  stepId: 'api-check',
  status: 'passed',
  logs: 'Preview API returned 200 and matched the expected response shape.',
});
```

The next agent can load the deliberation or test run by ID and continue from the deposited result:

```ts
const winner = await codebolt.agentDeliberation.getWinner({
  deliberationId: 'delib-123',
});

const run = await codebolt.autoTesting.getRun({
  id: 'run-123',
});
```

## Important limitations

- **Auto testing tracks testing state.** It stores structured test plans, suites, runs, statuses, and logs. It does not execute arbitrary tests by itself.
- **Agent deliberation tracks decision state.** It stores requests, responses, votes, winners, and summaries. Agent kickoff depends on the orchestration path used by the workflow.
- **Custom workflows need custom depositions.** Use a custom deposition when a plugin, custom UI, or domain workflow needs its own durable state.

## When to use it

Use the deposition framework when:

- Work spans multiple sessions.
- Another agent will continue the task.
- A test run, deliberation, or generated artifact should be reused later.
- The next agent needs more than a plain summary.
- You need to preserve the result of one loop for another loop.

## See also

- [Auto-testing API](../../05_reference/02_codeboltjs/10_api-access/autoTesting/index.md)
- [Agent Deliberation](../../02_using-codebolt/07c_agent-coordination/04_agent-deliberation.md)
- [Agent Deliberation API](../../05_reference/02_codeboltjs/10_api-access/agentDeliberation/index.md)
- [Custom Depositions](./custom-depositions.md)
- [MultiAgent Loops](./multiagent-loops.md)
- [Multi Environment Loop](./multi-environment-loop.md)
- [Query the event log](../08_advanced/query-the-event-log.md)
- [Replay an agent run](../08_advanced/replay-an-agent-run.md)
