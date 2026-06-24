---
sidebar_position: 6
title: Drift Detection
description: Keeping long-running swarms on-task. Drift is what happens when an agent (or a swarm) gradually moves away from the original goal, one reasonable-looking step.
---

# Drift Detection

Keeping long-running swarms on-task. Drift is what happens when an agent (or a swarm) gradually moves away from the original goal, one reasonable-looking step at a time, until you look up an hour later and it's working on something else entirely.

## What drift looks like

Real examples from real runs:

- A refactoring agent starts cleaning up unrelated files because they "look similar".
- A planning agent expands the scope of a feature to add "obviously useful" extras.
- A debugging agent spirals into a library it shouldn't have entered to chase a phantom bug.
- A swarm picks up stigmergic work items that were supposed to be scoped to one subdirectory.

Each step looks locally reasonable. The problem is only visible when you compare the current state to the original goal.

## The detector

Codebolt's drift detector runs as a background check on long runs. It periodically:

1. Loads the original task and the initial plan.
2. Loads the last N phases from the event log.
3. Asks an LLM (a cheap one, not the agent's main model): "does what's happening in these phases still align with the original task?"
4. Produces a verdict: `on_track`, `drifting`, or `off_track`, plus a reason.

When it fires `drifting` or `off_track`, it doesn't kill the agent — it emits a warning event the orchestrator can react to. Typical reactions:

- **`drifting`** — the orchestrator injects a reminder into the next step's context ("your original task was X, you're currently working on Y — confirm this is still on the path").
- **`off_track`** — the orchestrator triggers a replan at the appropriate level of the [planning hierarchy](../09_internals/03_subsystems/08_planning-hierarchy.md), or pauses the run for human input.

## Why it runs as a sidecar

The drift detector is deliberately **not** part of the agent's own loop. An agent can't reliably detect its own drift — it's already decided the current path is reasonable. An external observer with a fresh context window is the only way to catch gradual movement.

This is the same reason code review is a separate agent in [plan-execute-review](./03_patterns/plan-execute-review.md): independence of judgment matters.

## Configuration

Drift detection is per-flow or per-agent:

```yaml
drift_detection:
  enabled: true
  interval_phases: 5         # check every 5 phases
  model: "small-judge-model"
  on_drifting: reminder
  on_off_track: replan       # or: pause_for_review, kill
```

Default is `enabled: false` for short runs and `enabled: true` for flows with more than a few iterations. You can override per-agent if you know a particular agent is prone to wandering.

## Cost

Drift detection is a small recurring cost — one cheap LLM call every few phases. For long runs the savings from catching drift early massively outweighs the detection cost. For short runs the detector rarely fires before the run ends anyway, so disabling it saves noise.

## Complementary mechanisms

Drift detection works best alongside:

- **[Guardrails](../09_internals/03_subsystems/09_guardrails-and-eval.md)** — deterministic rules catch hard violations; drift catches soft ones.
- **[Reputation](./05_stigmergy-and-reputation.md)** — agents with chronic drift lose reputation over time and get assigned less work.
- **Explicit scope in the task.** A task written as "only touch files under src/auth/" gives the detector something concrete to check against. Vague tasks ("improve the auth code") are harder to drift-check.
- **[Checkpoints](../02_architecture/04_data-flow-walkthroughs/checkpoint-and-rollback.md)** — when drift is detected and the run is rolled back, you already have the state from before the drift started.

## Pitfalls

- **Over-eager replans.** If the detector is too sensitive, it replans constantly and nothing gets done. Tune the threshold per project.
- **Drift detector drifting.** Yes, really — if the detector's model or prompt changes, its sense of "on track" changes. Treat the detector as infrastructure and version it.
- **False on-track.** A drifting agent can sometimes talk the detector into thinking everything is fine. Reduce this by feeding the detector the original plan, not just the task description.
- **Using drift detection instead of good task definition.** If your tasks are vague, drift detection is a patch. Better to write clearer tasks upfront.

## See also

- [Guardrails & Eval](../09_internals/03_subsystems/09_guardrails-and-eval.md)
- [Planning Hierarchy](../09_internals/03_subsystems/08_planning-hierarchy.md)
- [Stigmergy and Reputation](./05_stigmergy-and-reputation.md)
