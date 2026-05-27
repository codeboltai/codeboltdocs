---
name: agentExecutionPhase
cbbaseinfo:
  description: Label and read the agent's current execution phase on its thread.
data:
  name: agentExecutionPhase
  category: agentExecutionPhase
  link: index.md
---

# agentExecutionPhase

The `agentExecutionPhase` module lets an agent label its current lifecycle stage — for example `planning`, `exploring`, `coding`, `verification`. The phase is stored on the thread the agent is running in and acts as a single source of truth that every other subsystem reads:

- **Guardrails** auto-fill `executionPhase` on the tool-intent context, so rules can scope to phases like *"this rule only applies during `verification`"*.
- **Context Assembly** auto-fills `additional_variables.phase` from the thread, so memory-pipeline rules can branch on the agent's current activity.
- **Hooks** can subscribe to the `agentPhaseChanged` event and fire when an agent enters a particular phase.
- **The chat thread title** in the UI shows a small chip with the current phase.

The phase catalog (`.codebolt/agentExecutionPhasesList.json`) is an **open vocabulary**, not a closed enum. Calling `set('my-new-phase')` with a name not in the catalog auto-adds it. The catalog is a list of phases *seen or known so far*, useful for autocompletion and for displaying the description in the App Settings panel.

## Methods

| Method | Description |
|---|---|
| [`set`](./set.md) | Set the calling thread's current execution phase (auto-adds to catalog) |
| [`get`](./get.md) | Get the calling thread's current phase, or look up a catalog entry by name |
| [`list`](./list.md) | List every phase in the project catalog |

## Phase name validation

Phase names must match `^[a-z][a-z0-9_-]*$` and be at most 50 characters. Valid: `planning`, `code-review`, `step_3`. Invalid: `Planning` (uppercase), `1st-step` (starts with digit), `my phase` (whitespace).

## What happens on `set`

When an agent calls `codebolt.agentExecutionPhase.set('coding')`:

1. The phase name is upserted into the project catalog (silent if already known, auto-added with empty description if new).
2. The calling thread's `phase` field is updated.
3. `agent:phase:changed` is emitted on the application event bus with `{ phase, previousPhase, isNew }` in the payload.
4. The `agentPhaseChanged` hook fires (`{ agentId, agentInstanceId, threadId, phase, previousPhase }`).
5. A thread-update broadcast is sent so any subscribed UI clients (e.g. the Thread panel showing the phase chip) refresh immediately.

## See also

- [Execution Phase concept](../../../../02_concepts/03_the-agent/04_execution-phase.md)
- [Hooks](../../../../02_using-codebolt/08d_auto-interactivity/04_hooks.md)
- [Context Assembly](../contextAssembly/index.md)
- [Pseudo CLI: agent-execution-phase](../../pseudo_cli/modules/agent-execution-phase.md)
