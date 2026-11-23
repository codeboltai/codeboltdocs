---
sidebar_position: 13
title: Dispute Resolution
description: When many agents share a codebase, conflicts are inevitable. Two agents edit the same file. A refactor and a feature touch the same type
---

import ConflictLayers from '@site/src/components/diagrams/ConflictLayers';

# Dispute Resolution

When many agents share a codebase, conflicts are inevitable. Two agents edit the same file. A refactor and a feature touch the same type. A security fix contradicts a perf fix. Someone has to decide.

Codebolt handles this with a **four-layer conflict management framework**. Each layer catches a different *kind* of conflict; together they cover the spectrum from "two agents touching the same byte" to "two agents holding incompatible opinions".

<ConflictLayers />

## The four layers

### Layer 0 — Isolation (prevention by separation)

Each agent runs inside its own **environment** — an isolated filesystem snapshot of the project. Agents never write directly to the shared tree; they write to their environment, and changes land through a merge-request workflow.

- **Catches:** file-level data races. Two agents can never overwrite each other's bytes because they're literally not writing to the same place.
- **Guarantee:** no two agents can simultaneously modify the same file.

### Layer 1 — Structural Coordination (PSUR)

For changes that affect the project's **shape** — schemas, interfaces, package boundaries, shared types — a **Project Structure Update Request** (PSUR) is required. PSURs serialize architectural changes through a central protocol so that no two agents simultaneously drift the same contract.

- **Catches:** semantic conflicts. Agent A renames a type; Agent B uses the old name — without PSUR, both merge cleanly but the build breaks.
- **Guarantee:** architectural integrity is preserved across concurrent work.

### Layer 2 — Intent-Based Prevention

Before making a change, an agent declares its **intent** — what it's about to do, at what priority level (L1–L4). Higher-priority intents block lower ones from touching the same files; conflicts are caught *before* work is wasted.

- **Intent levels:**
  - **L1 — Read** (observe only)
  - **L2 — Soft write** (edit, yield on contention)
  - **L3 — Hard write** (edit, preempt lower priorities)
  - **L4 — Exclusive** (lock the file; mutual exclusion guaranteed)
- **Catches:** coordination conflicts — two agents both planning to change the same function, both unaware of each other.
- **Guarantee:** L4 intents ensure mutual exclusion; all intents are processed in finite time (liveness).

### Layer 3 — Deliberation-Based Resolution

When conflict is genuine — two agents have incompatible changes that both seem right — the system invokes **deliberation**. Agents (or panels of them) argue their positions and reach a decision via one of several strategies:

- **Weighted voting** — each agent's vote is weighted by its historical reputation (see [Evals and Optimization](../06_quality/02_evals-and-optimization.md)). Past correctness matters.
- **Feedback loop** — agents critique each other's proposals and revise.
- **Adversarial critique** — a red-team agent actively tries to falsify each proposal; proposals that survive win.
- **Q&A** — agents answer targeted questions posed by a judge agent or a human reviewer.

Deliberation converges to a single decision for every dispute (proved formally as "deliberation convergence"). The winning proposal is merged; the losing one is recorded in the event log with its rationale.

## How the layers compose

Conflicts flow through the layers top-down, and each layer is cheaper and faster than the one below it:

- **Isolation** costs nothing at runtime — it's structural.
- **PSUR** costs one round-trip to the structure service.
- **Intents** cost a fast lookup and a short wait.
- **Deliberation** costs N LLM calls.

Catching a conflict early — ideally at isolation or intent time — is orders of magnitude cheaper than running a full deliberation. The framework is designed so that only *genuine* disputes reach layer 3.

## When to think about which layer

| You're worried about… | The layer that catches it |
|---|---|
| Two agents overwriting each other's files | Isolation |
| A schema change breaking a consumer | PSUR |
| Two agents planning the same refactor | Intents |
| Two agents disagreeing about the *right* fix | Deliberation |

## Production results

From the reference deployment (100+ agents):

- **Isolation:** 100% elimination of file-level data races.
- **PSUR:** 84.6% reduction in semantic conflicts.
- **Intents:** 66.7% reduction in coordination conflicts.
- **Deliberation:** 89% of decisions accepted by humans reviewing them, 81% improvement in downstream quality vs. single-agent decisions.
- **Overall:** 94% task success rate in a multi-agent swarm.

## See also

- [Multi-Agent Patterns](../07_multi-agent/01_multi-agent-patterns.md) — the patterns that generate disputes in the first place
- [Evals and Optimization](../06_quality/02_evals-and-optimization.md) — where reputation weights come from
- [Debate pattern (guide)](../../03_guides/06_multi-agent/design-a-debate-pattern.md) — hands-on deliberation
- [Multi-Agent Orchestration](../../04_build-on-codebolt/08_multi-agent-orchestration/01_overview.md)
