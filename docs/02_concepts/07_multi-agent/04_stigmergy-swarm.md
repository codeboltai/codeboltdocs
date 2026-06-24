---
sidebar_position: 4
title: Stigmergy Swarm
description: Most multi-agent systems collapse at scale
---

import StigmergyMechanisms from '@site/src/components/diagrams/StigmergyMechanisms';
import SwarmArchitecture from '@site/src/components/diagrams/SwarmArchitecture';

# Stigmergy Swarm

Most multi-agent systems collapse at scale. A central orchestrator becomes a bottleneck; synchronous messaging between agents quadratically explodes; shared task queues create contention. Past ~20 agents, the coordination overhead eats the benefit of parallelism.

**StigmergySwarm** is Codebolt's answer: a coordination model where agents never message each other directly. Instead, they sense and modify a shared **environment**, and coordination emerges from those modifications — the same way ants coordinate through pheromone trails without any ant ever speaking to another.

Production results: **81% lower coordination overhead** than centralized approaches, near-linear scaling to 200+ agents, and **18% better decision quality** from reputation-weighted governance.

## Why stigmergy

In biology, ants don't assign tasks. An ant that finds food deposits pheromones on its way back. Other ants, sensing stronger pheromone trails, follow them and reinforce them. Weak trails decay. No ant is "in charge"; the colony converges on efficient paths anyway.

Stigmergy — literally "traces that drive work" — is coordination **through the environment**, not through direct messaging. For AI agent swarms it means:

- **No central orchestrator.** Any bottleneck that scales with agent count is gone by construction.
- **Asynchronous by default.** Agents act on what's currently in the environment; they never wait for each other.
- **Resilient.** An agent crashing doesn't take anything with it; its traces persist and other agents react.
- **Scalable.** Coordination overhead scales sub-linearly in the number of agents for most mechanisms.

## The four-layer architecture

<SwarmArchitecture />

StigmergySwarm organizes a running swarm as four layers, each with a clear responsibility:

### Layer 1 — Environment
The persistent substrate the swarm operates on: jobs, files, the shared repository, and **pheromone signals**. Nothing in the swarm exists independently of the environment; an agent that isn't writing to or reading from the environment is doing nothing.

### Layer 2 — Agent Swarm
Stateless worker agents. Each agent senses signals local to its task, chooses an action, and modifies the environment. Agents don't track other agents; they only see the environment's current state.

### Layer 3 — Coordination
The engine that manages real-time signal propagation, pheromone decay, lock acquisition, and market bidding. This layer is where the four coordination mechanisms live.

### Layer 4 — Governance
Reputation, weighted voting, and conflict resolution sit here. When the swarm has to make a collective decision — split a job, resolve a dispute, approve a spawn — this layer orchestrates it.

## The four coordination mechanisms

<StigmergyMechanisms />

Four mechanisms, chosen for different kinds of coordination. Agents pick whichever fits the situation; the system supports all four simultaneously.

### 1. Pheromones — asynchronous signaling

Agents **deposit** pheromones on jobs, files, or regions to broadcast priority, readiness, or risk. Other agents sense aggregate pheromone intensity and react.

**Decay.** Pheromones weaken over time:

```
I(t) = I₀ · e^(-λ·t)
```

where `I₀` is the initial intensity, `λ` is the decay rate, and `t` is elapsed time. Stale signals fade automatically; no garbage collection is needed.

**Aggregation.** Multiple deposits on the same target are summed:

```
I_total(j, t) = Σᵢ I_i(j, t)
```

so strong collective signals emerge from many weak individual ones.

Pheromone types are defined in `.codebolt/coordination/pheromoneTypes.json` and a set of defaults ships with the system (urgency, claim, warning, readiness). You can register custom types per project.

**Use for:** soft priorities, readiness announcements, warnings, interest.

### 2. Locks — fast mutual exclusion

When an agent needs exclusive access to a resource (a file, a section of the repo, a job), it acquires a **lock**. Other agents see the lock and either wait, work on something else, or request an `unlock` through the governance layer.

Locks are deliberate and short-lived. They're the strongest form of coordination and the most expensive — use them when contention must be resolved definitively, not just softly.

**Use for:** exclusive edits, reservations, hard resource claims.

### 3. Markets — competitive bidding

For complex or high-value tasks, agents **bid**. Each agent publishes what it would do and at what estimated cost/confidence. A bidding round selects the winner — either the highest-reputation bidder automatically, or via deliberation if `bidDeliberationEnabled` is set.

Bids can come with split proposals: an agent might propose taking on part of a job while suggesting how the rest should be divided, letting the swarm converge on a decomposition without a central planner.

**Use for:** job assignment, work decomposition, price discovery.

### 4. Social signaling — vacancy posting

The most structured mechanism. When the swarm needs a specific role filled — "a security reviewer", "a database migration expert" — a **vacancy** is posted with requirements and a priority. Agents with matching capabilities apply; the vacancy's creator (or the governance layer) approves.

Vacancies are how the swarm forms teams and assigns roles without a central HR function.

**Use for:** role assignment, team formation, scheduled hiring.

## Reputation-weighted governance

Not all votes are equal. An agent that has historically made good decisions should have more influence than one that hasn't. Reputation-weighted voting implements this.

Each agent has a reputation score `R ∈ [0, 100]` tracked across five dimensions: **task success, code quality, collaboration, reliability, innovation**. The voting weight `w` is:

```
w = 1 + (R / 100)²
```

Quadratic rather than linear: everyone votes (weight ≥ 1), but high-reputation agents contribute disproportionately more at the top of the range. An agent with R=100 votes with weight 2; an agent with R=50 votes with weight 1.25.

This shape matters. A linear weighting flattens expertise; a pure expertise-only system silences new agents. Quadratic keeps everyone's voice meaningful while still amplifying demonstrated expertise.

Reputation weighting is used at every collective decision point:
- **Split proposals** — whose decomposition is accepted
- **Bid deliberation** — which bid wins
- **Solution deliberation** — which of several parallel attempts is chosen
- **Conflict resolution** — how a dispute is adjudicated

Measured impact (100-agent deployment):

| Metric | Equal voting | Reputation-weighted |
|---|---|---|
| Decision quality | 66% | **78%** |
| Conflict acceptance | 71% | **89%** |

## Job coordination knobs

The `JobCoordinationSettings` type (see `packages/server/src/sharedTypes/swarm.ts`) exposes the swarm's coordination behaviour as per-swarm configuration:

```typescript
{
  minSplitProposals: 1,           // min proposals before accepting a split
  maxSplitProposals: 5,           // max proposals allowed
  minReputationForSplit: 0,       // reputation floor to propose splits
  splitDeliberationEnabled: false,// deliberate when multiple splits exist
  bidDeliberationEnabled: false,  // deliberate on winning bid
  requireBidForAssignment: false, // force bidding before assignment
  allowParallelWork: false,       // multiple agents on same job
  maxParallelWorkers: 3,
  solutionDeliberationEnabled: false,
}
```

These defaults lean conservative (no forced deliberation, no parallel work) — turn them on as the swarm scales and needs stronger collective judgement.

## Scalability

The coordination overhead model for `n` agents:

```
O_total = α·n·r_p  +  β·n·c_r  +  γ·log(n)·s_c
```

- `α·n·r_p` — pheromone updates, **linear** in agents
- `β·n·c_r` — lock contention, **linear** in agents
- `γ·log(n)·s_c` — sharded context assembly, **logarithmic** in agents

Because the dominant terms are linear or logarithmic (not quadratic), overhead grows manageably with scale. Measured on a production deployment:

| Agents | Overhead | Alloc. time | Conflict rate | Success rate |
|---|---|---|---|---|
| 10 | 5.2% | 105 ms | 0.8% | 98.5% |
| 50 | 7.3% | 352 ms | 1.4% | 96.9% |
| 100 | 8.1% | 518 ms | 1.9% | 95.7% |
| 200 | 11.4% | 912 ms | 2.8% | 93.2% |

Near-linear scaling up to 200 agents. The failure rate grows with size but stays below 7% at the top of the tested range.

## When to reach for a stigmergy swarm

- **Many loosely-coupled sub-tasks.** A large refactor with hundreds of independent files. A bulk codemod. A crawl + triage over a corpus.
- **Workloads where central planning is intractable.** You can't plan the optimal assignment in advance, but agents can discover it locally.
- **Long-running, resilient missions.** Runs that outlive individual agents, where traces in the environment are the durable state.
- **Human-in-the-loop at scale.** The governance layer makes it easy to insert human approval as just another voter.

**Don't reach for it** when a single agent or a small swarm (3–5 specialists in a flow) would do the job. Stigmergy pays off with scale; under ~10 agents, the mechanism overhead is pure cost.

## How this relates to other concepts

- **[Multi-Agent Patterns](./01_multi-agent-patterns.md)** — stigmergy is one of the five patterns. This page is its deep dive.
- **[Orchestration Flows](./02_orchestration-flows.md)** — flows are *explicit* DAGs; stigmergy is the opposite, *implicit* coordination. A swarm can run a flow as one of its coordination options.
- **[Dispute Resolution](./03_dispute-resolution.md)** — governance uses the same deliberation primitive as the dispute-resolution framework.
- **[Evals and Optimization](../06_quality/02_evals-and-optimization.md)** — reputation weights are informed by eval scores; a swarm is a natural environment for continuous eval.

## See also

- [Swarm service (build)](../../04_build-on-codebolt/07b_subsystems/11_communication.md)
- [Running a swarm (using)](../../02_using-codebolt/07_multi-agent-usage/02_running-a-swarm.md)
- [Build a code-review swarm (guide)](../../03_guides/05_multi-agent/build-a-code-review-swarm.md)
