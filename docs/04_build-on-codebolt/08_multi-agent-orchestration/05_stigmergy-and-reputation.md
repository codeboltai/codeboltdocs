---
sidebar_position: 5
title: Stigmergy and Reputation
description: The coordination mechanisms for swarms where agents are not in direct communication but still need to work together
---

# Stigmergy and Reputation

The coordination mechanisms for swarms where agents are *not* in direct communication but still need to work together. Named after how ants coordinate through pheromone trails: no central authority, no direct messaging — just reactions to shared state.

## Stigmergy

**Stigmergy** is indirect coordination through a shared environment. An agent modifies the environment; other agents react to the modified environment; the net effect is coordinated behaviour without explicit messaging.

### When you want it

- **Emergent exploration** — agents exploring a large problem space where you can't pre-plan who does what.
- **Load balancing without a coordinator** — agents see "this task is already being worked on" via shared state and pick something else.
- **Robustness** — no central coordinator to fail. Any agent can drop out and the swarm keeps working.
- **Scale** — works with more agents than a manager-worker pattern can handle, because there's no bottleneck.

### How it works in Codebolt

The shared environment is usually the **KV store** or the **knowledge graph**. A stigmergic agent's loop looks like:

```
1. Read shared state (kvStore / kg)
2. Pick an action based on what the state looks like
3. Do the action
4. Write the result back to shared state (including "I'm working on X")
5. Repeat
```

The coordination emerges from *consistent reading + consistent writing*. Agents don't talk to each other; they all talk to the same state and respond to what they see.

### A concrete example: parallel codebase exploration

Task: map the entire symbol graph of a large codebase.

- **Shared state:** a KV store with one key per file, values `{ status: "unclaimed" | "in-progress" | "done", owner, indexed_at }`.
- **Agent loop:** pick the first `unclaimed` file, atomically set it to `in-progress`, index it, set to `done`.
- **No messaging.** Agents can be started, killed, restarted arbitrarily. The swarm is self-healing — an abandoned `in-progress` entry is reclaimed by any agent that notices a stale heartbeat.

The swarm is as fast as the sum of its workers, with no coordinator bottleneck.

### Implementation notes

- Use `kvStoreInstanceService` + `kvStoreQueryCompiler` for shared state. Supports atomic CAS, which is essential.
- Heartbeats on `in-progress` items are needed to reclaim work from dead agents. `HeartbeatManager` is already doing this for the agent processes themselves; reuse its signals.
- Write the **rules** an agent uses to pick its next action as a simple policy function — don't hand it to the LLM. Stigmergy at scale only works if the picking step is cheap.

## Reputation

**Reputation** is a complementary mechanism: each agent accumulates a score based on how well its past actions turned out, and other agents (or the coordinator) weight its future contributions by that score.

### When you want it

- **Heterogeneous agents on similar tasks** — you don't know a priori which agent is best for a given task, and you want the system to learn.
- **Ensembles where votes should not be equal.** A debate pattern where the "judge" weights arguments by each debater's historical track record.
- **Self-policing swarms.** In stigmergic systems, an agent whose writes are frequently rejected or reverted should be consulted less.

### How it's computed

Codebolt's reputation is derived from the event log. For each agent run, the outcome is known (success / failure / rejected / killed), and downstream effects (was its output later modified? did its tests pass? did review approve?) are also known. A scheduled job aggregates this into a per-agent score stored in `agent_portfolios`.

The formula is intentionally simple — more sophisticated scoring is usually overfitting. Rough shape:

```
score = α * success_rate
      + β * downstream_stability    (did its changes survive?)
      - γ * guardrail_violation_rate
      - δ * cost_per_success
```

Weights are per-workspace so different projects can emphasise different things.

### Using reputation in a flow

A flow or orchestrator can consult scores via `agentPortfolioService` before choosing which agent handles a node. The UI shows scores on the portfolio page so humans can curate too.

### Pitfalls

- **Score gaming.** An agent that does trivial tasks successfully looks better than one that attempts hard tasks and sometimes fails. Normalise by task difficulty if possible.
- **Staleness.** Scores age. A model update or prompt change invalidates history. Expire old data.
- **Winner-take-all.** If scores compound too aggressively, one agent wins every task and the others never get used. Add exploration — occasionally assign work to a random non-top agent.

## When NOT to use stigmergy or reputation

These are advanced mechanisms. Most projects don't need them. Signs you should use something simpler:

- **You can fit everything in a manager-worker pattern without the manager becoming a bottleneck.** Use that.
- **You have fewer than ~5 concurrent agents.** Stigmergy's benefits kick in at scale; below that it's just indirection.
- **Your tasks are not homogeneous.** Stigmergy assumes agents can pick work off a shared queue; if every task needs a different specialist, a pipeline or orchestrator is better.

## See also

- [Manager-Worker](./03_patterns/manager-worker.md) — the simpler alternative
- [Drift Detection](./06_drift-detection.md) — complements reputation
- [Agent Subsystem](../07b_subsystems/01_agent-subsystem.md)
