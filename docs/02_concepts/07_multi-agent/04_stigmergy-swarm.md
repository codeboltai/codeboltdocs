---
sidebar_position: 4
title: Stigmergy Swarm
description: Coordinate swarm workers through shared jobs, signals, and reservations.
---

# Stigmergy Swarm

Workers can coordinate by leaving information on shared jobs or files. For example, one worker can mark a job as important and another can inspect that signal when choosing its next task. The worker’s instructions determine how it responds.

## Signals, locks and bids

- **Pheromones** communicate information such as importance or saturation. Open **Tools → Jobs**, select a job and inspect **Pheromones**. A deposit has a type, intensity and depositor. Depositing the same type again from the same agent updates its signal. See [Pheromones](../../02_using-codebolt/07d_stigmergic-coordination/02_pheromones.md).
- **Locks and file update intents** coordinate access to shared resources. See [Locks and Unlock Requests](../../02_using-codebolt/07d_stigmergic-coordination/03_locks-and-unlock-requests.md) and [Dispute Resolution](./03_dispute-resolution.md).
- **Job bids and split proposals** let workers propose assignments or break up work. Swarm settings control whether a bid is required and whether participants deliberate on proposals.
- **Vacancies** advertise roles for agents to apply for. Use them when a swarm needs a worker with particular capabilities.

## Job coordination settings

The `JobCoordinationSettings` type (see `packages/server/src/sharedTypes/swarm.ts`) exposes the swarm's coordination behaviour as per-swarm configuration:

```ts
const coordinationSettings = {
  minSplitProposals: 1,           // min proposals before accepting a split
  maxSplitProposals: 5,           // max proposals allowed
  minReputationForSplit: 0,       // reputation floor to propose splits
  splitDeliberationEnabled: false, // deliberate when multiple splits exist
  bidDeliberationEnabled: false,  // deliberate on winning bid
  requireBidForAssignment: false, // force bidding before assignment
  allowParallelWork: false,       // require separate jobs for parallel assignments
  maxParallelWorkers: 3,
  solutionDeliberationEnabled: false,
}
```

For example, the default `allowParallelWork: false` applies to workers sharing one job. Assign separate jobs when you want workers to carry out independent tasks.

See [Running a Swarm](../../02_using-codebolt/07_multi-agent-usage/02_running-a-swarm.md) for a working example and [Multi-Agent Patterns](./01_multi-agent-patterns.md) for other ways to organize workers.
