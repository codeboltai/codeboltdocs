---
sidebar_position: 6
title: Execution Phase
description: A live, agent-set label for what the running agent is currently doing — read by guardrails, context assembly, hooks, and surfaced on the thread.
---

# Execution Phase

Most agent loops have an internal lifecycle even if they don't advertise it: there's a moment where the agent is *figuring out what to do*, a moment where it's *changing files*, a moment where it's *checking what it changed*. These moments often need different context, different guardrails, and different hooks — but the agent loop itself has no way to label which moment it's in.

**Execution phase** is that label. An agent declares its current phase from inside its code:

```ts
await codebolt.agentExecutionPhase.set('exploring');
// ... reads files, lists directories, runs codebase search ...

await codebolt.agentExecutionPhase.set('coding');
// ... edits, writes ...

await codebolt.agentExecutionPhase.set('verification');
// ... runs tests, checks types ...
```

Each call is a small atomic event. The phase becomes a first-class piece of thread state that every other subsystem reads from one place.

## Why a phase, not a state machine

Codebolt does *not* enforce a fixed set of phase names or transitions. There is no required order — `verification` can come before `coding`, or there can be no phase at all. This is intentional:

- Different kinds of agents have different lifecycles. A planner agent's phases (`research → outline → review`) don't look like a code-editing agent's phases.
- Closed enums force every consumer to handle "unknown phase" cases. An open vocabulary keeps the surface uniform.
- The label is the contract. As long as everyone agrees what `coding` means in this project, the system doesn't need a schema.

The project's `.codebolt/agentExecutionPhasesList.json` is therefore an **open catalog**: a list of phases that have been used or known so far, not the set of allowed values. When `set()` encounters a name not in the catalog, it auto-adds it (`isNew: true` in the response). You can give phases descriptions in App Settings → Execution Phases for documentation, but you don't have to.

## What reads the phase

Setting a phase is only useful because other systems can react to it.

**The thread.** Each thread carries an optional `phase` string. The chat panel renders a small chip next to the thread title showing the current phase, so a human watching the conversation can see what stage the agent is in. The phase is also broadcast on the orchestrator's thread-update channel, so any subscribed UI surface updates in real time.

**Guardrails.** When a tool intent is built, `executionPhase` is auto-filled from the thread if the caller didn't set it. A guardrail rule's `appliesTo.executionPhases: ['verification']` will then evaluate against the real, live phase rather than something the caller has to remember to pass.

**Context Assembly.** When an agent requests context (memories, rules, etc.) for the next turn, the assembler reads `thread.phase` and injects it as `additional_variables.phase` if the caller didn't already provide one. Rule engines can then branch on `addVar.phase == 'verification'` to load test-output memories instead of plan memories, for example.

**Hooks.** Each `set` fires the `agentPhaseChanged` hook event with `{ agentId, agentInstanceId, threadId, phase, previousPhase }`. Hooks can run when the agent enters or leaves a specific phase — e.g. *"when phase becomes `verification`, kick off the test runner"*.

**The application event bus.** A typed `agent:phase:changed` event is published with `{ phase, previousPhase, isNew, emittedAt }` in the payload and the usual source breadcrumb (`agentId`, `threadId`, etc.). Anything subscribed to the bus, including memory ingestion pipelines and plugins, can react.

All five integrations share one source of truth: `thread.phase`. There is no parallel state to keep in sync.

## Caller override semantics

Both guardrails and context-assembly auto-fill `phase` from the thread only when the caller has *not* explicitly provided it. A caller that passes its own `executionPhase` or `additional_variables.phase` always wins. This matters in two cases:

- A capability is running a sub-evaluation on behalf of the agent but doesn't want that sub-task to inherit the parent's phase.
- A debug panel (Context Assembly Request Builder) is testing rules with a specific phase value.

If neither needs to override, the agent's own `set()` is the only place the value comes from.

## The catalog UI

`App Settings → Execution Phases` lists the known phases and lets you:

- Browse what phases agents in this project have used.
- Add a description so the phase is documented.
- Add or rename a phase manually (it'll show up immediately for everyone with autocomplete in the Context Assembly debug panel).
- Reset to the four defaults (`planning`, `execution`, `verification`, `idle`).

Adding a phase here is **not required** for an agent to use it — `set('anything-new')` works regardless. The UI is for documentation and discovery.

## Common patterns

**Phase-scoped rules.** Define a guardrail rule with `appliesTo.executionPhases: ['verification']` so the rule only fires when the agent is verifying. Useful for "during verification, all tool calls require human approval".

**Phase-scoped memories.** In a context rule engine, condition a memory on `addVar.phase == 'planning'` so plan-relevant memories surface only when the agent is planning, and test-relevant memories surface only during `verification`.

**Phase observability.** Hook on `agentPhaseChanged` to write each transition to an event log or to call a webhook — this gives you a per-thread timeline of "what the agent thought it was doing" without changing the agent code.

## See also

- [`agentExecutionPhase` SDK reference](../../05_reference/02_codeboltjs/10_api-access/agentExecutionPhase/index.md)
- [Pseudo CLI: `agentExecutionPhase`](../../05_reference/02_codeboltjs/pseudo_cli/modules/agent-execution-phase.md)
- [Hooks](../../02_using-codebolt/08d_auto-interactivity/04_hooks.md)
