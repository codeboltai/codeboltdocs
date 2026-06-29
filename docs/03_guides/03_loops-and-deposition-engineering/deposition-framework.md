---
sidebar_position: 4
title: Deposition Framework
description: Deposit agent results so another agent can pick up the work later
---

import DepositionPickupDiagram from '@site/src/components/diagrams/DepositionPickupDiagram';

# Deposition Framework

The deposition framework is a way to deposit agent results so another agent can pick them up later.

A deposition is a stored result, finding, test run, decision, or handoff package. It tells the next agent what happened, where the useful artifacts are, and what to do next.

**Use case:** one agent finishes part of a workflow and another agent, thread, or future session needs to continue from that result.




## The framework loop

1. **Do the work.** Let the agent complete a focused part of the task.
2. **Produce a result.** Turn the work into a clear output, finding, run, or decision.
3. **Deposit it durably.** Store the result somewhere another agent can retrieve.
4. **Record how to retrieve it.** Include IDs, paths, or links to the deposited result.
5. **Add evidence.** Attach test output, logs, summaries, or other proof.
6. **Leave the next action.** Tell the next agent exactly how to continue.

## Server examples

Codebolt already has durable surfaces that work like depositions:

- **Auto-testing:** agents can deposit test suites, test cases, test runs, step statuses, and logs under `.codebolt/autotests`.
- **Agent deliberation:** agents can deposit shared decisions, responses, votes, winners, and summaries under `.codebolt/agentdeliberation`.

These are not one generic `deposition` API. They are examples of durable results that another agent can list, load, and continue from later.

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

The next agent can load the deliberation or test run by ID and continue from the deposited result.

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
- [Query the event log](../08_advanced/query-the-event-log.md)
- [Replay an agent run](../08_advanced/replay-an-agent-run.md)
