---
sidebar_position: 5
title: Auto Testing
description: Use test suites, cases, runs, step statuses, and logs as durable evidence for later pickup.
---

# Auto Testing

The **Auto Testing** panel stores structured test state. In deposition workflows, test runs and logs are evidence that another agent can load before continuing.

Open via: **Execution menu -> Auto Testing** or the Panel Selector.

## What gets deposited

- Test suites.
- Test cases.
- Test runs.
- Run case status.
- Run step status.
- Logs and failure details.

## Important limitation

Auto Testing stores test plans, run state, statuses, and logs. It does not execute arbitrary tests by itself; agents or integrations still need to perform the actual test action and then deposit the result.

## See also

- [Deposition Framework](../../../../03_guides/03_loops-and-deposition-engineering/deposition-framework.md)
- [Agent Deliberation](./02_agent-deliberation.md)
